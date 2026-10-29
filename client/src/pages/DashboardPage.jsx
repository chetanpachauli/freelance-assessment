import { useAppointments } from '../hooks/useAppointments.js';
import AppHeader from '../components/ui/AppHeader.jsx';
import ErrorAlert from '../components/ui/ErrorAlert.jsx';
import AppointmentForm from '../components/appointments/AppointmentForm.jsx';
import AppointmentsContent from '../components/appointments/AppointmentsContent.jsx';
import FilterBar from '../components/appointments/FilterBar.jsx';
import SearchInput from '../components/appointments/SearchInput.jsx';

export default function DashboardPage() {
  const { filters, appointments, isLoading, error, reload, actionError, updatingId, createAppointment, changeStatus } =
    useAppointments();

  return (
    <>
      <AppHeader />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[22rem_1fr]">
        <AppointmentForm onSubmit={createAppointment} />
        <section aria-label="Appointments" className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <FilterBar value={filters.status} onChange={filters.setStatus} />
            <SearchInput value={filters.search} onChange={filters.setSearch} />
          </div>
          <ErrorAlert message={actionError} />
          <AppointmentsContent
            appointments={appointments}
            isLoading={isLoading}
            error={error}
            updatingId={updatingId}
            onStatusChange={changeStatus}
            onRetry={reload}
          />
        </section>
      </main>
    </>
  );
}
