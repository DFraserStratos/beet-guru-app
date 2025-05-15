import { useState, useEffect } from 'react';
import { useFormContext } from '../components/ui/form/FormContext';
import { validateForm } from '../components/ui/form/FormValidation';

/**
 * Enhanced hook for form handling with validation.
 * Can work both standalone or with FormProvider context
 * 
 * @param {Object} initialValues - Initial form values
 * @param {Function|Object} validation - Validation function or schema
 * @param {Function} onSubmit - Submit callback
 * @param {Boolean} useContext - Whether to use FormContext (if available)
 * @returns {Object} Form state and handlers
 */
const useForm = (
  initialValues = {}, 
  validation = () => ({}), 
  onSubmit = () => {},
  useContext = false
) => {
  // Try to use FormContext if useContext is true
  let formContext;
  try {
    formContext = useContext ? useFormContext() : null;
  } catch (error) {
    formContext = null;
  }
  
  // If we have form context and useContext is true, use it
  if (formContext && useContext) {
    return formContext;
  }
  
  // Otherwise fall back to standalone implementation (backward compatibility)
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Determine if validation is a function or schema
  const isValidationSchema = typeof validation === 'object';
  
  // Convert validation schema to function if needed
  const validate = isValidationSchema 
    ? (formValues) => validateForm(formValues, validation)
    : validation;
  
  // Update values if initialValues change
  useEffect(() => {
    setValues(initialValues);
  }, [JSON.stringify(initialValues)]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues({
      ...values,
      [name]: fieldValue
    });
    
    // Validate field if it's been touched
    if (touched[name]) {
      const validationErrors = validate({
        ...values,
        [name]: fieldValue
      });
      setErrors(validationErrors);
    }
  };
  
  // Helper method to directly set a field value
  const setFieldValue = (field, value) => {
    setValues({
      ...values,
      [field]: value
    });
    
    // Validate field if it's been touched
    if (touched[field]) {
      const validationErrors = validate({
        ...values,
        [field]: value
      });
      setErrors(validationErrors);
    }
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Validate on blur
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };
  
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Mark all fields as touched
    const touchedFields = {};
    Object.keys(values).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);
    
    // Validate all fields
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    // If no errors, submit
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Support both promise and callback patterns
        const result = onSubmit(values);
        
        if (result instanceof Promise) {
          result.finally(() => setIsSubmitting(false));
        } else {
          // For backward compatibility with callback pattern
          const resetSubmitting = () => setIsSubmitting(false);
          if (typeof result === 'function') {
            result(resetSubmitting);
          } else {
            resetSubmitting();
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setIsSubmitting(false);
      }
    }
  };
  
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };
  
  // Enhanced interface with extra methods
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setFieldValue,
    validateForm: () => {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      return Object.keys(validationErrors).length === 0;
    }
  };
};

export default useForm;