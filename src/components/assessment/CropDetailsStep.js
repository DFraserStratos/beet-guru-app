import React, { useState, useEffect } from 'react';
import { FormField, FormButtonNav } from '../ui/form';
import LocationForm from '../screens/LocationForm';
import api from '../../services/api';
import { useApi } from '../../hooks';
import { logger } from '../../utils/logger';

/**
 * First step of assessment creation - crop details
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const CropDetailsStep = ({ formData, onChange, onNext, onCancel, isMobile }) => {
  const [selectedCultivar, setSelectedCultivar] = useState(formData.cultivarId || '');
  const [cultivarInfo, setCultivarInfo] = useState(null);
  const [showCustomCultivar, setShowCustomCultivar] = useState(selectedCultivar === 'other');
  const [customCultivarName, setCustomCultivarName] = useState(formData.customCultivarName || '');
  const [isLocationFormOpen, setIsLocationFormOpen] = useState(false);
  
  // Get today's date in YYYY-MM-DD format for default assessment date
  const today = new Date().toISOString().split('T')[0];
  
  // API hooks
  const locationsApi = useApi(api.references.getLocations);
  const cultivarsApi = useApi(api.references.getCultivars);
  
  // Fetch reference data on mount
  useEffect(() => {
    const loadData = async () => {
      await locationsApi.execute();
      await cultivarsApi.execute();
    };
    
    loadData();
  }, []);
  
  // Load cultivar details when selected
  useEffect(() => {
    if (selectedCultivar && selectedCultivar !== 'other' && cultivarsApi.data) {
      const selectedInfo = cultivarsApi.data.find(c => c.id === selectedCultivar);
      setCultivarInfo(selectedInfo);
      setShowCustomCultivar(false);
    } else if (selectedCultivar === 'other') {
      setCultivarInfo(null);
      setShowCustomCultivar(true);
    } else {
      setCultivarInfo(null);
      setShowCustomCultivar(false);
    }
  }, [selectedCultivar, cultivarsApi.data]);
  
  // Handle cultivar change
  const handleCultivarChange = (e) => {
    const value = e.target.value;
    setSelectedCultivar(value);
    onChange({ target: { name: 'cultivarId', value } });
  };

  // Handle custom cultivar change
  const handleCustomCultivarChange = (e) => {
    const value = e.target.value;
    setCustomCultivarName(value);
    onChange({ target: { name: 'customCultivarName', value } });
  };
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ target: { name, value } });
  };
  
  // Format options for select inputs
  const locationOptions = locationsApi.data 
    ? locationsApi.data.map(loc => ({ value: loc.id, label: loc.name }))
    : [];
    
  // Add "Other" option to cultivar options
  const cultivarOptions = cultivarsApi.data 
    ? [
        ...cultivarsApi.data.map(c => ({ value: c.id, label: c.name })),
        { value: 'other', label: 'Other (specify)' }
      ]
    : [{ value: 'other', label: 'Other (specify)' }];
  
  // Stock Type options
  const stockTypeOptions = [
    { value: 'dairy', label: 'Dairy cows' },
    { value: 'beef', label: 'Beef cattle' },
    { value: 'ewes', label: 'Ewes' },
    { value: 'lambs', label: 'Lambs' },
    { value: 'goats', label: 'Goats' },
    { value: 'horses', label: 'Horses' }
  ];
  
  // Handle Save as Draft
  const handleSaveAsDraft = () => {
    logger.info('Saving as draft:', formData);
    // In a real implementation, this would call an API to save the draft
    alert('Assessment saved as draft successfully!');
  };

  // Handle opening the location form modal
  const handleOpenLocationForm = () => {
    setIsLocationFormOpen(true);
  };

  // Handle closing the location form modal
  const handleCloseLocationForm = () => {
    setIsLocationFormOpen(false);
  };

  // Handle creating a new location
  const handleCreateLocation = async (locationData) => {
    try {
      // Create the new location via API
      const newLocation = await api.references.createLocation(locationData);
      
      // Refresh the locations list
      await locationsApi.execute();
      
      // Select the newly created location
      onChange({ target: { name: 'locationId', value: newLocation.id } });
      
      // Close the modal
      setIsLocationFormOpen(false);
    } catch (error) {
      console.error('Error creating location:', error);
      alert('Error creating paddock. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 sm:mb-6">Crop Details</h2>
      
      <div className="space-y-3 sm:space-y-6">
        {/* First row with Location and Stock Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <div>
            <FormField
              label="Paddock"
              name="locationId"
              type="select"
              placeholder="Select a Paddock"
              value={formData.locationId || ''}
              onChange={handleChange}
              options={locationOptions}
              loading={locationsApi.loading}
              required
            />
            <button
              type="button"
              onClick={handleOpenLocationForm}
              className="text-sm text-green-600 hover:text-green-800 underline mt-1 block"
            >
              Add New Paddock
            </button>
          </div>
          
          <FormField
            label="Stock Type"
            name="stockType"
            type="select"
            placeholder="Select Stock Type"
            value={formData.stockType || ''}
            onChange={handleChange}
            options={stockTypeOptions}
          />
        </div>
        
        {/* Second row with Cultivar and Custom Cultivar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <FormField
            label="Cultivar"
            name="cultivarId"
            type="select"
            placeholder="Select Cultivar"
            value={selectedCultivar}
            onChange={handleCultivarChange}
            options={cultivarOptions}
            loading={cultivarsApi.loading}
          />
          
          {showCustomCultivar ? (
            <FormField
              label="Custom Cultivar Name"
              name="customCultivarName"
              type="text"
              placeholder="Enter cultivar name"
              value={customCultivarName}
              onChange={handleCustomCultivarChange}
              required
            />
          ) : (
            <div></div> // Empty div to maintain layout
          )}
        </div>
        
        {/* Cultivar Information Section */}
        <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-100 my-2 sm:my-0">
          <h3 className="text-sm font-medium text-green-800 mb-1 sm:mb-2">Cultivar Information</h3>
          
          {cultivarInfo ? (
            <div className="space-y-2 sm:space-y-3">
              <p className="text-sm text-green-700">
                <strong>{cultivarInfo.name}</strong> - {cultivarInfo.description || 'No description available.'}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-green-700">
                <div>
                  <span className="font-medium">Yield Potential:</span> {cultivarInfo.yield || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Days to Maturity:</span> {cultivarInfo.growingTime || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Dry Matter:</span> {cultivarInfo.dryMatter || 'N/A'}
                </div>
              </div>
            </div>
          ) : showCustomCultivar && customCultivarName ? (
            <div className="space-y-2 sm:space-y-3">
              <p className="text-sm text-green-700">
                <strong>{customCultivarName}</strong> - Custom cultivar information not available.
              </p>
              <div className="text-xs text-green-700">
                <p>For custom cultivars, please use your own knowledge of the variety or consult with your seed supplier for specific characteristics.</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-green-700">
              Select a cultivar to view detailed information about its characteristics, yield potential, and best uses.
            </p>
          )}
        </div>
        
        {/* Third row with Sowing Date and Assessment Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          <FormField
            label="Sowing Date"
            name="sowingDate"
            type="date"
            value={formData.sowingDate || '2024-10-20'}
            onChange={handleChange}
            required
          />
          
          <FormField
            label="Assessment Date"
            name="assessmentDate"
            type="date"
            value={formData.assessmentDate || today}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Fourth row with Water Type and Growing Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          {/* Water Type section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Water Type
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex">
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 text-center text-sm font-medium ${
                    formData.waterType === 'irrigated' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => onChange({ target: { name: 'waterType', value: 'irrigated' } })}
                >
                  Irrigated
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 text-center text-sm font-medium ${
                    formData.waterType === 'dryland' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => onChange({ target: { name: 'waterType', value: 'dryland' } })}
                >
                  Dryland
                </button>
              </div>
            </div>
          </div>
          
          {/* Estimated Growing Cost */}
          <FormField
            label="Estimated Growing Cost ($/ha)"
            name="estimatedGrowingCost"
            type="number"
            placeholder="Enter cost per hectare"
            value={formData.estimatedGrowingCost || '2500'}
            onChange={handleChange}
            hint="Consider costs for seeds, fertilizer, irrigation, labor, equipment, and pest management"
            min="0"
            step="10"
          />
        </div>
        
        {/* Button Navigation - Using the enhanced FormButtonNav component */}
        <FormButtonNav
          onNext={onNext}
          onCancel={onCancel}
          onSaveAsDraft={handleSaveAsDraft}
          showBack={false}
          isMobile={isMobile}
        />
      </div>

      {/* Location Form Modal */}
      {isLocationFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
            <LocationForm
              location={null}
              onSubmit={handleCreateLocation}
              onCancel={handleCloseLocationForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CropDetailsStep;
