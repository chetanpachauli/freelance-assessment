import { z } from 'zod';
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_STATUS_VALUES,
  FIELD_LIMITS,
  STATUS_FILTER_ALL,
} from '../constants/appointment.constants.js';

const statusMessage = `Status must be one of: ${APPOINTMENT_STATUS_VALUES.join(', ')}`;

const requiredText = (label, max) =>
  z
    .string({ required_error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be at most ${max} characters`);

const statusField = z.enum(APPOINTMENT_STATUS_VALUES, {
  errorMap: () => ({ message: statusMessage }),
});

const dateTimeField = z
  .string({ required_error: 'Date and time is required' })
  .trim()
  .min(1, 'Date and time is required')
  .refine((value) => !Number.isNaN(Date.parse(value)), 'Date and time is invalid')
  .transform((value) => new Date(value));

export const createAppointmentSchema = z.object({
  customerName: requiredText('Customer name', FIELD_LIMITS.CUSTOMER_NAME_MAX),
  service: requiredText('Service', FIELD_LIMITS.SERVICE_MAX),
  scheduledAt: dateTimeField,
  status: statusField.default(APPOINTMENT_STATUS.PENDING),
});

export const updateStatusSchema = z.object({ status: statusField });

export const listQuerySchema = z.object({
  status: z.enum([STATUS_FILTER_ALL, ...APPOINTMENT_STATUS_VALUES]).optional(),
  search: z.string().trim().max(FIELD_LIMITS.SEARCH_MAX).optional(),
});

export const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid appointment id'),
});
