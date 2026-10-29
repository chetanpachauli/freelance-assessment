import './setupEnv.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { buildListFilter } from '../src/services/appointment.service.js';

test('no filters produces an empty query', () => {
  assert.deepEqual(buildListFilter({}), {});
  assert.deepEqual(buildListFilter({ status: 'All' }), {});
});

test('status filter is applied when not "All"', () => {
  assert.deepEqual(buildListFilter({ status: 'Pending' }), { status: 'Pending' });
});

test('search is a case-insensitive, regex-escaped match', () => {
  const { customerName } = buildListFilter({ search: 'a.b(' });
  assert.equal(customerName.$options, 'i');
  assert.equal(customerName.$regex, 'a\\.b\\(');
  assert.ok(new RegExp(customerName.$regex, 'i').test('XA.B('));
});
