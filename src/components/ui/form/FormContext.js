import React, { createContext, useContext, useReducer } from 'react';

/**
 * Form Context to provide centralized form state management
 */
const FormContext = createContext();

/**
 * Form state reducer
 */
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUES':
      return {
        ...state,
        values: action.payload
      };
    case 'UPDATE_VALUE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value
        }
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.field]: true
        }
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };
    case 'UPDATE_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      };
    case 'RESET_FORM':
      return {
        ...state,
        values: action.initialValues || {},
        touched: {},
        errors: {},
        isSubmitting: false
      };
    case 'SUBMIT_START':
      return {
        ...state,
        isSubmitting: true
      };
    case 'SUBMIT_END':
      return {
        ...state,
        isSubmitting: false
      };
    default:
      return state;
  }
};

/**
 * Form Provider Component - provides context for form state and functions
 */
export const FormProvider = ({ 
  children, 
  initialValues = {}, 
  validationSchema = {},
  onSubmit = () => {} 
}) => {
  // Initialize state with initial values
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    touched: {},
    errors: {},
    isSubmitting: false,
    validationSchema,
    onSubmit
  });

  /**
   * Validate a single field
   */
  const validateField = (field, value) => {
    const fieldSchema = validationSchema[field];
    if (!fieldSchema) return null;

    // Run through validation rules
    for (const rule of fieldSchema) {
      const { validator, message } = rule;
      const isValid = validator(value, state.values);
      if (!isValid) {
        return message;
      }
    }
    
    return null;
  };

  /**
   * Validate all fields in the form
   */
  const validateForm = (formValues = state.values) => {
    const errors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(field => {
      const error = validateField(field, formValues[field]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    dispatch({ type: 'SET_ERRORS', payload: errors });
    return isValid;
  };

  /**
   * Handle field change
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    dispatch({ 
      type: 'UPDATE_VALUE', 
      field: name, 
      value: fieldValue 
    });
    
    // Validate on change if the field has been touched
    if (state.touched[name]) {
      const error = validateField(name, fieldValue);
      if (error) {
        dispatch({ type: 'UPDATE_ERROR', field: name, error });
      } else {
        dispatch({ type: 'UPDATE_ERROR', field: name, error: null });
      }
    }
  };

  /**
   * Handle field blur
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    dispatch({ type: 'SET_TOUCHED', field: name });
    
    // Validate on blur
    const error = validateField(name, value);
    if (error) {
      dispatch({ type: 'UPDATE_ERROR', field: name, error });
    } else {
      dispatch({ type: 'UPDATE_ERROR', field: name, error: null });
    }
  };

  /**
   * Update a specific field
   */
  const setFieldValue = (field, value) => {
    dispatch({ type: 'UPDATE_VALUE', field, value });
    
    // Validate the field
    if (state.touched[field]) {
      const error = validateField(field, value);
      if (error) {
        dispatch({ type: 'UPDATE_ERROR', field, error });
      } else {
        dispatch({ type: 'UPDATE_ERROR', field, error: null });
      }
    }
  };

  /**
   * Set all form values at once
   */
  const setValues = (values) => {
    dispatch({ type: 'SET_VALUES', payload: values });
  };

  /**
   * Reset the form
   */
  const resetForm = () => {
    dispatch({ type: 'RESET_FORM', initialValues });
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Validate all fields
    const isValid = validateForm();
    
    if (isValid) {
      dispatch({ type: 'SUBMIT_START' });
      try {
        await onSubmit(state.values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        dispatch({ type: 'SUBMIT_END' });
      }
    }
  };

  // Context value
  const contextValue = {
    ...state,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
    resetForm,
    validateField,
    validateForm
  };

  return (
    <FormContext.Provider value={contextValue}>
      {children}
    </FormContext.Provider>
  );
};

/**
 * Custom hook to use form context
 */
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export default FormContext;