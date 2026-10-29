import { AppError } from '../utils/AppError.js';
import { HTTP_STATUS, MESSAGES } from '../constants/http.constants.js';

function toFieldErrors(zodError) {
  const fieldErrors = {};
  for (const issue of zodError.issues) {
    const field = issue.path.join('.') || 'root';
    fieldErrors[field] ??= issue.message;
  }
  return fieldErrors;
}

/** Validates req[source] (body | query | params) and replaces it with parsed data. */
export const validate = (schema, source = 'body') => (req, _res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const fieldErrors = toFieldErrors(result.error);
    return next(new AppError(MESSAGES.VALIDATION_FAILED, HTTP_STATUS.UNPROCESSABLE, fieldErrors));
  }
  req[source] = result.data;
  return next();
};
