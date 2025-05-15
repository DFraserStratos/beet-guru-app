import React from 'react';

/**
 * Base card component - foundation for all card types
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Optional click handler
 * @param {boolean} props.noPadding - Whether to remove padding
 * @param {string} props.as - HTML element to render as (default: div)
 * @returns {JSX.Element} Rendered card component
 */
const BaseCard = ({
  children,
  className = '',
  onClick,
  noPadding = false,
  as: Component = 'div',
  ...rest
}) => {
  // Base card styling
  const baseClasses = 'bg-white rounded-lg shadow-sm';
  
  // Conditionally apply padding
  const paddingClasses = noPadding ? '' : 'p-4';
  
  // Add hover effect if clickable
  const hoverClasses = onClick ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' : '';
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${paddingClasses} ${hoverClasses} ${className}`;
  
  return (
    <Component 
      className={cardClasses} 
      onClick={onClick}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default BaseCard;
