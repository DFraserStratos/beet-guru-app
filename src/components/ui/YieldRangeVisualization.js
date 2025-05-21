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

  // Calculate the maximum value for scaling the bars
  const maxValue = Math.max(
    currentData.upperLimit, 
    additionalData.upperLimit, 
    40 // Minimum scale to match the desired look
  );
  
  // Calculate bar heights as percentages of maxValue
  const getBarHeight = (value) => {
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
        <div className="flex flex-col gap-12">
          {/* Current Sample Bar */}
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium text-gray-700">Current</div>
            <div className="flex-1 relative">
              {/* Bar for Current */}
              <div className="h-16 flex items-center">
                <div 
                  className="absolute h-12 bg-green-500 rounded"
                  style={{
                    width: `${getBarHeight(currentData.mean)}%`,
                    minWidth: '40px'
                  }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 font-medium text-gray-800">
                    {formatValue(currentData.mean)}
                  </div>
                </div>
                
                {/* Confidence Interval Line */}
                <div 
                  className="absolute h-0.5 bg-gray-300"
                  style={{
                    left: `${getBarHeight(currentData.lowerLimit)}%`,
                    width: `${getBarHeight(currentData.upperLimit - currentData.lowerLimit)}%`,
                    top: '6px'
                  }}
                >
                  {/* Lower Limit Marker */}
                  <div className="absolute left-0 h-2 w-0.5 bg-gray-300 -translate-y-1/2"></div>
                  
                  {/* Upper Limit Marker */}
                  <div className="absolute right-0 h-2 w-0.5 bg-gray-300 -translate-y-1/2"></div>
                </div>
              </div>
              
              {/* Component breakdown (conditional) */}
              {activeView === 'components' && (
                <div className="flex">
                  <div 
                    className="h-8 bg-green-700 rounded-l"
                    style={{
                      width: `${getBarHeight(currentData.bulbYield)}%`,
                    }}
                  >
                    <div className="text-xs text-white text-center mt-2">
                      Bulb: {formatValue(currentData.bulbYield)}
                    </div>
                  </div>
                  <div 
                    className="h-8 bg-green-300 rounded-r"
                    style={{
                      width: `${getBarHeight(currentData.leafYield)}%`,
                    }}
                  >
                    <div className="text-xs text-green-800 text-center mt-2">
                      Leaf: {formatValue(currentData.leafYield)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* +5 Samples Bar */}
          <div className="flex items-center">
            <div className="w-24 text-sm font-medium text-gray-700">+5 Samples</div>
            <div className="flex-1 relative">
              {/* Bar for +5 Samples */}
              <div className="h-16 flex items-center">
                <div 
                  className="absolute h-12 bg-amber-500 rounded"
                  style={{
                    width: `${getBarHeight(additionalData.mean)}%`,
                    minWidth: '40px'
                  }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 font-medium text-gray-800">
                    {formatValue(additionalData.mean)}
                  </div>
                </div>
                
                {/* Confidence Interval Line */}
                <div 
                  className="absolute h-0.5 bg-gray-300"
                  style={{
                    left: `${getBarHeight(additionalData.lowerLimit)}%`,
                    width: `${getBarHeight(additionalData.upperLimit - additionalData.lowerLimit)}%`,
                    top: '6px'
                  }}
                >
                  {/* Lower Limit Marker */}
                  <div className="absolute left-0 h-2 w-0.5 bg-gray-300 -translate-y-1/2"></div>
                  
                  {/* Upper Limit Marker */}
                  <div className="absolute right-0 h-2 w-0.5 bg-gray-300 -translate-y-1/2"></div>
                </div>
              </div>
              
              {/* Component breakdown (conditional) */}
              {activeView === 'components' && (
                <div className="flex">
                  <div 
                    className="h-8 bg-amber-700 rounded-l"
                    style={{
                      width: `${getBarHeight(additionalData.bulbYield)}%`,
                    }}
                  >
                    <div className="text-xs text-white text-center mt-2">
                      Bulb: {formatValue(additionalData.bulbYield)}
                    </div>
                  </div>
                  <div 
                    className="h-8 bg-amber-300 rounded-r"
                    style={{
                      width: `${getBarHeight(additionalData.leafYield)}%`,
                    }}
                  >
                    <div className="text-xs text-amber-800 text-center mt-2">
                      Leaf: {formatValue(additionalData.leafYield)}
                    </div>
                  </div>
                </div>
              )}
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
      <div className="grid grid-cols-2 gap-2 text-sm">
        {/* Current Samples Column */}
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-medium text-green-700 mb-2">Current</h4>
          <div className="grid grid-cols-2 gap-1">
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
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-medium text-amber-600 mb-2">+5 Samples</h4>
          <div className="grid grid-cols-2 gap-1">
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
