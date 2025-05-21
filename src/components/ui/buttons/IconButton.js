import React from 'react';

const IconButton = ({ icon, label, className = '', ...props }) => (
  <button
    type="button"
    aria-label={label}
    className={`p-2 rounded-full hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-dark ${className}`}
    {...props}
  >
    {icon}
  </button>
);

export default IconButton;
