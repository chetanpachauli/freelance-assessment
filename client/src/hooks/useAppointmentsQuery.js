import { useCallback, useEffect, useState } from 'react';
import { appointmentApi } from '../services/appointmentApi.js';
import { isAbortError } from '../services/httpClient.js';
import { MESSAGES } from '../constants/messages.js';

export function useAppointmentsQuery(params) {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = useCallback(() => setRefreshKey((key) => key + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      try {
        setAppointments(await appointmentApi.list(params, controller.signal));
        setError(null);
      } catch (err) {
        if (!isAbortError(err)) setError(err.message || MESSAGES.LOAD_ERROR);
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [params, refreshKey]);

  return { appointments, isLoading, error, reload };
}
