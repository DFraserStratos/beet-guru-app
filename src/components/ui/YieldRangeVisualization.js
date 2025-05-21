import React, { useState, useRef } from 'react';

/**
 * Component for visualizing yield estimates with bar graphs and confidence intervals
 * 
 * @param {Object} currentData - Data for current samples
 * @param {Object} additionalData - Data for scenario with additional samples
 * @param {Function} onToggleView - Optional callback for view toggle
 * @returns {JSX.Element} Rendered component
 */
const YieldRangeVisualization = ({ 
  currentData, 
  additionalData,
  onToggleView = () => {},
}) => {
  // State for tracking the active view (total or components)
  const [activeView, setActiveView] = useState('total');
  
  // Handle view toggle
  const handleToggleView = () => {
    const newView = activeView === 'total' ? 'components' : 'total';
    setActiveView(newView);
    onToggleView(newView);
  };
  
  // Calculate if ranges overlap (for potential visual indicators)
  const rangesOverlap = !(
    currentData.upperLimit < additionalData.lowerLimit ||
    currentData.lowerLimit > additionalData.upperLimit
  );
  
  // Format values for display
  const formatValue = (value) => {
    return value.toFixed(1);
  };

  // Calculate the maximum value for scaling the bars (40 as max value for consistent scaling)
  const maxValue = 40;
  
  // Calculate bar widths as percentages of maxValue
  const getBarWidth = (value) => {
    return (value / maxValue) * 100;
  };
  
  return (
    <div className="bg-white rounded-lg p-4" id="yield-visualization">
      {/* Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-4">Yield Estimate</h3>
      
      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleToggleView}
          className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {activeView === 'total' ? 'Show Components' : 'Show Total'}
        </button>
      </div>
      
      {/* Bar Chart Visualization */}
      <div className="mb-8 pt-4">
        <div className="flex flex-col gap-16 mb-2">
          {/* Current Sample Bar */}
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium text-gray-700">Current</div>
            <div className="flex-1 relative h-16">
              {/* Bar for Current */}
              <div 
                className="absolute bg-red-500 top-1/2 transform -translate-y-1/2 h-16"
                style={{
                  width: `${getBarWidth(currentData.mean)}%`,
                  minWidth: '40px'
                }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-base font-medium text-gray-800">
                  {formatValue(currentData.mean)}
                </div>
              </div>
            </div>
          </div>
          
          {/* +5 Samples Bar */}
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium text-gray-700">+5 Samples</div>
            <div className="flex-1 relative h-16">
              {/* Bar for +5 Samples */}
              <div 
                className="absolute bg-amber-500 top-1/2 transform -translate-y-1/2 h-16"
                style={{
                  width: `${getBarWidth(additionalData.mean)}%`,
                  minWidth: '40px'
                }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-base font-medium text-gray-800">
                  {formatValue(additionalData.mean)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* X-axis labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-2 px-24">
          <div>11</div>
          <div>17.0</div>
          <div>23</div>
        </div>
      </div>
      
      {/* Statistical Values Display */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-8">
        {/* Current Samples Column */}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-medium text-green-700 mb-3">Current</h4>
          <div className="grid grid-cols-2 gap-y-2">
            <div className="text-gray-600">Mean:</div>
            <div className="text-right text-gray-900 font-medium">{formatValue(currentData.mean)}</div>
            
            <div className="text-gray-600">Upper Limit:</div>
            <div className="text-right text-gray-900">{formatValue(currentData.upperLimit)}</div>
            
            <div className="text-gray-600">Lower Limit:</div>
            <div className="text-right text-gray-900">{formatValue(currentData.lowerLimit)}</div>
            
            <div className="text-gray-600">Bulb Yield:</div>
            <div className="text-right text-gray-900">{formatValue(currentData.bulbYield)}</div>
            
            <div className="text-gray-600">Leaf Yield:</div>
            <div className="text-right text-gray-900">{formatValue(currentData.leafYield)}</div>
          </div>
        </div>
        
        {/* Additional Samples Column */}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-medium text-amber-600 mb-3">+5 Samples</h4>
          <div className="grid grid-cols-2 gap-y-2">
            <div className="text-gray-600">Mean:</div>
            <div className="text-right text-gray-900 font-medium">{formatValue(additionalData.mean)}</div>
            
            <div className="text-gray-600">Upper Limit:</div>
            <div className="text-right text-gray-900">{formatValue(additionalData.upperLimit)}</div>
            
            <div className="text-gray-600">Lower Limit:</div>
            <div className="text-right text-gray-900">{formatValue(additionalData.lowerLimit)}</div>
            
            <div className="text-gray-600">Bulb Yield:</div>
            <div className="text-right text-gray-900">{formatValue(additionalData.bulbYield)}</div>
            
            <div className="text-gray-600">Leaf Yield:</div>
            <div className="text-right text-gray-900">{formatValue(additionalData.leafYield)}</div>
          </div>
        </div>
      </div>
      
      {/* Optional Significance Indicator */}
      {!rangesOverlap && (
        <div className="mt-3 text-sm text-center p-2 bg-blue-50 text-blue-800 rounded">
          Additional samples would significantly change your yield estimate.
        </div>
      )}
    </div>
  );
};

export default YieldRangeVisualization;
