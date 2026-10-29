/** Builds "?a=1&b=2", skipping empty values. Returns "" when nothing is set. */
export function buildQueryString(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') searchParams.set(key, value);
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}
