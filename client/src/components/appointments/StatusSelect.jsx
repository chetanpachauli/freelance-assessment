import { STATUS_OPTIONS } from '../../constants/appointment.js';

export default function StatusSelect({ value, onChange, disabled, customerName }) {
  return (
    <select
      value={value}
      disabled={disabled}
      aria-label={`Change status for ${customerName}`}
      onChange={(event) => onChange(event.target.value)}
      className="cursor-pointer rounded-md border border-stone-300 bg-white px-2.5 py-1.5 text-xs sm:text-sm font-medium text-stone-800 shadow-xs hover:border-stone-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
