import React, { useState, useEffect } from 'react';
import { FormField, FormButtonNav } from '../ui/form';
import { AlertTriangle, Calculator } from 'lucide-react';
import { logger } from '../../utils/logger';

/**
 * Second step of assessment creation - field setup
 * @param {Object} props - Component props 
 * @returns {JSX.Element} Rendered component
 */
const FieldSetupStep = ({ formData, onChange, onNext, onBack, onCancel, isMobile }) => {
  const [valueType, setValueType] = useState(formData.valueType || 'estimate');
  const [totalArea, setTotalArea] = useState(0);
  
  // Initialize state for local form values with defaults only applied initially
  const [localFormData, setLocalFormData] = useState({
    rowSpacing: formData.rowSpacing === undefined ? '0.5' : formData.rowSpacing,
    measurementLength: formData.measurementLength === undefined ? '4' : formData.measurementLength,
    bulbEstimate: formData.bulbEstimate === undefined ? '2' : formData.bulbEstimate,
    leafEstimate: formData.leafEstimate === undefined ? '3' : formData.leafEstimate
  });
  
  // Calculate total area when local form values change
  useEffect(() => {
    const rowSpacing = parseFloat(localFormData.rowSpacing) || 0.5;
    const measurementLength = parseFloat(localFormData.measurementLength) || 4;
    
    // Calculate the total area in square meters
    const area = rowSpacing * measurementLength;
    setTotalArea(area);
  }, [localFormData.rowSpacing, localFormData.measurementLength]);
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update both local state and parent state
    setLocalFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Also propagate the change to parent
    onChange({ target: { name, value } });
  };
  
  // Handle value type change
  const handleValueTypeChange = (type) => {
    setValueType(type);
    onChange({ target: { name: 'valueType', value: type } });
  };
  
  // Handle Save as Draft
  const handleSaveAsDraft = () => {
    logger.info('Saving as draft:', formData);
    // In a real implementation, this would call an API to save the draft
    alert('Assessment saved as draft successfully!');
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Field Setup</h2>
      
      <div className="space-y-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please enter accurate row spacing and default dry matter percentage for best results.
              </p>
            </div>
          </div>
        </div>
        
        {/* Field Measurements Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Field Measurements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Row Spacing (m)"
              name="rowSpacing"
              type="number"
              value={localFormData.rowSpacing}
              onChange={handleChange}
              hint="Distance between rows"
              step="0.01"
              min="0.1"
              placeholder="0.5"
            />
            
            <FormField
              label="Measurement Length (m)"
              name="measurementLength"
              type="number"
              value={localFormData.measurementLength}
              onChange={handleChange}
              hint="Length of the measurement area"
              step="0.1"
              min="0.1"
              placeholder="4"
            />
          </div>
          
          {/* Area Calculation Display */}
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <div className="flex items-center">
              <Calculator className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="text-sm font-medium text-green-800">Calculated Measurement Area</h4>
            </div>
            <div className="mt-2 pl-7">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-green-700">{totalArea.toFixed(2)}</span>
                <span className="ml-1 text-sm text-green-600">m²</span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                This is the area of a single row sample based on your measurements
              </p>
            </div>
          </div>
        </div>
        
        {/* Dry Matter Estimates Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Dry Matter Estimates</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormField
              label="Bulb Estimate (DM%)"
              name="bulbEstimate"
              type="number"
              value={localFormData.bulbEstimate}
              onChange={handleChange}
              hint="Estimated dry matter percentage for bulbs"
              step="0.1"
              min="0"
              max="100"
              placeholder="2"
            />
            
            <FormField
              label="Leaf Estimate (DM%)"
              name="leafEstimate"
              type="number"
              value={localFormData.leafEstimate}
              onChange={handleChange}
              hint="Estimated dry matter percentage for leaves"
              step="0.1"
              min="0"
              max="100"
              placeholder="3"
            />
          </div>
          
          {/* Value Type Toggle */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Value Types
            </label>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="flex">
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 text-center text-sm font-medium ${
                    valueType === 'estimate' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleValueTypeChange('estimate')}
                >
                  Estimate
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-3 text-center text-sm font-medium ${
                    valueType === 'actual' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleValueTypeChange('actual')}
                >
                  Actual
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Button Navigation - Using the new FormButtonNav component */}
        <FormButtonNav
          onNext={onNext}
          onBack={onBack}
          onCancel={onCancel}
          onSaveAsDraft={handleSaveAsDraft}
          showBack={true}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default FieldSetupStep;
