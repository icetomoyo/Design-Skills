// Vismith - design knowledge retrieval (M1, HLD 3.3). Zero-dep, cross-platform.
// Usage: node scripts/search.mjs "<query>" [--category C] [--product-type P] [--tech T] [--kind K] [--top N] [--min-score S] [--json]
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter, validateEntryMeta, FrontmatterError } from './lib/frontmatter.mjs';

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.dirname(SCRIPTS_DIR);
const KNOWLEDGE_DIR = path.join(SKILL_ROOT, 'assets', 'knowledge');

function usage() {
  return [
    'Usage: node scripts/search.mjs "<query>" [options]',
    '  --category C        filter: one of product-playbook|style-direction|tokens|component-pattern|ux-pattern|a11y|anti-slop|copy|visualization|layout|rtl|tech-stack',
    '  --product-type P    filter: saas-dashboard|admin-console|marketing-site|consumer-app|creative|data-intensive',
    '  --tech T            filter: react|vue|html|tailwind|...',
    '  --kind K            filter: principle|trend',
    '  --top N             max results (default 5)',
    '  --min-score S       abstain threshold (default 2.0)',
    '  --min-margin M      abstain when top1-top2 < M (default 0.5)',
    '  --json              machine-readable output'
  ].join('\n');
}

function parseArgs(argv) {
  const opts = { top: 5, minScore: 2.0, minMargin: 0.5, filters: {}, json: false, query: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--json') opts.json = true;
    else if (a === '--top') opts.top = parseInt(argv[++i], 10) || 5;
    else if (a === '--min-score') opts.minScore = parseFloat(argv[++i]);
    else if (a === '--min-margin') opts.minMargin = parseFloat(argv[++i]);
    else if (a === '--category') opts.filters.category = argv[++i];
    else if (a === '--product-type') opts.filters.productType = argv[++i];
    else if (a === '--tech') opts.filters.tech = argv[++i];
    else if (a === '--kind') opts.filters.kind = argv[++i];
    else if (a === '--help' || a === '-h') { opts.help = true; }
    else opts.query.push(a);
  }
  if (isNaN(opts.minScore)) opts.minScore = 2.0;
  if (isNaN(opts.minMargin)) opts.minMargin = 0.5;
  opts.query = opts.query.join(' ').trim();
  return opts;
}

function isAsciiWord(t) { return /^[a-z0-9][a-z0-9-]*$/.test(t); }

function countOccurrences(hay, needle) {
  if (!needle) return 0;
  let n = 0, idx = 0;
  while ((idx = hay.indexOf(needle, idx)) !== -1) { n++; idx += needle.length; }
  return n;
}

function tokenHits(hayLower, token) {
  if (isAsciiWord(token)) {
    // word-ish matching: substring hit is enough for small corpus, but require boundary for very short tokens
    if (token.length <= 2) return countOccurrences(hayLower, token);
    return countOccurrences(hayLower, token);
  }
  return countOccurrences(hayLower, token); // CJK substring
}

async function loadSynonyms() {
  try {
    const raw = await fs.readFile(path.join(SKILL_ROOT, 'assets', 'synonyms.json'), 'utf8');
    const data = JSON.parse(raw);
    const groups = [];
    for (const k of Object.keys(data)) {
      if (k === '//') continue;
      groups.push([k.toLowerCase(), ...data[k].map((w) => String(w).toLowerCase())]);
    }
    return groups;
  } catch { return []; }
}

function expandTokens(tokens, groups) {
  const out = new Map(); // token -> weight multiplier
  for (const t of tokens) out.set(t, 1);
  for (const g of groups) {
    const hit = g.find((w) => tokens.some((t) => (isAsciiWord(t) ? t === w : w.includes(t) || t.includes(w))));
    if (hit === undefined) continue;
    for (const w of g) {
      if (!out.has(w)) out.set(w, 0.6);
    }
  }
  return out;
}

async function loadEntries() {
  const files = (await fs.readdir(KNOWLEDGE_DIR)).filter((f) => f.endsWith('.md') && f !== 'SOURCES.md').sort();
  const entries = []; const broken = [];
  for (const f of files) {
    const p = path.join(KNOWLEDGE_DIR, f);
    let parsed;
    try {
      const text = await fs.readFile(p, 'utf8');
      parsed = parseFrontmatter(text, f);
      validateEntryMeta(parsed.data, f);
    } catch (e) {
      broken.push(f + ': ' + (e && e.message ? e.message : String(e)));
      continue;
    }
    const d = parsed.data;
    entries.push({
      file: f,
      id: d.id, title: String(d.title), category: d.category,
      productTypes: [].concat(d.product_types).map(String),
      techs: [].concat(d.tech_stacks).map(String),
      kind: d.kind, source: String(d.source), scopeNote: String(d.scope_note),
      titleLower: String(d.title).toLowerCase(),
      metaLower: (d.category + ' ' + [].concat(d.product_types).join(' ') + ' ' + [].concat(d.tech_stacks).join(' ')).toLowerCase(),
      bodyLower: parsed.body.toLowerCase().slice(0, 3000)
    });
  }
  return { entries, broken };
}

function passFilters(e, f) {
  if (f.category && e.category !== f.category) return false;
  if (f.productType && !e.productTypes.includes(f.productType)) return false;
  if (f.tech && !e.techs.includes(f.tech)) return false;
  if (f.kind && e.kind !== f.kind) return false;
  return true;
}

function scoreEntry(e, tokens) {
  let score = 0;
  for (const [tok, mult] of tokens) {
    score += mult * (3 * tokenHits(e.titleLower, tok) + 2 * tokenHits(e.metaLower, tok) + Math.min(tokenHits(e.bodyLower, tok), 3));
  }
  return score;
}

function suggestions(entries, tokens) {
  const words = new Map();
  for (const e of entries) {
    for (const w of e.titleLower.split(/[^\u4e00-\u9fff a-z0-9-]+/)) {
      const t = w.trim();
      if (t.length < 2) continue;
      for (const [tok] of tokens) if (t.includes(tok) || tok.includes(t)) words.set(t, (words.get(t) || 0) + 1);
    }
  }
  return [...words.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map((x) => x[0]);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help || !opts.query) { console.log(usage()); return 0; }
  const { entries, broken } = await loadEntries();
  const tokensRaw = opts.query.toLowerCase().split(/[^\u4e00-\u9fffa-z0-9-]+/).filter((t) => t.length >= 1 && t !== '-');
  if (!tokensRaw.length) {
    console.log(opts.json ? JSON.stringify({ query: opts.query, abstain: true, reason: 'empty query' }) : '查询为空。' + usage());
    return 0;
  }
  const tokens = expandTokens(tokensRaw, await loadSynonyms());
  const scored = entries.filter((e) => passFilters(e, opts.filters)).map((e) => ({ e, score: scoreEntry(e, tokens) })).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
  const abstain = scored.length === 0 || scored[0].score < opts.minScore || (scored.length >= 2 && (scored[0].score - scored[1].score) < opts.minMargin);
  if (opts.json) {
    const out = {
      tool: 'vismith-search', version: 1, query: opts.query,
      filters: opts.filters, abstain,
      suggestions: abstain ? suggestions(entries, tokens) : [],
      broken_entries: broken,
      results: abstain ? [] : scored.slice(0, opts.top).map((x) => ({
        id: x.e.id, title: x.e.title, score: Math.round(x.score * 10) / 10,
        path: 'assets/knowledge/' + x.e.file, category: x.e.category,
        product_types: x.e.productTypes, kind: x.e.kind, source: x.e.source, scope_note: x.e.scopeNote
      }))
    };
    console.log(JSON.stringify(out, null, 2));
    return 0;
  }
  if (broken.length) console.log('[warn] ' + broken.length + ' 个条目解析失败被跳过：' + broken.join('；'));
  if (abstain) {
    console.log('无高置信条目（低于阈值 ' + opts.minScore + '）。可尝试：' + (suggestions(entries, tokens).join('、') || '更换更具体的设计主题词'));
    return 0;
  }
  console.log('Vismith 知识检索：' + opts.query + '（命中 ' + Math.min(scored.length, opts.top) + '/' + scored.length + '）');
  scored.slice(0, opts.top).forEach((x, i) => {
    console.log('');
    console.log((i + 1) + '. ' + x.e.title + '（score ' + (Math.round(x.score * 10) / 10) + '）');
    console.log('   ' + x.e.scopeNote);
    console.log('   source: ' + x.e.source + ' | ' + x.e.file);
  });
  return 0;
}

main().then((c) => process.exit(c)).catch((e) => { console.error('vismith-search: ' + e.message); process.exit(2); });
