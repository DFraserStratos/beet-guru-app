import React, { useState, useRef } from 'react';

/**
 * Component for visualizing yield estimates with confidence intervals
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
  
  // Refs for calculating dimensions and scales
  const containerRef = useRef(null);
  
  // Derived calculations
  const allValues = [
    currentData.lowerLimit, 
    currentData.upperLimit, 
    additionalData.lowerLimit, 
    additionalData.upperLimit
  ];
  const minValue = Math.floor(Math.min(...allValues));
  const maxValue = Math.ceil(Math.max(...allValues));
  const rangeWidth = maxValue - minValue;
  
  // Calculate positions as percentages for responsive sizing
  const getPositionPercent = (value) => {
    return ((value - minValue) / rangeWidth) * 100;
  };
  
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
  
  return (
    <div className="bg-white rounded-lg shadow p-4" ref={containerRef}>
      {/* Optional Title */}
      <h3 className="text-lg font-medium text-gray-900 mb-4">Yield Estimate</h3>
      
      {/* Optional View Toggle */}
      <div className="flex justify-end mb-2">
        <button 
          onClick={handleToggleView}
          className={`text-sm px-2 py-1 rounded ${
            activeView === 'total' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {activeView === 'total' ? 'Show Components' : 'Show Total'}
        </button>
      </div>
      
      {/* Visualization Container */}
      <div className="h-48 relative mb-4">
        {/* X-Axis Labels and Ticks */}
        <div className="absolute bottom-0 left-0 right-0 h-6 flex justify-between text-xs text-gray-500">
          <span>{minValue}</span>
          <span>{((minValue + maxValue) / 2).toFixed(1)}</span>
          <span>{maxValue}</span>
        </div>
        
        {/* Current Samples Row */}
        <div className="absolute top-1/4 left-0 right-0 h-10 flex items-center">
          {/* Label */}
          <div className="w-24 text-sm font-medium text-gray-700">Current</div>
          
          {/* Range Line */}
          <div className="flex-1 relative h-full flex items-center">
            <div 
              className="absolute h-1 bg-gray-300 rounded-full"
              style={{
                left: `${getPositionPercent(currentData.lowerLimit)}%`,
                width: `${getPositionPercent(currentData.upperLimit) - getPositionPercent(currentData.lowerLimit)}%`
              }}
            ></div>
            
            {/* Mean Marker */}
            <div 
              className="absolute h-4 w-4 rounded-full bg-green-600 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${getPositionPercent(currentData.mean)}%`
              }}
            ></div>
            
            {/* Mean Value Label */}
            <div 
              className="absolute text-sm font-medium text-gray-900 transform -translate-x-1/2"
              style={{
                left: `${getPositionPercent(currentData.mean)}%`,
                top: '-20px'
              }}
            >
              {formatValue(currentData.mean)}
            </div>
            
            {/* Component Breakdown (conditional) */}
            {activeView === 'components' && (
              <div className="absolute -bottom-5 flex">
                <div 
                  className="h-2 bg-green-700 rounded-l"
                  style={{
                    left: `${getPositionPercent(currentData.mean - currentData.leafYield)}%`,
                    width: `${getPositionPercent(currentData.leafYield)}%`
                  }}
                ></div>
                <div 
                  className="h-2 bg-green-500 rounded-r"
                  style={{
                    left: `${getPositionPercent(currentData.mean)}%`,
                    width: `${getPositionPercent(currentData.bulbYield)}%`
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
        
        {/* Additional Samples Row */}
        <div className="absolute top-2/3 left-0 right-0 h-10 flex items-center">
          {/* Label */}
          <div className="w-24 text-sm font-medium text-gray-700">+5 Samples</div>
          
          {/* Range Line */}
          <div className="flex-1 relative h-full flex items-center">
            <div 
              className="absolute h-1 bg-gray-300 rounded-full"
              style={{
                left: `${getPositionPercent(additionalData.lowerLimit)}%`,
                width: `${getPositionPercent(additionalData.upperLimit) - getPositionPercent(additionalData.lowerLimit)}%`
              }}
            ></div>
            
            {/* Mean Marker */}
            <div 
              className="absolute h-4 w-4 rounded-full bg-amber-500 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${getPositionPercent(additionalData.mean)}%`
              }}
            ></div>
            
            {/* Mean Value Label */}
            <div 
              className="absolute text-sm font-medium text-gray-900 transform -translate-x-1/2"
              style={{
                left: `${getPositionPercent(additionalData.mean)}%`,
                top: '-20px'
              }}
            >
              {formatValue(additionalData.mean)}
            </div>
            
            {/* Component Breakdown (conditional) */}
            {activeView === 'components' && (
              <div className="absolute -bottom-5 flex">
                <div 
                  className="h-2 bg-amber-700 rounded-l"
                  style={{
                    left: `${getPositionPercent(additionalData.mean - additionalData.leafYield)}%`,
                    width: `${getPositionPercent(additionalData.leafYield)}%`
                  }}
                ></div>
                <div 
                  className="h-2 bg-amber-400 rounded-r"
                  style={{
                    left: `${getPositionPercent(additionalData.mean)}%`,
                    width: `${getPositionPercent(additionalData.bulbYield)}%`
                  }}
                ></div>
              </div>
            )}
          </div>
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
