import React, { useState, useEffect } from 'react';
import { ChevronDown, Filter, X, FileText, Calendar, Leaf, ArrowDownUp, Download, Edit, Send, Eye } from 'lucide-react';
import { logger } from '../../utils/logger';
import DataTable from '../ui/DataTable';
import ReportsTableSkeleton from '../ui/ReportsTableSkeleton';
import DropdownMenu from '../ui/DropdownMenu';
import api from '../../services/api';
import { useApi } from '../../hooks';
import { FormButton } from '../ui/form';
import PageHeader from '../ui/PageHeader';
import PageContainer from '../layout/PageContainer';


/**
 * Screen for displaying and managing reports
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ReportsScreen = ({ isMobile, onViewReport = () => {}, user }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    cultivar: 'all',
    season: 'all',
    sortBy: 'date'
  });
  
  // Use the API hook to fetch reports
  // For farmers, filter by user ID; for retailers, show all
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

  useEffect(() => {
    // Pass user filtering parameter based on account type
    const userId = user?.accountType === 'farmer' ? user.id : null;
    fetchReports(userId);
    fetchCompletedAssessments(userId);
  }, [fetchReports, fetchCompletedAssessments, user]);
  
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
      label: report.status === 'sent' ? 'Resend Report' : 'Send Report',
      onClick: () => handleSendReport(report),
      icon: <Send size={14} />,
      className: 'text-green-600 hover:text-green-800'
    }
  ];

  // Define table columns for the reports - with new cultivar and season columns
  const columns = [
    { 
      key: 'created', 
      label: 'Date',
      render: (item) => new Date(item.created).toLocaleDateString('en-NZ', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      })
    },
    { 
      key: 'title', 
      label: 'Report Title' 
    },
    { 
      key: 'location', 
      label: 'Location' 
    },
    { 
      key: 'cultivar', 
      label: 'Cultivar/Crop Type' 
    },
    { 
      key: 'season', 
      label: 'Season' 
    },
    {
      key: 'actions',
      label: '',
      render: (item) => (
        <div className="flex items-center justify-end">
          <DropdownMenu 
            items={getReportActions(item)}
            className="inline-flex justify-end"
          />
        </div>
      )
    }
  ];

  // Handle row clicks for viewing reports
  const handleRowClick = (report) => {
    onViewReport(report.id);
  };

  // Remove the reportsWithActions mapping since actions are now in columns
  const reportsData = reports || [];
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderReportCard = (report) => (
    <>
      <h3 className="font-medium text-base text-gray-900 line-clamp-1 mb-1">
        {report.title}
      </h3>
      <div className="text-sm text-gray-600 space-y-1 mb-3">
        <p>Date: {formatDate(report.created)}</p>
        <p>Location: {report.location}</p>
        <p>Cultivar: {report.cultivar || 'Not specified'}</p>
        <p>Season: {report.season || 'Not specified'}</p>
      </div>
      <div className="flex justify-between mt-2">
        {getReportActions(report).map((action, index) => (
          <button
            key={index}
            className={`text-sm font-medium ${action.className}`}
            onClick={action.onClick}
          >
            {action.label}
          </button>
        ))}
      </div>
    </>
  );

  // Empty state content
  const emptyStateContent = (
    <div className="p-8 text-center">
      <FileText size={48} className="text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">No reports found</h3>
      <p className="text-gray-500">
        Complete an assessment to generate a report
      </p>
    </div>
  );

  // Get unique cultivars and seasons for filter options
  const cultivars = ['All Cultivars', 'Brigadier', 'Kyros', 'Feldherr', 'Blizzard', 'Blaze'];
  const seasons = ['All Seasons', '2024/2025', '2023/2024', '2022/2023'];

  // Loading state
  if (loading || loadingAssessments) {
    return (
      <PageContainer>
        <PageHeader
          title="Reports"
          subtitle="View and share your assessment reports"
          actions={(
            <FormButton
              variant="primary"
              icon={<Download size={16} />}
              onClick={handleExport}
            >
              {isMobile ? 'Export' : 'Export Reports'}
            </FormButton>
          )}
        />
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
          subtitle="View and share your assessment reports"
          actions={(
            <FormButton
              variant="primary"
              icon={<Download size={16} />}
              onClick={handleExport}
            >
              {isMobile ? 'Export' : 'Export Reports'}
            </FormButton>
          )}
        />
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
        subtitle="View and share your assessment reports"
        actions={(
          <FormButton
            variant="primary"
            icon={<Download size={16} />}
            onClick={handleExport}
          >
            {isMobile ? 'Export' : 'Export Reports'}
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
      <DataTable
        data={reportsData}
        columns={columns}
        onRowClick={handleRowClick}
        emptyMessage={emptyStateContent}
        mobileCardLayout={isMobile}
        renderMobileCard={renderReportCard}
      />
    </PageContainer>
  );
};

export default ReportsScreen;
