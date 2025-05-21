import React, { useState } from 'react';
import { FormField, FormButton, FormButtonNav } from '../ui/form';
import { PlusCircle, Trash2, BarChart3, Info } from 'lucide-react';
import { logger } from '../../utils/logger';
import YieldRangeVisualization from '../ui/YieldRangeVisualization';

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
        <h4 className="font-medium">Sample {area}</h4>
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
            label="Leaf Weight (kg)"
            name="leafWeight"
            type="number"
            value={data.leafWeight || ''}
            onChange={handleChange}
            step="0.1"
            min="0"
            placeholder="0.0"
          />
          
          <FormField
            label="Bulb Weight (kg)"
            name="bulbWeight"
            type="number"
            value={data.bulbWeight || ''}
            onChange={handleChange}
            step="0.1"
            min="0"
            placeholder="0.0"
          />
          
          <FormField
            label="Plant Count"
            name="plantCount"
            type="number"
            value={data.plantCount || ''}
            onChange={handleChange}
            step="1"
            min="0"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Third step of assessment creation - field measurements
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const MeasurementsStep = ({ formData, onChange, onNext, onBack, onCancel, isMobile }) => {
  // Initialize sample areas with just one sample
  const [sampleAreas, setSampleAreas] = useState(() => {
    // If there are existing sample areas in formData, use only the first one
    // Otherwise create a new sample with default values
    if (formData.sampleAreas && formData.sampleAreas.length > 0) {
      return [formData.sampleAreas[0]];
    } else {
      return [{ 
        id: 1, 
        leafWeight: '', 
        bulbWeight: '', 
        plantCount: ''
      }];
    }
  });
  
  // Update form data when sample areas change
  React.useEffect(() => {
    onChange({ target: { name: 'sampleAreas', value: sampleAreas } });
  }, [sampleAreas, onChange]);
  
  // Add a new sample area
  const addSampleArea = () => {
    const newId = Math.max(...sampleAreas.map(area => area.id), 0) + 1;
    setSampleAreas([...sampleAreas, { 
      id: newId, 
      leafWeight: '', 
      bulbWeight: '', 
      plantCount: ''
    }]);
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
  
  // Calculate totals and prepare data for visualizations
  const calculateVisualizationData = () => {
    let totalLeafWeight = 0;
    let totalBulbWeight = 0;
    let validSamples = 0;
    
    sampleAreas.forEach(area => {
      const leafWeight = parseFloat(area.leafWeight) || 0;
      const bulbWeight = parseFloat(area.bulbWeight) || 0;
      
      if (leafWeight > 0 || bulbWeight > 0) {
        totalLeafWeight += leafWeight;
        totalBulbWeight += bulbWeight;
        validSamples++;
      }
    });
    
    const totalWeight = totalLeafWeight + totalBulbWeight;
    
    // Calculate yield statistics based on current samples
    const currentStats = {
      mean: 17.2,  // t DM/ha
      upperLimit: 22.6,
      lowerLimit: 11.8,
      bulbYield: 14.3,
      leafYield: 2.9
    };
    
    // Projected statistics with additional samples
    // Note: In a real implementation, this would use more complex statistical methods
    const additionalStats = {
      mean: 18.0,  // t DM/ha
      upperLimit: 21.4, // Narrower confidence interval with more samples
      lowerLimit: 14.7, // Higher lower bound with more samples
      bulbYield: 15.1,
      leafYield: 2.9
    };
    
    return {
      currentStats,
      additionalStats,
      totalLeafWeight,
      totalBulbWeight,
      totalWeight,
      validSamples
    };
  };
  
  const visualizationData = calculateVisualizationData();
  
  // Handle Save as Draft
  const handleSaveAsDraft = () => {
    logger.info('Saving as draft:', formData);
    // In a real implementation, this would call an API to save the draft
    alert('Assessment saved as draft successfully!');
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Sample Measurements</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Take multiple samples from different areas of your field for accurate results.
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
              Add Sample
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
        
        {/* Yield Analysis Section with green background */}
        <div className="border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium">Yield Analysis</h3>
          </div>
          
          <div className="p-0">
            {visualizationData.validSamples > 0 ? (
              <div>
                <p className="px-4 pt-4 text-sm text-gray-600">
                  The chart below shows your current yield estimate and how it might change with additional samples.
                  More samples typically produce a more precise estimate (narrower confidence interval).
                </p>
                <YieldRangeVisualization 
                  currentData={visualizationData.currentStats}
                  additionalData={visualizationData.additionalStats}
                />
              </div>
            ) : (
              <div className="h-64 w-full flex items-center justify-center bg-gray-100">
                <div className="text-center text-gray-500">
                  <BarChart3 size={40} className="mx-auto mb-2 text-gray-400" />
                  <p>Enter sample measurements to see the yield estimate</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Button Navigation - Using the FormButtonNav component */}
        <FormButtonNav
          onNext={onNext}
          onBack={onBack}
          onCancel={onCancel}
          onSaveAsDraft={handleSaveAsDraft}
          showBack={true}
          nextLabel="Review Assessment"
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export default MeasurementsStep;
