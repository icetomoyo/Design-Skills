// 表单字段基元：标签 + 控件 + 字段下方消息槽（预留高度，错误出现不引起布局跳动）
// 约定：error 由父组件在校验后传入；onBlur 触发单字段校验，onChange 在已有错误时即时复验。

export const inputCls = (hasError) =>
  [
    'block h-9 w-full rounded-md border bg-white px-3 text-sm text-ink-900',
    'placeholder:text-ink-500',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1',
    hasError ? 'border-danger-600' : 'border-ink-300',
    'disabled:cursor-not-allowed disabled:border-ink-200 disabled:bg-ink-50 disabled:text-ink-500',
  ].join(' ');

function FieldBase({ id, label, required, error, hint, slotId, children }) {
  const msg = error || hint || '';
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink-700">
        {label}
        {required ? (
          <>
            <span className="ml-1 text-danger-600" aria-hidden="true">*</span>
            <span className="sr-only">（必填）</span>
          </>
        ) : (
          <span className="ml-2 text-xs font-normal text-ink-500">（选填）</span>
        )}
      </label>
      {children}
      <p
        id={slotId}
        className={`mt-1 min-h-5 text-sm leading-5 ${error ? 'text-danger-600' : 'text-ink-500'}`}
      >
        {msg}
      </p>
    </div>
  );
}

export function TextField({
  id, label, required, error, hint, type = 'text', autoComplete, inputMode,
  placeholder, value, onChange, onBlur, min, disabled, unit,
}) {
  const slotId = `${id}-desc`;
  return (
    <FieldBase id={id} label={label} required={required} error={error} hint={hint} slotId={slotId}>
      {unit ? (
        <div className="relative">
          <input
            id={id}
            name={id}
            type={type}
            value={value}
            autoComplete={autoComplete}
            inputMode={inputMode}
            placeholder={placeholder}
            min={min}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error || hint ? slotId : undefined}
            onChange={(e) => onChange(id, e.target.value)}
            onBlur={(e) => onBlur(id, e.target.value)}
            className={`${inputCls(!!error)} pr-16`}
          />
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-ink-500">
            {unit}
          </span>
        </div>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          min={min}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error || hint ? slotId : undefined}
          onChange={(e) => onChange(id, e.target.value)}
          onBlur={(e) => onBlur(id, e.target.value)}
          className={inputCls(!!error)}
        />
      )}
    </FieldBase>
  );
}

export function SelectField({
  id, label, required, error, hint, value, onChange, onBlur, options,
  placeholder = '请选择', disabled,
}) {
  const slotId = `${id}-desc`;
  return (
    <FieldBase id={id} label={label} required={required} error={error} hint={hint} slotId={slotId}>
      <select
        id={id}
        name={id}
        value={value}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error || hint ? slotId : undefined}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={(e) => onBlur(id, e.target.value)}
        className={inputCls(!!error)}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldBase>
  );
}

export function TextAreaField({
  id, label, required, error, hint, value, onChange, onBlur, rows = 3, maxLength, placeholder,
}) {
  const slotId = `${id}-desc`;
  return (
    <FieldBase id={id} label={label} required={required} error={error} hint={hint} slotId={slotId}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error || hint ? `${slotId} ${id}-count` : `${id}-count`}
        onChange={(e) => onChange(id, e.target.value)}
        onBlur={(e) => onBlur(id, e.target.value)}
        className={`${inputCls(!!error)} py-2 leading-6`}
      />
      {maxLength ? (
        <span id={`${id}-count`} className="mt-1 block text-right text-xs tabular-nums text-ink-500">
          {String(value || '').length}/{maxLength}
        </span>
      ) : null}
    </FieldBase>
  );
}

/**
 * 系统权限复选卡组：整卡可点（label 包裹），焦点环在 checkbox 上。
 * groups: [{ group, items: [{ id, name, desc, default }] }]
 */
export function CheckboxGroup({ id, legendLabel, groups, values, onChange, onBlur, error, required }) {
  const slotId = `${id}-desc`;
  const firstItemId = groups[0]?.items[0]?.id;
  return (
    <fieldset className="mb-5">
      <legend className="mb-1 block text-sm font-medium text-ink-700">
        {legendLabel}
        {required ? (
          <>
            <span className="ml-1 text-danger-600" aria-hidden="true">*</span>
            <span className="sr-only">（必填）</span>
          </>
        ) : (
          <span className="ml-2 text-xs font-normal text-ink-500">（选填）</span>
        )}
      </legend>
      <div className="space-y-4">
        {groups.map((g) => (
          <div key={g.group}>
            <p className="mb-2 text-xs font-medium text-ink-500">{g.group}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {g.items.map((item) => {
                const checked = values.includes(item.id);
                return (
                  <label
                    key={item.id}
                    className={`cursor-pointer rounded-md border p-3 transition-colors ${
                      checked ? 'border-primary-600 bg-primary-50' : 'border-ink-200 bg-white hover:border-ink-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={item.id === firstItemId ? id : undefined}
                        value={item.id}
                        checked={checked}
                        aria-invalid={error ? 'true' : undefined}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...values, item.id]
                            : values.filter((x) => x !== item.id);
                          onChange(id, next);
                        }}
                        onBlur={() => onBlur(id)}
                        className="h-4 w-4 rounded accent-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
                      />
                      <span className="text-sm font-medium text-ink-900">{item.name}</span>
                      {item.default ? (
                        <span className="rounded border border-ink-200 bg-ink-50 px-1 text-xs text-ink-500">
                          默认开通
                        </span>
                      ) : null}
                    </span>
                    {item.desc ? (
                      <span className="mt-1 block pl-6 text-xs leading-5 text-ink-500">{item.desc}</span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p
        id={slotId}
        className={`mt-1 min-h-5 text-sm leading-5 ${error ? 'text-danger-600' : 'text-ink-500'}`}
      >
        {error || ''}
      </p>
    </fieldset>
  );
}

/** 复核页勾选声明：单条确认项 */
export function ConfirmCheck({ id, label, checked, error, onChange, onBlur }) {
  const slotId = `${id}-desc`;
  return (
    <div className="mb-2">
      <label
        className={`flex cursor-pointer items-start gap-2 rounded-md border p-3 transition-colors ${
          error ? 'border-danger-600 bg-danger-50' : 'border-ink-200 bg-white hover:border-ink-300'
        }`}
      >
        <input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={(e) => onChange(id, e.target.checked)}
          onBlur={() => onBlur(id)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? slotId : undefined}
          className="mt-0 h-4 w-4 rounded accent-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-1"
        />
        <span className="text-sm leading-6 text-ink-900">{label}</span>
      </label>
      <p id={slotId} className={`mt-1 min-h-5 text-sm leading-5 ${error ? 'text-danger-600' : 'text-ink-500'}`}>
        {error || ''}
      </p>
    </div>
  );
}
