import { appointmentService } from '../services/appointment.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import { HTTP_STATUS } from '../constants/http.constants.js';

export const listAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.list(req.query);
  sendSuccess(res, appointments);
});

export const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.create(req.body);
  sendSuccess(res, appointment, HTTP_STATUS.CREATED);
});

export const updateAppointmentStatus = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.changeStatus(req.params.id, req.body.status);
  sendSuccess(res, appointment);
});
