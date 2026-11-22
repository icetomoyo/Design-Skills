// 本地 mock 异步服务：模拟「入职单创建」请求。
// 诚实性约束（hm-fake-send-ban）：成功/失败反馈只能来自本服务的真实返回，
// 页面需明示这是演示环境、未连接真实后端。
// 失败开关：URL 带 ?mock=submit-error 时确定性失败（方便验证失败态与数据保留）。

import { PROCESS_TEMPLATE } from './dict.js';

const BASE_LATENCY = 550;
const JITTER = 250;

export class MockApiError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'MockApiError';
    this.code = code;
  }
}

export function shouldForceSubmitError() {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('mock') === 'submit-error';
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildProcess(role) {
  return PROCESS_TEMPLATE.map((node, i) => ({
    id: node.id,
    title: node.title,
    note:
      node.id === 'comp'
        ? role === 'admin'
          ? '薪酬已随单提交，待主审批人确认'
          : '待系统管理员补充薪酬信息并指定审批链'
        : node.desc,
    state: i === 0 ? 'done' : i === 1 ? 'current' : 'todo',
  }));
}

export async function submitOnboarding({ role, form, forceFail }) {
  await delay(BASE_LATENCY + Math.random() * JITTER);

  const forced = forceFail !== undefined ? forceFail : shouldForceSubmitError();
  if (forced) {
    throw new MockApiError('审批服务暂时不可用，入职单未创建', 'MOCK-503');
  }

  const seq = 3000 + Math.floor(Math.random() * 6000);
  return {
    ticketNo: `OB-2026-${seq}`,
    submittedAt: new Date(),
    role,
    applicantCount: Object.keys(form).length,
    process: buildProcess(role),
  };
}
