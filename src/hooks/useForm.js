import { useState } from 'react';
import useValidation from './useValidation';

/**
 * Hook for form handling with validation
 * @param {Object} initialValues - Initial form values
 * @param {Function} validate - Validation function
 * @param {Function} onSubmit - Submit callback
 * @returns {Object} Form state and handlers
 */
const useForm = (initialValues = {}, validate = () => ({}), onSubmit = () => {}) => {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    errors,
    touched,
    handleBlur: validationBlur,
    validateField,
    touchAll,
    resetValidation,
  } = useValidation(validate);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    const newValues = {
      ...values,
      [name]: fieldValue,
    };

    setValues(newValues);
    validateField(name, fieldValue, newValues);
  };
  
  const handleBlur = (e) => {
    validationBlur(e, values);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = touchAll(values);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      onSubmit(values, () => setIsSubmitting(false));
    }
  };
  
  const resetForm = () => {
    setValues(initialValues);
    resetValidation();
    setIsSubmitting(false);
  };
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  };
};

export default useForm;
