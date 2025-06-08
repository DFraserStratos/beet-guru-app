import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks';

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
 * @param {Object} props.user - Current user object (to clear selection on user change)
 * @returns {JSX.Element} Provider component
 */
export const CustomerProvider = ({ children, user }) => {
  // Use localStorage to persist selected customer across sessions
  const [selectedCustomer, setSelectedCustomer] = useLocalStorage('beet-guru-selected-customer', null);
  const [isCustomerRequired, setIsCustomerRequired] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(user?.id);

  // Clear customer selection when user changes (logout/login)
  useEffect(() => {
    if (user?.id !== currentUserId) {
      setSelectedCustomer(null);
      setCurrentUserId(user?.id);
    }
  }, [user?.id, currentUserId, setSelectedCustomer]);

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