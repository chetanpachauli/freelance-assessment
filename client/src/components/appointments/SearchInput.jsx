import { inputClassName } from '../ui/inputStyles.js';

export default function SearchInput({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      placeholder="Search customer name"
      aria-label="Search by customer name"
      onChange={(event) => onChange(event.target.value)}
      className={`${inputClassName(false)} sm:max-w-xs`}
    />
  );
}
