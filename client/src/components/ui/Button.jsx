const BASE =
  'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold ' +
  'bg-teal-800 text-white shadow-sm transition-colors hover:bg-teal-900 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

export default function Button({ children, className = '', ...rest }) {
  return (
    <button className={`${BASE} ${className}`} {...rest}>
      {children}
    </button>
  );
}
