import { STATUS_FILTERS } from '../../constants/appointment.js';

const BASE = 'rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700';
const ACTIVE = 'bg-teal-800 text-white shadow-xs';
const IDLE = 'bg-white text-stone-700 ring-1 ring-inset ring-stone-300 hover:bg-stone-100';

export default function FilterBar({ value, onChange }) {
  return (
    <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-2">
      {STATUS_FILTERS.map((status) => (
        <button
          key={status}
          type="button"
          aria-pressed={value === status}
          onClick={() => onChange(status)}
          className={`${BASE} ${value === status ? ACTIVE : IDLE}`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
