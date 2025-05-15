import React from 'react';
import HeaderCard from './HeaderCard';

/**
 * Card component with status indicator
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Card content
 * @param {string} props.title - Card title
 * @param {string} props.description - Optional card description
 * @param {string} props.status - Status value ('draft', 'completed', 'not-started', etc.)
 * @param {Object} props.statusConfig - Configuration for status colors and labels
 * @param {string} props.statusPosition - Position of status badge ('top-right', 'title-right', 'bottom-right')
 * @returns {JSX.Element} Rendered card component with status
 */
const StatusCard = ({
  children,
  title,
  description,
  status,
  statusConfig = defaultStatusConfig,
  statusPosition = 'top-right',
  ...rest
}) => {
  // Get status configuration
  const statusInfo = statusConfig[status] || statusConfig.default;
  
  // Create status badge
  const StatusBadge = (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}
    >
      {statusInfo.label}
    </span>
  );
  
  // For title-right position, modify the title
  if (statusPosition === 'title-right' && title) {
    return (
      <HeaderCard
        title={
          <div className="flex items-center justify-between">
            <span>{title}</span>
            {StatusBadge}
          </div>
        }
        description={description}
        {...rest}
      >
        {children}
      </HeaderCard>
    );
  }
  
  // For top-right position
  if (statusPosition === 'top-right') {
    return (
      <HeaderCard
        title={null}
        description={null}
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
          
          <div>
            {StatusBadge}
          </div>
        </div>
        
        {children}
      </HeaderCard>
    );
  }
  
  // For bottom-right and other positions
  return (
    <HeaderCard
      title={title}
      description={description}
      {...rest}
    >
      {children}
      
      <div className="mt-3 flex justify-end">
        {StatusBadge}
      </div>
    </HeaderCard>
  );
};

// Default status configurations
const defaultStatusConfig = {
  'draft': {
    label: 'Draft',
    className: 'bg-amber-100 text-amber-800'
  },
  'not-started': {
    label: 'Not Started',
    className: 'bg-gray-100 text-gray-800'
  },
  'completed': {
    label: 'Completed',
    className: 'bg-green-100 text-green-800'
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-blue-100 text-blue-800'
  },
  'default': {
    label: 'Status',
    className: 'bg-gray-100 text-gray-800'
  }
};

export default StatusCard;
