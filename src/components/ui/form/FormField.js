import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Reusable form field component for inputs, selects, textareas
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const FormField = forwardRef(({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  options,
  children,
  hint,
  required = false,
  disabled = false,
  className = '',
  ...rest
}, ref) => {
  // Base classes for form controls
  const baseClasses = "block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 px-3 border";
  const validClasses = `${baseClasses} border-gray-300`;
  const invalidClasses = `${baseClasses} border-red-300`;
  const disabledClasses = `${baseClasses} bg-gray-100 text-gray-500 border-gray-300`;

  // Determine which classes to apply
  const fieldClasses = disabled 
    ? disabledClasses 
    : (touched && error ? invalidClasses : validClasses);

  // Common props for all form elements
  const commonProps = {
    id: name,
    name,
    value: value || '',
    onChange,
    onBlur,
    disabled,
    required,
    className: `${fieldClasses} ${className}`,
    ref,
    ...rest
  };

  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <div className="relative">
          <select {...commonProps} className={`${commonProps.className} appearance-none pr-10`}>
            {placeholder && (
              <option value="" disabled={required}>
                {placeholder}
              </option>
            )}
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown 
            size={16} 
            className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" 
          />
        </div>
      ) : type === 'textarea' ? (
        <textarea 
          {...commonProps} 
          rows={rest.rows || 3}
        />
      ) : type === 'checkbox' ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            {...commonProps}
            checked={Boolean(value)}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          {children && (
            <span className="ml-2 text-sm text-gray-600">{children}</span>
          )}
        </div>
      ) : (
        <input
          type={type}
          {...commonProps}
          placeholder={placeholder}
        />
      )}

      {hint && !error && (
        <p className="mt-1 text-xs text-gray-500">{hint}</p>
      )}

      {touched && error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
