import { useState, useEffect } from 'react';
import { ChevronDown, Filter, X, Users, Calendar, MapPin, ArrowDownUp, Plus, User, Search, Eye } from 'lucide-react';
import { logger } from '../../utils/logger';
import DataTable from '../ui/DataTable';
import DropdownMenu from '../ui/DropdownMenu';
import { useCustomer } from '../../contexts/CustomerContext';
import api from '../../services/api';
import { useApi, usePagination } from '../../hooks';
import { FormButton } from '../ui/form';
import PageHeader from '../ui/PageHeader';
import PageContainer from '../layout/PageContainer';

/**
 * Screen for retailers to manage their farmer customers
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const CustomersScreen = ({ isMobile, onViewCustomer = () => {}, user }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    region: 'all',
    sortBy: 'name'
  });
  
  // Use customer context to handle customer selection
  const { selectCustomer } = useCustomer();
  
  // Use the API hook to fetch customers for this retailer
  const { 
    data: customers, 
    loading, 
    error, 
    execute: fetchCustomers 
  } = useApi(api.customers.getByRetailerId);

  // Prepare customers data for pagination
  const customersData = customers || [];
  
  // Set up pagination with 10 customers per page
  const pagination = usePagination(customersData, 10);

  useEffect(() => {
    if (user?.id) {
      fetchCustomers(user.id);
    }
  }, [fetchCustomers, user?.id]);

  // Note: Removed automatic navigation useEffect to prevent conflicts
  // Navigation is now handled manually in handleViewCustomer
  
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleApplyFilters = () => {
    logger.info('Applying customer filters:', filters);
    if (isMobile) {
      setShowFilters(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      region: 'all',
      sortBy: 'name'
    });
  };
  
  // Handle adding a new customer
  const handleAddCustomer = () => {
    logger.info('Adding new customer...');
    // This would open a modal or navigate to add customer screen
  };

  // Common customer actions
  const getCustomerActions = (customer) => [
    { 
      label: 'View Details', 
      onClick: () => handleViewCustomer(customer), 
      icon: <Eye size={14} />,
      className: 'text-blue-600 hover:text-blue-800' 
    },
    {
      label: 'New Assessment',
      onClick: () => logger.info('Create assessment for customer', customer.id),
      icon: <Calendar size={14} />,
      className: 'text-green-600 hover:text-green-800' 
    }
  ];

  // Define table columns for customers
  const columns = [
    { 
      key: 'name', 
      label: 'Farmer Name',
      render: (item) => (
        <div className="font-medium text-gray-900">{item.name}</div>
      )
    },
    { 
      key: 'farmName', 
      label: 'Farm Name',
      render: (item) => (
        <div className="text-gray-600">{item.farmName || 'Not specified'}</div>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (item) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          item.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {item.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { 
      key: 'location', 
      label: 'Region',
      render: (item) => (
        <div className="text-gray-600">{item.location || 'Not specified'}</div>
      )
    },
    {
      key: 'actions',
      label: '',
      render: (item) => (
        <div className="flex items-center justify-end">
          <DropdownMenu 
            items={getCustomerActions(item)}
            className="inline-flex justify-end"
          />
        </div>
      )
    }
  ];

  // All columns are now visible on both desktop and mobile
  const visibleColumns = columns;

  // Handle row clicks for viewing customer details
  const handleRowClick = (customer) => {
    handleViewCustomer(customer);
  };

  // Handle customer view action - now also selects customer in context
  const handleViewCustomer = (customer) => {
    // Select the customer in the context
    selectCustomer(customer);
    // Navigate to customer detail page
    onViewCustomer(customer.id);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Custom mobile card renderer for customers
  const renderMobileCard = (customer) => (
    <div className="flex items-center justify-between">
      <div className="flex-1 pr-3">
        <h3 className="font-medium text-base text-gray-900 truncate mb-1">
          {customer.name}
        </h3>
        <p className="text-sm text-gray-600 truncate">
          {customer.farmName || 'Farm name not specified'}
        </p>
      </div>
      <DropdownMenu 
        items={getCustomerActions(customer)}
        className="inline-flex justify-end"
      />
    </div>
  );

  // Empty state content
  const emptyStateContent = (
    <div className="p-8 text-center">
      <Users size={48} className="text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">No customers found</h3>
      <p className="text-gray-500 mb-4">
        Start managing farmers by adding your first customer
      </p>
      <FormButton
        variant="primary"
        icon={<Plus size={16} />}
        onClick={handleAddCustomer}
      >
        Add Customer
      </FormButton>
    </div>
  );

  // Loading state skeleton (reuse from reports)
  if (loading) {
    return (
      <PageContainer>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </PageContainer>
    );
  }

  // Error state
  if (error) {
    return (
      <PageContainer>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-red-500">Error loading customers: {error?.message}</p>
        </div>
      </PageContainer>
    );
  }

  const statuses = ['All Statuses', 'Active', 'Inactive'];
  const regions = ['All Regions', 'Canterbury', 'Auckland', 'Waikato', 'Otago'];

  return (
    <PageContainer>
      {/* Header Section */}
      <PageHeader
        title="Customers"
        subtitle="Manage and view your farmer customers"
        actions={(
          <FormButton
            variant="primary"
            icon={<Plus size={16} />}
            onClick={handleAddCustomer}
          >
            {isMobile ? 'Add' : 'Add Customer'}
          </FormButton>
        )}
      />
      
      {/* Mobile Filter Toggle */}
      {isMobile && (
        <button 
          className="w-full bg-white rounded-lg shadow py-3 px-4 text-left flex justify-between items-center" 
          onClick={handleToggleFilters}
        >
          <span className="font-medium text-gray-700 flex items-center">
            <Filter size={16} className="mr-2" /> 
            Filters
          </span>
          <ChevronDown size={16} className="text-gray-500" />
        </button>
      )}
      
      {/* Filters Panel */}
      {(!isMobile || showFilters) && (
        <div className="bg-white rounded-xl shadow p-4">
          {isMobile && (
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="font-medium">Filters</h3>
              <button 
                className="text-gray-500" 
                onClick={handleToggleFilters}
              >
                <X size={18} />
              </button>
            </div>
          )}
          
          <div className="flex flex-wrap gap-4">
            {/* Status Filter */}
            <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-[160px]'}`}>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <User size={14} className="mr-1" /> Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Region Filter */}
            <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-[160px]'}`}>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <MapPin size={14} className="mr-1" /> Region
              </label>
              <div className="relative">
                <select
                  name="region"
                  value={filters.region}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border"
                >
                  <option value="all">All Regions</option>
                  {regions.slice(1).map((region) => (
                    <option key={region} value={region.toLowerCase()}>
                      {region}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sort By Filter */}
            <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-[160px]'}`}>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <ArrowDownUp size={14} className="mr-1" /> Sort By
              </label>
              <div className="relative">
                <select
                  name="sortBy"
                  value={filters.sortBy}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="nameDesc">Name (Z-A)</option>
                  <option value="location">Location (A-Z)</option>
                  <option value="recent">Recently Added</option>
                  <option value="lastAssessment">Last Assessment</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Filter Action Buttons */}
            <div className={`${isMobile ? 'w-full' : 'flex-initial'} flex ${isMobile ? 'justify-between' : 'justify-end'} items-end space-x-2 mt-${isMobile ? '4' : '0'}`}>
              <FormButton 
                variant="outline" 
                size="sm"
                onClick={handleResetFilters}
              >
                Reset
              </FormButton>
              <FormButton 
                variant="primary" 
                size="sm"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </FormButton>
            </div>
          </div>
        </div>
      )}
      
      {/* Customers List */}
      {!isMobile || (isMobile && !showFilters) ? (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {customersData.length === 0 ? (
              emptyStateContent
            ) : isMobile ? (
              // Mobile card layout with compact padding
              <ul className="divide-y divide-gray-200">
                {pagination.currentData.map((customer, index) => (
                  <li
                    key={customer.id || index}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(customer)}
                  >
                    <div className="p-4">
                      {renderMobileCard(customer)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              // Desktop table layout with compact padding
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {visibleColumns.map((column) => (
                      <th
                        key={column.key}
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pagination.currentData.map((customer, index) => (
                    <tr
                      key={customer.id || index}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 cursor-pointer`}
                      onClick={() => handleRowClick(customer)}
                    >
                      {visibleColumns.map((column) => (
                        <td 
                          key={`${customer.id}-${column.key}`} 
                          className="px-4 py-2 text-sm text-gray-900"
                        >
                          {column.render ? column.render(customer) : customer[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          
          {/* Pagination */}
          {pagination && (
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={pagination.goToPrevPage}
                  disabled={!pagination.hasPrevPage}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={pagination.goToNextPage}
                  disabled={!pagination.hasNextPage}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{pagination.startIndex}</span> to{' '}
                    <span className="font-medium">{pagination.endIndex}</span> of{' '}
                    <span className="font-medium">{pagination.totalItems}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={pagination.goToPrevPage}
                      disabled={!pagination.hasPrevPage}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={pagination.goToNextPage}
                      disabled={!pagination.hasNextPage}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </PageContainer>
  );
};

export default CustomersScreen; 