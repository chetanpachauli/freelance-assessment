export const APPOINTMENT_STATUS = Object.freeze({
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
});

export const APPOINTMENT_STATUS_VALUES = Object.values(APPOINTMENT_STATUS);

export const STATUS_FILTER_ALL = 'All';

export const FIELD_LIMITS = Object.freeze({
  CUSTOMER_NAME_MAX: 100,
  SERVICE_MAX: 100,
  SEARCH_MAX: 100,
});
