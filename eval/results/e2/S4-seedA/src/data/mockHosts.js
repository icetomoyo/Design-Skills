// 种子化 mock 数据：主机名有规范、IP 合法（10/172.16-31/192.168 私网段 + 真实公网段）、
// 月费按规格定价（¥267 ~ ¥30,417/月，量级对齐公有云包月价）。
// 确定性：同 seed 生成完全一致，避免每次刷新数据漂移。

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)];
const ri = (rand, min, max) => min + Math.floor(rand() * (max - min + 1));

const TYPES = [
  { type: 'ecs.c7.large', vcpu: 4, mem: 8, disk: 40, gpu: 0, base: 267 },
  { type: 'ecs.c7.xlarge', vcpu: 8, mem: 16, disk: 60, gpu: 0, base: 534 },
  { type: 'ecs.g7.xlarge', vcpu: 8, mem: 32, disk: 80, gpu: 0, base: 731 },
  { type: 'ecs.g7.4xlarge', vcpu: 16, mem: 64, disk: 240, gpu: 0, base: 1462 },
  { type: 'ecs.r7.2xlarge', vcpu: 16, mem: 64, disk: 120, gpu: 0, base: 1731 },
  { type: 'ecs.c8i.4xlarge', vcpu: 32, mem: 64, disk: 200, gpu: 0, base: 2417 },
  { type: 'ecs.gn7i-c16g1.16xlarge', vcpu: 64, mem: 192, disk: 380, gpu: 1, base: 15208 },
  { type: 'ecs.gn7i-c32g2.32xlarge', vcpu: 128, mem: 384, disk: 480, gpu: 2, base: 30417 },
];

const ENVS = [
  { name: 'prod', short: 'prod', weight: 0.55 },
  { name: 'staging', short: 'stg', weight: 0.15 },
  { name: 'test', short: 'test', weight: 0.2 },
  { name: 'dev', short: 'dev', weight: 0.1 },
];
const APPS = ['web', 'api', 'db', 'cache', 'msg', 'worker', 'mon', 'ml', 'gateway', 'jenkins'];
const REGIONS = [
  { name: '华东1（上海）', az: 'cn-shanghai-a', dc: 'SH1-数据中心-3', vpc: 'vpc-sh1-core' },
  { name: '华东1（上海）', az: 'cn-shanghai-b', dc: 'SH1-数据中心-5', vpc: 'vpc-sh1-core' },
  { name: '华北2（北京）', az: 'cn-beijing-a', dc: 'BJ2-数据中心-1', vpc: 'vpc-bj2-core' },
  { name: '华北2（北京）', az: 'cn-beijing-c', dc: 'BJ2-数据中心-2', vpc: 'vpc-bj2-core' },
  { name: '华南1（深圳）', az: 'cn-shenzhen-a', dc: 'SZ1-数据中心-2', vpc: 'vpc-sz1-core' },
  { name: '新加坡', az: 'ap-southeast-1a', dc: 'SG1-DC-1', vpc: 'vpc-sg1-glob' },
];
const OS_LIST = [
  { os: 'Ubuntu 22.04 LTS', kernel: '5.15.0-91-generic' },
  { os: 'Ubuntu 24.04 LTS', kernel: '6.8.0-35-generic' },
  { os: 'AnolisOS 8.8', kernel: '5.10.134-13.an8' },
  { os: 'Rocky Linux 9.3', kernel: '5.14.0-362.el9' },
  { os: 'Debian 12', kernel: '6.1.0-13-amd64' },
  { os: 'openEuler 22.03 LTS', kernel: '5.10.0-153.oe2203' },
];
const OWNERS = ['陈临舟', '林晚青', '周砚白', '沈望舒', '顾星野', '苏未晞', '叶扶疏', '程叙寒', '许听澜', '孟知微', '韩既明', '方叙白'];
const TEAMS = ['平台工程', 'DBA 组', '中间件组', '大数据组', 'AI 平台组', '安全组', '测试组', 'SRE 值守'];
const SUPPLIERS = ['阿里云', '阿里云', '阿里云', '腾讯云', '华为云', 'AWS', '自建 IDC'];
const BIZ = ['交易', '增长', '内容', '支付', '风控', '基础平台', '数据', '国际化'];
const PROJECTS = ['星链核心', '星链交易中台', '北极星指标', '猎户日志', '天琴监控', '织女发布', '祝融风控'];
const SLAS = ['99.9', '99.95', '99.99'];
const BILLING = ['包年包月', '包年包月', '包年包月', '按量付费', '按量付费', '资源包'];
const SEC_LEVELS = ['L1-公开', 'L2-内部', 'L3-机密', 'L4-核心'];
const COMPLIANCE = ['等保三级', 'ISO27001', 'PCI-DSS', '无'];
const BACKUPS = ['每日全量', '每 6 小时增量', '仅快照', '无'];
const PATCHES = ['最新', '落后 1 个', '落后 3 个'];
const LIFECYCLE = ['在役', '在役', '在役', '在役', '待续费', '待下线'];
const TAG_POOL = ['tier:core', 'tier:standard', 'charge:资本支出', 'charge:费用支出', 'arch:x86', 'arch:arm', 'net:内网', 'net:公网'];

const BASE_TS = new Date('2026-11-22T10:00:00+08:00').getTime();
const fmtDT = (ts) => {
  const d = new Date(ts);
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
};
const fmtDate = (ts) => fmtDT(ts).slice(0, 10);

function hexId(rand, len) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(rand() * chars.length)];
  return s;
}
function hexMac(rand) {
  const b = () => ri(rand, 0, 255).toString(16).padStart(2, '0');
  return `00:16:3e:${b()}:${b()}:${b()}`;
}
// 合法私网 IP：10.0.0.0/8、172.16.0.0/12（16-31）、192.168.0.0/16
function privateIp(rand) {
  const r = rand();
  const c = () => ri(rand, 1, 254);
  if (r < 0.6) return `10.${ri(rand, 0, 255)}.${ri(rand, 0, 255)}.${c()}`;
  if (r < 0.9) return `172.${ri(rand, 16, 31)}.${ri(rand, 0, 255)}.${c()}`;
  return `192.168.${ri(rand, 0, 255)}.${c()}`;
}
function publicIp(rand) {
  const head = pick(rand, ['47.', '8.', '39.', '101.', '118.']);
  return `${head}${ri(rand, 96, 250)}.${ri(rand, 0, 255)}.${ri(rand, 1, 254)}`;
}

function pickEnv(rand) {
  const r = rand();
  let acc = 0;
  for (const e of ENVS) {
    acc += e.weight;
    if (r < acc) return e;
  }
  return ENVS[0];
}

function pickStatus(rand) {
  const r = rand();
  if (r < 0.78) return 'running';
  if (r < 0.86) return 'stopped';
  if (r < 0.92) return 'maintaining';
  return 'fault';
}

export function generateHosts(total = 10000, seed = 20261122) {
  const rand = mulberry32(seed);
  const rows = new Array(total);
  for (let i = 0; i < total; i++) {
    const env = pickEnv(rand);
    const app = pick(rand, APPS);
    const spec = rand() < 0.08 ? TYPES[TYPES.length - 1 - ri(rand, 0, 1)] : TYPES[ri(rand, 0, 5)];
    const region = REGIONS[ri(rand, 0, REGIONS.length - 1)];
    const osInfo = pick(rand, OS_LIST);
    const ip = privateIp(rand);
    const supplier = pick(rand, SUPPLIERS);
    const selfHosted = supplier === '自建 IDC';
    const monthly = Math.round(spec.base * (0.92 + rand() * 0.16));
    const purchasedTs = BASE_TS - ri(rand, 60, 1100) * 86400000;
    const owner = pick(rand, OWNERS);
    const team = pick(rand, TEAMS);
    const tags = [`${env.name === 'staging' ? 'env:staging' : `env:${env.name}`}`, `app:${app}`];
    if (rand() < 0.7) tags.push(pick(rand, TAG_POOL));
    if (rand() < 0.3) tags.push(pick(rand, TAG_POOL));
    const gpuHost = spec.gpu > 0;

    rows[i] = {
      id: `host-${i}`,
      seq: i,
      hostname: `${env.short}-${app}-${String(i + 1).padStart(4, '0')}`,
      ip_private: ip,
      status: pickStatus(rand),
      env: { prod: '生产', staging: '预发', test: '测试', dev: '开发' }[env.name],
      region: region.name,
      az: region.az,
      datacenter: region.dc,
      host_id: `i-2ze${hexId(rand, 13)}`,
      dns: `${env.short}-${app}-${String(i + 1).padStart(4, '0')}.ops.internal`,
      cluster: app === 'worker' || app === 'web' ? `${region.vpc.replace('vpc-', '')}-prod-ack0${ri(rand, 1, 3)}` : '—',
      ip_public: rand() < 0.35 ? publicIp(rand) : '—',
      vip: rand() < 0.3 ? `10.${ri(rand, 0, 255)}.${ri(rand, 0, 255)}.250` : '—',
      subnet: ip.startsWith('10.') ? `10.${ip.split('.')[1]}.${ip.split('.')[2]}.0/24` : `${ip.split('.').slice(0, 3).join('.')}.0/24`,
      vpc: region.vpc,
      security_group: `sg-${hexId(rand, 8)} (${env.short}-${app}-sg)`,
      mac: hexMac(rand),
      bandwidth_mbps: gpuHost ? ri(rand, 2000, 10000) : pick(rand, [5, 10, 20, 50, 100, 200, 500]),
      port_open: pick(rand, ['22', '80,443', '8080,9090', '22,443', '3306', '6379']),
      instance_type: spec.type,
      vcpu: spec.vcpu,
      mem_gb: spec.mem,
      disk_gb: spec.disk,
      disk_type: pick(rand, ['ESSD PL1', 'ESSD PL2', 'ESSD Auto', 'SSD']),
      gpu: spec.gpu,
      arch: gpuHost || rand() < 0.5 ? 'x86_64' : 'arm64',
      os: osInfo.os,
      kernel: osInfo.kernel,
      agent_version: pick(rand, ['2.9.1', '2.9.3', '3.0.0', '3.1.4']),
      tags,
      app,
      business_line: pick(rand, BIZ),
      priority: `P${ri(rand, 0, 3)}`,
      project: pick(rand, PROJECTS),
      cpu_pct: gpuHost ? 20 + rand() * 77 : 0.4 + rand() * 92,
      mem_pct: gpuHost ? 30 + rand() * 65 : 5 + rand() * 90,
      disk_pct: 4 + rand() * 93,
      uptime_days: ri(rand, 3, 980),
      last_heartbeat: fmtDT(BASE_TS - ri(rand, 1, 90) * 60000),
      alert_count: rand() < 0.12 ? ri(rand, 1, 6) : 0,
      monthly_cost: monthly,
      last_month_cost: Math.round(monthly * (0.8 + rand() * 0.35)),
      billing_type: pick(rand, BILLING),
      discount_pct: pick(rand, [0, 0, 5, 10, 15, 20, 30]),
      cost_center: `CC-${100 + ri(rand, 0, 8)}${ri(rand, 0, 9)}-${ri(rand, 1000, 9999)}`,
      owner,
      team,
      oncall: `138****${ri(rand, 1000, 9999)}`,
      supplier,
      purchased_at: fmtDate(purchasedTs),
      expire_at: selfHosted ? '—' : fmtDate(purchasedTs + ri(rand, 365, 1095) * 86400000),
      sla: pick(rand, SLAS),
      lifecycle: pick(rand, LIFECYCLE),
      remark: rand() < 0.35 ? pick(rand, ['高优保障：大促容量预留', '双活部署：与 BJ2 互备', '专线接入：走 SH1-BJ2 通道', '灰度专用：发布前 24h 锁定', '待迁移：下一财年迁往 arm 池']) : '',
      security_level: gpuHost ? 'L4-核心' : pick(rand, SEC_LEVELS),
      compliance: pick(rand, COMPLIANCE),
      backup_policy: pick(rand, BACKUPS),
      patch_level: pick(rand, PATCHES),
      last_inspection: fmtDate(BASE_TS - ri(rand, 1, 45) * 86400000),
      risk_items: rand() < 0.18 ? ri(rand, 1, 7) : 0,
      firewall: rand() < 0.7 ? '已启用' : '未启用',
      audit_status: rand() < 0.85 ? '已接入' : '待接入',
    };
  }
  return rows;
}

// mock 层开关（generate.md §4：四态真实可触达）
// ?mock=ok（默认）| error | empty；?rows=1000 可缩数据量。
export function fetchHosts({ mode = 'ok', rows = 10000, delayMs = 420 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mode === 'error') {
        const err = new Error('主机资产服务暂时不可用（模拟故障注入）');
        err.code = 'HOSTS_SVC_503';
        reject(err);
        return;
      }
      resolve(mode === 'empty' ? [] : generateHosts(rows));
    }, delayMs);
  });
}
