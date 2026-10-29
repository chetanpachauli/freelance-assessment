import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS, MESSAGES } from '../constants/http.constants.js';

export function notFoundHandler(_req, _res, next) {
  next(new AppError(MESSAGES.ROUTE_NOT_FOUND, HTTP_STATUS.NOT_FOUND));
}

function normalizeError(error) {
  if (error instanceof AppError) return error;
  if (error instanceof mongoose.Error.ValidationError) {
    return new AppError(MESSAGES.VALIDATION_FAILED, HTTP_STATUS.UNPROCESSABLE);
  }
  if (error instanceof mongoose.Error.CastError) {
    return new AppError(MESSAGES.INVALID_ID, HTTP_STATUS.BAD_REQUEST);
  }
  if (error.type === 'entity.parse.failed') {
    return new AppError(MESSAGES.MALFORMED_JSON, HTTP_STATUS.BAD_REQUEST);
  }
  return new AppError(MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_ERROR);
}

// Express identifies error middleware by its 4-argument signature.
// eslint-disable-next-line no-unused-vars
export function errorHandler(error, _req, res, _next) {
  const appError = normalizeError(error);
  const isServerError = appError.statusCode >= HTTP_STATUS.INTERNAL_ERROR;
  if (isServerError) console.error(error);

  res.status(appError.statusCode).json({
    success: false,
    message: error.message || appError.message,
    ...(appError.fieldErrors && { errors: appError.fieldErrors }),
    ...(isServerError && { stack: error.stack }),
  });
}
