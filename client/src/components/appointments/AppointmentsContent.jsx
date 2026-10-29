import { MESSAGES } from '../../constants/messages.js';
import ErrorAlert from '../ui/ErrorAlert.jsx';
import Spinner from '../ui/Spinner.jsx';
import AppointmentList from './AppointmentList.jsx';

/** Chooses exactly one view: error, loading, empty or list. */
export default function AppointmentsContent({ appointments, isLoading, error, onRetry, ...listProps }) {
  if (error) return <ErrorAlert message={error} onRetry={onRetry} />;
  if (isLoading) return <Spinner label="Loading appointments" />;
  if (appointments.length === 0) {
    return <p className="py-10 text-center text-sm text-stone-500">{MESSAGES.EMPTY_LIST}</p>;
  }
  return <AppointmentList appointments={appointments} {...listProps} />;
}
