import { formatDateTime } from '../../utils/formatDateTime.js';
import StatusBadge from '../ui/StatusBadge.jsx';
import StatusSelect from './StatusSelect.jsx';

export default function AppointmentCard({ appointment, onStatusChange, isUpdating }) {
  const { _id, customerName, service, scheduledAt, status } = appointment;

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-base font-semibold">{customerName}</p>
        <p className="text-sm text-stone-600">{service}</p>
        <p className="mt-1 text-sm text-stone-500">
          <time dateTime={scheduledAt}>{formatDateTime(scheduledAt)}</time>
        </p>
      </div>
      <div className="flex items-center gap-3">
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
