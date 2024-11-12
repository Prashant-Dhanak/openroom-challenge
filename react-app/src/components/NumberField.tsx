// src/components/NumberField.tsx
import React from 'react';
import { TextField, TextFieldProps } from './TextField';

export interface NumberFieldProps
  extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Ensuring correct event type
}

export const NumberField: React.FC<NumberFieldProps> = ({
  label,
  id,
  value,
  onChange,
  required = false,
  errorMessage,
  validate,
  triedToSubmit,
}) => (
  <TextField
    label={label}
    id={id}
    type="number"
    value={value?.toString()} // Ensure conversion to string or empty if undefined
    onChange={onChange}
    required={required}
    errorMessage={errorMessage}
    validate={validate}
    triedToSubmit={triedToSubmit}
  />
);

export default NumberField;
