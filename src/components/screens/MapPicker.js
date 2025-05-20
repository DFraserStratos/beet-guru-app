import React, { useState, useEffect } from 'react';
import { MapPin, Check } from 'lucide-react';
import { FormButton } from '../ui/form';

/**
 * Map Picker Component
 * 
 * A component that simulates a map interface where a user can
 * select a location by clicking on it. Since we're not integrating
 * with a real mapping API, this is a mock implementation.
 * 
 * @param {Object} props
 * @param {number} props.initialLatitude - Initial latitude value
 * @param {number} props.initialLongitude - Initial longitude value
 * @param {Function} props.onSelect - Handler for location selection
 * @returns {JSX.Element}
 */
const MapPicker = ({ initialLatitude, initialLongitude, onSelect }) => {
  const [position, setPosition] = useState({
    latitude: initialLatitude || -43.5321, // Default to Christchurch, NZ
    longitude: initialLongitude || 172.6362
  });
  
  // Function to handle simulated map click
  const handleMapClick = (e) => {
    // Get click coordinates relative to the map container
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert to latitude/longitude
    // This is a simplistic simulation - in reality you'd use a mapping library
    const width = rect.width;
    const height = rect.height;
    
    // Base coordinates (Christchurch)
    const baseLatitude = -43.5321;
    const baseLongitude = 172.6362;
    
    // Calculate the new lat/lng based on click position
    // Add some offset to simulate map movement
    const newLatitude = baseLatitude + ((height / 2 - y) / height) * 0.05;
    const newLongitude = baseLongitude + ((x - width / 2) / width) * 0.05;
    
    setPosition({
      latitude: newLatitude,
      longitude: newLongitude
    });
  };
  
  // Function to confirm selection
  const handleConfirm = () => {
    if (onSelect) {
      onSelect(position);
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Mock Map Display */}
      <div 
        className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100 cursor-crosshair" 
        onClick={handleMapClick}
        style={{
          backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/static/172.6362,-43.5321,10,0/600x400?access_token=pk.placeholder')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Information Overlay */}
        <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center text-xs">
          Click anywhere on the map to select a location
        </div>
        
        {/* Map Marker */}
        <div 
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -100%)',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
          }}
        >
          <MapPin size={32} className="text-red-500" />
        </div>
      </div>
      
      {/* Coordinates Display */}
      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-sm font-medium text-gray-700">Selected Location:</p>
        <div className="flex items-center mt-1">
          <MapPin size={16} className="text-red-500 mr-2" />
          <p className="text-sm">
            Latitude: <span className="font-mono">{position.latitude.toFixed(6)}</span>
          </p>
          <span className="mx-2">|</span>
          <p className="text-sm">
            Longitude: <span className="font-mono">{position.longitude.toFixed(6)}</span>
          </p>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-end">
        <FormButton
          variant="primary"
          icon={<Check size={16} />}
          onClick={handleConfirm}
        >
          Confirm Location
        </FormButton>
      </div>
    </div>
  );
};

export default MapPicker;
