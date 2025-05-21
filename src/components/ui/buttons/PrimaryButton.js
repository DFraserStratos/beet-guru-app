import React from 'react';

const PrimaryButton = ({ children, className = '', ...props }) => (
  <button
    type="button"
    className={`bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark flex justify-center items-center ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default PrimaryButton;
