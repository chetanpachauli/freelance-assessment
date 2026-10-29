import { request } from './httpClient.js';
import { STATUS_FILTER_ALL } from '../constants/appointment.js';
import { buildQueryString } from '../utils/queryString.js';

const RESOURCE = '/appointments';

function toCreatePayload(values) {
  return {
    customerName: values.customerName.trim(),
    service: values.service.trim(),
    scheduledAt: new Date(values.scheduledAt).toISOString(),
    status: values.status,
  };
}

export const appointmentApi = {
  list({ status, search }, signal) {
    const query = buildQueryString({
      status: status === STATUS_FILTER_ALL ? undefined : status,
      search,
    });
    return request(`${RESOURCE}${query}`, { signal });
  },

  create: (values) => request(RESOURCE, { method: 'POST', body: toCreatePayload(values) }),

  updateStatus: (id, status) =>
    request(`${RESOURCE}/${id}/status`, { method: 'PATCH', body: { status } }),
};
