// Vismith - Tailwind 主题文本解析（纯文本启发式，绝不 eval 用户代码）
// v0.3 抽取为共享库：contract.mjs（extract）与 checks.mjs（CHK-01 交叉验证）共用

export function extractTailwindTheme(text) {
  const out = { colors: {}, fontFamily: {}, fontSize: {}, borderRadius: {}, spacing: {} };
  const sections = { colors: out.colors, fontFamily: out.fontFamily, fontSize: out.fontSize, borderRadius: out.borderRadius, spacing: out.spacing };
  for (const key of Object.keys(sections)) {
    const idx = text.indexOf(key + ':');
    if (idx === -1) continue;
    let depth = 0, started = false, end = idx;
    for (let i = idx; i < text.length && i < idx + 20000; i++) {
      const c = text[i];
      if (c === '{') { depth++; started = true; }
      else if (c === '}') { depth--; if (started && depth === 0) { end = i; break; } }
    }
    const block = text.slice(idx, end + 1); // 含闭合 }，否则块尾属性失去 [,}] 终止符被丢弃（v0.1 off-by-one）
    const propRe = /([A-Za-z0-9_.\-]+)\s*:\s*('([^']*)'|"([^"]*)"|\[[^\]]{0,200}\])\s*[,}]/g;
    let m;
    while ((m = propRe.exec(block)) !== null) {
      const name = m[1].replace(/^['"]|['"]$/g, '');
      const val = (m[3] !== undefined ? m[3] : (m[4] !== undefined ? m[4] : m[2]));
      if (name === key) continue;
      if (sections[key] && !sections[key][name]) sections[key][name] = val.length > 80 ? val.slice(0, 80) : val;
    }
  }
  return out;
}

// 嵌套感知的色档展平：ink: { 400: '#94A3B8' } -> 'ink-400'
// 供 CHK-01 类名×surface 交叉验证（E2 仲裁坐实的 neutrals 覆盖盲区）
export function flattenColorShades(text) {
  const out = {};
  const idx = text.indexOf('colors:');
  if (idx === -1) return out;
  let depth = 0, end = idx;
  for (let i = idx; i < text.length && i < idx + 30000; i++) {
    const c = text[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  const block = text.slice(idx, end + 1);
  const tok = /([A-Za-z0-9_.\-]+)\s*:\s*(\{)|([A-Za-z0-9_.\-]+)\s*:\s*('([^']*)'|"([^"]*)")\s*[,}]|\}/g;
  const stack = [];
  let m;
  while ((m = tok.exec(block)) !== null) {
    if (m[2] === '{' && m[1] !== undefined) {
      if (m[1] !== 'colors') stack.push(m[1]); // colors 根键不入路径
    } else if (m[3] !== undefined) {
      const val = m[5] !== undefined ? m[5] : m[4];
      const key = stack.length ? stack.join('-') + '-' + m[3] : m[3];
      if (!(key in out)) out[key] = val;
    } else if (stack.length) stack.pop();
  }
  return out;
}
