import { FIELD_LIMITS, STATUS_OPTIONS } from '../constants/appointment.js';
import { MESSAGES } from '../constants/messages.js';

const isBlank = (value) => !value || !value.trim();

const requiredText = (requiredMessage, max, tooLongMessage) => (value) => {
  if (isBlank(value)) return requiredMessage;
  return value.trim().length > max ? tooLongMessage : undefined;
};

const validateDate = (value) => {
  if (isBlank(value)) return MESSAGES.DATE_REQUIRED;
  return Number.isNaN(Date.parse(value)) ? MESSAGES.DATE_INVALID : undefined;
};

const validateStatus = (value) =>
  STATUS_OPTIONS.includes(value) ? undefined : MESSAGES.STATUS_INVALID;

const RULES = {
  customerName: requiredText(MESSAGES.CUSTOMER_REQUIRED, FIELD_LIMITS.CUSTOMER_NAME_MAX, MESSAGES.CUSTOMER_TOO_LONG),
  service: requiredText(MESSAGES.SERVICE_REQUIRED, FIELD_LIMITS.SERVICE_MAX, MESSAGES.SERVICE_TOO_LONG),
  scheduledAt: validateDate,
  status: validateStatus,
};

export const validateField = (name, value) => RULES[name]?.(value);

export function validateAppointment(values) {
  const entries = Object.entries(RULES)
    .map(([name, rule]) => [name, rule(values[name])])
    .filter(([, message]) => message);
  return Object.fromEntries(entries);
}

export const hasErrors = (errors) => Object.values(errors).some(Boolean);
