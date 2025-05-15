import React from 'react';
import FormField from './FormField';

/**
 * Form section component for organizing fields
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export const FormSection = ({
  title,
  subtitle,
  children,
  columns = 1,
  className = '',
  ...rest
}) => {
  const gridClass = columns === 1 
    ? '' 
    : `grid grid-cols-1 md:grid-cols-${Math.min(columns, 3)} gap-x-4 gap-y-0`;
  
  return (
    <div className={`mb-6 ${className}`} {...rest}>
      {title && (
        <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      )}
      {subtitle && (
        <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
      )}
      <div className={gridClass}>
        {children}
      </div>
    </div>
  );
};

/**
 * Enhanced input field that uses FormContext
 * Extends FormField with automatic handling of form state and validation
 */
export const FormInput = ({ 
  name, 
  onChange, 
  onBlur, 
  value = '',
  error,
  touched = false,
  ...rest 
}) => {
  // Simplified version for initial testing
  return (
    <FormField
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      touched={touched}
      {...rest}
    />
  );
};

/**
 * Numeric input with unit label and automatic formatting
 */
export const NumberField = ({ 
  name, 
  unit, 
  unitPosition = 'right',
  min,
  max,
  step = 'any',
  precision = 2,
  value = '',
  onChange,
  onBlur,
  error,
  touched = false,
  ...rest 
}) => {
  // Simplified version for initial testing
  return (
    <div className="relative">
      {unitPosition === 'left' && unit && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{unit}</span>
        </div>
      )}
      
      <FormField
        type="number"
        name={name}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        touched={touched}
        className={unitPosition === 'left' ? 'pl-10' : ''}
        {...rest}
      />
      
      {unitPosition === 'right' && unit && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{unit}</span>
        </div>
      )}
    </div>
  );
};

/**
 * Toggle switch field for boolean values
 */
export const ToggleField = ({
  name,
  label,
  value = false,
  onChange,
  onBlur,
  error,
  touched = false,
  ...rest
}) => {
  // Simplified version for initial testing
  const handleToggle = () => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: !value,
          type: 'checkbox',
          checked: !value
        }
      });
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <button
          type="button"
          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
            value ? 'bg-green-600' : 'bg-gray-200'
          }`}
          role="switch"
          aria-checked={value || false}
          onClick={handleToggle}
          onBlur={() => onBlur && onBlur({ target: { name } })}
          {...rest}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
              value ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        {label && ( 
          <span className="ml-3 text-sm" onClick={handleToggle}>
            <span className={`font-medium ${value ? 'text-gray-900' : 'text-gray-500'}`}>
              {label}
            </span>
          </span>
        )}
      </div>
      
      {touched && error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

/**
 * Date picker field with calendar popup
 */
export const DateField = ({
  name,
  label,
  value = '',
  onChange,
  onBlur,
  error,
  touched = false,
  ...rest
}) => {
  // Simplified version for initial testing
  return (
    <FormField
      type="date"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      touched={touched}
      {...rest}
    />
  );
};

/**
 * Field with type toggle (e.g., Estimate/Actual)
 */
export const ToggleTypeField = ({
  name,
  label,
  options = [{ value: 'estimate', label: 'Estimate' }, { value: 'actual', label: 'Actual' }],
  value = '',
  onChange,
  error,
  touched = false,
  ...rest
}) => {
  // Simplified version for initial testing
  const currentValue = value || options[0].value;
  
  const handleClick = (optionValue) => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: optionValue
        }
      });
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex rounded-md shadow-sm">
        {options.map((option, index) => (
          <button
            key={option.value}
            type="button"
            className={`
              py-2 px-4 text-sm font-medium 
              ${index === 0 ? 'rounded-l-md' : ''} 
              ${index === options.length - 1 ? 'rounded-r-md' : ''}
              ${currentValue === option.value 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'}
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
            `}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      {touched && error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

// Export all components
export {
  FormSection,
  FormInput,
  NumberField,
  ToggleField,
  DateField,
  ToggleTypeField
};