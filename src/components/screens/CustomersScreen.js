import { useState, useEffect } from 'react';
import { ChevronDown, Filter, X, Users, Calendar, MapPin, ArrowDownUp, Plus, User, Search, Eye } from 'lucide-react';
import { logger } from '../../utils/logger';
import DataTable from '../ui/DataTable';
import DropdownMenu from '../ui/DropdownMenu';
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
      onClick: () => onViewCustomer(customer.id), 
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
      label: 'Customer Name',
      render: (item) => (
        <div className="font-medium text-gray-900">{item.name}</div>
      )
    },
    { 
      key: 'email', 
      label: 'Email',
      hideOnMobile: true,
      render: (item) => (
        <div className="text-gray-600">{item.email}</div>
      )
    },
    { 
      key: 'location', 
      label: 'Location',
      hideOnMobile: true
    },
    { 
      key: 'paddockCount', 
      label: 'Paddocks',
      hideOnMobile: true,
      render: (item) => `${item.paddockCount || 0} paddocks`
    },
    { 
      key: 'lastAssessment', 
      label: 'Last Assessment',
      hideOnMobile: true,
      render: (item) => item.lastAssessment 
        ? new Date(item.lastAssessment).toLocaleDateString('en-NZ', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })
        : 'No assessments'
    },
    { 
      key: 'status', 
      label: 'Status',
      hideOnMobile: true,
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

  // Filter columns based on mobile view
  const visibleColumns = isMobile 
    ? columns.filter(column => !column.hideOnMobile)
    : columns;

  // Handle row clicks for viewing customer details
  const handleRowClick = (customer) => {
    onViewCustomer(customer.id);
  };

  // Handle customer view action
  const handleViewCustomer = (customerId) => {
    onViewCustomer(customerId);
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
    <div className="flex items-center justify-between py-3 min-h-[60px]">
      <div className="flex-1 pr-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-base text-gray-900 truncate pr-2">
            {customer.name}
          </h3>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
            customer.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {customer.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4 truncate">
            <span className="flex items-center truncate">
              <MapPin size={12} className="mr-1 flex-shrink-0" />
              <span className="truncate">{customer.location}</span>
            </span>
            <span className="whitespace-nowrap">{customer.paddockCount || 0} paddocks</span>
          </div>
          <DropdownMenu 
            items={getCustomerActions(customer)}
            className="inline-flex justify-end ml-2"
          />
        </div>
      </div>
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
            {/* Search Filter */}
            <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-[200px]'}`}>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Search size={14} className="mr-1" /> Search Customers
              </label>
 
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by name or email..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 px-3 border"
              />
            </div>
            
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
        <DataTable
          data={customersData}
          columns={visibleColumns}
          onRowClick={handleRowClick}
          emptyMessage={emptyStateContent}
          mobileCardLayout={isMobile}
          renderMobileCard={renderMobileCard}
          pagination={pagination}
          isMobile={isMobile}
        />
      ) : null}
    </PageContainer>
  );
};

export default CustomersScreen; 