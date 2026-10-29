import { Router } from 'express';
import * as controller from '../controllers/appointment.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createAppointmentSchema,
  idParamSchema,
  listQuerySchema,
  updateStatusSchema,
} from '../validations/appointment.validation.js';

const router = Router();

router.get('/', validate(listQuerySchema, 'query'), controller.listAppointments);

router.post('/', validate(createAppointmentSchema), controller.createAppointment);

router.patch(
  '/:id/status',
  validate(idParamSchema, 'params'),
  validate(updateStatusSchema),
  controller.updateAppointmentStatus
);

export default router;
