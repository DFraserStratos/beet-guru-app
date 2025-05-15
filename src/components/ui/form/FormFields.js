import React from 'react';
import { useFormContext } from './FormContext';
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
  value, 
  ...rest 
}) => {
  // Get form context values and handlers
  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur 
  } = useFormContext();

  return (
    <FormField
      name={name}
      value={value !== undefined ? value : values[name] || ''}
      onChange={onChange || handleChange}
      onBlur={onBlur || handleBlur}
      error={errors[name]}
      touched={Boolean(touched[name])}
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
  ...rest 
}) => {
  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur,
    setFieldValue
  } = useFormContext();

  // Format value to specified precision when blurring the field
  const handleNumberBlur = (e) => {
    const { name, value } = e.target;

    if (value && !isNaN(parseFloat(value))) {
      // Format to specified precision
      const formattedValue = parseFloat(value).toFixed(precision);
      setFieldValue(name, formattedValue);
    }
    
    // Call regular blur handler
    handleBlur(e);
  };

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
        value={values[name] || ''}
        onChange={handleChange}
        onBlur={handleNumberBlur}
        error={errors[name]}
        touched={Boolean(touched[name])}
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
  ...rest
}) => {
  const { 
    values, 
    errors, 
    touched, 
    setFieldValue,
    handleBlur 
  } = useFormContext();

  const handleToggle = () => {
    setFieldValue(name, !values[name]);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <button
          type="button"
          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
            values[name] ? 'bg-green-600' : 'bg-gray-200'
          }`}
          role="switch"
          aria-checked={values[name] || false}
          onClick={handleToggle}
          onBlur={() => handleBlur({ target: { name } })}
          {...rest}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
              values[name] ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        {label && (
          <span className="ml-3 text-sm" onClick={handleToggle}>
            <span className={`font-medium ${values[name] ? 'text-gray-900' : 'text-gray-500'}`}>
              {label}
            </span>
          </span>
        )}
      </div>
      
      {touched[name] && errors[name] && (
        <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
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
  ...rest
}) => {
  const { 
    values, 
    errors, 
    touched, 
    handleChange,
    handleBlur 
  } = useFormContext();

  return (
    <FormField
      type="date"
      name={name}
      label={label}
      value={values[name] || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors[name]}
      touched={Boolean(touched[name])}
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
  ...rest
}) => {
  const { 
    values, 
    errors, 
    touched, 
    setFieldValue 
  } = useFormContext();

  const value = values[name] || options[0].value;

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
              ${value === option.value 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'}
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
            `}
            onClick={() => setFieldValue(name, option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      {touched[name] && errors[name] && (
        <p className="mt-1 text-xs text-red-600">{errors[name]}</p>
      )}
    </div>
  );
};

// Export all components
export default {
  FormSection,
  FormInput,
  NumberField,
  ToggleField,
  DateField,
  ToggleTypeField
};