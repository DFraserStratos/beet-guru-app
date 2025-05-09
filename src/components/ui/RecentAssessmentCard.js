import { ChevronRight, Calendar, MapPin, BarChart3 } from 'lucide-react';

const RecentAssessmentCard = ({ assessment, onClick }) => {
  if (!assessment) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-gray-500 mb-4">No recent assessments found</p>
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          onClick={onClick}
        >
          Create Your First Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium">Most Recent Assessment</h3>
        <span className={`text-xs rounded-full px-2 py-0.5 bg-white bg-opacity-20`}>
          {assessment.status}
        </span>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-1">{assessment.location}</h4>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={14} className="mr-1" />
            <span>{assessment.date}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Crop Type</div>
            <div className="font-medium">{assessment.type}</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Dry Matter</div>
            <div className="font-medium">{assessment.dm}</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Yield</div>
            <div className="font-medium">{assessment.yield || 'N/A'}</div>
          </div>
        </div>
        
        <button 
          className="w-full bg-gray-100 text-gray-800 rounded-lg py-2 flex items-center justify-center hover:bg-gray-200 transition-colors"
          onClick={onClick}
        >
          View Details
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default RecentAssessmentCard;
