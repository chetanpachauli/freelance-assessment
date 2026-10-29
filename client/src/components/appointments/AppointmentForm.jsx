import { STATUS_OPTIONS } from '../../constants/appointment.js';
import { useAppointmentForm } from '../../hooks/useAppointmentForm.js';
import Button from '../ui/Button.jsx';
import ErrorAlert from '../ui/ErrorAlert.jsx';
import { SelectField, TextField } from '../ui/FormFields.jsx';

export default function AppointmentForm({ onSubmit }) {
  const { getFieldProps, handleSubmit, isSubmitting, submitError } = useAppointmentForm(onSubmit);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-lg border border-stone-200 bg-white p-4 sm:p-5"
    >
      <h2 className="text-lg font-semibold">New appointment</h2>
      <TextField label="Customer name" autoComplete="off" {...getFieldProps('customerName')} />
      <TextField label="Service" autoComplete="off" {...getFieldProps('service')} />
      <TextField label="Date and time" type="datetime-local" {...getFieldProps('scheduledAt')} />
      <SelectField label="Status" options={STATUS_OPTIONS} {...getFieldProps('status')} />
      <ErrorAlert message={submitError} />
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Adding…' : 'Add appointment'}
      </Button>
    </form>
  );
}
