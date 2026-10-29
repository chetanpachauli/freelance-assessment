import { useId } from 'react';
import { inputClassName } from './inputStyles.js';

function FieldShell({ label, error, htmlFor, errorId, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium text-stone-700">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({ label, error, type = 'text', ...inputProps }) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <FieldShell label={label} error={error} htmlFor={id} errorId={errorId}>
      <input
        id={id}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={inputClassName(error)}
        {...inputProps}
      />
    </FieldShell>
  );
}

export function SelectField({ label, error, options, ...selectProps }) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <FieldShell label={label} error={error} htmlFor={id} errorId={errorId}>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={inputClassName(error)}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
