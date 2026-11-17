// Vismith - color parsing + WCAG 2.x contrast math (M4 / CHK-01). Zero dependencies.
function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }

export function parseColor(input) {
  if (typeof input !== 'string') return null;
  let s = input.trim().toLowerCase();
  const rgbMatch = /^rgba?\(([\d.]+%?),\s*([\d.]+%?),\s*([\d.]+%?)(?:,\s*[\d.]+)?\)$/.exec(s);
  if (rgbMatch) {
    const part = (t) => t.endsWith('%') ? clamp(parseFloat(t) / 100 * 255, 0, 255) : clamp(parseFloat(t), 0, 255);
    return { r: part(rgbMatch[1]), g: part(rgbMatch[2]), b: part(rgbMatch[3]) };
  }
  const hslMatch = /^hsla?\([\d.]+(?:deg|turn)?,\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*[\d.]+)?\)$/.exec(s);
  if (hslMatch) {
    const hm = /^hsla?\(\s*(-?[\d.]+)/.exec(s);
    if (!hm) return null;
    let v = parseFloat(hm[1]);
    if (/turn\s*[,)]/.test(s)) v *= 360;
    v = (v % 360 + 360) % 360;
      return hslToRgb(v, clamp(parseFloat(hslMatch[1]), 0, 100) / 100, clamp(parseFloat(hslMatch[2]), 0, 100) / 100);  }
  if (s[0] === '#') {
    s = s.slice(1);
    if (s.length === 3 || s.length === 4) s = s.split('').map((c) => c + c).join('');
    if (s.length !== 6 && s.length !== 8) return null;
    if (!/^[0-9a-f]+$/.test(s)) return null;
    return { r: parseInt(s.slice(0, 2), 16), g: parseInt(s.slice(2, 4), 16), b: parseInt(s.slice(4, 6), 16) };
  }
  return null;
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0, g = 0, b = 0;
  if (hp < 1) { r = c; g = x; }
  else if (hp < 2) { r = x; g = c; }
  else if (hp < 3) { g = c; b = x; }
  else if (hp < 4) { g = x; b = c; }
  else if (hp < 5) { r = x; b = c; }
  else { r = c; b = x; }
  const m = l - c / 2;
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

function channel(v) {
  const c = clamp(v, 0, 255) / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(rgb) {
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

export function contrastRatio(a, b) {
  const la = relativeLuminance(a), lb = relativeLuminance(b);
  const hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

export function fmtRatio(n) { return n.toFixed(2) + ':1'; }

