/**
 * Validation system for forms
 * Provides common validation rules and a way to compose them
 */

/**
 * Creates a validation rule
 * @param {Function} validator - Function that returns true if valid, false if invalid
 * @param {String} message - Error message to display when validation fails
 * @returns {Object} Validation rule object
 */
const createRule = (validator, message) => ({ validator, message });

/**
 * Common validation rules
 */
export const rules = {
  /**
   * Required field validation
   * @param {String} message - Custom error message
   * @returns {Object} Validation rule
   */
  required: (message = 'This field is required') => 
    createRule(value => value !== undefined && value !== null && value !== '', message),
  
  /**
   * Email format validation
   * @param {String} message - Custom error message
   * @returns {Object} Validation rule
   */
  email: (message = 'Please enter a valid email address') => 
    createRule(value => !value || /\S+@\S+\.\S+/.test(value), message),
  
  /**
   * Minimum length validation
   * @param {Number} min - Minimum length
   * @param {String} message - Custom error message
   * @returns {Object} Validation rule
   */
  minLength: (min, message = `Must be at least ${min} characters`) => 
    createRule(value => !value || value.length >= min, message),
  
  /**
   * Maximum length validation
   * @param {Number} max - Maximum length
   * @param {String} message - Custom error message
   * @returns {Object} Validation rule
   */
  maxLength: (max, message = `Must not exceed ${max} characters`) => 
    createRule(value => !value || value.length <= max, message),
  
  /**
   * Numeric value validation
   * @param {String} message - Custom error message
   * @returns {Object} Validation rule
   */
  numeric: (message = 'Please enter a valid number') => 
    createRule(value => !value || !isNaN(parseFloat(value)) && isFinite(value), message),
  
  /**
   * Minimum value validation
   * @param {Number} min - Minimum value
   * @param {String} message - Custom error message
   * @returns {Object} Validation rule
   */
  min: (min, message = `Value must be at least ${min}`) => 
    createRule(value => !value || parseFloat(value) >= min, message),
  
  /**
   * Maximum value validation
   * @param {Number} max - Maximum value
   * @param {String} message - Custom error message
   * @returns {Object} Validation rule
   */
  max: (max, message = `Value must not exceed ${max}`) => 
    createRule(value => !value || parseFloat(value) <= max, message),
  
  /**
   * Pattern validation
   * @param {RegExp} pattern - Regular expression to match
   * @param {String} message - Custom error message
   * @returns {Object} Validation rule
   */
  pattern: (pattern, message = 'Invalid format') => 
    createRule(value => !value || pattern.test(value), message),
  
  /**
   * Match another field validation
   * @param {String} field - Field name to match against
   * @param {String} message - Custom error message
   * @returns {Object} Validation rule
   */
  matches: (field, message = 'Fields do not match') => 
    createRule((value, values) => !value || value === values[field], message),
  
  /**
   * Custom validation rule
   * @param {Function} validator - Custom validation function
   * @param {String} message - Custom error message
   * @returns {Object} Validation rule
   */
  custom: (validator, message = 'Invalid value') => 
    createRule(validator, message)
};

/**
 * Creates a validation schema from field validation rules
 * @param {Object} schema - Object with field names as keys and arrays of validation rules as values
 * @returns {Object} Validation schema
 * 
 * @example
 * const validationSchema = createValidationSchema({
 *   email: [rules.required(), rules.email()],
 *   password: [rules.required(), rules.minLength(8)]
 * });
 */
export const createValidationSchema = (schema) => schema;

/**
 * Validates a field against a validation schema
 * @param {String} field - Field name
 * @param {any} value - Field value
 * @param {Object} values - All form values
 * @param {Object} schema - Validation schema
 * @returns {String|null} Error message or null if valid
 */
export const validateField = (field, value, values, schema) => {
  if (!schema[field]) return null;
  
  for (const rule of schema[field]) {
    if (!rule.validator(value, values)) {
      return rule.message;
    }
  }
  
  return null;
};

/**
 * Validates all fields in a form
 * @param {Object} values - Form values
 * @param {Object} schema - Validation schema
 * @returns {Object} Object with field names as keys and error messages as values
 */
export const validateForm = (values, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(field => {
    const error = validateField(field, values[field], values, schema);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};

export default {
  rules,
  createValidationSchema,
  validateField,
  validateForm
};