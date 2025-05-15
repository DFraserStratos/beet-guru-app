import React from 'react';
import BaseCard from './BaseCard';

/**
 * Card component with icon and content
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Card content
 * @param {ReactNode} props.icon - Icon component to display
 * @param {string} props.title - Card title
 * @param {string} props.description - Optional card description
 * @param {string} props.iconClassName - Additional CSS classes for icon container
 * @param {string} props.iconSize - Size of the icon container ('sm', 'md', 'lg')
 * @param {string} props.iconPosition - Position of the icon ('left', 'top')
 * @param {string} props.contentClassName - Additional CSS classes for content
 * @returns {JSX.Element} Rendered card component with icon
 */
const IconCard = ({
  children,
  icon,
  title,
  description,
  iconClassName = '',
  iconSize = 'md',
  iconPosition = 'left',
  contentClassName = '',
  ...rest
}) => {
  // Size classes for icon container
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };
  
  // Base icon container classes
  const iconContainerClasses = `flex items-center justify-center rounded-full ${sizeClasses[iconSize]} ${iconClassName}`;
  
  // Default icon container styling if not provided
  const iconContainerWithStyleClasses = iconClassName || `bg-green-100 text-green-600`;
  
  // For left position, render a horizontal layout
  if (iconPosition === 'left') {
    return (
      <BaseCard {...rest}>
        <div className="flex items-start">
          {icon && (
            <div className={`${iconContainerClasses} ${iconContainerWithStyleClasses} mr-4 flex-shrink-0`}>
              {icon}
            </div>
          )}
          
          <div className={`flex-1 ${contentClassName}`}>
            {title && (
              <h3 className="text-lg font-semibold text-gray-800">
                {title}
              </h3>
            )}
            
            {description && (
              <p className="text-sm text-gray-500 mt-1">
                {description}
              </p>
            )}
            
            {children && (
              <div className="mt-2">
                {children}
              </div>
            )}
          </div>
        </div>
      </BaseCard>
    );
  }
  
  // For top position, render a vertical layout
  return (
    <BaseCard {...rest}>
      <div className="flex flex-col items-center text-center">
        {icon && (
          <div className={`${iconContainerClasses} ${iconContainerWithStyleClasses} mb-4`}>
            {icon}
          </div>
        )}
        
        <div className={contentClassName}>
          {title && (
            <h3 className="text-lg font-semibold text-gray-800">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-sm text-gray-500 mt-1">
              {description}
            </p>
          )}
          
          {children && (
            <div className="mt-2">
              {children}
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
};

export default IconCard;
