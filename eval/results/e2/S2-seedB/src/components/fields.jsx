// 表单原子组件：label 顶部对齐 + htmlFor 绑定；错误固定渲染于字段正下方并预留高度
// （playbook-admin-console：校验错误不改变布局高度）；aria-invalid / aria-describedby 联动。

export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

const inputBase =
  'h-8 w-full rounded-md border bg-surface px-2 text-sm text-ink-900 transition-colors motion-reduce:transition-none placeholder:text-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1';

function FieldLabel({ id, label, required }) {
  return (
    <label htmlFor={id} className="text-xs font-medium text-ink-700">
      {label}
      {required ? (
        <span aria-hidden="true" className="ml-1 text-danger-600">
          *
        </span>
      ) : (
        <span className="ml-1 font-normal text-ink-500">（选填）</span>
      )}
    </label>
  );
}

function FieldHint({ id, hint }) {
  if (!hint) return null;
  return (
    <p id={`hint-${id}`} className="text-xs leading-4 text-ink-500">
      {hint}
    </p>
  );
}

function FieldError({ id, error }) {
  return (
    <p id={`err-${id}`} aria-live="polite" className="min-h-4 text-xs leading-4 text-danger-700">
      {error || ''}
    </p>
  );
}

function describedBy(id, hint, error) {
  return [hint ? `hint-${id}` : null, error ? `err-${id}` : null].filter(Boolean).join(' ') || undefined;
}

export function TextField({
  id,
  label,
  required = true,
  error,
  hint,
  type = 'text',
  inputMode,
  placeholder,
  min,
  value,
  onChange,
  onBlur,
}) {
  return (
    <div className="flex flex-col gap-1">
      <FieldLabel id={id} label={label} required={required} />
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete="off"
        placeholder={placeholder}
        min={min}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(inputBase, error ? 'border-danger-600' : 'border-ink-300')}
      />
      <FieldHint id={id} hint={hint} />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  required = true,
  error,
  hint,
  options,
  placeholder = '请选择',
  value,
  onChange,
  onBlur,
}) {
  return (
    <div className="flex flex-col gap-1">
      <FieldLabel id={id} label={label} required={required} />
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={cn(inputBase, 'appearance-none pr-8', error ? 'border-danger-600' : 'border-ink-300')}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-ink-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </div>
      <FieldHint id={id} hint={hint} />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function TextareaField({ id, label, required = true, error, hint, rows = 2, placeholder, value, onChange, onBlur }) {
  return (
    <div className="flex flex-col gap-1">
      <FieldLabel id={id} label={label} required={required} />
      <textarea
        id={id}
        name={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, hint, error)}
        className={cn(
          'w-full rounded-md border bg-surface px-2 py-1 text-sm text-ink-900 transition-colors motion-reduce:transition-none placeholder:text-ink-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1',
          error ? 'border-danger-600' : 'border-ink-300'
        )}
      />
      <FieldHint id={id} hint={hint} />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function CheckboxField({ id, label, error, checked, onChange, onBlur, children }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-2">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `err-${id}` : undefined}
          className="mt-1 h-4 w-4 rounded-sm border border-ink-300 text-brand-600 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
        />
        <label htmlFor={id} className="text-sm leading-5 text-ink-800">
          {children || label}
        </label>
      </div>
      <FieldError id={id} error={error} />
    </div>
  );
}
