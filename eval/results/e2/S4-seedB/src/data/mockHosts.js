// 主机清单 mock 数据层：种子化 PRNG（mulberry32）确定性生成，数据可复现。
// 真实性约束（任务书）：
//  - 主机名有规范：{机房}-{环境}-{应用}-{用途}-{序号}.ops.example.cn
//  - IP 合法：内网 10.x / 172.16-31.x；公网取真实运营商段，四段均在 0-255 且主机位 1-254
//  - 月费数量级真实：2C4G ≈ ¥180/月；8C32G ≈ ¥1.3k/月；GPU 机型 ¥8k+/月；裸金属 ¥22k+/月
// mock 开关（四态可真实触达）：URL ?mock=slow|error|empty，默认 ok（500ms 模拟延迟）

const ENVS = [
  { key: 'prod', label: '生产', w: 0.45 },
  { key: 'staging', label: '预发', w: 0.15 },
  { key: 'test', label: '测试', w: 0.25 },
  { key: 'dev', label: '开发', w: 0.15 }
];

const DCS = [
  { code: 'sh1', region: '华东1（杭州）', zones: ['A', 'B', 'C'] },
  { code: 'bj1', region: '华北2（北京）', zones: ['A', 'B'] },
  { code: 'sz1', region: '华南1（深圳）', zones: ['A', 'B'] },
  { code: 'cd1', region: '西南1（成都）', zones: 'ABC'.split('') }
];

const APPS = [
  ['order', '订单中心'], ['trade', '交易核心'], ['user', '用户中心'], ['pay', '支付网关'],
  ['search', '检索服务'], ['msg', '消息推送'], ['risk', '风控引擎'], ['etl', '数据加工'],
  ['log', '日志采集'], ['cfg', '配置中心']
];
const ROLES = [
  ['web', 'Web 前端'], ['api', 'API 服务'], ['db', '数据库'], ['cache', '缓存'], ['worker', '计算节点'], ['gw', '网关']
];

const OS_KERNELS = [
  ['Ubuntu 22.04 LTS', '5.15.0-91-generic'],
  ['Ubuntu 20.04 LTS', '5.4.0-169-generic'],
  ['CentOS 7.9', '3.10.0-1160.el7.x86_64'],
  ['Rocky Linux 9.3', '5.14.0-362.el9.x86_64'],
  ['Anolis OS 8.8', '5.10.0-136.14.1.an8.x86_64'],
  ['Debian 12', '6.1.0-18-amd64'],
  ['Windows Server 2022', '10.0.20348']
];

const OWNERS = [
  ['张伟', 'zhangwei'], ['李娜', 'lina'], ['王强', 'wangqiang'], ['刘洋', 'liuyang'],
  ['陈静', 'chenjing'], ['赵磊', 'zhaolei'], ['孙倩', 'sunqian'], ['周杰', 'zhoujie']
];
const DEPTS = ['基础架构部', '交易平台部', '数据平台部', '风控技术部', '中间件组'];
const BIZ_LINES = ['交易', '增长', '基础平台', '数据', '风控', '渠道'];
const TEAMS = ['SRE 一组', 'SRE 二组', 'DBA 组', '中间件组', '数据运维组'];
const SEC_LEVELS = ['L1 公开', 'L2 内部', 'L3 机密'];
const MONITOR_LEVELS = ['P0 核心', 'P1 重要', 'P2 常规'];
const BACKUPS = ['每日全量', '每日增量', '每周全量', '不备份'];
const GPU_MODELS = [
  ['NVIDIA T4', 2600], ['NVIDIA A10', 6800], ['NVIDIA V100', 12000], ['NVIDIA A100 ×2', 32000], ['NVIDIA A100 ×8', 118000]
];
const GPU_RATIO = 0.03; // GPU 机型占比 ~3%，费用数量级才不虚高
const COST_HINTS = ['正常', '空闲可缩容', '建议转包年', '即将到期', '可降配观察'];

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickW(rng, pairs) {
  // pairs: [[value, weight], ...]
  let r = rng();
  for (const [v, w] of pairs) {
    if (r < w) return v;
    r -= w;
  }
  return pairs[pairs.length - 1][0];
}

const pad = (n, w) => String(n).padStart(w, '0');
const hex = (rng, n) => {
  const chars = '0123456789abcdef';
  let s = '';
  for (let i = 0; i < n; i++) s += chars[Math.floor(rng() * 16)];
  return s;
};
const int = (rng, min, max) => min + Math.floor(rng() * (max - min + 1));

function legalInnerIp(rng, dcIdx) {
  // 10.{dcIdx+1}.{0..31}.{1..254}，四段合法、主机位避开 0/255
  return `10.${dcIdx + 1}.${int(rng, 0, 31)}.${int(rng, 1, 254)}`;
}

function legalPublicIp(rng) {
  const prefixes = [[47, 98], [121, 40], [39, 104], [8, 142], [47, 116], [59, 110]];
  const [a, b] = prefixes[Math.floor(rng() * prefixes.length)];
  return `${a}.${b}.${int(rng, 0, 255)}.${int(rng, 1, 254)}`;
}

function dateStr(rng, y0, y1) {
  const y = int(rng, y0, y1);
  const m = int(rng, 1, 12);
  const d = int(rng, 1, 28);
  return `${y}-${pad(m, 2)}-${pad(d, 2)}`;
}

export function generateHosts(total = 10000, seed = 20241115) {
  const rng = mulberry32(seed);
  const rows = new Array(total);
  for (let i = 0; i < total; i++) {
    const env = pickW(rng, ENVS.map((e) => [e, e.w]));
    const dc = DCS[Math.floor(rng() * DCS.length)];
    const dcIdx = DCS.indexOf(dc);
    const zone = dc.zones[Math.floor(rng() * dc.zones.length)];
    const [appKey, appName] = APPS[Math.floor(rng() * APPS.length)];
    const [roleKey, roleName] = ROLES[Math.floor(rng() * ROLES.length)];
    const osPair = OS_KERNELS[Math.floor(rng() * OS_KERNELS.length)];
    const bareMetal = rng() < 0.01;
    const gpu = rng() < GPU_RATIO ? GPU_MODELS[Math.floor(rng() * GPU_MODELS.length)] : ['—', 0];

    // 规格
    const cpu = bareMetal ? pickW(rng, [[64, 0.6], [96, 0.3], [128, 0.1]]) : pickW(rng, [[2, 0.3], [4, 0.32], [8, 0.2], [16, 0.12], [32, 0.06]]);
    const mem = cpu * pickW(rng, [[2, 0.4], [4, 0.5], [8, 0.1]]);
    const disk = pickW(rng, [[40, 0.3], [60, 0.2], [100, 0.25], [200, 0.15], [500, 0.1]]);
    const diskType = bareMetal ? 'NVMe SSD' : pickW(rng, [['ESSD PL1', 0.6], ['SSD 云盘', 0.3], ['高效云盘', 0.1]]);
    const arch = cpu >= 32 && rng() < 0.25 ? 'arm64' : 'x86_64';
    const virtType = bareMetal ? '裸金属' : rng() < 0.04 ? '容器宿主' : 'KVM 云主机';
    const machineType = bareMetal
      ? 'pm.bm.b5-metal'
      : arch === 'arm64'
        ? `ecs.c8y.${cpu === 2 ? 'large' : cpu === 4 ? 'xlarge' : cpu === 8 ? '2xlarge' : cpu === 16 ? '4xlarge' : '8xlarge'}`
        : `ecs.${roleKey === 'db' || roleKey === 'cache' ? 'r7' : 'c7'}.${cpu === 2 ? 'large' : cpu === 4 ? 'xlarge' : cpu === 8 ? '2xlarge' : cpu === 16 ? '4xlarge' : '8xlarge'}`;

    // 网络
    const hasPublic = rng() < 0.35;
    const bandwidth = hasPublic ? pickW(rng, [[1, 0.2], [5, 0.3], [10, 0.25], [100, 0.2], [200, 0.05]]) : 0;

    // 费用（数量级标定见文件头注释）
    const billing = pickW(rng, [['包年包月', 0.7], ['按量付费', 0.3]]);
    const baseCost = Math.round(cpu * 42 + mem * 10 + disk * 0.4 + bandwidth * 8);
    const gpuCost = gpu[1] || 0;
    const bareCost = bareMetal ? 22000 : 0;
    const discountRate = billing === '包年包月' ? pickW(rng, [[0.85, 0.4], [0.9, 0.3], [1, 0.3]]) : 1;
    const monthlyCost = Math.round((baseCost + gpuCost + bareCost) * discountRate);

    // 运行状态
    const status = pickW(rng, [['运行中', 0.88], ['维护中', 0.04], ['已停机', 0.05], ['未知', 0.03]]);
    const cpuUsg = int(rng, 2, 97);
    const memUsg = int(rng, 5, 96);
    const diskUsg = int(rng, 8, 95);

    const expireAt = billing === '包年包月' ? dateStr(rng, 2026, 2028) : '—';
    const [ownerName, ownerAcc] = OWNERS[Math.floor(rng() * OWNERS.length)];
    const dept = DEPTS[Math.floor(rng() * DEPTS.length)];
    const hostNo = pad(i, 5);
    const cloud = !bareMetal;

    let costHint = '正常';
    if (cpuUsg < 12 && memUsg < 30 && env.key === 'test') costHint = '空闲可缩容';
    else if (billing === '按量付费' && int(rng, 0, 99) < 30) costHint = '建议转包年';
    else if (expireAt !== '—' && expireAt < '2027-03-01') costHint = '即将到期';

    rows[i] = {
      id: `h-${hostNo}`,
      hostname: `${dc.code}-${env.key}-${appKey}-${roleKey}-${hostNo}.ops.example.cn`,
      innerIp: legalInnerIp(rng, dcIdx),
      publicIp: hasPublic ? legalPublicIp(rng) : '—',
      instanceId: cloud ? `i-${hex(rng, 4)}${hostNo}${hex(rng, 6)}` : `PM-${int(rng, 2019, 2024)}-${hostNo}`,
      status,
      os: osPair[0],
      kernel: osPair[1],
      sn: cloud ? '—' : hex(rng, 4).toUpperCase() + pad(int(rng, 0, 9999), 4) + hex(rng, 2).toUpperCase(),
      enrolledAt: dateStr(rng, 2021, 2024),
      env: env.key,
      region: dc.region,
      zone: `可用区${zone}`,
      dc: dc.code,
      cluster: `${appKey}-${env.key === 'prod' ? 'main' : env.key}`,
      app: appName,
      role: roleName,
      remark: pickW(rng, [['', 0.55], ['高峰期扩容节点', 0.1], ['灰度环境专用', 0.1], ['对接堡垒机审计', 0.1], ['大促保留资源', 0.15]]),
      bizLine: BIZ_LINES[Math.floor(rng() * BIZ_LINES.length)],
      productLine: `${appName}产品线`,
      costCenter: `CC-${int(rng, 100, 999)}`,
      team: TEAMS[Math.floor(rng() * TEAMS.length)],
      secLevel: SEC_LEVELS[Math.floor(rng() * SEC_LEVELS.length)],
      monitorLevel: MONITOR_LEVELS[Math.floor(rng() * MONITOR_LEVELS.length)],
      backupPolicy: roleKey === 'db' ? pickW(rng, [['每日全量', 0.7], ['每日增量', 0.3]]) : BACKUPS[Math.floor(rng() * BACKUPS.length)],
      releaseBatch: `${dateStr(rng, 2026, 2026).slice(0, 7).replace('-', '')}-R${int(rng, 1, 9)}`,
      cpu,
      mem,
      disk,
      diskType,
      gpu: gpu[0],
      machineType,
      arch,
      virtType,
      bandwidth: bandwidth || 0,
      vpc: `vpc-${hex(rng, 8)}`,
      subnet: `vsw-${hex(rng, 8)}`,
      sg: `SG-${roleKey}-${env.key}`,
      domain: `${appKey}.${env.key === 'prod' ? 'example' : env.key + '.example'}.cn`,
      lb: hasPublic && rng() < 0.5 ? `lb-${dc.code}-${appKey}` : '—',
      firewall: pickW(rng, [['开启', 0.85], ['关闭', 0.15]]),
      ports: int(rng, 1, 12),
      monthlyCost,
      billing,
      expireAt,
      discount: discountRate < 1 ? `${Math.round(discountRate * 100) / 10} 折` : '—',
      billOwner: dept,
      costHint,
      owner: ownerName,
      email: `${ownerAcc}@example.com`,
      dept,
      oncall: pickW(rng, [['值班一组', 0.4], ['值班二组', 0.4], ['平台值班', 0.2]]),
      ticket: `OPS-${['平台', '交易', '数据', '风控'][Math.floor(rng() * 4)]}组`,
      cpuUsg,
      memUsg,
      diskUsg,
      lastAlert: pickW(rng, [
        ['无', 0.72], [`CPU>90% 持续5m（${dateStr(rng, 2026, 2026)}）`, 0.1],
        [`内存>85%（${dateStr(rng, 2026, 2026)}）`, 0.07], [`磁盘>90%（${dateStr(rng, 2026, 2026)}）`, 0.06],
        ['探活超时 ×2（今日）', 0.05]
      ]),
      uptime: status === '运行中' ? int(rng, 3, 1400) : 0,
      lastInspect: dateStr(rng, 2026, 2026),
      probe: status === '运行中' ? (rng() < 0.98 ? '正常' : '异常') : status === '未知' ? '未知' : '异常'
    };
  }
  return rows;
}

// ---- 异步 mock 层（loading / success / error 状态机数据源） ----

export function getMockModeFromLocation() {
  try {
    const m = new URLSearchParams(window.location.search).get('mock');
    return ['ok', 'slow', 'error', 'empty'].includes(m) ? m : 'ok';
  } catch {
    return 'ok';
  }
}

export function fetchHosts(mode = 'ok') {
  const delay = mode === 'slow' ? 2600 : 520;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === 'error') {
        const err = new Error('资产清单服务请求超时');
        err.code = 'OPS-504';
        reject(err);
        return;
      }
      if (mode === 'empty') {
        resolve([]);
        return;
      }
      resolve(generateHosts(10000));
    }, delay);
  });
}
