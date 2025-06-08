import React, { useState, useEffect } from 'react';
import { ChevronDown, Filter, X, FileText, Calendar, Leaf, ArrowDownUp, Download, Edit, Send, Eye, Search } from 'lucide-react';
import { logger } from '../../utils/logger';
import DataTable from '../ui/DataTable';
import ReportsTableSkeleton from '../ui/ReportsTableSkeleton';
import CustomerSelector from '../ui/CustomerSelector';
import DropdownMenu from '../ui/DropdownMenu';
import api from '../../services/api';
import { useApi, usePagination } from '../../hooks';
import { useCustomer } from '../../contexts/CustomerContext';
import { FormButton } from '../ui/form';
import PageHeader from '../ui/PageHeader';
import PageContainer from '../layout/PageContainer';


/**
 * Screen for displaying and managing reports
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ReportsScreen = ({ isMobile, onViewReport = () => {}, user }) => {
  const { selectedCustomer, requireCustomerSelection } = useCustomer();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: 'all',
    cultivar: 'all',
    season: 'all',
    sortBy: 'date'
  });
  
  // For retailers and admins, require customer selection; for farmers, don't
  useEffect(() => {
    if (user?.accountType === 'retailer' || user?.isAdmin) {
      requireCustomerSelection(true);
    } else {
      requireCustomerSelection(false);
    }
  }, [user?.accountType, user?.isAdmin, requireCustomerSelection]);

  // Determine which user ID to use for filtering
  const getUserIdForFiltering = () => {
    if (user?.accountType === 'farmer') {
      return user.id;
    } else if (user?.accountType === 'retailer' || user?.isAdmin) {
      return selectedCustomer?.id || null;
    }
    return null;
  };
  
  // Use the API hook to fetch reports
  const { 
    data: reports, 
    loading, 
    error, 
    execute: fetchReports 
  } = useApi(api.reports.getAll);

  // Use the API hook to fetch completed assessments
  const {
    data: completedAssessments,
    loading: loadingAssessments,
    error: assessmentsError,
    execute: fetchCompletedAssessments
  } = useApi(api.assessments.getCompletedAssessments);

  // Prepare reports data for pagination
  const reportsData = reports || [];
  
  // Set up pagination with 10 items per page
  const pagination = usePagination(reportsData, 10);

  useEffect(() => {
    const userId = getUserIdForFiltering();
    // Only fetch data if:
    // 1. User is a farmer (always has userId)
    // 2. User is a retailer/admin AND has selected a customer
    if (user?.accountType === 'farmer' || ((user?.accountType === 'retailer' || user?.isAdmin) && userId)) {
      fetchReports(userId);
      fetchCompletedAssessments(userId);
    }
  }, [fetchReports, fetchCompletedAssessments, user, selectedCustomer]);
  
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
    // In a real app, this would filter the data
    logger.info('Applying filters:', filters);
    // Close the filters panel on mobile
    if (isMobile) {
      setShowFilters(false);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      dateRange: 'all',
      cultivar: 'all',
      season: 'all',
      sortBy: 'date'
    });
  };
  
  // Handle export action
  const handleExport = () => {
    logger.info('Exporting reports...');
    // This would trigger the export functionality in a real app
  };

  // Handle report view action
  const handleViewReport = (reportId) => {
    onViewReport(reportId);
  };

  const handleEditReport = (reportId) => {
    logger.info('Edit report', reportId);
    // TODO: Implement edit functionality
  };

  const handleSendReport = (report) => {
    logger.info('Send report', report.id);
    // TODO: Implement send functionality
  };

  const handleDownloadReport = (report) => {
    logger.info('Download report', report.id);
    // TODO: Implement download functionality
  };

  // Common report actions
  const getReportActions = (report) => [
    { 
      label: 'View Report', 
      onClick: () => handleViewReport(report.id), 
      icon: <Eye size={14} />,
      className: 'text-blue-600 hover:text-blue-800' 
    },
    { 
      label: 'Edit Report',
      onClick: () => handleEditReport(report.id),
      icon: <Edit size={14} />,
      className: 'text-gray-600 hover:text-gray-800' 
    },
    { 
      label: 'Send Report',
      onClick: () => handleSendReport(report),
      icon: <Send size={14} />,
      className: 'text-green-600 hover:text-green-800'
    },
    { 
      label: 'Download Report',
      onClick: () => handleDownloadReport(report),
      icon: <Download size={14} />,
      className: 'text-purple-600 hover:text-purple-800'
    }
  ];

  // Define table columns for the reports - with new cultivar and season columns
  const columns = [
    { 
      key: 'created', 
      label: 'Date',
      hideOnMobile: false,
      render: (item) => {
        const date = new Date(item.created);
        // On mobile, show shorter date format
        return isMobile 
          ? date.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' })
          : date.toLocaleDateString('en-NZ', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            });
      }
    },
    { 
      key: 'title', 
      label: isMobile ? 'Report' : 'Report Title',
      hideOnMobile: false,
      render: (item) => (
        <div className={`${isMobile ? 'text-sm max-w-[120px]' : ''} font-medium truncate`}>
          {item.title}
        </div>
      )
    },
    { 
      key: 'location', 
      label: 'Location',
      hideOnMobile: true // Hide on mobile to save space
    },
    { 
      key: 'cultivar', 
      label: 'Cultivar/Crop Type',
      hideOnMobile: true // Hide on mobile to save space
    },
    { 
      key: 'season', 
      label: 'Season',
      hideOnMobile: true // Hide on mobile to save space
    },
    {
      key: 'actions',
      label: '',
      hideOnMobile: false,
      render: (item) => (
        <div className={`flex items-center ${isMobile ? 'justify-center' : 'justify-end'}`}>
          <DropdownMenu 
            items={getReportActions(item)}
            className="inline-flex"
          />
        </div>
      )
    }
  ].filter(column => !isMobile || !column.hideOnMobile); // Filter out hidden columns on mobile

  // Handle row clicks for viewing reports
  const handleRowClick = (report) => {
    onViewReport(report.id);
  };

  // Empty state content
  const emptyStateContent = (
    <div className="p-8 text-center">
      <FileText size={48} className="text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">No reports found</h3>
      <p className="text-gray-500">
        {(user?.accountType === 'retailer' || user?.isAdmin) && selectedCustomer 
          ? `Complete an assessment for ${selectedCustomer.name} to generate a report`
          : "Complete an assessment to generate a report"
        }
      </p>
    </div>
  );

  // Get unique cultivars and seasons for filter options
  const cultivars = ['All Cultivars', 'Brigadier', 'Kyros', 'Feldherr', 'Blizzard', 'Blaze'];
  const seasons = ['All Seasons', '2024/2025', '2023/2024', '2022/2023'];

  // Check if we should show data (for retailers/admins, need customer selection)
  const shouldShowData = user?.accountType === 'farmer' || ((user?.accountType === 'retailer' || user?.isAdmin) && selectedCustomer);

  // Loading state
  if (loading || loadingAssessments) {
    return (
      <PageContainer>
        <PageHeader
          title="Reports"
          subtitle={
            (user?.accountType === 'retailer' || user?.isAdmin) && selectedCustomer 
              ? `View and share assessment reports for ${selectedCustomer.name}`
              : "View and share your assessment reports"
          }
          actions={(
            <FormButton
              variant="primary"
              icon={<Download size={16} />}
              onClick={handleExport}
              disabled={(user?.accountType === 'retailer' || user?.isAdmin) && !selectedCustomer}
            >
              {isMobile ? 'Export' : 'Export Reports'}
            </FormButton>
          )}
        />
        {!isMobile && <CustomerSelector user={user} isMobile={isMobile} />}
        <ReportsTableSkeleton rows={3} />
      </PageContainer>
    );
  }
  
  // Error state
  if (error || assessmentsError) {
    return (
      <PageContainer>
        <PageHeader
          title="Reports"
          subtitle={
            (user?.accountType === 'retailer' || user?.isAdmin) && selectedCustomer 
              ? `View and share assessment reports for ${selectedCustomer.name}`
              : "View and share your assessment reports"
          }
          actions={(
            <FormButton
              variant="primary"
              icon={<Download size={16} />}
              onClick={handleExport}
              disabled={(user?.accountType === 'retailer' || user?.isAdmin) && !selectedCustomer}
            >
              {isMobile ? 'Export' : 'Export Reports'}
            </FormButton>
          )}
        />
        {!isMobile && <CustomerSelector user={user} isMobile={isMobile} />}
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-red-500">Error loading reports: {error?.message || assessmentsError?.message}</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Header Section */}
      <PageHeader
        title="Reports"
        subtitle={
          (user?.accountType === 'retailer' || user?.isAdmin) && selectedCustomer 
            ? `View and share assessment reports for ${selectedCustomer.name}`
            : "View and share your assessment reports"
        }
        actions={(
          <FormButton
            variant="primary"
            icon={<Download size={16} />}
            onClick={handleExport}
            disabled={(user?.accountType === 'retailer' || user?.isAdmin) && !selectedCustomer}
          >
            {isMobile ? 'Export' : 'Export Reports'}
          </FormButton>
        )}
      />
      
      {/* Customer Selector - shown for retailers and admins (hidden on mobile as it's in header) */}
      {!isMobile && <CustomerSelector user={user} isMobile={isMobile} />}
      
      {/* Only show content if customer is selected (for retailers/admins) or user is farmer */}
      {shouldShowData ? (
        <>
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
          
          {/* Filters Panel - Conditional for mobile */}
          {(!isMobile || (isMobile && showFilters)) && (
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
                {/* Search Filter - Only for retailers and admins */}
                {user?.accountType !== 'farmer' && (
                  <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-[200px]'}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Search size={14} className="mr-1" /> Search
                    </label>
                    <input
                      type="text"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      placeholder="Search reports..."
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 px-3 border"
                    />
                  </div>
                )}
                
                {/* Date Range Filter */}
                <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-[160px]'}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Calendar size={14} className="mr-1" /> Date Range
                  </label>
                  <div className="relative">
                    <select
                      name="dateRange"
                      value={filters.dateRange}
                      onChange={handleFilterChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border"
                    >
                      <option value="all">All Time</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                      <option value="year">This Year</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* Cultivar Filter */}
                <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-[160px]'}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Leaf size={14} className="mr-1" /> Cultivar
                  </label>
                  <div className="relative">
                    <select
                      name="cultivar"
                      value={filters.cultivar}
                      onChange={handleFilterChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border"
                    >
                      <option value="all">All Cultivars</option>
                      {cultivars.slice(1).map((cultivar) => (
                        <option key={cultivar} value={cultivar.toLowerCase()}>
                          {cultivar}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* Season Filter */}
                <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-[160px]'}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Calendar size={14} className="mr-1" /> Season
                  </label>
                  <div className="relative">
                    <select
                      name="season"
                      value={filters.season}
                      onChange={handleFilterChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border"
                    >
                      <option value="all">All Seasons</option>
                      {seasons.slice(1).map((season) => (
                        <option key={season} value={season.toLowerCase()}>
                          {season}
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
                      <option value="date">Date (Newest First)</option>
                      <option value="dateAsc">Date (Oldest First)</option>
                      <option value="location">Location (A-Z)</option>
                      <option value="cultivar">Cultivar (A-Z)</option>
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
          
          {/* Reports List */}
          <div className={`${isMobile ? 'overflow-x-auto -mx-4 px-4' : ''}`}>
            <DataTable
              data={reportsData}
              columns={columns}
              onRowClick={handleRowClick}
              emptyMessage={emptyStateContent}
              mobileCardLayout={false} // Always use table layout
              pagination={pagination}
              isMobile={isMobile}
            />
          </div>
        </>
      ) : (
        // Show placeholder when no customer is selected (retailers and admins only)
        (user?.accountType === 'retailer' || user?.isAdmin) && !selectedCustomer && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <FileText size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Select a customer</h3>
            <p className="text-gray-500">
              Choose a customer from the dropdown above to view their reports
            </p>
          </div>
        )
      )}
    </PageContainer>
  );
};

export default ReportsScreen;
