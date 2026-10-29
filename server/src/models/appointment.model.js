import mongoose from 'mongoose';
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_STATUS_VALUES,
  FIELD_LIMITS,
} from '../constants/appointment.constants.js';

const appointmentSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: FIELD_LIMITS.CUSTOMER_NAME_MAX,
    },
    service: {
      type: String,
      required: true,
      trim: true,
      maxlength: FIELD_LIMITS.SERVICE_MAX,
    },
    scheduledAt: { type: Date, required: true },
    status: {
      type: String,
      enum: APPOINTMENT_STATUS_VALUES,
      default: APPOINTMENT_STATUS.PENDING,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// List view: filter by status, sorted by date.
appointmentSchema.index({ status: 1, scheduledAt: 1 });
// Customer-name search / lookup.
appointmentSchema.index({ customerName: 1 });

export const Appointment = mongoose.model('Appointment', appointmentSchema);
