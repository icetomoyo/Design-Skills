// Vismith - flat-subset YAML frontmatter parser (HLD H2).
// Grammar: key: value  |  key: [a, b, "c"]  |  full-line or trailing comments.
// Nested maps are intentionally NOT supported; parse errors are explicit.
export class FrontmatterError extends Error {}

function stripInlineComment(s) {
  let q = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; continue; }
    if (c === '#' && (i === 0 || /\s/.test(s[i - 1]))) return s.slice(0, i);
  }
  return s;
}

function parseScalar(v) {
  v = v.trim();
  if (v.length >= 2 && ((v[0] === '"' && v.endsWith('"')) || (v[0] === "'" && v.endsWith("'")))) {
    return v.slice(1, -1);
  }
  return v;
}

function parseArray(v, where) {
  const inner = v.trim().slice(1, -1).trim();
  if (inner === '') return [];
  const out = [];
  let cur = '', q = null;
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i];
    if (q) { cur += c; if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; cur += c; continue; }
    if (c === ',') { out.push(parseScalar(cur)); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim() !== '') out.push(parseScalar(cur));
  if (q) throw new FrontmatterError(where + ': unterminated quote in array');
  return out;
}

export function parseFrontmatter(text, fileName) {
  fileName = fileName || '<memory>';
  const lines = text.split(/\r?\n/);
  if (!lines.length || lines[0].trim() !== '---') {
    throw new FrontmatterError(fileName + ': first line must be ---');
  }
  const data = {};
  let closed = -1;
  for (let i = 1; i < lines.length; i++) {
    const raw = lines[i];
    if (raw.trim() === '---') { closed = i; break; }
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const cleaned = stripInlineComment(raw);
    const m = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(cleaned);
    if (!m) throw new FrontmatterError(fileName + ':' + (i + 1) + ': expected key: value, got: ' + raw.trim().slice(0, 60));
    const key = m[1];
    const val = m[2].trim();
    if (val === '') throw new FrontmatterError(fileName + ':' + (i + 1) + ': empty value for ' + key);
    if (val.startsWith('{')) throw new FrontmatterError(fileName + ':' + (i + 1) + ': nested maps are not supported (' + key + ')');
    const where = fileName + ':' + (i + 1);
    if (val.startsWith('[') && val.endsWith(']')) data[key] = parseArray(val, where);
    else data[key] = parseScalar(val);
  }
  if (closed < 0) throw new FrontmatterError(fileName + ': missing closing ---');
  const body = lines.slice(closed + 1).join('\n');
  return { data, body };
}

export const REQUIRED_ENTRY_KEYS = ['id', 'title', 'category', 'product_types', 'tech_stacks', 'kind', 'source', 'scope_note'];

export function validateEntryMeta(data, fileName) {
  const missing = REQUIRED_ENTRY_KEYS.filter((k) => data[k] === undefined || data[k] === null || !(k in data));
  if (missing.length) throw new FrontmatterError(fileName + ': missing required keys: ' + missing.join(', '));
  if (data.kind !== 'principle' && data.kind !== 'trend') throw new FrontmatterError(fileName + ': kind must be principle|trend');
}
