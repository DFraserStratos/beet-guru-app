import React from 'react';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';

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
    <div className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
            <MapPin size={20} className="text-green-600" />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="text-base font-medium text-gray-800">{location.name}</h3>
              <span className={`ml-2 px-2 py-0.5 text-xs font-semibold rounded-full ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                {statusInfo.label}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {location.area ? `${location.area} hectares` : 'Area not specified'}
            </p>
            {location.latitude && location.longitude && (
              <p className="text-xs text-gray-400 mt-1">
                Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
              </p>
            )}
          </div>
        </div>
        <button 
          className="flex items-center text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50"
          onClick={statusInfo.actionClick}
          aria-label={statusInfo.actionLabel}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default LocationCard;