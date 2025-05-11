import React, { useState } from 'react';
import { FormField, FormButton } from '../ui/form';
import { PlusCircle, Trash2, BarChart3, Info } from 'lucide-react';

/**
 * Sample area component for measurements
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const SampleArea = ({ area, data, onChange, onRemove, showRemoveButton }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(area, name, value);
  };
  
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 p-3 border-b flex justify-between items-center">
        <h4 className="font-medium">Area {area}</h4>
        {showRemoveButton && (
          <button 
            className="text-sm text-red-600 hover:text-red-800 flex items-center"
            onClick={() => onRemove(area)}
          >
            <Trash2 size={16} className="mr-1" />
            Remove
          </button>
        )}
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Sample Length (m)"
            name="sampleLength"
            type="number"
            value={data.sampleLength || ''}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
          
          <FormField
            label="Weight (kg)"
            name="weight"
            type="number"
            value={data.weight || ''}
            onChange={handleChange}
            step="0.1"
            min="0"
          />
          
          <FormField
            label="Dry Matter (%)"
            name="dryMatter"
            type="number"
            value={data.dryMatter || ''}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="100"
          />
        </div>
        
        <FormField
          label="Notes"
          name="notes"
          type="textarea"
          placeholder="Optional notes about this sample"
          value={data.notes || ''}
          onChange={handleChange}
          rows="2"
        />
      </div>
    </div>
  );
};

/**
 * Third step of assessment creation - field measurements
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const MeasurementsStep = ({ formData, onChange, onNext, onBack }) => {
  // Initialize sample areas
  const [sampleAreas, setSampleAreas] = useState(
    formData.sampleAreas || [
      { id: 1, sampleLength: '2', weight: '25.4', dryMatter: '14.2', notes: 'Northern edge of field, good plant density' },
      { id: 2, sampleLength: '', weight: '', dryMatter: '', notes: '' },
      { id: 3, sampleLength: '', weight: '', dryMatter: '', notes: '' }
    ]
  );
  
  // Update form data when sample areas change
  React.useEffect(() => {
    onChange({ target: { name: 'sampleAreas', value: sampleAreas } });
  }, [sampleAreas, onChange]);
  
  // Add a new sample area
  const addSampleArea = () => {
    const newId = Math.max(...sampleAreas.map(area => area.id), 0) + 1;
    setSampleAreas([...sampleAreas, { id: newId, sampleLength: '', weight: '', dryMatter: '', notes: '' }]);
  };
  
  // Remove a sample area
  const removeSampleArea = (areaId) => {
    setSampleAreas(sampleAreas.filter(area => area.id !== areaId));
  };
  
  // Handle sample area field changes
  const handleSampleAreaChange = (areaId, name, value) => {
    setSampleAreas(sampleAreas.map(area => 
      area.id === areaId ? { ...area, [name]: value } : area
    ));
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Field Measurements</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Take at least 3 representative samples from different areas of your field for accurate results.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-medium">Sample Measurements</h3>
            <button 
              className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center"
              onClick={addSampleArea}
            >
              <PlusCircle size={16} className="mr-1" />
              Add Area
            </button>
          </div>
          
          <div className="p-4">
            <div className="space-y-6">
              {sampleAreas.map(area => (
                <SampleArea
                  key={area.id}
                  area={area.id}
                  data={area}
                  onChange={handleSampleAreaChange}
                  onRemove={removeSampleArea}
                  showRemoveButton={area.id !== 1 && sampleAreas.length > 1}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Preview Graph */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium">Yield Preview</h3>
          </div>
          
          <div className="p-4 flex justify-center">
            <div className="h-64 w-full max-w-lg flex items-center justify-center bg-gray-100 rounded">
              <div className="text-center text-gray-500">
                <BarChart3 size={40} className="mx-auto mb-2 text-gray-400" />
                <p>Preview graph will appear here after measurements are calculated</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex justify-between">
          <FormButton 
            onClick={onBack}
            variant="secondary"
          >
            Back
          </FormButton>
          <FormButton 
            onClick={onNext}
            variant="primary"
          >
            Review Assessment
          </FormButton>
        </div>
      </div>
    </div>
  );
};

export default MeasurementsStep;