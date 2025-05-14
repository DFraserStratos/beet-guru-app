import React, { useState, useRef, useEffect } from 'react';
import { FormButtonNav } from '../ui/form';
import { PlusCircle, BarChart3, Info, Leaf, Circle, Hash, X, ChevronLeft } from 'lucide-react';

/**
 * Numeric keypad component for measurements data entry
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const NumericKeypad = ({ onKeyPress, onClose }) => {
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '.', '0', 'del'
  ];

  const handleKeyPress = (key) => {
    onKeyPress(key);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Keypad Header */}
      <div className="flex items-center justify-between p-4 bg-green-700 text-white">
        <button 
          onClick={onClose}
          className="flex items-center text-white"
        >
          <ChevronLeft size={24} />
          <span className="ml-1 text-lg">Done</span>
        </button>
        <h2 className="text-xl font-medium">Measurements</h2>
        <button 
          onClick={onClose}
          className="text-white text-lg"
        >
          Edit
        </button>
      </div>

      {/* Keypad Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-3 h-full border-t">
          {keys.map((key) => (
            <button
              key={key}
              className={`text-3xl font-light border-b border-r flex items-center justify-center ${
                key === 'del' ? 'text-gray-600' : 'text-gray-900'
              }`}
              onClick={() => handleKeyPress(key)}
            >
              {key === 'del' ? (
                <span>del</span>
              ) : (
                key
              )}
            </button>
          ))}
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
  // Initialize sample measurements
  const [measurements, setMeasurements] = useState(
    formData.measurements || [
      { id: 1, leaf: '1', bulb: '2', plants: '3' },
      { id: 2, leaf: '0', bulb: '0', plants: '0' }
    ]
  );

  // State for active measurement field
  const [activeField, setActiveField] = useState(null);
  const [keypadVisible, setKeypadVisible] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  // Update form data when measurements change
  useEffect(() => {
    onChange({ target: { name: 'measurements', value: measurements } });
  }, [measurements, onChange]);

  // Add a new measurement row
  const addMeasurement = () => {
    const newId = Math.max(...measurements.map(m => m.id), 0) + 1;
    setMeasurements([...measurements, { id: newId, leaf: '0', bulb: '0', plants: '0' }]);
  };

  // Handle measurement field selection
  const handleFieldSelect = (measurementId, fieldName) => {
    setActiveField({ measurementId, fieldName });
    setKeypadVisible(true);
  };

  // Handle keypad input
  const handleKeyPress = (key) => {
    if (!activeField) return;

    const { measurementId, fieldName } = activeField;
    
    setMeasurements(measurements.map(measurement => {
      if (measurement.id !== measurementId) return measurement;

      let currentValue = measurement[fieldName] || '0';
      
      if (key === 'del') {
        // Handle delete key
        currentValue = currentValue.slice(0, -1);
        if (currentValue === '') currentValue = '0';
      } else if (key === '.') {
        // Handle decimal point
        if (!currentValue.includes('.')) {
          currentValue = currentValue + '.';
        }
      } else {
        // Handle numeric input
        if (currentValue === '0') {
          currentValue = key;
        } else {
          currentValue = currentValue + key;
        }
      }

      return { ...measurement, [fieldName]: currentValue };
    }));
  };

  // Close keypad
  const closeKeypad = () => {
    setKeypadVisible(false);
    setActiveField(null);
  };

  // Toggle graph preview
  const toggleGraphPreview = () => {
    setShowGraph(!showGraph);
  };

  // Handle Save as Draft
  const handleSaveAsDraft = () => {
    console.log('Saving as draft:', formData);
    // In a real implementation, this would call an API to save the draft
    alert('Assessment saved as draft successfully!');
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
                Record the weight of leaf and bulb samples separately. Plant count is optional.
              </p>
            </div>
          </div>
        </div>
        
        {/* Measurements Table */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 border-b">
            <div className="p-4 border-r flex flex-col items-center justify-center">
              <div className="flex items-center justify-center space-x-2">
                <Leaf className="h-5 w-5 text-green-500" />
                <span className="font-medium">Leaf</span>
              </div>
              <span className="text-xs text-gray-500">(kg/sample)</span>
            </div>
            <div className="p-4 border-r flex flex-col items-center justify-center">
              <div className="flex items-center justify-center space-x-2">
                <Circle className="h-5 w-5 text-green-700 fill-green-700" />
                <span className="font-medium">Bulb</span>
              </div>
              <span className="text-xs text-gray-500">(kg/sample)</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center">
              <div className="flex items-center justify-center space-x-2">
                <Hash className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Plant No.</span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                (opt) <span className="ml-1 text-gray-400">(?)</span>
              </div>
            </div>
          </div>
          
          {/* Measurement Rows */}
          {measurements.map((measurement) => (
            <div key={measurement.id} className="grid grid-cols-3 border-b">
              <div 
                className="p-5 border-r flex items-center justify-center text-center"
                onClick={() => handleFieldSelect(measurement.id, 'leaf')}
              >
                <span className="text-2xl">{measurement.leaf}</span>
              </div>
              <div 
                className="p-5 border-r flex items-center justify-center text-center"
                onClick={() => handleFieldSelect(measurement.id, 'bulb')}
              >
                <span className="text-2xl">{measurement.bulb}</span>
              </div>
              <div 
                className="p-5 flex items-center justify-center text-center"
                onClick={() => handleFieldSelect(measurement.id, 'plants')}
              >
                <span className="text-2xl">{measurement.plants}</span>
              </div>
            </div>
          ))}
          
          {/* Add Row Button */}
          <div className="p-3 bg-gray-50">
            <button
              className="w-full text-sm text-green-600 hover:text-green-800 font-medium flex items-center justify-center"
              onClick={addMeasurement}
            >
              <PlusCircle size={16} className="mr-1" />
              Add Sample
            </button>
          </div>
        </div>
        
        {/* Preview Graph Button */}
        <button
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-medium text-center"
          onClick={toggleGraphPreview}
        >
          PREVIEW GRAPH
        </button>
        
        {/* Graph Preview */}
        {showGraph && (
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-medium">Yield Preview</h3>
            </div>
            
            <div className="p-4 flex justify-center">
              <div className="h-64 w-full max-w-lg flex items-center justify-center bg-gray-100 rounded">
                <div className="text-center text-gray-500">
                  <BarChart3 size={40} className="mx-auto mb-2 text-gray-400" />
                  <p>Preview graph will appear here with your measurements</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Button Navigation */}
        <FormButtonNav
          onNext={onNext}
          onBack={onBack}
          onCancel={onCancel}
          onSaveAsDraft={handleSaveAsDraft}
          showBack={true}
          nextLabel="Done"
          isMobile={isMobile}
        />
      </div>
      
      {/* Numeric Keypad */}
      {keypadVisible && (
        <NumericKeypad
          onKeyPress={handleKeyPress}
          onClose={closeKeypad}
        />
      )}
    </div>
  );
};

export default MeasurementsStep;