import { useState } from 'react';

/**
 * Hook for handling form validation and error state
 * @param {Function} validate - Validation function returning an errors object
 * @returns {Object} Validation state and helpers
 */
const useValidation = (validate = () => ({})) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateValues = (values) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    return validationErrors;
  };

  const handleBlur = (e, values) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateValues(values);
  };

  const validateField = (name, value, values) => {
    if (!touched[name]) return;
    validateValues({ ...values, [name]: value });
  };

  const touchAll = (values) => {
    const touchedFields = {};
    Object.keys(values).forEach((key) => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);
    return validateValues(values);
  };

  const resetValidation = () => {
    setErrors({});
    setTouched({});
  };

  return {
    errors,
    touched,
    handleBlur,
    validateField,
    touchAll,
    resetValidation,
    validateValues,
  };
};

export default useValidation;
