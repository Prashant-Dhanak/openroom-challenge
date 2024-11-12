interface SelectFieldProps {
  label: string;
  id: string;
  value: string | undefined;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  value,
  options,
  onChange,
}) => (
  <div>
    <label
      className="block text-sm font-medium text-gray-dark mb-1"
      htmlFor={id}
    >
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
