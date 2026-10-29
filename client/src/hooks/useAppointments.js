import { useCallback, useState } from 'react';
import { appointmentApi } from '../services/appointmentApi.js';
import { MESSAGES } from '../constants/messages.js';
import { useAppointmentFilters } from './useAppointmentFilters.js';
import { useAppointmentsQuery } from './useAppointmentsQuery.js';

/** Single entry point for the dashboard: filters + list + create + status change. */
export function useAppointments() {
  const filters = useAppointmentFilters();
  const { appointments, isLoading, error, reload } = useAppointmentsQuery(filters.params);
  const [updatingId, setUpdatingId] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Errors propagate so the form can map field-level messages.
  const createAppointment = useCallback(
    async (values) => {
      await appointmentApi.create(values);
      reload();
    },
    [reload]
  );

  const changeStatus = useCallback(
    async (id, status) => {
      setUpdatingId(id);
      setActionError(null);
      try {
        await appointmentApi.updateStatus(id, status);
        reload();
      } catch (err) {
        setActionError(err.message || MESSAGES.GENERIC_ERROR);
      } finally {
        setUpdatingId(null);
      }
    },
    [reload]
  );

  return { filters, appointments, isLoading, error, reload, actionError, updatingId, createAppointment, changeStatus };
}
