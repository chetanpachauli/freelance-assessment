const BASE =
  'w-full rounded-md border bg-white px-3 py-2 text-sm text-stone-900 shadow-sm ' +
  'placeholder:text-stone-400 focus:outline-none focus:ring-2 disabled:opacity-60';

const VALID = 'border-stone-300 focus:border-teal-700 focus:ring-teal-700/30';
const INVALID = 'border-red-500 focus:border-red-600 focus:ring-red-500/30';

export const inputClassName = (hasError) => `${BASE} ${hasError ? INVALID : VALID}`;
