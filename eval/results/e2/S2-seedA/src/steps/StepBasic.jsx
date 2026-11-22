import { TextField, SelectField } from '../components/Field.jsx';
import { EMPLOYMENT_TYPES } from '../permissions.js';
import { todayISO } from '../validation.js';

/** 第 1 步：基本信息（证件与联系方式 + 入职安排） */
export default function StepBasic({ values, errors, onChange, onBlur }) {
  return (
    <div>
      <TextField
        id="name"
        label="姓名"
        required
        error={errors.name}
        hint="须与证件一致，用于劳动合同"
        autoComplete="name"
        placeholder="例如：王一舟"
        value={values.name}
        onChange={onChange}
        onBlur={onBlur}
      />
      <TextField
        id="idNumber"
        label="证件号码"
        required
        error={errors.idNumber}
        hint="仅用于合同与社会保险办理，加密存储"
        autoComplete="off"
        placeholder="18 位身份证号"
        value={values.idNumber}
        onChange={onChange}
        onBlur={onBlur}
      />
      <TextField
        id="mobile"
        label="手机号"
        required
        error={errors.mobile}
        hint="用于入职通知与紧急联系"
        type="tel"
        autoComplete="tel"
        placeholder="11 位手机号"
        value={values.mobile}
        onChange={onChange}
        onBlur={onBlur}
      />
      <TextField
        id="email"
        label="邮箱"
        required
        error={errors.email}
        hint="个人邮箱即可，用于接收 offer 与入职材料"
        type="email"
        autoComplete="email"
        placeholder="例如：wang.yizhou@example.com"
        value={values.email}
        onChange={onChange}
        onBlur={onBlur}
      />
      <TextField
        id="hireDate"
        label="入职日期"
        required
        error={errors.hireDate}
        hint="当天 9:00 前台报到"
        type="date"
        min={todayISO()}
        value={values.hireDate}
        onChange={onChange}
        onBlur={onBlur}
      />
      <SelectField
        id="employmentType"
        label="用工类型"
        required
        error={errors.employmentType}
        value={values.employmentType}
        onChange={onChange}
        onBlur={onBlur}
        options={EMPLOYMENT_TYPES.map((t) => ({ value: t.id, label: t.name }))}
      />
    </div>
  );
}
