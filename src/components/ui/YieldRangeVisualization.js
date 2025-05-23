import React from 'react';
import { cn } from '../../utils/cn';

/**
 * YieldRangeVisualization Component
 * Displays crop yield estimates with comparative bars showing current samples versus projected additional samples
 * 
 * @param {Object} props
 * @param {Object} props.currentData - Current sample data with mean, upperLimit, lowerLimit, bulbYield, leafYield
 * @param {Object} props.additionalData - Additional sample data with same structure
 * @param {string} props.className - Optional additional CSS classes
 */
const YieldRangeVisualization = ({ 
  currentData = {
    mean: 17.2,
    upperLimit: 22.6,
    lowerLimit: 11.8,
    bulbYield: 14.3,
    leafYield: 2.9
  },
  additionalData = {
    mean: 18.0,
    upperLimit: 21.4,
    lowerLimit: 14.7,
    bulbYield: 15.1,
    leafYield: 2.9
  },
  className 
}) => {
  // Use fixed scale values that match the reference image
  const minValue = 11;
  const midValue = 17;
  const maxValue = 23;
  
  // For data that exceeds our scale, we'll need to extend it
  const allValues = [
    currentData.upperLimit,
    currentData.lowerLimit,
    additionalData.upperLimit,
    additionalData.lowerLimit
  ];
  
  const dataMax = Math.max(...allValues);
  
  // If data exceeds 23, extend the scale
  const scaleMax = dataMax > 23 ? Math.ceil(dataMax + 2) : 23;
  const range = scaleMax - minValue;
  
  // Calculate percentage position for a value on the scale
  const getPercentage = (value) => {
    return ((value - minValue) / range) * 100;
  };
  
  // Calculate bar properties
  const currentBar = {
    start: getPercentage(currentData.lowerLimit),
    end: getPercentage(currentData.upperLimit),
    width: getPercentage(currentData.upperLimit) - getPercentage(currentData.lowerLimit),
    meanPosition: getPercentage(currentData.mean)
  };
  
  const additionalBar = {
    start: getPercentage(additionalData.lowerLimit),
    end: getPercentage(additionalData.upperLimit),
    width: getPercentage(additionalData.upperLimit) - getPercentage(additionalData.lowerLimit),
    meanPosition: getPercentage(additionalData.mean)
  };
  
  // Grid line positions
  const gridLines = [
    { value: minValue, position: 0 },
    { value: midValue, position: getPercentage(midValue) },
    { value: scaleMax, position: 100 }
  ];

  return (
    <div className={cn("bg-green-50 rounded-lg p-6", className)}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Graph Section */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-6">Yield Analysis</h3>
          <p className="text-sm text-gray-600 mb-6">
            The chart below shows your current yield estimate and how it might change with additional samples. 
            More samples typically produce a more precise estimate (narrower confidence interval).
          </p>
          
          {/* Chart Container */}
          <div className="relative mb-8">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-24 flex flex-col justify-center gap-6">
              <div className="text-sm text-gray-700 text-right pr-4">Current</div>
              <div className="text-sm text-gray-700 text-right pr-4">+5 Samples</div>
            </div>
            
            {/* Chart Area */}
            <div className="ml-24 relative" style={{ height: '100px' }}>
              {/* Grid Lines */}
              <div className="absolute inset-0">
                {gridLines.map((line, index) => (
                  <div
                    key={index}
                    className="absolute top-0 bottom-0 w-px bg-gray-200"
                    style={{ left: `${line.position}%` }}
                  />
                ))}
              </div>
              
              {/* Bars Container - with gap between bars */}
              <div className="relative h-full flex flex-col justify-center gap-4">
                {/* Current Bar */}
                <div className="relative h-8">
                  {/* Actual confidence interval bar */}
                  <div
                    className="absolute h-full bg-green-500 rounded"
                    style={{
                      left: `${currentBar.start}%`,
                      width: `${currentBar.width}%`
                    }}
                  />
                  
                  {/* Mean value label - positioned above the mean point */}
                  <div
                    className="absolute -top-7 transform -translate-x-1/2 text-sm font-medium text-gray-700 whitespace-nowrap"
                    style={{ left: `${currentBar.meanPosition}%` }}
                  >
                    {currentData.mean.toFixed(1)}
                  </div>
                </div>
                
                {/* Additional Samples Bar */}
                <div className="relative h-8">
                  {/* Actual confidence interval bar */}
                  <div
                    className="absolute h-full bg-blue-400 rounded"
                    style={{
                      left: `${additionalBar.start}%`,
                      width: `${additionalBar.width}%`
                    }}
                  />
                  
                  {/* Mean value label - positioned above the mean point */}
                  <div
                    className="absolute -top-7 transform -translate-x-1/2 text-sm font-medium text-gray-700 whitespace-nowrap"
                    style={{ left: `${additionalBar.meanPosition}%` }}
                  >
                    {additionalData.mean.toFixed(1)}
                  </div>
                </div>
              </div>
              
              {/* X-axis with tick marks */}
              <div className="absolute -bottom-6 left-0 right-0 border-t border-gray-300">
                {gridLines.map((line, index) => (
                  <React.Fragment key={index}>
                    {/* Tick mark */}
                    <div
                      className="absolute w-px h-2 bg-gray-300 -top-1"
                      style={{ left: `${line.position}%` }}
                    />
                    {/* Label */}
                    <div
                      className="absolute text-xs text-gray-600 transform -translate-x-1/2 top-2"
                      style={{ left: `${line.position}%` }}
                    >
                      {line.value}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            {/* X-axis label - moved down with more spacing */}
            <div className="text-center mt-10 text-sm text-gray-600">
              Total yield (t DM/ha)
            </div>
          </div>
        </div>
        
        {/* Statistics Section - with top border and padding */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="grid grid-cols-2 gap-8">
            {/* Current Statistics */}
            <div>
              <h4 className="text-sm font-medium text-green-600 mb-3">Current</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mean:</span>
                  <span className="font-medium">{currentData.mean.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upper Limit:</span>
                  <span className="font-medium">{currentData.upperLimit.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lower Limit:</span>
                  <span className="font-medium">{currentData.lowerLimit.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bulb Yield:</span>
                  <span className="font-medium">{currentData.bulbYield.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Leaf Yield:</span>
                  <span className="font-medium">{currentData.leafYield.toFixed(1)}</span>
                </div>
              </div>
            </div>
            
            {/* Additional Samples Statistics */}
            <div>
              <h4 className="text-sm font-medium text-blue-500 mb-3">+5 Samples</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mean:</span>
                  <span className="font-medium">{additionalData.mean.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Upper Limit:</span>
                  <span className="font-medium">{additionalData.upperLimit.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lower Limit:</span>
                  <span className="font-medium">{additionalData.lowerLimit.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bulb Yield:</span>
                  <span className="font-medium">{additionalData.bulbYield.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Leaf Yield:</span>
                  <span className="font-medium">{additionalData.leafYield.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldRangeVisualization;
