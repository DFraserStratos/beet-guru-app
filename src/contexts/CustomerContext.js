import React, { createContext, useContext, useState } from 'react';

/**
 * Context for managing selected customer in retailer views
 */
const CustomerContext = createContext();

/**
 * Hook to use customer context
 * @returns {Object} Customer context value
 */
export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomer must be used within a CustomerProvider');
  }
  return context;
};

/**
 * Provider component for customer context
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider component
 */
export const CustomerProvider = ({ children }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCustomerRequired, setIsCustomerRequired] = useState(false);

  const selectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const clearCustomer = () => {
    setSelectedCustomer(null);
  };

  const requireCustomerSelection = (required = true) => {
    setIsCustomerRequired(required);
  };

  const value = {
    selectedCustomer,
    isCustomerRequired,
    selectCustomer,
    clearCustomer,
    requireCustomerSelection,
    hasSelectedCustomer: selectedCustomer !== null
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export default CustomerContext; 