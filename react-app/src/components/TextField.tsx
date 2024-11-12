import React, { useState, useEffect } from 'react';

export interface TextFieldProps {
  label: string;
  id: string;
  value: string | undefined;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  triedToSubmit: boolean;
  errorMessage?: string; // Optional error message that displays when validation fails
  validate?: (value: string) => boolean; // Optional custom validation function
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  id,
  value,
  type = 'text',
  onChange,
  required = false,
  errorMessage,
  validate,
  triedToSubmit, // Add triedToSubmit to the component props
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if the field is required and the value is empty or fails validation only if triedToSubmit is true
    if (triedToSubmit) {
      if (required && !value) {
        setError('This field is required.');
      } else if (value && validate && !validate(value)) {
        setError(errorMessage || 'Invalid input');
      } else {
        setError(null);
      }
    }
  }, [value, validate, errorMessage, required, triedToSubmit]);

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-dark mb-1"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value || ''}
        onChange={onChange}
        className={`w-full px-4 py-3 border ${
          error && triedToSubmit ? 'border-red-500' : 'border-gray-300'
        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary`}
        placeholder={`Enter ${label.toLowerCase()}`}
        aria-describedby={`${id}-error`}
      />
      {error && triedToSubmit && (
        <p id={`${id}-error`} className="text-red-500 text-xs italic mt-2">
          {error}
        </p>
      )}
    </div>
  );
};
