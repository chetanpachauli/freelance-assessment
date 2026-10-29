import { MESSAGES } from '../constants/messages.js';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';
const ABORT_ERROR = 'AbortError';

export class ApiError extends Error {
  constructor(message, { status, fieldErrors } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function parseBody(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function buildRequestInit({ method, body, signal }) {
  return {
    method,
    signal,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  };
}

async function sendRequest(path, options) {
  try {
    return await fetch(`${BASE_URL}${path}`, buildRequestInit(options));
  } catch (error) {
    if (error.name === ABORT_ERROR) throw error;
    throw new ApiError(MESSAGES.NETWORK_ERROR);
  }
}

export async function request(path, { method = 'GET', body, signal } = {}) {
  const response = await sendRequest(path, { method, body, signal });
  const payload = await parseBody(response);
  if (!response.ok) {
    throw new ApiError(payload?.message ?? MESSAGES.GENERIC_ERROR, {
      status: response.status,
      fieldErrors: payload?.errors,
    });
  }
  return payload.data;
}

export const isAbortError = (error) => error?.name === ABORT_ERROR;
