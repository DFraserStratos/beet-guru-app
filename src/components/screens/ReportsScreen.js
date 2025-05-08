import { useState } from 'react';
import { PlusCircle, ChevronDown, Filter, X } from 'lucide-react';

const ReportsScreen = ({ isMobile }) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Sample reports data
  const reports = [...Array(6)].map((_, index) => ({
    id: index + 1,
    title: ['North Field Assessment', 'West Paddock Overview', 'East Field Analysis', 'South Block Report', 'Central Area Stats', 'Full Farm Summary'][index % 6],
    type: index % 2 === 0 ? 'Basic Report' : 'Advanced Report',
    date: new Date(2025, 4, 8 - index),
    cropType: ['Fodder Beet', 'Sugar Beet', 'Mangels'][index % 3],
    pages: 4,
    status: index < 3 ? 'Sent' : 'Draft',
    recipients: index < 3 ? 3 : 0
  }));
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="text-gray-500 text-sm">Manage your assessment reports</p>
        </div>
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
      
      {/* Reports List */}
      <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${ 
                    report.type === 'Basic Report' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {report.type}
                  </span>
                  <h3 className="mt-2 text-base font-medium text-gray-900 line-clamp-1">
                    {report.title}
                  </h3>
                </div>
                <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                  report.status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {report.status}
                </span>
              </div>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>Created: {report.date.toLocaleDateString('en-NZ', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                <p>Crop Type: {report.cropType}</p>
              </div>
              
              <div className="mt-3 flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1 text-gray-500">{report.pages} pages</span>
                </div>
                
                {report.status === 'Sent' && (
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="ml-1 text-gray-500">{report.recipients} recipients</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 px-4 py-3 flex bg-gray-50">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex-1 text-center">
                View
              </button>
              <div className="border-l border-gray-200"></div>
              <button className="text-sm text-gray-600 hover:text-gray-800 font-medium flex-1 text-center">
                Edit
              </button>
              <div className="border-l border-gray-200"></div>
              <button className="text-sm text-green-600 hover:text-green-800 font-medium flex-1 text-center">
                {report.status === 'Sent' ? 'Resend' : 'Send'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile Load More Button */}
      {isMobile && (
        <button className="w-full bg-white text-green-600 font-medium py-3 rounded-lg shadow text-center">
          Load More Reports
        </button>
      )}
    </div>
  );
};

export default ReportsScreen;
