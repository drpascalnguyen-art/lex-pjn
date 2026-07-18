// Enrichment runner: computes non-input columns cell by cell, Clay-style.
// A cell is only computed when empty (or --force). AI cells run through the
// Anthropic SDK with a bounded concurrency pool.

import Anthropic from '@anthropic-ai/sdk';
import { fillTemplate, getPath } from './store.js';

let _client = null;
function client() {
  if (!_client) _client = new Anthropic(); // resolves ANTHROPIC_API_KEY / auth profile from env
  return _client;
}

function computeFormula(col, row) {
  const fn = new Function('row', `"use strict"; return (${col.expr});`);
  const v = fn(row);
  return v == null ? '' : String(v);
}

async function computeHttp(col, row) {
  const url = fillTemplate(col.url, row);
  const res = await fetch(url, { headers: col.headers || {} });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('json')) {
    const data = await res.json();
    const v = getPath(data, col.extract);
    return v == null ? '' : (typeof v === 'string' ? v : JSON.stringify(v));
  }
  const text = await res.text();
  if (col.match) {
    const m = text.match(new RegExp(col.match, 'i'));
    return m ? (m[1] ?? m[0]) : '';
  }
  return text.slice(0, col.maxChars || 2000);
}

async function computeAi(col, row, config) {
  const response = await client().messages.create({
    model: col.model || config.model || 'claude-opus-4-8',
    max_tokens: col.maxTokens || 1024,
    thinking: { type: 'adaptive' },
    system: col.system ||
      'You are an enrichment engine inside a lead table for a dental-industry business. ' +
      'Reply with ONLY the requested value — no preamble, no quotes, no markdown.',
    messages: [{ role: 'user', content: fillTemplate(col.prompt, row) }],
  });
  return response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim();
}

function computeWaterfall(col, row) {
  for (const src of col.sources) {
    const v = row[src];
    if (v != null && String(v).trim() !== '') return String(v);
  }
  return '';
}

async function computeCell(col, row, config) {
  switch (col.type) {
    case 'formula':   return computeFormula(col, row);
    case 'http':      return computeHttp(col, row);
    case 'ai':        return computeAi(col, row, config);
    case 'waterfall': return computeWaterfall(col, row);
    default: throw new Error(`Unknown column type "${col.type}"`);
  }
}

async function pool(items, limit, worker) {
  const queue = [...items.entries()];
  const runners = Array.from({ length: Math.max(1, limit) }, async () => {
    while (queue.length) {
      const [i, item] = queue.shift();
      await worker(item, i);
    }
  });
  await Promise.all(runners);
}

/**
 * Runs enrichment over a table in column order (so later columns can read
 * earlier results — including waterfalls over AI columns).
 * Returns { computed, skipped, errors }.
 */
export async function runEnrichment(table, config, { force = false, only = null, limit = null, log = () => {} } = {}) {
  const stats = { computed: 0, skipped: 0, errors: 0 };
  const rows = limit ? table.rows.slice(0, limit) : table.rows;
  const cols = table.columns.filter((c) => c.type !== 'input' && (!only || only.includes(c.name)));

  const hasAi = cols.some((c) => c.type === 'ai');
  if (hasAi && !process.env.ANTHROPIC_API_KEY && !process.env.ANTHROPIC_AUTH_TOKEN) {
    log('⚠ No ANTHROPIC_API_KEY/ANTHROPIC_AUTH_TOKEN set — AI columns will error unless an `ant auth login` profile exists.');
  }

  for (const col of cols) {
    const pending = rows.filter((row) => force || String(row[col.name] ?? '').trim() === '');
    if (!pending.length) { log(`• ${col.name}: nothing to do`); continue; }
    log(`• ${col.name} (${col.type}): ${pending.length} cell(s)`);
    const concurrency = col.type === 'ai' || col.type === 'http' ? (config.concurrency || 3) : 1000;
    await pool(pending, concurrency, async (row) => {
      try {
        row[col.name] = await computeCell(col, row, config);
        stats.computed++;
      } catch (err) {
        stats.errors++;
        row[col.name] = row[col.name] ?? '';
        log(`  ✗ row "${row[table.columns[0]?.name] ?? '?'}" → ${col.name}: ${err.message}`);
      }
    });
  }
  stats.skipped = rows.length * cols.length - stats.computed - stats.errors;
  return stats;
}
