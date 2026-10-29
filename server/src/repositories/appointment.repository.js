import { Appointment } from '../models/appointment.model.js';

const DEFAULT_SORT = { scheduledAt: 1 };

export const appointmentRepository = {
  findAll: (filter = {}) => Appointment.find(filter).sort(DEFAULT_SORT).lean(),

  create: async (payload) => (await Appointment.create(payload)).toObject(),

  updateStatusById: (id, status) =>
    Appointment.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).lean(),

  count: () => Appointment.estimatedDocumentCount(),

  insertMany: (documents) => Appointment.insertMany(documents),

  deleteAll: () => Appointment.deleteMany({}),
};
