export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  INTERNAL_ERROR: 500,
});

export const MESSAGES = Object.freeze({
  VALIDATION_FAILED: 'Validation failed',
  APPOINTMENT_NOT_FOUND: 'Appointment not found',
  ROUTE_NOT_FOUND: 'Route not found',
  INTERNAL_ERROR: 'Something went wrong. Please try again later.',
  INVALID_ID: 'Invalid appointment id',
  MALFORMED_JSON: 'Malformed JSON body',
});
