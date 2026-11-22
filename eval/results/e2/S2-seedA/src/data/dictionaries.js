// 固定字典 mock（数量级对齐一家约 300 人的公司）+ 异步加载/提交层。
// 演示开关（URL query ?mock=）：
//   slow        字典加载 4 秒（观察骨架态）
//   error       字典加载失败（观察错误态与重试）
//   empty       字典为空（观察真空空态）
//   submit-fail 提交失败（观察失败反馈与数据保留）
// 不加参数 = 正常流程。
// 待接后端 endpoint 见 README.md（hm-fake-send-ban：成功反馈只来自真实返回）。

const DICT = {
  departments: [
    {
      id: 'rd',
      name: '研发中心',
      code: 'RD',
      headcount: 142,
      positions: [
        { id: 'rd-fe', name: '前端工程师', level: 'P5–P7' },
        { id: 'rd-be', name: '后端工程师', level: 'P5–P7' },
        { id: 'rd-qa', name: '测试工程师', level: 'P4–P6' },
        { id: 'rd-sre', name: 'SRE 工程师', level: 'P5–P7' },
      ],
    },
    {
      id: 'hr',
      name: '人力资源部',
      code: 'HR',
      headcount: 18,
      positions: [
        { id: 'hr-bp', name: 'HRBP', level: 'P5–P6' },
        { id: 'hr-cb', name: '薪酬绩效专员', level: 'P4–P5' },
        { id: 'hr-rec', name: '招聘专员', level: 'P4–P5' },
      ],
    },
    {
      id: 'fin',
      name: '财务部',
      code: 'FIN',
      headcount: 23,
      positions: [
        { id: 'fin-gl', name: '总账会计', level: 'P4–P6' },
        { id: 'fin-fa', name: '财务分析师', level: 'P5–P7' },
        { id: 'fin-cash', name: '出纳', level: 'P3–P4' },
      ],
    },
    {
      id: 'mkt',
      name: '市场部',
      code: 'MKT',
      headcount: 27,
      positions: [
        { id: 'mkt-content', name: '内容运营', level: 'P4–P6' },
        { id: 'mkt-brand', name: '品牌专员', level: 'P4–P5' },
        { id: 'mkt-growth', name: '增长运营', level: 'P5–P7' },
      ],
    },
    {
      id: 'sales',
      name: '销售部',
      code: 'SALES',
      headcount: 86,
      positions: [
        { id: 'sales-ka', name: '大客户经理', level: 'P5–P8' },
        { id: 'sales-ch', name: '渠道经理', level: 'P4–P6' },
        { id: 'sales-ops', name: '销售运营', level: 'P4–P6' },
      ],
    },
    {
      id: 'ga',
      name: '行政部',
      code: 'GA',
      headcount: 12,
      positions: [
        { id: 'ga-admin', name: '行政专员', level: 'P3–P5' },
        { id: 'ga-front', name: '前台', level: 'P2–P3' },
        { id: 'ga-buy', name: '采购专员', level: 'P4–P5' },
      ],
    },
  ],
  // 直属上级候选（按部门；title 为兼任职务）
  managers: [
    { id: 'm-001', name: '李承泽', title: '前端组负责人', deptId: 'rd' },
    { id: 'm-002', name: '赵倩雯', title: '后端组负责人', deptId: 'rd' },
    { id: 'm-003', name: '孙皓', title: '测试与稳定性负责人', deptId: 'rd' },
    { id: 'm-004', name: '周雅琴', title: 'HRBP 经理', deptId: 'hr' },
    { id: 'm-005', name: '吴建国', title: '财务共享中心负责人', deptId: 'fin' },
    { id: 'm-006', name: '郑晓芸', title: '市场负责人', deptId: 'mkt' },
    { id: 'm-007', name: '冯立群', title: '华东销售总监', deptId: 'sales' },
    { id: 'm-008', name: '韩雪梅', title: '行政经理', deptId: 'ga' },
  ],
  // 新员工系统开通项（按分组；default 为公司默认策略）
  permissionGroups: [
    {
      group: '基础办公',
      items: [
        { id: 'p-mail', name: '企业邮箱', desc: '开通 @xinghang.com 邮箱', default: true },
        { id: 'p-im', name: '即时通讯（飞书）', desc: '加入组织并自动进入部门群', default: true },
        { id: 'p-vpn', name: '内网 VPN', desc: '按需开通，默认关闭', default: false },
      ],
    },
    {
      group: '研发工具',
      items: [
        { id: 'p-git', name: '代码仓库', desc: '按岗位默认只读权限', default: false },
        { id: 'p-ci', name: 'CI/CD 流水线', desc: '需部门负责人二次审批', default: false },
      ],
    },
    {
      group: '业务系统',
      items: [
        { id: 'p-attend', name: '考勤系统', desc: '默认开通', default: true },
        { id: 'p-expense', name: '报销系统', desc: '入职满 30 天自动开通', default: true },
      ],
    },
  ],
  salaryGrades: ['P3', 'P4', 'P5', 'P6', 'P7', 'M1', 'M2'],
  budgetCenters: [
    { id: 'bc-rd', name: '研发-平台预算' },
    { id: 'bc-rd-inno', name: '研发-创新预算' },
    { id: 'bc-mkt', name: '市场费用' },
    { id: 'bc-sales', name: '销售费用' },
    { id: 'bc-ga', name: '行政共用' },
  ],
  // 审批人候选（部门/财务/信息安全条线）
  approvers: [
    { id: 'a-001', name: '李承泽', title: '研发中心负责人' },
    { id: 'a-002', name: '王淑华', title: '财务共享中心总监' },
    { id: 'a-003', name: '周雅琴', title: 'HRBP 经理' },
    { id: 'a-004', name: '潘志刚', title: '信息安全负责人' },
  ],
};

const EMPTY_DICT = {
  departments: [],
  managers: [],
  permissionGroups: [],
  salaryGrades: [],
  budgetCenters: [],
  approvers: [],
};

export function mockMode() {
  if (typeof window === 'undefined') return '';
  return new URLSearchParams(window.location.search).get('mock') || '';
}

/** 字典加载：带固定延迟，可被 ?mock=error / empty / slow 分流 */
export function loadDictionaries() {
  const mode = mockMode();
  const delay = mode === 'slow' ? 4000 : 400 + Math.random() * 300;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === 'error') {
        reject(new Error('字典服务暂时不可用（HTTP 503，模拟）'));
        return;
      }
      if (mode === 'empty') {
        resolve(EMPTY_DICT);
        return;
      }
      resolve(structuredClone(DICT));
    }, delay);
  });
}

/** 提交入职单：900ms 延迟，?mock=submit-fail 时失败 */
export function submitOnboarding(payload) {
  const mode = mockMode();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === 'submit-fail') {
        reject(new Error('网络异常，请求未送达服务器（模拟）'));
        return;
      }
      const seq = String(Math.floor(1000 + Math.random() * 9000));
      resolve({
        ticketNo: `OB-2026-${seq}`,
        submittedAt: new Date().toISOString(),
        echo: { departmentId: payload.departmentId, positionId: payload.positionId },
      });
    }, 900);
  });
}
