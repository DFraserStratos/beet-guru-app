import React from 'react';
import { FormField, FormButton } from '../ui/form';
import { AlertTriangle, X, Save } from 'lucide-react';

/**
 * Second step of assessment creation - field setup
 * @param {Object} props - Component props 
 * @returns {JSX.Element} Rendered component
 */
const FieldSetupStep = ({ formData, onChange, onNext, onBack, onCancel }) => {
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ target: { name, value } });
  };
  
  // Handle Save as Draft
  const handleSaveAsDraft = () => {
    console.log('Saving as draft:', formData);
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Dry Matter Percentage (%)"
            name="dryMatterPercentage"
            type="number"
            value={formData.dryMatterPercentage || '14'}
            onChange={handleChange}
            hint="Default value - will be updated with measurements"
            step="0.1"
            min="0"
            max="100"
          />
          
          <FormField
            label="Row Spacing (m)"
            name="rowSpacing"
            type="number"
            value={formData.rowSpacing || '0.5'}
            onChange={handleChange}
            hint="Distance between rows"
            step="0.01"
            min="0.1"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Row Count"
            name="rowCount"
            type="number"
            value={formData.rowCount || '0'}
            onChange={handleChange}
            hint="Number of rows carved into the ground"
            min="0"
          />
          
          <FormField
            label="Field Area (ha)"
            name="fieldArea"
            type="number"
            placeholder="Enter field area"
            value={formData.fieldArea || ''}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
        </div>
        
        <div className="pt-4 flex justify-between">
          <div className="flex space-x-4">
            <FormButton 
              onClick={onCancel}
              variant="outline"
              icon={<X size={16} />}
            >
              Cancel
            </FormButton>
            <FormButton 
              onClick={handleSaveAsDraft}
              variant="outline"
              icon={<Save size={16} />}
            >
              Save as Draft
            </FormButton>
            <FormButton 
              onClick={onBack}
              variant="secondary"
            >
              Back
            </FormButton>
          </div>
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

export default FieldSetupStep;