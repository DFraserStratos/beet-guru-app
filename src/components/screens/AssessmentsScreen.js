import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import LocationCard from '../ui/LocationCard';
import api from '../../services/api';
import { useApi } from '../../hooks';

/**
 * Screen for displaying and managing assessments
 * @param {Object} props - Component props 
 * @returns {JSX.Element} Rendered component
 */
const AssessmentsScreen = ({ 
  onNavigate, 
  isMobile,
  onStartAssessment = () => {},
  onContinueDraft = () => {}
}) => {
  // Use the API hook to fetch locations with their status
  const { 
    data: locations, 
    loading, 
    error, 
    execute: fetchLocations 
  } = useApi(api.references.getLocations, [true]);

  useEffect(() => {
    fetchLocations(true);
  }, [fetchLocations]);

  // Handle starting a new assessment for a location
  const handleStartAssessment = (location) => {
    onStartAssessment(location);
    onNavigate('new-assessment');
  };

  // Handle continuing a draft assessment
  const handleContinueDraft = (location) => {
    const draftAssessment = location.draftAssessment || null;
    onContinueDraft(location, draftAssessment);
    onNavigate('new-assessment');
  };

  // Handle clicking the New Assessment button (no pre-selected location)
  const handleNewAssessment = () => {
    onStartAssessment(null);
    onNavigate('new-assessment');
  };

  return (
    <div className="space-y-4">
      {/* Action Button */}
      <div className="flex justify-end">
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors text-sm"
          onClick={handleNewAssessment}
        >
          <PlusCircle size={16} className="mr-2" />
          {isMobile ? 'New' : 'New Assessment'}
        </button>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow p-4 text-center text-gray-500">
          Loading locations...
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-white rounded-xl shadow p-4 text-center text-red-500">
          Error loading locations: {error.message}
        </div>
      )}
      
      {/* Locations Grid */}
      {!loading && !error && locations && (
        <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4`}>
          {locations.map((location) => (
            <LocationCard 
              key={location.id}
              location={location}
              status={location.status}
              onStart={handleStartAssessment}
              onContinue={handleContinueDraft}
            />
          ))}
          
          {locations.length === 0 && (
            <div className="col-span-full bg-white rounded-xl shadow p-4 text-center text-gray-500">
              No locations found. Create a location to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssessmentsScreen;