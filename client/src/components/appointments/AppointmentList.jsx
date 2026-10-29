import AppointmentCard from './AppointmentCard.jsx';

export default function AppointmentList({ appointments, onStatusChange, updatingId }) {
  return (
    <ul className="space-y-3">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment._id}
          appointment={appointment}
          onStatusChange={onStatusChange}
          isUpdating={updatingId === appointment._id}
        />
      ))}
    </ul>
  );
}
