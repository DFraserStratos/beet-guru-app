import { BarChart3, FileText, SendHorizontal, Calendar, AlertCircle, PlusCircle } from 'lucide-react';
import StatCard from '../ui/StatCard';
import ActionCard from '../ui/ActionCard';

const DashboardScreen = ({ onNavigate, isMobile }) => {
  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
      
      {/* Weather - only show on desktop or smaller card on mobile */}
      {!isMobile ? (
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Local Weather</h2>
          <div className="text-center">
            <div className="inline-block bg-blue-100 rounded-full p-3 mb-2">
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
      ) : (
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Weather</h2>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">18°C</div>
              <div className="bg-blue-100 rounded-full p-1.5">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-4.5-6.5"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="text-gray-500 mt-1">Partly Cloudy</div>
        </div>
      )}
      
      {/* Important Alert - Mobile Only */}
      {isMobile && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded shadow-sm">
          <div className="flex">
            <AlertCircle size={20} className="text-yellow-400 flex-shrink-0" />
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your North Field assessment is due. <button onClick={() => onNavigate('new-assessment')} className="font-medium underline">Complete now</button>
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* New Assessment Button (shows only if not in mobile) */}
      {!isMobile && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ActionCard 
            title="New Assessment" 
            description="Create a new crop assessment"
            icon={<BarChart3 size={24} className="text-white" />}
            onClick={() => onNavigate('new-assessment')}
            bgColor="bg-green-600"
            isMobile={isMobile}
          />
          <ActionCard 
            title="Generate Report" 
            description="Create a new detailed report"
            icon={<FileText size={24} className="text-white" />}
            onClick={() => console.log('Generate report')}
            bgColor="bg-blue-600"
            isMobile={isMobile}
          />
          <ActionCard 
            title="Send Report" 
            description="Share reports with team members"
            icon={<SendHorizontal size={24} className="text-white" />}
            onClick={() => console.log('Send report')}
            bgColor="bg-purple-600"
            isMobile={isMobile}
          />
        </div>
      )}
      
      {/* Add New Assessment Button (Mobile Only) */}
      {isMobile && (
        <button 
          className="w-full bg-green-600 text-white p-3 rounded-lg flex justify-center items-center shadow-md"
          onClick={() => onNavigate('new-assessment')}
        >
          <PlusCircle size={20} className="mr-2" />
          <span className="font-medium">New Assessment</span>
        </button>
      )}
      
      {/* Feed Planning - Simplified for mobile */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Feed Planning</h2>
        </div>
        
        <div className="p-4 space-y-4">
          {/* Feed Estimates - Stack on mobile */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Current Feed Estimates</h3>
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
          
          {/* Key Metrics - Grid on mobile */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Grazing Days</h3>
                  <p className="text-2xl font-bold text-green-600">186</p>
                </div>
                <div className="bg-green-100 rounded-full p-2">
                  <Calendar size={20} className="text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">DM Yield</h3>
                  <p className="text-2xl font-bold text-green-600">22.4</p>
                </div>
                <div className="bg-green-100 rounded-full p-2">
                  <BarChart3 size={20} className="text-green-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 text-center">
              Your current feed stocks will support <strong>50 cows for 186 days</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;