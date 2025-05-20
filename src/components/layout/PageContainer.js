import React from 'react';

/**
 * Container component for consistent page layout
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {React.ReactNode} [props.breadcrumb] - Optional breadcrumb element
 * @param {React.ReactNode} [props.header] - Optional header element
 * @param {string} [props.className] - Additional classes for the container
 * @returns {JSX.Element} Rendered component
 */
const PageContainer = ({ children, breadcrumb, header, className = '' }) => {
  return (
    <div className={`max-w-7xl mx-auto p-4 md:p-6 space-y-6 ${className}`.trim()}>
      {breadcrumb && <div>{breadcrumb}</div>}
      {header && <div>{header}</div>}
      {children}
    </div>
  );
};

export default PageContainer;
