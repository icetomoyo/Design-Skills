// 向导状态机：数据/校验状态全部提升到本层（INV-002：切步/切视角不丢数据）。
// 校验协议（INV-003）：失焦单字段校验；下一步校验整步；提交校验当前角色全部可见步骤，
// 失败时产出错误汇总（含步骤归属），由复核步渲染并支持逐条跳转定位。
import { useCallback, useMemo, useRef, useState } from 'react';
import { submitOnboarding } from '../data/mockService.js';
import { ROLES } from '../data/dict.js';
import {
  FIELD_DEFS,
  createInitialData,
  fieldNamesForStep,
  stepsForRole,
  validateField,
  visibleFieldNames,
} from '../lib/validate.js';

function omitKey(obj, key) {
  const next = { ...obj };
  delete next[key];
  return next;
}

function pickKeys(obj, allowed) {
  const next = {};
  for (const k of Object.keys(obj)) if (allowed.has(k)) next[k] = obj[k];
  return next;
}

export function focusFieldById(name) {
  const el = document.getElementById(`f-${name}`);
  if (el) el.focus();
}

export function useOnboardingWizard() {
  const [role, setRoleState] = useState('hr');
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState(createInitialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [phase, setPhase] = useState('idle'); // idle | submitting | success | error
  const [result, setResult] = useState(null);
  const [failure, setFailure] = useState(null); // { message, code }
  const [summaryItems, setSummaryItems] = useState(null); // [{name,label,stepTitle,message}]
  const [announcement, setAnnouncement] = useState('新员工入职向导已就绪，当前第 1 步：基本信息');

  const dataRef = useRef(data);
  const roleRef = useRef(role);
  const phaseRef = useRef(phase);
  const stepIndexRef = useRef(stepIndex);

  const steps = useMemo(() => stepsForRole(role), [role]);
  const safeIndex = Math.min(stepIndex, steps.length - 1);
  const step = steps[safeIndex];

  const setPhaseSafe = useCallback((p) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const announce = useCallback((text) => setAnnouncement(text), []);

  // —— 字段值变更：已失焦/已出错的字段即时复验（修正即消错） ——
  const setValue = useCallback((name, value) => {
    const nextData = { ...dataRef.current, [name]: value };
    dataRef.current = nextData;
    setData(nextData);
    setErrors((errs) => {
      const shouldRecheck = touched[name] || errs[name];
      if (!shouldRecheck) return errs;
      const msg = validateField(name, value, nextData, roleRef.current);
      return msg ? { ...errs, [name]: msg } : omitKey(errs, name);
    });
  }, [touched]);

  // —— 失焦校验：错误信息贴字段（由 Field 组件渲染在正下方） ——
  const handleBlur = useCallback((name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    const msg = validateField(name, dataRef.current[name], dataRef.current, roleRef.current);
    setErrors((errs) => (msg ? { ...errs, [name]: msg } : omitKey(errs, name)));
  }, []);

  const validateStep = useCallback((stepId) => {
    const names = fieldNamesForStep(stepId, roleRef.current);
    let first = null;
    const found = {};
    for (const n of names) {
      const msg = validateField(n, dataRef.current[n], dataRef.current, roleRef.current);
      if (msg) {
        found[n] = msg;
        if (!first) first = n;
      }
    }
    setErrors((errs) => ({ ...errs, ...found }));
    setTouched((t) => {
      const next = { ...t };
      for (const n of names) next[n] = true;
      return next;
    });
    return { ok: !first, first };
  }, []);

  // —— 下一步：整步校验，首错聚焦 ——
  const goNext = useCallback(() => {
    if (phaseRef.current === 'submitting') return;
    const currentSteps = stepsForRole(roleRef.current);
    const idx = Math.min(stepIndexRef.current, currentSteps.length - 1);
    const { ok, first } = validateStep(currentSteps[idx].id);
    if (!ok) {
      focusFieldById(first);
      announce('当前步骤有未通过校验的字段，已定位到第一个错误');
      return;
    }
    const next = Math.min(idx + 1, currentSteps.length - 1);
    if (next === idx) return;
    stepIndexRef.current = next;
    setStepIndex(next);
    announce(`已进入第 ${next + 1} 步：${currentSteps[next].title}`);
  }, [announce, validateStep]);

  const goToStep = useCallback(
    (target) => {
      const currentSteps = stepsForRole(roleRef.current);
      const idx = Math.min(stepIndexRef.current, currentSteps.length - 1);
      if (target >= idx || target < 0) return; // 仅允许回到已完成步骤
      stepIndexRef.current = target;
      setStepIndex(target);
      announce(`已返回第 ${target + 1} 步：${currentSteps[target].title}，之前填写的内容已保留`);
    },
    [announce]
  );

  const goBack = useCallback(() => {
    const currentSteps = stepsForRole(roleRef.current);
    goToStep(Math.min(stepIndexRef.current, currentSteps.length - 1) - 1);
  }, [goToStep]);

  // —— 错误汇总条目跳转：必要时先切回字段所在步骤，再聚焦 ——
  const jumpToField = useCallback(
    (name) => {
      const stepId = FIELD_DEFS[name] && FIELD_DEFS[name].step;
      const currentSteps = stepsForRole(roleRef.current);
      const idx = currentSteps.findIndex((s) => s.id === stepId);
      const cur = Math.min(stepIndexRef.current, currentSteps.length - 1);
      if (idx !== -1 && idx !== cur) {
        stepIndexRef.current = idx;
        setStepIndex(idx);
        announce(`已返回第 ${idx + 1} 步并定位到「${FIELD_DEFS[name].label}」`);
        requestAnimationFrame(() => focusFieldById(name));
        setTimeout(() => focusFieldById(name), 150);
      } else {
        focusFieldById(name);
      }
    },
    [announce]
  );

  // —— 视角切换（演示角色模拟）：保留数据，收敛步骤与残留错误 ——
  const switchRole = useCallback(
    (nextRole) => {
      if (nextRole === roleRef.current) return;
      const nextSteps = stepsForRole(nextRole);
      const curSteps = stepsForRole(roleRef.current);
      const cur = Math.min(stepIndexRef.current, curSteps.length - 1);
      let next = nextSteps.findIndex((s) => s.id === curSteps[cur].id);
      if (next === -1) next = Math.min(cur, nextSteps.length - 1);
      roleRef.current = nextRole;
      setRoleState(nextRole);
      stepIndexRef.current = next;
      setStepIndex(next);
      setSummaryItems(null);
      const visible = new Set(visibleFieldNames(nextRole));
      setErrors((errs) => pickKeys(errs, visible));
      setTouched((t) => pickKeys(t, visible));
      const roleLabel = ROLES[nextRole].label;
      announce(`已切换为${roleLabel}视角，共 ${nextSteps.length} 步，当前第 ${next + 1} 步：${nextSteps[next].title}`);
    },
    [announce]
  );

  // —— 提交：全量校验 -> 汇总阻断；通过后走 mock 异步服务 ——
  const submit = useCallback(async () => {
    if (phaseRef.current === 'submitting') return;
    const currentRole = roleRef.current;
    const items = [];
    const merged = {};
    for (const stepDef of stepsForRole(currentRole)) {
      for (const n of fieldNamesForStep(stepDef.id, currentRole)) {
        const msg = validateField(n, dataRef.current[n], dataRef.current, currentRole);
        if (msg) {
          merged[n] = msg;
          items.push({ name: n, label: FIELD_DEFS[n].label, stepTitle: stepDef.title, message: msg });
        }
      }
    }
    if (items.length) {
      setErrors((errs) => ({ ...errs, ...merged }));
      setTouched((t) => {
        const next = { ...t };
        for (const it of items) next[it.name] = true;
        return next;
      });
      setSummaryItems(items);
      setPhaseSafe('idle');
      announce(`提交被阻断：${items.length} 项信息需要修改，已生成错误汇总`);
      return { blocked: true, first: items[0].name };
    }

    setSummaryItems(null);
    setPhaseSafe('submitting');
    announce('正在提交入职申请，请稍候');
    try {
      const res = await submitOnboarding({ role: currentRole, form: dataRef.current });
      setResult(res);
      setFailure(null);
      setPhaseSafe('success');
      announce(`提交成功，申请编号 ${res.ticketNo}，入职流程已启动`);
      return { blocked: false };
    } catch (e) {
      setFailure({ message: (e && e.message) || '提交失败，请稍后重试', code: (e && e.code) || 'UNKNOWN' });
      setPhaseSafe('error');
      announce('提交失败，已填信息已全部保留，可重试或返回修改');
      return { blocked: false };
    }
  }, [announce, setPhaseSafe]);

  const backToEdit = useCallback(() => {
    setFailure(null);
    setPhaseSafe('idle');
    goToStep(0);
  }, [goToStep, setPhaseSafe]);

  // —— 再录入一位：显式清空（用户意图明确，不违反数据保留约束） ——
  const resetAll = useCallback(() => {
    dataRef.current = createInitialData();
    setData(dataRef.current);
    setErrors({});
    setTouched({});
    setSummaryItems(null);
    setFailure(null);
    setResult(null);
    setPhaseSafe('idle');
    stepIndexRef.current = 0;
    setStepIndex(0);
    announce('已开始新的入职登记');
  }, [setPhaseSafe]);

  const filledCount = useMemo(
    () =>
      visibleFieldNames(role).filter((n) => {
        const v = data[n];
        return typeof v === 'boolean' ? v === true : String(v == null ? '' : v).trim() !== '';
      }).length,
    [data, role]
  );

  return {
    role,
    steps,
    stepIndex: safeIndex,
    step,
    data,
    errors,
    phase,
    result,
    failure,
    summaryItems,
    announcement,
    filledCount,
    setValue,
    handleBlur,
    goNext,
    goBack,
    goToStep,
    jumpToField,
    switchRole,
    submit,
    backToEdit,
    resetAll,
  };
}
