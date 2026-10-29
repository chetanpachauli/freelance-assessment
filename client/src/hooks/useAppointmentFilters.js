import { useMemo, useState } from 'react';
import { SEARCH_DEBOUNCE_MS, STATUS_FILTER_ALL } from '../constants/appointment.js';
import { useDebouncedValue } from './useDebouncedValue.js';

export function useAppointmentFilters() {
  const [status, setStatus] = useState(STATUS_FILTER_ALL);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS);

  const params = useMemo(
    () => ({ status, search: debouncedSearch.trim() }),
    [status, debouncedSearch]
  );

  return { status, setStatus, search, setSearch, params };
}
