import './setupEnv.js';
import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

// These requests are rejected before any DB call, so no MongoDB is required.
let server;
let baseUrl;

before(async () => {
  server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}/api`;
});

after(() => server.close());

const send = (path, options) => fetch(`${baseUrl}${path}`, options);
const jsonPost = (path, body, method = 'POST') =>
  send(path, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

test('GET /health returns ok', async () => {
  const response = await send('/health');
  assert.equal(response.status, 200);
});

test('unknown route returns 404 JSON', async () => {
  const response = await send('/nope');
  assert.equal(response.status, 404);
  assert.equal((await response.json()).success, false);
});

test('POST /appointments with empty body returns 422 with field errors', async () => {
  const response = await jsonPost('/appointments', {});
  const body = await response.json();
  assert.equal(response.status, 422);
  assert.equal(body.errors.customerName, 'Customer name is required');
});

test('PATCH with malformed id returns 422', async () => {
  const response = await jsonPost('/appointments/123/status', { status: 'Pending' }, 'PATCH');
  assert.equal(response.status, 422);
});

test('GET with invalid status filter returns 422', async () => {
  const response = await send('/appointments?status=Bogus');
  assert.equal(response.status, 422);
});

test('malformed JSON returns 400', async () => {
  const response = await send('/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{bad',
  });
  assert.equal(response.status, 400);
});
