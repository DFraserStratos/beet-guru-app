import { PlusCircle, ChevronDown } from 'lucide-react';

const ReportsScreen = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Reports</h2>
          <p className="text-gray-500">Generate and manage your assessment reports</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors">
          <PlusCircle size={18} className="mr-2" />
          New Report
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
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
        
        <div className="flex-1 min-w-[200px]">
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
        
        <div className="flex-1 min-w-[200px]">
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
      </div>
      
      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                    index % 2 === 0 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {index % 2 === 0 ? 'Basic Report' : 'Advanced Report'}
                  </span>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    {['North Field Assessment', 'West Paddock Overview', 'East Field Analysis', 'South Block Report', 'Central Area Stats', 'Full Farm Summary'][index % 6]}
                  </h3>
                </div>
                <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                  index < 3 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {index < 3 ? 'Sent' : 'Draft'}
                </span>
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                <p>Created: {new Date(2025, 4, 8 - index).toLocaleDateString('en-NZ', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                <p className="mt-1">Crop Type: {['Fodder Beet', 'Sugar Beet', 'Mangels'][index % 3]}</p>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1 text-sm text-gray-500">4 pages</span>
                </div>
                
                {index < 3 && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="ml-1 text-sm text-gray-500">3 recipients</span>
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
                {index < 3 ? 'Resend' : 'Send'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsScreen;
