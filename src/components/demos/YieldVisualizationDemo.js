import React from 'react';
import YieldRangeVisualization from '../ui/YieldRangeVisualization';

/**
 * Demo component for the YieldRangeVisualization
 * This component provides sample data and displays the visualization
 */
const YieldVisualizationDemo = () => {
  // Sample data based on typical beet crop yields
  const sampleCurrentData = {
    mean: 17.24,
    upperLimit: 22.6,
    lowerLimit: 11.8,
    bulbYield: 14.3,
    leafYield: 2.94
  };
  
  const sampleAdditionalData = {
    mean: 18.04,
    upperLimit: 21.4,
    lowerLimit: 14.7,
    bulbYield: 15.1,
    leafYield: 2.94
  };
  
  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Yield Visualization Demo</h2>
      <p className="mb-6 text-gray-600">
        This visualization compares your current yield estimate with what you might expect 
        if you collected 5 additional samples. More samples typically lead to more precise estimates 
        (narrower confidence intervals).
      </p>
      
      <YieldRangeVisualization 
        currentData={sampleCurrentData}
        additionalData={sampleAdditionalData}
      />
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Note: This visualization uses sample data. In a real assessment, the values would be 
        calculated based on your actual field measurements.</p>
      </div>
    </div>
  );
};

export default YieldVisualizationDemo;
