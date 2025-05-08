import { ChevronRight, BarChart3, FileText, SendHorizontal, Calendar } from 'lucide-react';
import StatCard from '../ui/StatCard';
import ActionCard from '../ui/ActionCard';

const DashboardScreen = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow p-6 col-span-2">
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <StatCard 
              title="Active Assessments" 
              value="12" 
              change="+2" 
              isPositive={true} 
            />
            <StatCard 
              title="Total Crop Area" 
              value="158 ha" 
              change="+15" 
              isPositive={true} 
            />
            <StatCard 
              title="Est. Feed Days" 
              value="186" 
              change="-4" 
              isPositive={false} 
            />
          </div>
        </div>
        
        {/* Weather */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Local Weather</h2>
          <div className="text-center">
            <div className="inline-block bg-blue-100 rounded-full p-3 mb-2">
              {/* Weather icon would go here */}
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5"></path>
              </svg>
            </div>
            <div className="text-3xl font-bold">18°C</div>
            <div className="text-gray-500">Partly Cloudy</div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <div className="font-medium">Rainfall</div>
                <div>1.2mm</div>
              </div>
              <div className="text-center">
                <div className="font-medium">Humidity</div>
                <div>72%</div>
              </div>
              <div className="text-center">
                <div className="font-medium">Wind</div>
                <div>12 km/h</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Assessments */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Assessments</h2>
          <button 
            className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center"
            onClick={() => onNavigate('assessments')}
          >
            View All <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dry Matter %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">May 05, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">North Field</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Fodder Beet</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">22.4%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">May 03, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">West Paddock</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Sugar Beet</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">19.8%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">May 01, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">East Field</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Fodder Beet</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Feed Planning */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Feed Planning Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Current Feed Estimates</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Fodder Beet</span>
                  <span className="text-sm text-gray-700">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Sugar Beet</span>
                  <span className="text-sm text-gray-700">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Mangels</span>
                  <span className="text-sm text-gray-700">23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '23%'}}></div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">Your current feed stocks will support <strong>50 cows for 186 days</strong> based on estimated consumption rates.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Total Grazing Days</h3>
                  <p className="text-3xl font-bold text-green-600">186</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <Calendar size={24} className="text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Estimated DM Yield</h3>
                  <p className="text-3xl font-bold text-green-600">22.4 t/ha</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <BarChart3 size={24} className="text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ActionCard 
          title="New Assessment" 
          description="Create a new crop assessment"
          icon={<BarChart3 size={24} className="text-white" />}
          onClick={() => onNavigate('new-assessment')}
          bgColor="bg-green-600"
        />
        <ActionCard 
          title="Generate Report" 
          description="Create a new detailed report"
          icon={<FileText size={24} className="text-white" />}
          onClick={() => console.log('Generate report')}
          bgColor="bg-blue-600"
        />
        <ActionCard 
          title="Send Report" 
          description="Share reports with team members"
          icon={<SendHorizontal size={24} className="text-white" />}
          onClick={() => console.log('Send report')}
          bgColor="bg-purple-600"
        />
      </div>
    </div>
  );
};

export default DashboardScreen;
