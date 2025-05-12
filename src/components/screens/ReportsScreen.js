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

  // Define table columns for the reports
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
      key: 'cropType', 
      label: 'Crop Type' 
    },
    { 
      key: 'type', 
      label: 'Report Type',
      render: (item) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          item.type === 'basic' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
        }`}>
          {item.type === 'basic' ? 'Basic Report' : 'Advanced Report'}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (item) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          item.status === 'sent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {item.status === 'sent' ? 'Sent' : 'Draft'}
        </span>
      )
    }
  ];

  // Add actions to each report
  const reportsWithActions = reports ? reports.map(report => ({
    ...report,
    actions: [
      { label: 'View', onClick: () => console.log('View report', report.id), className: 'text-blue-600 hover:text-blue-800' },
      { label: 'Edit', onClick: () => console.log('Edit report', report.id), className: 'text-gray-600 hover:text-gray-800' },
      { 
        label: report.status === 'sent' ? 'Resend' : 'Send', 
        onClick: () => console.log('Send report', report.id),
        className: 'text-green-600 hover:text-green-800'
      }
    ]
  })) : [];
  
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <div className="relative">
                <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border">
                  <option value="">All Report Types</option>
                  <option value="basic">Basic Report</option>
                  <option value="advanced">Advanced Report</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>
            
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
            
            <div className={`${isMobile ? 'w-full' : 'flex-1 min-w-[200px]'}`}>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <div className="relative">
                <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border">
                  <option value="">All Statuses</option>
                  <option value="sent">Sent</option>
                  <option value="draft">Draft</option>
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
      
      {/* Reports Table */}
      {!loading && !error && reports && (
        <AssessmentTable 
          data={reportsWithActions}
          columns={columns}
          onRowClick={(report) => console.log('Row clicked', report.id)}
          emptyMessage="No reports found. Complete an assessment to generate a report."
        />
      )}
    </div>
  );
};

export default ReportsScreen;