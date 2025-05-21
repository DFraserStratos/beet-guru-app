import React from 'react';

/**
 * Component for visualizing yield estimates with bar graphs 
 * 
 * @param {Object} currentData - Data for current samples
 * @param {Object} additionalData - Data for scenario with additional samples
 * @returns {JSX.Element} Rendered component
 */
const YieldRangeVisualization = ({ 
  currentData, 
  additionalData
}) => {
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
    <div className="bg-green-50 rounded-lg p-6" id="yield-visualization">
      {/* Title */}
      <h3 className="text-lg font-medium text-gray-800 mb-2">Yield Estimate</h3>
      
      {/* Bar Chart Visualization */}
      <div className="mb-4 pt-4">
        {/* Chart container with grid lines */}
        <div className="relative mb-8">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-6 w-full h-full" aria-hidden="true">
            <div className="border-l border-gray-200 h-full"></div>
            <div className="border-l border-gray-200 h-full"></div>
            <div className="border-l border-gray-200 h-full"></div>
            <div className="border-l border-gray-200 h-full"></div>
            <div className="border-l border-gray-200 h-full"></div>
            <div className="border-l border-gray-200 h-full"></div>
          </div>
          
          <div className="flex flex-col gap-16 mb-2 relative">
            {/* Current Sample Bar */}
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium text-gray-700">Current</div>
              <div className="flex-1 relative h-16">
                {/* Bar for Current */}
                <div 
                  className="absolute bg-green-500 top-1/2 transform -translate-y-1/2 h-16"
                  style={{
                    width: `${getBarWidth(currentData.mean)}%`,
                    minWidth: '40px',
                    marginLeft: '10%' // Offset to center the bars
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
                  className="absolute bg-blue-400 top-1/2 transform -translate-y-1/2 h-16"
                  style={{
                    width: `${getBarWidth(additionalData.mean)}%`,
                    minWidth: '40px',
                    marginLeft: '10%' // Offset to center the bars
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
          <div className="flex justify-between text-xs text-gray-500 mt-4 relative" style={{ marginLeft: '10%', width: '80%' }}>
            <div className="absolute left-0 -ml-2">0</div>
            <div className="absolute left-1/6 -ml-2">5</div>
            <div className="absolute left-2/6 -ml-2">10</div>
            <div className="absolute left-3/6 -ml-2">15</div>
            <div className="absolute left-4/6 -ml-2">20</div>
            <div className="absolute left-5/6 -ml-2">30</div>
            <div className="absolute right-0 -mr-2">40</div>
          </div>
          
          {/* X-axis title */}
          <div className="text-sm text-gray-600 text-center mt-8">
            Total yield (t DM/ha)
          </div>
        </div>
      </div>
      
      {/* Statistical Values Display */}
      <div className="grid grid-cols-2 gap-4 text-sm mt-8">
        {/* Current Samples Column */}
        <div className="bg-white p-4 rounded">
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
        <div className="bg-white p-4 rounded">
          <h4 className="font-medium text-blue-600 mb-3">+5 Samples</h4>
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
    </div>
  );
};

export default YieldRangeVisualization;
