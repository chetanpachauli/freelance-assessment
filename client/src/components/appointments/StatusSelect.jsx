import { STATUS_OPTIONS } from '../../constants/appointment.js';
import { inputClassName } from '../ui/inputStyles.js';

export default function StatusSelect({ value, onChange, disabled, customerName }) {
  return (
    <select
      value={value}
      disabled={disabled}
      aria-label={`Change status for ${customerName}`}
      onChange={(event) => onChange(event.target.value)}
      className={`${inputClassName(false)} w-auto py-1.5`}
    >
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
