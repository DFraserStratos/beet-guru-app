import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit, Trash } from 'lucide-react';
import { useApi } from '../../hooks';
import { referencesAPI } from '../../services/api';
import { FormButton } from '../ui/form';
import PageContainer from '../layout/PageContainer';
import LocationForm from './LocationForm';
import ErrorBoundary from '../utility/ErrorBoundary';

/**
 * Locations Screen Component
 * 
 * Displays a list of locations for a farmer, with options to create
 * and edit locations. Each location has a name, area, and map marker.
 * 
 * @param {Object} props
 * @param {boolean} props.isMobile - Whether the screen is in mobile view
 * @param {Object} props.user - Current user information
 * @returns {JSX.Element}
 */
const LocationsScreen = ({ isMobile, user }) => {
  // State for location data
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  
  // Setup API hooks
  const getLocationsApi = useApi(referencesAPI.getLocations);
  const createLocationApi = useApi(referencesAPI.createLocation);
  const updateLocationApi = useApi(referencesAPI.updateLocation);
  const deleteLocationApi = useApi(referencesAPI.deleteLocation);
  
  // Fetch locations on component mount
  useEffect(() => {
    fetchLocations();
  }, []);
  
  // Function to fetch locations from the API
  const fetchLocations = async () => {
    const result = await getLocationsApi.execute();
    if (result) {
      // For demo purposes, show all locations regardless of user ID
      // In a real app, we would filter by: result.filter(location => location.userId === user?.id)
      setLocations(result);
    }
  };
  
  // Handle creating a new location
  const handleCreateLocation = async (locationData) => {
    // Ensure location is linked to current user
    const newLocationData = {
      ...locationData,
      userId: user?.id
    };
    
    const result = await createLocationApi.execute(newLocationData);
    if (result) {
      // Update locations list
      setLocations([...locations, result]);
      setIsFormOpen(false);
    }
  };
  
  // Handle editing an existing location
  const handleEditLocation = async (locationData) => {
    const result = await updateLocationApi.execute(locationData.id, locationData);
    if (result) {
      // Update locations list
      const updatedLocations = locations.map(location => 
        location.id === result.id ? result : location
      );
      setLocations(updatedLocations);
      setIsFormOpen(false);
      setSelectedLocation(null);
    }
  };
  
  // Open edit form for a location
  const handleEditClick = (location) => {
    setSelectedLocation(location);
    setIsFormOpen(true);
  };
  
  // Handle deleting a location
  const handleDeleteClick = (location) => {
    setLocationToDelete(location);
    setIsConfirmDeleteOpen(true);
  };
  
  // Confirm location deletion
  const confirmDelete = async () => {
    try {
      const result = await deleteLocationApi.execute(locationToDelete?.id);
      if (result && result.success) {
        // Update locations list
        const updatedLocations = locations.filter(
          location => location.id !== locationToDelete?.id
        );
        setLocations(updatedLocations);
      }
    } catch (error) {
      alert('Could not delete location: ' + error.message);
    } finally {
      setIsConfirmDeleteOpen(false);
      setLocationToDelete(null);
    }
  };
  
  return (
    <PageContainer>
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Locations
            </h1>
            <p className="text-gray-600">
              Manage your farm fields and paddocks
            </p>
          </div>
          <FormButton 
            variant="primary" 
            icon={<Plus size={16} />}
            onClick={() => {
              setSelectedLocation(null);
              setIsFormOpen(true);
            }}
          >
            Add Location
          </FormButton>
        </div>
      </div>
      
      {/* Locations List */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {getLocationsApi.loading ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading locations...</p>
          </div>
        ) : locations.length === 0 ? (
          <div className="p-8 text-center">
            <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No locations found</h3>
            <p className="text-gray-500 mb-6">
              Add your first location to get started
            </p>
            <FormButton 
              variant="primary" 
              icon={<Plus size={16} />}
              onClick={() => {
                setSelectedLocation(null);
                setIsFormOpen(true);
              }}
            >
              Add Location
            </FormButton>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {locations.map((location) => (
              <li key={location.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <MapPin size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-800">{location.name}</h3>
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
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-gray-500 hover:text-green-600 rounded-full hover:bg-gray-100"
                      onClick={() => handleEditClick(location)}
                      aria-label="Edit location"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                      onClick={() => handleDeleteClick(location)}
                      aria-label="Delete location"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Create/Edit Location Form Modal */}
      {isFormOpen && (
        <ErrorBoundary>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <LocationForm
                location={selectedLocation}
                onSubmit={selectedLocation ? handleEditLocation : handleCreateLocation}
                onCancel={() => {
                  setIsFormOpen(false);
                  setSelectedLocation(null);
                }}
              />
            </div>
          </div>
        </ErrorBoundary>
      )}
      
      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Delete Location</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{locationToDelete?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <FormButton 
                variant="outline" 
                onClick={() => setIsConfirmDeleteOpen(false)}
              >
                Cancel
              </FormButton>
              <FormButton 
                variant="danger" 
                onClick={confirmDelete}
                isLoading={deleteLocationApi.loading}
              >
                Delete
              </FormButton>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default LocationsScreen;
