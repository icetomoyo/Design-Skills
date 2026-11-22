// Vismith - shared CLI helpers（Standards 债务清理：SKILL_ROOT 推导与入口样板去重）
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url)); // .../scripts/lib
export const SCRIPTS_DIR = path.dirname(HERE);              // .../scripts
export const SKILL_ROOT = path.dirname(SCRIPTS_DIR);        // skill 根

// 统一入口样板：main 返回退出码；抛错 -> stderr（带工具名）+ exit 2
export function runMain(main, name) {
  main().then((c) => process.exit(c || 0)).catch((e) => {
    console.error((name || 'vismith') + ': ' + ((e && e.message) || e));
    process.exit(2);
  });
}
