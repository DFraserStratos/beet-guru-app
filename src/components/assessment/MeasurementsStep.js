import React, { useState, useRef, useEffect } from 'react';
import { FormButtonNav, FormButton } from '../ui/form';
import { PlusCircle, BarChart3, Info, Leaf, Circle, Hash, X, Calculator, ArrowLeft } from 'lucide-react';

/**
 * Numeric keypad component for measurements data entry
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const NumericKeypad = ({ onKeyPress, onClose, activeField }) => {
  const keys = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '.', '0', 'del'
  ];

  const handleKeyPress = (key) => {
    onKeyPress(key);
  };

  // Get field name for display
  const getFieldName = () => {
    if (!activeField) return '';
    
    switch (activeField.fieldName) {
      case 'leaf':
        return 'Leaf Weight';
      case 'bulb':
        return 'Bulb Weight';
      case 'plants':
        return 'Plant Count';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Keypad Header */}
      <div className="p-4 bg-white border-b flex items-center justify-between">
        <button 
          onClick={onClose}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back</span>
        </button>
        <h2 className="text-lg font-medium text-gray-800">{getFieldName()}</h2>
        <div className="w-16"></div> {/* Spacer for balance */}
      </div>

      {/* Keypad Grid */}
      <div className="flex-1 bg-gray-50 p-4">
        <div className="max-w-md mx-auto h-full">
          <div className="grid grid-cols-3 gap-3 h-full">
            {keys.map((key) => (
              <button
                key={key}
                className={`text-2xl font-medium rounded-lg flex items-center justify-center shadow-sm ${
                  key === 'del' 
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                } transition-colors`}
                onClick={() => handleKeyPress(key)}
              >
                {key === 'del' ? (
                  <X size={20} className="text-gray-600" />
                ) : (
                  key
                )}
              </button>
            ))}
          </div>
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
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Record the weight of leaf and bulb samples separately. Plant count is optional but helps with yield calculations.
              </p>
            </div>
          </div>
        </div>
        
        {/* Measurements Card */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-medium text-gray-800">Sample Measurements</h3>
            <button 
              className="text-sm text-green-600 hover:text-green-800 font-medium flex items-center"
              onClick={addMeasurement}
            >
              <PlusCircle size={16} className="mr-1" />
              Add Sample
            </button>
          </div>
          
          {/* Measurement Table */}
          <div className="p-4">
            <div className="border rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-gray-50 border-b">
                <div className="p-3 border-r flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-gray-700">Leaf</span>
                  </div>
                  <span className="text-xs text-gray-500">(kg/sample)</span>
                </div>
                <div className="p-3 border-r flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Circle className="h-5 w-5 text-green-700" />
                    <span className="font-medium text-gray-700">Bulb</span>
                  </div>
                  <span className="text-xs text-gray-500">(kg/sample)</span>
                </div>
                <div className="p-3 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center space-x-2">
                    <Hash className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-gray-700">Plant No.</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    (optional)
                  </div>
                </div>
              </div>
              
              {/* Measurement Rows */}
              {measurements.map((measurement) => (
                <div key={measurement.id} className="grid grid-cols-3 border-b last:border-b-0">
                  <div 
                    className="p-4 border-r flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={() => handleFieldSelect(measurement.id, 'leaf')}
                  >
                    <span className="text-xl font-medium text-gray-800">{measurement.leaf}</span>
                  </div>
                  <div 
                    className="p-4 border-r flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={() => handleFieldSelect(measurement.id, 'bulb')}
                  >
                    <span className="text-xl font-medium text-gray-800">{measurement.bulb}</span>
                  </div>
                  <div 
                    className="p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={() => handleFieldSelect(measurement.id, 'plants')}
                  >
                    <span className="text-xl font-medium text-gray-800">{measurement.plants}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Preview Graph Button */}
        <FormButton
          variant="primary"
          fullWidth
          onClick={toggleGraphPreview}
          icon={<BarChart3 size={18} />}
        >
          PREVIEW GRAPH
        </FormButton>
        
        {/* Graph Preview Card */}
        {showGraph && (
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex items-center">
              <BarChart3 size={18} className="text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-800">Yield Preview</h3>
            </div>
            
            <div className="p-6">
              <div className="h-64 w-full bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-500 max-w-xs mx-auto p-4">
                  <Calculator size={32} className="mx-auto mb-3 text-green-500" />
                  <p className="font-medium text-gray-600 mb-1">Calculating Yield</p>
                  <p className="text-sm text-gray-500">
                    Your measurements are being processed to generate a yield estimate for your beet crop.
                  </p>
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
          nextLabel="Review Assessment"
          isMobile={isMobile}
        />
      </div>
      
      {/* Numeric Keypad */}
      {keypadVisible && (
        <NumericKeypad
          onKeyPress={handleKeyPress}
          onClose={closeKeypad}
          activeField={activeField}
        />
      )}
    </div>
  );
};

export default MeasurementsStep;