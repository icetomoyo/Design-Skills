// tmp-contrast.mjs — WCAG contrast verification for candidate tokens (deleted-safe helper)
function lum(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const f = (v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function cr(a, b) {
  const x = lum(a), y = lum(b);
  return ((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2);
}
const pairs = [
  // neutrals text ramp on surface
  ['#1C2B3A', '#FFFFFF', 'ink-900 on surface'],
  ['#33475C', '#FFFFFF', 'ink-700 on surface'],
  ['#4A5D72', '#FFFFFF', 'ink-600 on surface'],
  ['#52657A', '#FFFFFF', 'ink-500 on surface'],
  ['#5B6E84', '#FFFFFF', 'ink-450 on surface (candidate, expect fail)'],
  // on subtle tinted surface
  ['#1C2B3A', '#F4F6F9', 'ink-900 on subtle'],
  ['#33475C', '#F4F6F9', 'ink-700 on subtle'],
  ['#4A5D72', '#F4F6F9', 'ink-600 on subtle'],
  ['#52657A', '#F4F6F9', 'ink-500 on subtle'],
  // accent cobalt candidates
  ['#FFFFFF', '#0047AB', 'text_on_primary #0047AB'],
  ['#FFFFFF', '#0B4FD9', 'text_on_primary #0B4FD9'],
  ['#FFFFFF', '#1447C8', 'text_on_primary #1447C8'],
  ['#FFFFFF', '#1D4ED8', 'text_on_primary #1D4ED8'],
  ['#0047AB', '#FFFFFF', 'accent link #0047AB on white'],
  ['#1447C8', '#FFFFFF', 'accent link #1447C8 on white'],
  ['#1D4ED8', '#FFFFFF', 'accent link #1D4ED8 on white'],
  // status
  ['#1A7F37', '#FFFFFF', 'success on white'],
  ['#B42318', '#FFFFFF', 'danger on white'],
];
for (const [fg, bg, label] of pairs) {
  const r = parseFloat(cr(fg, bg));
  console.log((r >= 4.5 ? 'PASS' : 'FAIL') + '  ' + cr(fg, bg) + ':1  ' + label);
}
