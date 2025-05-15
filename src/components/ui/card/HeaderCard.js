import React from 'react';
import BaseCard from './BaseCard';

/**
 * Card component with header and optional description
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {string} props.description - Optional card description
 * @param {string} props.titleClassName - Additional CSS classes for title
 * @param {string} props.descriptionClassName - Additional CSS classes for description
 * @param {string} props.headerClassName - Additional CSS classes for header section
 * @param {string} props.contentClassName - Additional CSS classes for content section
 * @param {boolean} props.divider - Whether to show a divider between header and content
 * @returns {JSX.Element} Rendered card component with header
 */
const HeaderCard = ({
  children,
  title,
  description,
  titleClassName = '',
  descriptionClassName = '',
  headerClassName = '',
  contentClassName = '',
  divider = false,
  ...rest
}) => {
  return (
    <BaseCard {...rest}>
      <div className={`mb-2 ${headerClassName}`}>
        {title && (
          <h3 className={`text-lg font-semibold text-gray-800 ${titleClassName}`}>
            {title}
          </h3>
        )}
        
        {description && (
          <p className={`text-sm text-gray-500 mt-1 ${descriptionClassName}`}>
            {description}
          </p>
        )}
      </div>
      
      {divider && <hr className="border-gray-200 my-3" />}
      
      {children && (
        <div className={contentClassName}>
          {children}
        </div>
      )}
    </BaseCard>
  );
};

export default HeaderCard;
