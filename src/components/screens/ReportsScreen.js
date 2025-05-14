import { useState, useEffect } from 'react';
import { ChevronDown, Filter, X, FileText, Calendar, Leaf, ArrowDownUp, Download } from 'lucide-react';
import AssessmentTable from '../ui/AssessmentTable';
import api from '../../services/api';
import { useApi } from '../../hooks';
import { FormButton } from '../ui/form';

/**
 * Screen for displaying and managing reports
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ReportsScreen = ({ isMobile, onViewReport = () => {} }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    cultivar: 'all',
    season: 'all',
    sortBy: 'date'
  });
  
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

  useEffect(() => {
    fetchReports();
    fetchCompletedAssessments();
  }, [fetchReports, fetchCompletedAssessments]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = () => {
    // In a real app, this would filter the data
    console.log('Applying filters:', filters);
    // Close the filters panel on mobile
    if (isMobile) {
      setShowFilters(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      dateRange: 'all',
      cultivar: 'all',
      season: 'all',
      sortBy: 'date'
    });
  };
  
  // Handle export action
  const handleExport = () => {
    console.log('Exporting reports...');
    // This would trigger the export functionality in a real app
  };

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
    }
  ];

  // Handle row clicks for viewing reports
  const handleRowClick = (report) => {
    onViewReport(report.id);
  };

  // Handle report view action
  const handleViewReport = (reportId) => {
    onViewReport(reportId);
  };

  // Common report actions
  const getReportActions = (report) => [
    { 
      label: 'View', 
      onClick: () => handleViewReport(report.id), 
      className: 'text-blue-600 hover:text-blue-800' 
    },
    { 
      label: 'Edit', 
      onClick: () => console.log('Edit report', report.id), 
      className: 'text-gray-600 hover:text-gray-800' 
    },
    { 
      label: report.status === 'sent' ? 'Resend' : 'Send', 
      onClick: () => console.log('Send report', report.id),
      className: 'text-green-600 hover:text-green-800'
    }
  ];

  // Add actions to each report
  const reportsWithActions = reports ? reports.map(report => ({
    ...report,
    actions: getReportActions(report)
  })) : [];
  
  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NZ', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Reports
            </h1>
            <p className="text-gray-600">
              View and share your assessment reports
            </p>
          </div>
          <FormButton 
            variant="primary" 
            icon={<Download size={16} />}
            onClick={handleExport}
          >
            {isMobile ? 'Export' : 'Export Reports'}
          </FormButton>
        </div>
      </div>
      
      {/* Mobile Filter Toggle */}
      {isMobile && (
        <button 
          className="w-full bg-white rounded-lg shadow py-3 px-4 text-left flex justify-between items-center" 
          onClick={toggleFilters}
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
                onClick={toggleFilters}
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
                onClick={resetFilters}
              >
                Reset
              </FormButton>
              <FormButton 
                variant="primary" 
                size="sm"
                onClick={applyFilters}
              >
                Apply Filters
              </FormButton>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {(loading || loadingAssessments) && (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Loading reports...</p>
        </div>
      )}
      
      {/* Error State */}
      {(error || assessmentsError) && (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-red-500">Error loading reports: {error?.message || assessmentsError?.message}</p>
        </div>
      )}
      
      {/* Reports - Desktop Table View or Mobile Card View */}
      {!loading && !error && reports && (
        <>
          {isMobile ? (
            // Mobile Card View
            <div className="bg-white rounded-xl shadow overflow-hidden">
              {reportsWithActions.length === 0 ? (
                emptyStateContent
              ) : (
                <ul className="divide-y divide-gray-200">
                  {reportsWithActions.map((report) => (
                    <li key={report.id} className="hover:bg-gray-50">
                      <div className="p-4">
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
                          {report.actions.map((action, index) => (
                            <button 
                              key={index}
                              className={`text-sm font-medium ${action.className}`}
                              onClick={action.onClick}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            // Desktop Table View
            <AssessmentTable 
              data={reportsWithActions}
              columns={columns}
              onRowClick={handleRowClick}
              emptyMessage={emptyStateContent}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ReportsScreen;