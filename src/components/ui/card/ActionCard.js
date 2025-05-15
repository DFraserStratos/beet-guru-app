import React from 'react';
import HeaderCard from './HeaderCard';

/**
 * Card component with header and action buttons
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {string} props.description - Optional card description
 * @param {ReactNode} props.actions - Action buttons/components to display in header
 * @param {string} props.actionsPosition - Position of actions ('top-right', 'bottom', 'bottom-right')
 * @param {boolean} props.divider - Whether to show divider between header and content
 * @returns {JSX.Element} Rendered card component with actions
 */
const ActionCard = ({
  children,
  title,
  description,
  actions,
  actionsPosition = 'top-right',
  divider = false,
  ...rest
}) => {
  // If actions should be in the top-right, we need to create a flex header
  if (actionsPosition === 'top-right' && actions) {
    return (
      <HeaderCard
        title={null}
        description={null}
        divider={divider}
        {...rest}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
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
          </div>
          
          <div className="flex items-center">
            {actions}
          </div>
        </div>
        
        {divider && <hr className="border-gray-200 my-3" />}
        
        {children}
      </HeaderCard>
    );
  }

  // If actions should be at the bottom
  return (
    <HeaderCard
      title={title}
      description={description}
      divider={divider}
      {...rest}
    >
      {children}
      
      {actions && (
        <>
          {actionsPosition !== 'bottom' && <div className="mt-4" />}
          <div className={`mt-4 flex ${actionsPosition === 'bottom-right' ? 'justify-end' : 'justify-start'}`}>
            {actions}
          </div>
        </>
      )}
    </HeaderCard>
  );
};

export default ActionCard;
