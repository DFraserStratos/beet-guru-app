import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Button variants
 */
const VARIANTS = {
  primary: 'bg-green-600 text-white hover:bg-green-700',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  outline: 'border border-green-600 text-green-600 hover:bg-green-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  link: 'text-green-600 hover:text-green-800 hover:underline'
};

/**
 * Button sizes
 */
const SIZES = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-6 py-2',
  lg: 'px-8 py-3 text-lg'
};

/**
 * Reusable form button component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const FormButton = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  icon = null,
  onClick,
  className = '',
  ...rest
}) => {
  // Merge classes based on variant and size
  const buttonClasses = `
    ${VARIANTS[variant] || VARIANTS.primary}
    ${SIZES[size] || SIZES.md}
    ${fullWidth ? 'w-full' : ''}
    transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
    flex justify-center items-center
    ${isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''}
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading ? (
        <>
          <Loader size={16} className="animate-spin mr-2" />
          <span>{children || 'Loading...'}</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default FormButton;