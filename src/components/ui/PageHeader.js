import React from 'react';

/**
 * Reusable page header component
 * @param {Object} props - Component props
 * @param {string|React.ReactNode} props.title - Page title
 * @param {string|React.ReactNode} [props.subtitle] - Optional subtitle content
 * @param {React.ReactNode} [props.actions] - Optional actions area (buttons, links)
 * @returns {JSX.Element} Rendered component
 */
const PageHeader = ({ title, subtitle, actions = null }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{title}</h1>
        {subtitle && (
          typeof subtitle === 'string' ? (
            <p className="text-gray-600">{subtitle}</p>
          ) : (
            <div className="text-gray-600">{subtitle}</div>
          )
        )}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  </div>
);

export default PageHeader;
