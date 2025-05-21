import React, { useState, useEffect } from 'react';
import { X, MapPin, Crosshair } from 'lucide-react';
import { FormField, FormButton } from '../ui/form';
import { IconButton } from '../ui/buttons';
import { useForm } from '../../hooks';
import MapPicker from './MapPicker';

/**
 * Location Form Component
 * 
 * Form for creating and editing farm locations, includes fields
 * for location name, area, and a map picker component.
 * 
 * @param {Object} props
 * @param {Object} props.location - Location data for editing (null for new location)
 * @param {Function} props.onSubmit - Submit handler
 * @param {Function} props.onCancel - Cancel handler
 * @returns {JSX.Element}
 */
const LocationForm = ({ location, onSubmit, onCancel }) => {
  const isEditMode = Boolean(location);
  const [showMap, setShowMap] = useState(false);
  
  // Form validation function
  const validateForm = (values) => {
    const errors = {};
    
    if (!values.name) {
      errors.name = 'Location name is required';
    }
    
    if (values.area && (isNaN(values.area) || values.area <= 0)) {
      errors.area = 'Area must be a positive number';
    }
    
    return errors;
  };
  
  // Initialize form with location data or defaults
  const initialValues = {
    name: location?.name || '',
    area: location?.area || '',
    latitude: location?.latitude || null,
    longitude: location?.longitude || null,
    id: location?.id || null,
  };
  
  // Set up form handling with custom hook
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues
  } = useForm(initialValues, validateForm, (formValues) => {
    // Format values before submit
    const submittedValues = {
      ...formValues,
      area: formValues.area ? parseFloat(formValues.area) : null,
    };
    
    onSubmit(submittedValues);
  });
  
  // Handle map selection
  const handleMapSelection = ({ latitude, longitude }) => {
    setValues({
      ...values,
      latitude,
      longitude
    });
    
    // Close map after selection
    setShowMap(false);
  };
  
  // Simulate getting current location
  const handleGetCurrentLocation = () => {
    // This would normally use the browser's geolocation API
    // For demo purposes, we're using fixed coordinates near Christchurch, NZ
    const mockChristchurchCoords = {
      latitude: -43.5321,
      longitude: 172.6362
    };
    
    // Add some randomness to simulate different locations on a farm
    const jitter = (Math.random() - 0.5) * 0.01;
    
    setValues({
      ...values,
      latitude: mockChristchurchCoords.latitude + jitter,
      longitude: mockChristchurchCoords.longitude + jitter
    });
  };
  
  return (
    <div>
      {/* Form Header */}
      <div className="flex items-center justify-between bg-green-700 text-white p-4 rounded-t-xl">
        <h2 className="text-lg font-semibold">
          {isEditMode ? 'Edit Location' : 'Add New Location'}
        </h2>
        <IconButton
          onClick={onCancel}
          icon={<X size={20} />}
          label="Close"
          className="text-white hover:bg-primary-dark"
        />
      </div>
      
      {/* Form Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Location Name"
            name="name"
            type="text"
            placeholder="e.g., North Paddock"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            required
          />
          
          <FormField
            label="Area (hectares)"
            name="area"
            type="number"
            placeholder="e.g., 2.5"
            value={values.area}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.area}
            touched={touched.area}
            hint="Enter the size of the location in hectares"
          />
          
          {/* Location Picker Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Coordinates
            </label>
            <div className="flex flex-col space-y-2">
              {values.latitude && values.longitude ? (
                <div className="rounded-md border border-gray-300 p-3 bg-gray-50">
                  <div className="flex items-center">
                    <MapPin size={18} className="text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">
                      Lat: {values.latitude.toFixed(6)}, Lng: {values.longitude.toFixed(6)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="rounded-md border border-gray-300 border-dashed p-3 bg-gray-50">
                  <div className="flex items-center text-gray-500">
                    <MapPin size={18} className="mr-2" />
                    <span className="text-sm">No location selected</span>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-3">
                <FormButton
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Crosshair size={16} />}
                  onClick={handleGetCurrentLocation}
                >
                  Use Current Location
                </FormButton>
                <FormButton
                  type="button"
                  variant="outline" 
                  size="sm"
                  icon={<MapPin size={16} />}
                  onClick={() => setShowMap(true)}
                >
                  Select on Map
                </FormButton>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-8">
            <FormButton
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </FormButton>
            <FormButton
              type="submit"
              variant="primary"
            >
              {isEditMode ? 'Save Changes' : 'Create Location'}
            </FormButton>
          </div>
        </form>
      </div>
      
      {/* Map Picker Modal */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between bg-green-700 text-white p-4 rounded-t-xl">
              <h2 className="text-lg font-semibold">Select Location on Map</h2>
              <IconButton
                onClick={() => setShowMap(false)}
                icon={<X size={20} />}
                label="Close map"
                className="text-white hover:bg-primary-dark"
              />
            </div>
            <div className="p-4">
              <MapPicker 
                initialLatitude={values.latitude}
                initialLongitude={values.longitude}
                onSelect={handleMapSelection}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationForm;
