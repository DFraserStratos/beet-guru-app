import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { StatusCard, IconCard } from './card';

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
  // Custom status config for locations
  const statusConfig = {
    'draft': {
      label: 'Draft',
      className: 'bg-amber-100 text-amber-800'
    },
    'not-started': {
      label: 'Not Started',
      className: 'bg-gray-100 text-gray-800'
    },
    'default': {
      label: 'Status',
      className: 'bg-gray-100 text-gray-800'
    }
  };

  // Determine action based on status
  const getActionInfo = () => {
    switch (status) {
      case 'draft':
        return {
          actionLabel: 'Continue Assessment',
          actionClick: () => onContinue(location),
        };
      case 'not-started':
      default:
        return {
          actionLabel: 'Start Assessment',
          actionClick: () => onStart(location),
        };
    }
  };

  const actionInfo = getActionInfo();

  const handleClick = () => {
    actionInfo.actionClick();
  };

  return (
    <StatusCard
      status={status}
      statusConfig={statusConfig}
      statusPosition="title-right"
      className={`p-0 shadow-none ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between p-4">
        <IconCard
          icon={<MapPin size={20} className="text-green-600" />}
          iconClassName="bg-green-100"
          title={location.name}
          description={location.area ? `${location.area} hectares` : 'Area not specified'}
          className="border-none shadow-none p-0"
        >
          {location.latitude && location.longitude && (
            <p className="text-xs text-gray-400">
              Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}
            </p>
          )}
        </IconCard>
        <button 
          className="flex items-center text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50"
          onClick={handleClick}
          aria-label={actionInfo.actionLabel}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </StatusCard>
  );
};

export default LocationCard;
