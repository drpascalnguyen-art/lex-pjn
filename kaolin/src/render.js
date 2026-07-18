// Terminal table rendering with per-column width caps.

const MAX_CELL = 32;

export function renderTable(headers, records, { limit } = {}) {
  const rows = limit ? records.slice(0, limit) : records;
  const trunc = (v) => {
    const s = String(v ?? '').replace(/\s+/g, ' ');
    return s.length > MAX_CELL ? s.slice(0, MAX_CELL - 1) + '…' : s;
  };
  const widths = headers.map((h) =>
    Math.max(h.length, ...rows.map((r) => trunc(r[h]).length), 1));
  const line = (l, m, r) => l + widths.map((w) => '─'.repeat(w + 2)).join(m) + r;
  const fmt = (cells) => '│ ' + cells.map((c, i) => c.padEnd(widths[i])).join(' │ ') + ' │';
  const out = [
    line('┌', '┬', '┐'),
    fmt(headers),
    line('├', '┼', '┤'),
    ...rows.map((r) => fmt(headers.map((h) => trunc(r[h])))),
    line('└', '┴', '┘'),
  ];
  if (limit && records.length > limit) out.push(`… ${records.length - limit} more rows`);
  return out.join('\n');
}
