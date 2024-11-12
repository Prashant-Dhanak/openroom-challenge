/**
 * Validates that a given field is not empty.
 *
 * @param value The string value to validate, which can also be undefined.
 * @returns true if the field is not empty; false if it is empty or undefined.
 */
export const validateFieldNotEmpty = (value?: string): boolean => {
  return !!value?.trim();
};


/**
 * Validates a Canadian postal code. Accepts `undefined` as input for cases where
 * the data may not yet be initialized.
 * 
 * @param value The postal code string to validate or undefined.
 * @returns true if the postal code is valid or undefined; false if the postal code is invalid.
 */
export const validatePostalCode = (value?: string): boolean => {
    if (value === undefined) {
      return true; // Optionally, return false if you consider undefined as invalid.
    }
  
    const postalCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    return postalCodePattern.test(value.trim());
  };
  