import { useState } from 'react';
import AppShell from './components/AppShell.jsx';
import OnboardingWizard from './components/OnboardingWizard.jsx';
import { useDictionaries } from './hooks/useDictionaries.js';

/**
 * 新员工入职向导（S2 · admin-console · generate）
 * 当前用户默认为 HR 专员；顶栏“演示视角切换”可在 HR/管理员之间切换以核对权限差异（INV-003）。
 */
export default function App() {
  const [role, setRole] = useState('hr');
  const dictState = useDictionaries();
  return (
    <AppShell role={role} onRoleChange={setRole}>
      <OnboardingWizard role={role} dictState={dictState} />
    </AppShell>
  );
}
