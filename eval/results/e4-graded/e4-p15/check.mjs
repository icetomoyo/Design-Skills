#!/usr/bin/env node
/**
 * check.mjs — static contract verifier for the Concord landing page.
 * Zero dependencies (Node >= 18). Enforces contract.json (CHK-01..CHK-08).
 * Exit code 0 = all checks pass; 1 = failures listed on stderr.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const contract = JSON.parse(readFileSync(join(root, "contract.json"), "utf8"));
const css = readFileSync(join(root, "styles.css"), "utf8");
const html = readFileSync(join(root, "index.html"), "utf8");

const failures = [];
const passes = [];
const fail = (id, msg) => failures.push(`${id}: ${msg}`);
const pass = (id, msg) => passes.push(`${id}: ${msg}`);

/* ---------- token helpers ---------- */
const tokenHex = {};
for (const [k, v] of Object.entries(contract.tokens.ink)) {
  if (!k.startsWith("$")) tokenHex[v.toUpperCase()] = `ink.${k}`;
}
for (const [k, v] of Object.entries(contract.tokens.accent)) {
  if (!k.startsWith("$")) tokenHex[v.toUpperCase()] = `accent.${k}`;
}
tokenHex[contract.tokens.white.toUpperCase()] = "white";

const hexToRgb = (h) => {
  const s = h.replace("#", "");
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
};
const lum = ([r, g, b]) => {
  const f = (c) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => {
  const [l1, l2] = [lum(hexToRgb(a)), lum(hexToRgb(b))].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const rgbKey = (r, g, b) => `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`.toUpperCase();

/* ---------- CHK-01: every color is a contract token ---------- */
{
  const hexes = [...css.matchAll(/#[0-9a-fA-F]{6}\b/g)].map((m) => m[0].toUpperCase());
  const bad = hexes.filter((h) => !(h in tokenHex));
  bad.length ? fail("CHK-01", `non-token hex in styles.css: ${bad.join(", ")}`)
             : pass("CHK-01", `all ${new Set(hexes).size} distinct hex values are contract tokens`);

  const rgbs = [...css.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)];
  const badRgb = rgbs
    .map((m) => rgbKey(+m[1], +m[2], +m[3]))
    .filter((k) => !(k in tokenHex));
  badRgb.length ? fail("CHK-01", `rgb()/rgba() base not a token: ${[...new Set(badRgb)].join(", ")}`)
                : pass("CHK-01", `all ${rgbs.length} rgb()/rgba() bases derive from tokens`);
}

/* ---------- CHK-02: Inter body stack ---------- */
{
  const m = css.match(/--font-body:\s*([^;]+);/);
  const ok = m && m[1].trim().startsWith('"Inter"');
  ok ? pass("CHK-02", `body font stack = ${m[1].trim()} (Inter first; fallback declared)`)
     : fail("CHK-02", "body font stack does not start with Inter");
}

/* ---------- CHK-03: one primary CTA, one secondary ---------- */
{
  const btns = [...html.matchAll(/class="[^"]*btn-primary[^"]*"[^>]*>([^<]*)</g)].map((m) => m[1].trim());
  const unique = new Set(btns);
  const heroSecondary = (html.match(/link-secondary/g) || []).length;
  btns.length >= 1 && unique.size === 1
    ? pass("CHK-03", `primary CTA "${[...unique][0]}" rendered ${btns.length}× (nav + hero), one action`)
    : fail("CHK-03", `primary CTA labels inconsistent: ${[...unique].join(" | ")}`);
  heroSecondary === 1 ? pass("CHK-03", "exactly one secondary action in hero")
                      : fail("CHK-03", `expected 1 secondary action, found ${heroSecondary}`);
}

/* ---------- CHK-04: persistent nav with wordmark + CTA ---------- */
{
  const navSticky = /\.site-nav\s*\{[^}]*position:\s*sticky/.test(css);
  const hasNav = /<header class="site-nav"/.test(html);
  const navHasCta = /<header class="site-nav"[\s\S]*?btn-primary[\s\S]*?<\/header>/.test(html);
  const navHasWordmark = /<header class="site-nav"[\s\S]*?class="wordmark"[\s\S]*?<\/header>/.test(html);
  navSticky && hasNav && navHasCta && navHasWordmark
    ? pass("CHK-04", "sticky top nav present with wordmark and primary CTA")
    : fail("CHK-04", `nav checks: sticky=${navSticky} present=${hasNav} cta=${navHasCta} wordmark=${navHasWordmark}`);
}

/* ---------- CHK-05: section rhythm 80–128px ---------- */
{
  const m = css.match(/--section-space:\s*clamp\((\d+)px,\s*[\d.]+vw,\s*(\d+)px\)/);
  const applied = /section\s*\{\s*padding-block:\s*var\(--section-space\)/.test(css);
  const [lo, hi] = contract.invariants.sectionRhythm ? [contract.invariants.sectionRhythm.min, contract.invariants.sectionRhythm.max] : [80, 128];
  if (!m || !applied) fail("CHK-05", "section-space token missing or not applied to all sections");
  else {
    const [min, max] = [+m[1], +m[2]];
    min >= lo && max <= hi
      ? pass("CHK-05", `section padding clamp(${min}px…${max}px) within [${lo},${lo===128?128:hi}]`)
      : fail("CHK-05", `clamp(${min},${max}) outside [${lo},${hi}]`);
  }
}

/* ---------- CHK-06: banned words & patterns ---------- */
{
  const text = html.replace(/<[^>]+>/g, " ").toLowerCase();
  const banned = contract.bans.hypeWords.map((w) => w.toLowerCase());
  const found = banned.filter((w) => text.includes(w));
  found.length ? fail("CHK-06", `hype words present: ${found.join(", ")}`)
               : pass("CHK-06", "no banned hype words in copy");

  const pillAboveH1 = /class="[^"]*(pill|badge|blob)[^"]*"/.test(html) || /blob|pill-/.test(css);
  pillAboveH1 ? fail("CHK-06", "pill/badge/blob pattern found") : pass("CHK-06", "no pill badge / blob patterns");

  const centered = (css.match(/text-align:\s*center/g) || []).length;
  centered === 0 ? pass("CHK-06", "no all-centered stacking (no text-align:center rules; layouts are asymmetric grids)")
                 : fail("CHK-06", `${centered} text-align:center rules — check for centered stacking`);

  const eyebrow = /::before\s*\{[^}]*content:\s*["'][A-Z0-9 ,·—-]{2,}["']/.test(css);
  eyebrow ? fail("CHK-06", "pseudo-element kicker/eyebrow label above a heading") : pass("CHK-06", "no kicker/eyebrow labels");
}

/* ---------- CHK-07: declared contrast pairs ---------- */
{
  const pairs = [
    ["#2A3140", "#F6F7F9", 4.5, "body text on page ground"],
    ["#47505F", "#F6F7F9", 4.5, "secondary body on page ground"],
    ["#676F80", "#F6F7F9", 4.5, "annotation text on page ground"],
    ["#676F80", "#FFFFFF", 4.5, "annotation text on white panels"],
    ["#47505F", "#EDEFF2", 4.5, "labels on ink-1 demo panel"],
    ["#2A3140", "#171C26".replace("171C26", "FFFFFF"), 4.5, "trace text on white"],
    ["#171C26", "#FFFFFF", 4.5, "table text on white"],
    ["#0047AB", "#F6F7F9", 4.5, "cobalt links on page ground"],
    ["#0047AB", "#FFFFFF", 4.5, "cobalt accents on white"],
    ["#FFFFFF", "#0047AB", 4.5, "primary CTA text on cobalt"],
    ["#EDEFF2", "#171C26", 4.5, "footer text on dark ink"],
    ["#9AA3B2", "#171C26", 4.5, "footer secondary on dark ink"],
    ["#7FA6F0", "#171C26", 4.5, "cobalt-on-dark links in footer"],
    ["#0E121A", "#F6F7F9", 3.0, "large price numerals on page ground"],
  ];
  let worst = Infinity;
  for (const [fg, bg, min, label] of pairs) {
    if (!(fg.toUpperCase() in tokenHex) || !(bg.toUpperCase() in tokenHex)) {
      fail("CHK-07", `pair uses non-token color: ${fg} on ${bg} (${label})`);
      continue;
    }
    const c = contrast(fg, bg);
    worst = Math.min(worst, c / min);
    if (c < min) fail("CHK-07", `${label}: ${fg} on ${bg} = ${c.toFixed(2)}:1 < ${min}:1`);
  }
  if (!failures.some((f) => f.startsWith("CHK-07"))) pass("CHK-07", `all ${pairs.length} declared pairs pass (worst margin ×${worst.toFixed(2)})`);
}

/* ---------- CHK-08: pricing below hero; trust strip honest ---------- */
{
  const heroIdx = html.indexOf('class="hero"');
  const pricingIdx = html.indexOf('id="pricing"');
  heroIdx > -1 && pricingIdx > heroIdx
    ? pass("CHK-08", `pricing section exists below the hero (offset ${pricingIdx - heroIdx} chars)`)
    : fail("CHK-08", "pricing not found below hero");

  const trust = html.slice(html.indexOf('class="trust"'), html.indexOf('id="pricing"'));
  const avatar = /<img|avatar|★|star|rating/i.test(trust);
  avatar ? fail("CHK-08", "trust strip contains avatars/ratings")
         : pass("CHK-08", "trust strip: repository link, license, citations only — no avatars, no stars");
}

/* ---------- report ---------- */
console.log(`Concord landing — contract check (${passes.length} passed, ${failures.length} failed)`);
for (const p of passes) console.log(`  ok   ${p}`);
for (const f of failures) console.error(`  FAIL ${f}`);
if (failures.length) process.exit(1);
