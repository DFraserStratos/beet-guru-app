import React from 'react';
import { Map, Calendar, ChevronRight } from 'lucide-react';

/**
 * Location card component with status indicator
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const LocationCard = ({ 
  location, 
  status = "not-started", // "draft", "not-started"
  onContinue = () => {}, 
  onStart = () => {},
  className = ""
}) => {
  // Determine status colors and actions
  const getStatusInfo = () => {
    switch (status) {
      case 'draft':
        return {
          label: 'Draft',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          actionLabel: 'Continue Assessment',
          actionClick: () => onContinue(location),
          icon: <Calendar size={16} className="mr-2" />
        };
      case 'not-started':
      default:
        return {
          label: 'Not Started',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          actionLabel: 'Start Assessment',
          actionClick: () => onStart(location),
          icon: <Calendar size={16} className="mr-2" />
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`bg-white rounded-xl shadow overflow-hidden ${className}`}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{location.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}>
            {statusInfo.label}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 mt-2 mb-4">
          <div className="flex items-center mb-1">
            <Map size={16} className="mr-2 text-gray-500" />
            <span>{location.area} hectares</span>
          </div>
        </div>
        
        <button 
          className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex justify-center items-center transition-colors"
          onClick={statusInfo.actionClick}
        >
          {statusInfo.icon}
          <span>{statusInfo.actionLabel}</span>
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default LocationCard;