import { PlusCircle, ChevronDown } from 'lucide-react';

const AssessmentsScreen = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">All Assessments</h2>
          <p className="text-gray-500">Manage and view all your crop assessments</p>
        </div>
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
          onClick={() => onNavigate('new-assessment')}
        >
          <PlusCircle size={18} className="mr-2" />
          New Assessment
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
          <div className="relative">
            <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border">
              <option value="">All Crop Types</option>
              <option value="fodder">Fodder Beet</option>
              <option value="sugar">Sugar Beet</option>
              <option value="mangels">Mangels</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border">
              <option value="">All Locations</option>
              <option value="north">North Field</option>
              <option value="west">West Paddock</option>
              <option value="east">East Field</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-2.5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <div className="relative">
            <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 pl-3 pr-10 appearance-none border">
              <option value="">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="draft">Draft</option>
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
      </div>
      
      {/* Assessments List */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dry Matter %</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(8)].map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(2025, 4, 8 - index).toLocaleDateString('en-NZ', { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {['North Field', 'West Paddock', 'East Field', 'South Block'][index % 4]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {['Fodder Beet', 'Sugar Beet', 'Mangels'][index % 3]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {index < 5 ? `${(18 + Math.random() * 5).toFixed(1)}%` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    index < 5 
                      ? 'bg-green-100 text-green-800' 
                      : index < 7 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {index < 5 ? 'Completed' : index < 7 ? 'In Progress' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">View</button>
                  <button className="text-gray-600 hover:text-gray-800">Edit</button>
                  {index < 5 && <button className="text-green-600 hover:text-green-800">Report</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">24</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  {/* Chevron left icon */}
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-green-50 text-sm font-medium text-green-600 hover:bg-green-100">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  {/* Chevron right icon */}
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentsScreen;
