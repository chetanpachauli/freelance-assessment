export const APPOINTMENT_STATUS = Object.freeze({
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
});

export const STATUS_OPTIONS = Object.values(APPOINTMENT_STATUS);

export const STATUS_FILTER_ALL = 'All';
export const STATUS_FILTERS = [STATUS_FILTER_ALL, ...STATUS_OPTIONS];

export const STATUS_STYLES = Object.freeze({
  [APPOINTMENT_STATUS.PENDING]: 'bg-amber-100 text-amber-900 ring-amber-600/20',
  [APPOINTMENT_STATUS.CONFIRMED]: 'bg-emerald-100 text-emerald-900 ring-emerald-600/20',
  [APPOINTMENT_STATUS.CANCELLED]: 'bg-stone-200 text-stone-700 ring-stone-500/20',
});

export const FIELD_LIMITS = Object.freeze({ CUSTOMER_NAME_MAX: 100, SERVICE_MAX: 100 });

export const SEARCH_DEBOUNCE_MS = 300;

export const EMPTY_FORM = Object.freeze({
  customerName: '',
  service: '',
  scheduledAt: '',
  status: APPOINTMENT_STATUS.PENDING,
});
