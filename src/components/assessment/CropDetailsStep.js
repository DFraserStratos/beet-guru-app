import React, { useState, useEffect } from 'react';
import { FormField, FormButton } from '../ui/form';
import api from '../../services/api';
import { useApi } from '../../hooks';

/**
 * First step of assessment creation - crop details
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const CropDetailsStep = ({ formData, onChange, onNext }) => {
  const [selectedCultivar, setSelectedCultivar] = useState(formData.cultivarId || '');
  const [cultivarInfo, setCultivarInfo] = useState(null);
  
  // API hooks
  const locationsApi = useApi(api.references.getLocations);
  const cropTypesApi = useApi(api.references.getCropTypes);
  const cultivarsApi = useApi(api.references.getCultivars);
  
  // Fetch reference data on mount
  useEffect(() => {
    const loadData = async () => {
      await locationsApi.execute();
      await cropTypesApi.execute();
      await cultivarsApi.execute();
    };
    
    loadData();
  }, []);
  
  // Load cultivar details when selected
  useEffect(() => {
    if (selectedCultivar && cultivarsApi.data) {
      const selectedInfo = cultivarsApi.data.find(c => c.id === selectedCultivar);
      setCultivarInfo(selectedInfo);
    } else {
      setCultivarInfo(null);
    }
  }, [selectedCultivar, cultivarsApi.data]);
  
  // Handle cultivar change
  const handleCultivarChange = (e) => {
    const value = e.target.value;
    setSelectedCultivar(value);
    onChange({ target: { name: 'cultivarId', value } });
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
    
  const cropTypeOptions = cropTypesApi.data 
    ? cropTypesApi.data.map(ct => ({ value: ct.id, label: ct.name }))
    : [];
    
  const cultivarOptions = cultivarsApi.data 
    ? cultivarsApi.data.map(c => ({ value: c.id, label: c.name }))
    : [];
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Crop Details</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Location"
            name="locationId"
            type="select"
            placeholder="Select a Location"
            value={formData.locationId || ''}
            onChange={handleChange}
            options={locationOptions}
            loading={locationsApi.loading}
          />
          
          <FormField
            label="Grower"
            name="growerId"
            type="select"
            placeholder="Select a Grower"
            value={formData.growerId || ''}
            onChange={handleChange}
            options={[
              { value: 'self', label: 'Self' },
              { value: 'contractor', label: 'Contractor A' },
              { value: 'other', label: 'Other Grower' }
            ]}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Crop Type"
            name="cropTypeId"
            type="select"
            placeholder="Select Crop Type"
            value={formData.cropTypeId || ''}
            onChange={handleChange}
            options={cropTypeOptions}
            loading={cropTypesApi.loading}
          />
          
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
        </div>
        
        {/* Cultivar Information Section */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <h3 className="text-sm font-medium text-green-800 mb-2">Cultivar Information</h3>
          
          {cultivarInfo ? (
            <div className="space-y-3">
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
          ) : (
            <p className="text-sm text-green-700">
              Select a cultivar to view detailed information about its characteristics, yield potential, and best uses.
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Planting Date"
            name="plantingDate"
            type="date"
            value={formData.plantingDate || '2024-10-20'}
            onChange={handleChange}
            hint="Default: October 20 of previous year"
          />
          
          <FormField
            label="Water Type"
            name="waterType"
            type="select"
            value={formData.waterType || 'irrigated'}
            onChange={handleChange}
            options={[
              { value: 'irrigated', label: 'Irrigated' },
              { value: 'dryland', label: 'Dryland' }
            ]}
          />
        </div>
        
        <FormField
          label="Estimated Growing Cost ($/ha)"
          name="estimatedGrowingCost"
          type="number"
          placeholder="Enter cost per hectare"
          value={formData.estimatedGrowingCost || '2500'}
          onChange={handleChange}
          hint="This covers ALL costs associated with growing"
          min="0"
          step="10"
        />
        
        <div className="pt-4 flex justify-end">
          <FormButton 
            onClick={onNext}
            variant="primary"
          >
            Continue
          </FormButton>
        </div>
      </div>
    </div>
  );
};

export default CropDetailsStep;