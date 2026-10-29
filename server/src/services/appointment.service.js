import { appointmentRepository } from '../repositories/appointment.repository.js';
import { STATUS_FILTER_ALL } from '../constants/appointment.constants.js';
import { HTTP_STATUS, MESSAGES } from '../constants/http.constants.js';
import { SEED_APPOINTMENTS } from '../seed/seedData.js';
import { AppError } from '../utils/AppError.js';
import { escapeRegex } from '../utils/regex.js';

export function buildListFilter({ status, search } = {}) {
  const filter = {};
  if (status && status !== STATUS_FILTER_ALL) filter.status = status;
  if (search) filter.customerName = { $regex: escapeRegex(search), $options: 'i' };
  return filter;
}

export const appointmentService = {
  list: (query) => appointmentRepository.findAll(buildListFilter(query)),

  create: (payload) => appointmentRepository.create(payload),

  async changeStatus(id, status) {
    const updated = await appointmentRepository.updateStatusById(id, status);
    if (!updated) throw new AppError(MESSAGES.APPOINTMENT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    return updated;
  },

  async seedIfEmpty() {
    if ((await appointmentRepository.count()) > 0) return false;
    await appointmentRepository.insertMany(SEED_APPOINTMENTS);
    return true;
  },

  async resetToSeed() {
    await appointmentRepository.deleteAll();
    await appointmentRepository.insertMany(SEED_APPOINTMENTS);
  },
};
