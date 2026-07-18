// Workspace layout:
//   kaolin.json          — workspace config (model, defaults)
//   tables/<name>.json   — { name, columns: [...], rows: [{...}] }
//
// Column shapes:
//   { name, type: "input" }
//   { name, type: "formula",   expr: "row.website ? ... : ''" }
//   { name, type: "http",      url: "https://...{{col}}...", extract: "a.b.0.c" }
//   { name, type: "ai",        prompt: "...{{col}}...", system?, model?, maxTokens? }
//   { name, type: "waterfall", sources: ["colA", "colB"] }

import fs from 'node:fs';
import path from 'node:path';

export function findWorkspace(start = process.cwd()) {
  let dir = path.resolve(start);
  while (true) {
    if (fs.existsSync(path.join(dir, 'kaolin.json'))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

export function requireWorkspace() {
  const ws = findWorkspace();
  if (!ws) {
    console.error('No kaolin workspace found. Run `kaolin init` first.');
    process.exit(1);
  }
  return ws;
}

export function initWorkspace(dir) {
  fs.mkdirSync(path.join(dir, 'tables'), { recursive: true });
  const cfgPath = path.join(dir, 'kaolin.json');
  if (!fs.existsSync(cfgPath)) {
    fs.writeFileSync(cfgPath, JSON.stringify({
      model: 'claude-opus-4-8',
      concurrency: 3,
    }, null, 2) + '\n');
  }
  return dir;
}

export function loadConfig(ws) {
  return JSON.parse(fs.readFileSync(path.join(ws, 'kaolin.json'), 'utf8'));
}

const tablePath = (ws, name) => path.join(ws, 'tables', `${name}.json`);

export function listTables(ws) {
  const dir = path.join(ws, 'tables');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));
}

export function loadTable(ws, name) {
  const p = tablePath(ws, name);
  if (!fs.existsSync(p)) {
    console.error(`Table "${name}" not found. Tables: ${listTables(ws).join(', ') || '(none)'}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

export function saveTable(ws, table) {
  fs.writeFileSync(tablePath(ws, table.name), JSON.stringify(table, null, 2) + '\n');
}

export function tableExists(ws, name) {
  return fs.existsSync(tablePath(ws, name));
}

// {{column}} template substitution against a row
export function fillTemplate(tpl, row) {
  return tpl.replace(/\{\{\s*([\w .-]+?)\s*\}\}/g, (_, key) => String(row[key] ?? ''));
}

// dotted-path getter for http extract ("data.0.email")
export function getPath(obj, pathStr) {
  if (!pathStr) return obj;
  return pathStr.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
