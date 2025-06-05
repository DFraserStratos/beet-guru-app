import React, { useEffect } from 'react';
import { ChevronDown, User, Users } from 'lucide-react';
import { useApi } from '../../hooks';
import api from '../../services/api';
import { useCustomer } from '../../contexts/CustomerContext';

/**
 * Customer selector component for retailer views
 * @param {Object} props - Component props
 * @param {Object} props.user - Current user object
 * @param {boolean} props.isMobile - Mobile view flag
 * @returns {JSX.Element} Rendered component
 */
const CustomerSelector = ({ user, isMobile }) => {
  const { selectedCustomer, selectCustomer, isCustomerRequired } = useCustomer();
  
  // Fetch customers for this retailer
  const { 
    data: customers, 
    loading, 
    error, 
    execute: fetchCustomers 
  } = useApi(api.customers.getByRetailerId);

  useEffect(() => {
    if (user?.id && user?.accountType === 'retailer') {
      fetchCustomers(user.id);
    }
  }, [fetchCustomers, user]);

  // Don't render for farmers
  if (!user || user.accountType !== 'retailer') {
    return null;
  }

  const handleCustomerSelect = (e) => {
    const customerId = e.target.value;
    if (customerId === '') {
      selectCustomer(null);
    } else {
      const customer = customers.find(c => c.id === customerId);
      selectCustomer(customer);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="animate-pulse flex items-center space-x-3">
          <div className="h-5 w-5 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex items-center space-x-3 text-red-600">
          <Users size={20} />
          <span className="text-sm">Error loading customers: {error}</span>
        </div>
      </div>
    );
  }

  // No customers state
  if (!customers || customers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex items-center space-x-3 text-gray-500">
          <Users size={20} />
          <span className="text-sm">No customers found. Add customers to view their data.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex items-center space-x-3">
        <User size={20} className="text-green-600 flex-shrink-0" />
        <label className="text-sm font-medium text-gray-700 flex-shrink-0">
          {isMobile ? 'Customer:' : 'Select Customer:'}
        </label>
        <div className="flex-1 relative">
          <select
            value={selectedCustomer?.id || ''}
            onChange={handleCustomerSelect}
            className={`
              block w-full rounded-md shadow-sm text-sm py-2 pl-3 pr-10 appearance-none border
              ${isCustomerRequired && !selectedCustomer 
                ? 'border-amber-300 bg-amber-50 focus:border-amber-500 focus:ring-amber-500' 
                : 'border-gray-300 bg-white focus:border-green-500 focus:ring-green-500'
              }
            `}
          >
            <option value="">
              {isCustomerRequired ? 'Please select a customer...' : 'All customers'}
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} {customer.farmName ? `(${customer.farmName})` : ''}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default CustomerSelector; 