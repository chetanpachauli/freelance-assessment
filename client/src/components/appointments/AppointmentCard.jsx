import { formatDateTime } from '../../utils/formatDateTime.js';
import StatusBadge from '../ui/StatusBadge.jsx';
import StatusSelect from './StatusSelect.jsx';

export default function AppointmentCard({ appointment, onStatusChange, isUpdating }) {
  const { _id, customerName, service, scheduledAt, status } = appointment;

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-3.5 sm:p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold text-stone-900">{customerName}</p>
        <p className="text-sm text-stone-600">{service}</p>
        <p className="mt-1 text-xs sm:text-sm text-stone-500">
          <time dateTime={scheduledAt}>{formatDateTime(scheduledAt)}</time>
        </p>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 border-t border-stone-100 sm:border-0 sm:pt-0">
        <StatusBadge status={status} />
        <StatusSelect
          value={status}
          customerName={customerName}
          disabled={isUpdating}
          onChange={(nextStatus) => onStatusChange(_id, nextStatus)}
        />
      </div>
    </li>
  );
}
