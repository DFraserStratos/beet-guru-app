import { Calendar, Beef } from 'lucide-react';

const FeedForecastWidget = () => {
  // Mock data for the feed forecast
  const feedData = {
    cows: 50,
    days: 186,
    utilization: 78
  };
  
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="bg-green-600 text-white px-4 py-3">
        <h3 className="font-medium">Feed Forecast</h3>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <Beef size={24} className="text-green-600" />
            </div>
            <div>
              <span className="block text-xs text-gray-500">Herd Size</span>
              <span className="font-semibold">{feedData.cows} cows</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <Calendar size={24} className="text-green-600" />
            </div>
            <div>
              <span className="block text-xs text-gray-500">Grazing Days</span>
              <span className="font-semibold">{feedData.days} days</span>
            </div>
          </div>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Feed Utilization</span>
            <span className="text-sm text-gray-700">{feedData.utilization}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{width: `${feedData.utilization}%`}}></div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-sm text-green-800">
            Your current feed stocks will support <strong>{feedData.cows} cows for {feedData.days} days</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedForecastWidget;
