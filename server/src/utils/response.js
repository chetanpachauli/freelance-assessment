import { HTTP_STATUS } from '../constants/http.constants.js';

export function sendSuccess(res, data, statusCode = HTTP_STATUS.OK) {
  return res.status(statusCode).json({ success: true, data });
}
