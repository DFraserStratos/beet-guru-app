import { useState, useEffect } from 'react';
import { PlusCircle, ChevronDown, Filter, X } from 'lucide-react';
import AssessmentTable from '../ui/AssessmentTable';
import api from '../../services/api';
import { useApi } from '../../hooks';

/**
 * Screen for displaying and managing reports
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const ReportsScreen = ({ isMobile }) => {
  const [showFilters, setShowFilters] = useState(false);
  
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

  // Define table columns for the reports - simplified to remove status and type
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
    }
  ];

  // Common report actions
  const getReportActions = (report) => [
    { label: 'View', onClick: () => console.log('View report', report.id), className: 'text-blue-600 hover:text-blue-800' },
    { label: 'Edit', onClick: () => console.log('Edit report', report.id), className: 'text-gray-600 hover:text-gray-800' },
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

  return (
    <div className="space-y-4">
      {/* Action Button */}
      <div className="flex justify-end">
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors text-sm">
          <PlusCircle size={16} className="mr-2" />
          {isMobile ? 'New' : 'New Report'}
        </button>
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
            <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-[200px]'}`}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="relative">
                <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border">
                  <option value="all">All Time</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="year">This Year</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
            {isMobile && (
              <div className="w-full mt-2 flex justify-end">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {(loading || loadingAssessments) && (
        <div className="bg-white rounded-xl shadow p-4 text-center text-gray-500">
          Loading reports...
        </div>
      )}
      
      {/* Error State */}
      {(error || assessmentsError) && (
        <div className="bg-white rounded-xl shadow p-4 text-center text-red-500">
          Error loading reports: {error?.message || assessmentsError?.message}
        </div>
      )}
      
      {/* Reports - Desktop Table View or Mobile Card View */}
      {!loading && !error && reports && (
        <>
          {isMobile ? (
            // Mobile Card View
            <div className="space-y-3">
              {reportsWithActions.map((report) => (
                <div key={report.id} className="bg-white rounded-xl shadow overflow-hidden">
                  <div className="p-4">
                    <h3 className="font-medium text-base text-gray-900 line-clamp-1 mb-1">
                      {report.title}
                    </h3>
                    
                    <div className="text-sm text-gray-600 space-y-1 mb-3">
                      <p>Date: {formatDate(report.created)}</p>
                      <p>Location: {report.location}</p>
                    </div>
                    
                    <div className="border-t pt-3 flex justify-between">
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
                </div>
              ))}

              {reportsWithActions.length === 0 && (
                <div className="bg-white rounded-xl shadow p-4 text-center text-gray-500">
                  No reports found. Complete an assessment to generate a report.
                </div>
              )}
            </div>
          ) : (
            // Desktop Table View
            <AssessmentTable 
              data={reportsWithActions}
              columns={columns}
              onRowClick={(report) => console.log('Row clicked', report.id)}
              emptyMessage="No reports found. Complete an assessment to generate a report."
            />
          )}
        </>
      )}
    </div>
  );
};

export default ReportsScreen;