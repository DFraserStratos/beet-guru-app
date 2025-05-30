import React, { useState } from 'react';
import { FormButtonNav } from '../ui/form';
import { Plus, Trash2, Info, Leaf, Circle } from 'lucide-react';
import { logger } from '../../utils/logger';
import YieldRangeVisualization from '../ui/YieldRangeVisualization';

/**
 * Modern table row component for sample measurements
 */
const SampleRow = ({ sample, index, onChange, onRemove, canRemove }) => {
  const handleChange = (field, value) => {
    onChange(sample.id, field, value);
  };

  const handleKeyDown = (e, field) => {
    // Allow navigation with Tab and Enter
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextInput = e.target.closest('tr').querySelector(`input[name="${field}"]`)?.nextElementSibling;
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <tr className={`group hover:bg-gray-50/50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/20'}`}>
      {/* Sample Number - Hidden on mobile, visible on desktop */}
      <td className="hidden md:table-cell px-2 py-4 text-sm font-medium text-gray-600 bg-gray-100/50">
        <div className="flex items-center justify-center">
          <span className="text-sm font-medium">
            {index + 1}
          </span>
        </div>
      </td>

      {/* Leaf Weight */}
      <td className="px-2 md:px-4 py-4 border-r border-gray-100">
        <div className="relative">
          <input
            type="number"
            name="leafWeight"
            value={sample.leafWeight || ''}
            onChange={(e) => handleChange('leafWeight', e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'leafWeight')}
            placeholder="0.0"
            step="0.1"
            min="0"
            className="w-full px-3 py-2 text-sm bg-transparent border-0 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 rounded-md transition-all duration-150 text-center hover:bg-gray-50/50 md:hover:bg-white/80"
          />
        </div>
      </td>

      {/* Bulb Weight */}
      <td className="px-2 md:px-4 py-4 border-r border-gray-100">
        <div className="relative">
          <input
            type="number"
            name="bulbWeight"
            value={sample.bulbWeight || ''}
            onChange={(e) => handleChange('bulbWeight', e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'bulbWeight')}
            placeholder="0.0"
            step="0.1"
            min="0"
            className="w-full px-3 py-2 text-sm bg-transparent border-0 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 rounded-md transition-all duration-150 text-center hover:bg-gray-50/50 md:hover:bg-white/80"
          />
        </div>
      </td>

      {/* Plant Count */}
      <td className="px-2 md:px-4 py-4 border-r border-gray-100">
        <div className="relative">
          <input
            type="number"
            name="plantCount"
            value={sample.plantCount || ''}
            onChange={(e) => handleChange('plantCount', e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'plantCount')}
            placeholder="0"
            step="1"
            min="0"
            className="w-full px-3 py-2 text-sm bg-transparent border-0 focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 rounded-md transition-all duration-150 text-center hover:bg-gray-50/50 md:hover:bg-white/80"
          />
        </div>
      </td>

      {/* Actions */}
      <td className="px-2 md:px-4 py-4 text-center">
        {canRemove && (
          <button
            onClick={() => onRemove(sample.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 rounded-md"
            title="Remove sample"
          >
            <Trash2 size={16} />
          </button>
        )}
      </td>
    </tr>
  );
};

/**
 * Add new sample row component
 */
const AddSampleRow = ({ onAdd }) => {
  return (
    <tr className="border-t-2 border-dashed border-gray-200">
      <td colSpan="5" className="px-3 py-4">
        <button
          onClick={onAdd}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700 border border-green-200 rounded-lg transition-all duration-150 group font-medium"
        >
          <Plus size={16} className="group-hover:scale-110 transition-transform duration-150" />
          Add Sample
        </button>
      </td>
    </tr>
  );
};

/**
 * Third step of assessment creation - field measurements with modern table design
 */
const MeasurementsStep = ({ formData, onChange, onNext, onBack, onCancel, isMobile }) => {
  // Initialize sample areas with just one sample
  const [sampleAreas, setSampleAreas] = useState(() => {
    if (formData.sampleAreas && formData.sampleAreas.length > 0) {
      return formData.sampleAreas;
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
  
  // Fixed data for YieldRangeVisualization
  const getYieldVisualizationData = () => {
    const currentData = {
      mean: 17.2,
      upperLimit: 22.6,
      lowerLimit: 11.8,
      bulbYield: 14.3,
      leafYield: 2.9
    };

    const additionalData = {
      mean: 18.0,
      upperLimit: 21.4,
      lowerLimit: 14.7,
      bulbYield: 15.1,
      leafYield: 2.9
    };

    return { currentData, additionalData };
  };
  
  // Handle Save as Draft
  const handleSaveAsDraft = () => {
    logger.info('Saving as draft:', formData);
    alert('Assessment saved as draft successfully!');
  };
  
  const { currentData, additionalData } = getYieldVisualizationData();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Sample Measurements</h2>
      
      <div className="space-y-6">
        {/* Info Banner */}
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
        
        {/* Modern Measurements Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              {/* Table Header */}
              <thead className="bg-gray-50/50 border-b border-gray-200">
                <tr>
                  <th className="hidden md:table-cell px-2 py-4 w-[8%]">
                  </th>
                  <th className="px-2 md:px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-[28%] md:w-[28%]">
                    <div className="flex items-center justify-center gap-1.5">
                      <Leaf size={14} className="text-green-500" />
                      <span>Leaf</span>
                    </div>
                    <div className="text-xs font-normal text-gray-500 mt-1">(kg/sample)</div>
                  </th>
                  <th className="px-2 md:px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-[28%] md:w-[28%]">
                    <div className="flex items-center justify-center gap-1.5">
                      <Circle size={14} className="text-green-600 fill-current" />
                      <span>Bulb</span>
                    </div>
                    <div className="text-xs font-normal text-gray-500 mt-1">(kg/sample)</div>
                  </th>
                  <th className="px-2 md:px-4 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-[28%] md:w-[28%]">
                    <span>Plant No.</span>
                    <div className="text-xs font-normal text-gray-500 mt-1">(count)</div>
                  </th>
                  <th className="px-2 md:px-4 py-4 w-[16%] md:w-[8%]"></th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-100">
                {sampleAreas.map((sample, index) => (
                  <SampleRow
                    key={sample.id}
                    sample={sample}
                    index={index}
                    onChange={handleSampleAreaChange}
                    onRemove={removeSampleArea}
                    canRemove={index > 0 && sampleAreas.length > 1}
                  />
                ))}
                
                {/* Add Sample Row */}
                <AddSampleRow onAdd={addSampleArea} />
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Yield Range Visualization */}
        <YieldRangeVisualization 
          currentData={currentData}
          additionalData={additionalData}
        />
        
        {/* Button Navigation */}
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
