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
  // Determine the scale dynamically based on the data
  const allValues = [
    currentData.upperLimit,
    currentData.lowerLimit,
    additionalData.upperLimit,
    additionalData.lowerLimit
  ];
  
  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);
  
  // Add some padding to the scale
  const padding = (dataMax - dataMin) * 0.1;
  const scaleMin = Math.floor(dataMin - padding);
  const scaleMax = Math.ceil(dataMax + padding);
  
  // Ensure we have nice round numbers for the scale
  const minValue = Math.floor(scaleMin / 5) * 5; // Round down to nearest 5
  const maxValue = Math.ceil(scaleMax / 5) * 5;  // Round up to nearest 5
  const midValue = Math.round((minValue + maxValue) / 2);
  
  const range = maxValue - minValue;
  
  // Calculate percentage position for a value on the scale
  const getPercentage = (value) => {
    return ((value - minValue) / range) * 100;
  };
  
  // Calculate bar properties
  const currentBar = {
    start: getPercentage(currentData.lowerLimit),
    end: getPercentage(currentData.upperLimit),
    meanPosition: getPercentage(currentData.mean)
  };
  
  const additionalBar = {
    start: getPercentage(additionalData.lowerLimit),
    end: getPercentage(additionalData.upperLimit),
    meanPosition: getPercentage(additionalData.mean)
  };
  
  // Grid line positions
  const gridLines = [
    { value: minValue, position: 0 },
    { value: midValue, position: 50 },
    { value: maxValue, position: 100 }
  ];

  return (
    <div className={cn("bg-green-50 rounded-lg p-6", className)}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Graph Section */}
        <div className="p-6 pb-4">
          <h3 className="text-lg font-medium text-gray-800 mb-6">Yield Analysis</h3>
          <p className="text-sm text-gray-600 mb-6">
            The chart below shows your current yield estimate and how it might change with additional samples. 
            More samples typically produce a more precise estimate (narrower confidence interval).
          </p>
          
          {/* Chart Container */}
          <div className="relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 w-24 flex flex-col justify-around py-8">
              <div className="text-sm text-gray-700 text-right pr-4">Current</div>
              <div className="text-sm text-gray-700 text-right pr-4">+5 Samples</div>
            </div>
            
            {/* Chart Area */}
            <div className="ml-24 relative" style={{ height: '120px' }}>
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
              
              {/* Bars Container */}
              <div className="relative h-full flex flex-col justify-around py-4">
                {/* Current Bar */}
                <div className="relative h-8">
                  {/* Bar background (full width for context) */}
                  <div className="absolute h-full w-full opacity-5 bg-gray-400" />
                  
                  {/* Actual confidence interval bar */}
                  <div
                    className="absolute h-full bg-green-500 rounded"
                    style={{
                      left: `${currentBar.start}%`,
                      width: `${currentBar.end - currentBar.start}%`
                    }}
                  />
                  
                  {/* Mean value label */}
                  <div
                    className="absolute -top-6 transform -translate-x-1/2 text-sm font-medium text-gray-700"
                    style={{ left: `${currentBar.meanPosition}%` }}
                  >
                    {currentData.mean.toFixed(1)}
                  </div>
                </div>
                
                {/* Additional Samples Bar */}
                <div className="relative h-8">
                  {/* Bar background (full width for context) */}
                  <div className="absolute h-full w-full opacity-5 bg-gray-400" />
                  
                  {/* Actual confidence interval bar */}
                  <div
                    className="absolute h-full bg-blue-400 rounded"
                    style={{
                      left: `${additionalBar.start}%`,
                      width: `${additionalBar.end - additionalBar.start}%`
                    }}
                  />
                  
                  {/* Mean value label */}
                  <div
                    className="absolute -top-6 transform -translate-x-1/2 text-sm font-medium text-gray-700"
                    style={{ left: `${additionalBar.meanPosition}%` }}
                  >
                    {additionalData.mean.toFixed(1)}
                  </div>
                </div>
              </div>
              
              {/* X-axis */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-2 border-t border-gray-200">
                {gridLines.map((line, index) => (
                  <div
                    key={index}
                    className="absolute text-xs text-gray-600 transform -translate-x-1/2"
                    style={{ left: `${line.position}%` }}
                  >
                    {line.value}
                  </div>
                ))}
              </div>
              
              {/* X-axis label */}
              <div className="text-center mt-8 text-sm text-gray-600">
                Total yield (t DM/ha)
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistics Section */}
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
