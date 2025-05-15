import React from 'react';
import ActionCard from './ActionCard';

/**
 * Specialized card component for page headers
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {ReactNode} props.actions - Optional action buttons for the page
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Rendered page header card
 */
const PageHeaderCard = ({
  title,
  description,
  actions,
  className = '',
  ...rest
}) => {
  return (
    <ActionCard
      title={title}
      description={description}
      actions={actions}
      className={`mb-6 ${className}`}
      titleClassName="text-xl md:text-2xl"
      actionsPosition="top-right"
      {...rest}
    />
  );
};

export default PageHeaderCard;
