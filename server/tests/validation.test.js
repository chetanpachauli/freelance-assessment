import './setupEnv.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createAppointmentSchema,
  listQuerySchema,
  updateStatusSchema,
} from '../src/validations/appointment.validation.js';

const validPayload = {
  customerName: '  Sam Rivera ',
  service: 'Consultation',
  scheduledAt: '2026-11-05T09:30',
};

test('create schema trims text, defaults status and parses the date', () => {
  const result = createAppointmentSchema.parse(validPayload);
  assert.equal(result.customerName, 'Sam Rivera');
  assert.equal(result.status, 'Pending');
  assert.ok(result.scheduledAt instanceof Date);
});

test('create schema reports a message per missing field', () => {
  const result = createAppointmentSchema.safeParse({ customerName: ' ', service: '' });
  const messages = result.error.issues.map((issue) => issue.message);
  assert.ok(messages.includes('Customer name is required'));
  assert.ok(messages.includes('Service is required'));
  assert.ok(messages.includes('Date and time is required'));
});

test('create schema rejects an invalid date and an unknown status', () => {
  const badDate = createAppointmentSchema.safeParse({ ...validPayload, scheduledAt: 'nope' });
  const badStatus = createAppointmentSchema.safeParse({ ...validPayload, status: 'Done' });
  assert.equal(badDate.success, false);
  assert.equal(badStatus.success, false);
});

test('update schema only accepts known statuses', () => {
  assert.equal(updateStatusSchema.safeParse({ status: 'Confirmed' }).success, true);
  assert.equal(updateStatusSchema.safeParse({ status: 'x' }).success, false);
});

test('list query schema accepts All and rejects unknown status', () => {
  assert.equal(listQuerySchema.safeParse({ status: 'All', search: 'al' }).success, true);
  assert.equal(listQuerySchema.safeParse({ status: 'Bogus' }).success, false);
});
