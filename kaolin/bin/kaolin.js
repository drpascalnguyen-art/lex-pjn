#!/usr/bin/env node
// kaolin — a Clay-style lead-enrichment table that lives in your repo.
// (Kaolin is the clay used in dentistry.)

import fs from 'node:fs';
import path from 'node:path';
import { parseCsv, toCsv } from '../src/csv.js';
import {
  initWorkspace, requireWorkspace, loadConfig, listTables, loadTable,
  saveTable, tableExists,
} from '../src/store.js';
import { renderTable } from '../src/render.js';
import { runEnrichment } from '../src/enrich.js';

const args = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].slice(2);
    const next = args[i + 1];
    if (next !== undefined && !next.startsWith('--')) { flags[key] = next; i++; }
    else flags[key] = true;
  } else positional.push(args[i]);
}
const [cmd, ...rest] = positional;

const HELP = `kaolin — Clay-style lead enrichment for the AI-dentist launch

Usage:
  kaolin init [dir]                          Create a workspace (kaolin.json + tables/)
  kaolin import <file.csv> [--table name]    Import a CSV as a table
  kaolin tables                              List tables
  kaolin view <table> [--limit N]            Render a table in the terminal
  kaolin col add <table> <name> --type T ... Add an enrichment column
       --type formula   --expr "row.website ? '...' : ''"
       --type ai        --prompt "..." [--system "..."] [--model id] [--max-tokens N]
       --type http      --url "https://...{{col}}" [--extract path] [--match regex]
       --type waterfall --sources colA,colB,colC
  kaolin col ls <table>                      List columns
  kaolin col rm <table> <name>               Remove a column (and its data)
  kaolin recipe apply <table> <recipe.json>  Add all columns from a recipe file
  kaolin run <table> [--force] [--only a,b] [--limit N]   Run enrichment
  kaolin export <table> <out.csv>            Export a table to CSV

Templates: {{column_name}} substitutes row values in ai prompts and http urls.
AI columns use the Anthropic API (default model claude-opus-4-8) — set ANTHROPIC_API_KEY.
`;

function die(msg) { console.error(msg); process.exit(1); }

switch (cmd) {
  case 'init': {
    const dir = path.resolve(rest[0] || '.');
    initWorkspace(dir);
    console.log(`Workspace ready at ${dir} (kaolin.json + tables/)`);
    break;
  }

  case 'import': {
    const ws = requireWorkspace();
    const file = rest[0] || die('Usage: kaolin import <file.csv> [--table name]');
    const name = flags.table || path.basename(file).replace(/\.csv$/i, '').replace(/[^\w-]/g, '_');
    const { headers, records } = parseCsv(fs.readFileSync(file, 'utf8'));
    if (!headers.length) die('CSV has no header row.');
    const existing = tableExists(ws, name) ? loadTable(ws, name) : null;
    const table = existing ?? { name, columns: headers.map((h) => ({ name: h, type: 'input' })), rows: [] };
    if (existing) {
      for (const h of headers) {
        if (!table.columns.some((c) => c.name === h)) table.columns.push({ name: h, type: 'input' });
      }
    }
    table.rows.push(...records);
    saveTable(ws, table);
    console.log(`Imported ${records.length} row(s) into table "${name}" (${table.rows.length} total).`);
    break;
  }

  case 'tables': {
    const ws = requireWorkspace();
    const names = listTables(ws);
    if (!names.length) { console.log('(no tables — use `kaolin import`)'); break; }
    for (const n of names) {
      const t = loadTable(ws, n);
      console.log(`${n}  (${t.rows.length} rows, ${t.columns.length} cols)`);
    }
    break;
  }

  case 'view': {
    const ws = requireWorkspace();
    const table = loadTable(ws, rest[0] || die('Usage: kaolin view <table>'));
    const headers = table.columns.map((c) => c.name);
    console.log(renderTable(headers, table.rows, { limit: Number(flags.limit) || 25 }));
    break;
  }

  case 'col': {
    const ws = requireWorkspace();
    const [sub, tableName, colName] = rest;
    const table = loadTable(ws, tableName || die('Usage: kaolin col <add|ls|rm> <table> ...'));
    if (sub === 'ls') {
      for (const c of table.columns) {
        const detail = c.expr || c.prompt || c.url || (c.sources && c.sources.join(' → ')) || '';
        console.log(`${c.name.padEnd(24)} ${c.type.padEnd(10)} ${String(detail).slice(0, 80)}`);
      }
      break;
    }
    if (sub === 'rm') {
      if (!colName) die('Usage: kaolin col rm <table> <name>');
      table.columns = table.columns.filter((c) => c.name !== colName);
      for (const row of table.rows) delete row[colName];
      saveTable(ws, table);
      console.log(`Removed column "${colName}".`);
      break;
    }
    if (sub === 'add') {
      if (!colName || !flags.type) die('Usage: kaolin col add <table> <name> --type <formula|ai|http|waterfall> ...');
      if (table.columns.some((c) => c.name === colName)) die(`Column "${colName}" already exists.`);
      const col = { name: colName, type: flags.type };
      if (flags.type === 'formula') col.expr = flags.expr || die('--expr required for formula columns');
      else if (flags.type === 'ai') {
        col.prompt = flags.prompt || die('--prompt required for ai columns');
        if (flags.system) col.system = flags.system;
        if (flags.model) col.model = flags.model;
        if (flags['max-tokens']) col.maxTokens = Number(flags['max-tokens']);
      } else if (flags.type === 'http') {
        col.url = flags.url || die('--url required for http columns');
        if (flags.extract) col.extract = flags.extract;
        if (flags.match) col.match = flags.match;
      } else if (flags.type === 'waterfall') {
        col.sources = (flags.sources || die('--sources required for waterfall columns')).split(',').map((s) => s.trim());
      } else die(`Unknown column type "${flags.type}".`);
      table.columns.push(col);
      saveTable(ws, table);
      console.log(`Added ${flags.type} column "${colName}" to "${table.name}".`);
      break;
    }
    die('Usage: kaolin col <add|ls|rm> <table> ...');
    break;
  }

  case 'recipe': {
    const ws = requireWorkspace();
    const [sub, tableName, recipeFile] = rest;
    if (sub !== 'apply' || !tableName || !recipeFile) die('Usage: kaolin recipe apply <table> <recipe.json>');
    const table = loadTable(ws, tableName);
    const recipe = JSON.parse(fs.readFileSync(recipeFile, 'utf8'));
    let added = 0;
    for (const col of recipe.columns || []) {
      if (table.columns.some((c) => c.name === col.name)) {
        console.log(`• ${col.name}: already present, skipping`);
        continue;
      }
      table.columns.push(col);
      added++;
      console.log(`• ${col.name} (${col.type}) added`);
    }
    saveTable(ws, table);
    console.log(`Recipe "${recipe.name || recipeFile}" applied: ${added} column(s) added.`);
    break;
  }

  case 'run': {
    const ws = requireWorkspace();
    const table = loadTable(ws, rest[0] || die('Usage: kaolin run <table>'));
    const config = loadConfig(ws);
    const opts = {
      force: !!flags.force,
      only: flags.only ? String(flags.only).split(',').map((s) => s.trim()) : null,
      limit: flags.limit ? Number(flags.limit) : null,
      log: (m) => console.log(m),
    };
    const stats = await runEnrichment(table, config, opts);
    saveTable(ws, table);
    console.log(`Done: ${stats.computed} computed, ${stats.skipped} already filled, ${stats.errors} error(s).`);
    if (stats.errors) process.exitCode = 1;
    break;
  }

  case 'export': {
    const ws = requireWorkspace();
    const table = loadTable(ws, rest[0] || die('Usage: kaolin export <table> <out.csv>'));
    const out = rest[1] || die('Usage: kaolin export <table> <out.csv>');
    const headers = table.columns.map((c) => c.name);
    fs.writeFileSync(out, toCsv(headers, table.rows));
    console.log(`Exported ${table.rows.length} row(s) → ${out}`);
    break;
  }

  case 'help':
  case undefined:
    console.log(HELP);
    break;

  default:
    die(`Unknown command "${cmd}".\n\n${HELP}`);
}
