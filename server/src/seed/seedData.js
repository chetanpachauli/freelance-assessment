import { APPOINTMENT_STATUS } from '../constants/appointment.constants.js';

// ISO strings without a timezone suffix are parsed as server-local time,
// so "10:00" displays as 10:00 when the app runs on the same machine.
export const SEED_APPOINTMENTS = Object.freeze([
  {
    customerName: 'Alex Morgan',
    service: 'Consultation',
    scheduledAt: new Date('2026-11-02T10:00'),
    status: APPOINTMENT_STATUS.PENDING,
  },
  {
    customerName: 'Jamie Lee',
    service: 'Follow-up',
    scheduledAt: new Date('2026-11-02T11:30'),
    status: APPOINTMENT_STATUS.CONFIRMED,
  },
  {
    customerName: 'Taylor Smith',
    service: 'Review',
    scheduledAt: new Date('2026-11-03T14:00'),
    status: APPOINTMENT_STATUS.CANCELLED,
  },
]);
