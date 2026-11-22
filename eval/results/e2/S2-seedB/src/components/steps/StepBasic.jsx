// 第 1 步：基本信息
import { SelectField, TextField } from '../fields.jsx';
import { EMPLOYMENT_TYPES } from '../../data/dict.js';
import { todayStr } from '../../lib/validate.js';

export default function StepBasic({ data, errors, onChange, onBlur }) {
  const set = (name) => (e) => onChange(name, e.target.value);
  const blur = (name) => () => onBlur(name);

  return (
    <div className="flex flex-col gap-3">
      <TextField
        id="fullName"
        label="姓名"
        error={errors.fullName}
        hint="须与身份证一致，用于劳动合同与社保开户"
        placeholder="如：陈景明"
        value={data.fullName}
        onChange={set('fullName')}
        onBlur={blur('fullName')}
      />
      <TextField
        id="phone"
        label="手机号"
        type="tel"
        error={errors.phone}
        hint="用于入职通知与紧急联系人登记"
        placeholder="如：13801397000"
        value={data.phone}
        onChange={set('phone')}
        onBlur={blur('phone')}
      />
      <TextField
        id="email"
        label="个人邮箱"
        type="email"
        error={errors.email}
        hint="offer 与电子合同将发送到此邮箱"
        placeholder="如：chenjingming@example.com"
        value={data.email}
        onChange={set('email')}
        onBlur={blur('email')}
      />
      <TextField
        id="idCard"
        label="身份证号"
        inputMode="numeric"
        error={errors.idCard}
        hint="18 位，末位可为 X；示例（演示数据）：11010519491231002X"
        placeholder="请输入 18 位身份证号"
        value={data.idCard}
        onChange={set('idCard')}
        onBlur={blur('idCard')}
      />
      <TextField
        id="hireDate"
        label="入职日期"
        type="date"
        min={todayStr()}
        error={errors.hireDate}
        hint="入职当天现场办理工牌、合同签署与设备领取"
        value={data.hireDate}
        onChange={set('hireDate')}
        onBlur={blur('hireDate')}
      />
      <SelectField
        id="employmentType"
        label="用工性质"
        error={errors.employmentType}
        options={EMPLOYMENT_TYPES.map((t) => ({ value: t, label: t }))}
        hint="影响试用期上限与社保公积金缴纳口径"
        value={data.employmentType}
        onChange={set('employmentType')}
        onBlur={blur('employmentType')}
      />
    </div>
  );
}
