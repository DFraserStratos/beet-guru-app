import React from 'react';
import YieldRangeVisualization from '../ui/YieldRangeVisualization';

/**
 * Demo component for the YieldRangeVisualization
 * This component provides sample data and displays the visualization
 */
const YieldVisualizationDemo = () => {
  // Sample data based on typical beet crop yields
  const sampleCurrentData = {
    mean: 17.2,  // t DM/ha
    upperLimit: 22.6,
    lowerLimit: 11.8,
    bulbYield: 14.3,
    leafYield: 2.9
  };
  
  const sampleAdditionalData = {
    mean: 18.0,  // t DM/ha
    upperLimit: 21.4, // Narrower confidence interval with more samples
    lowerLimit: 14.7, // Higher lower bound with more samples
    bulbYield: 15.1,
    leafYield: 2.9
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Yield Visualization Demo</h2>
      <p className="mb-6 text-gray-600">
        This visualization compares your current yield estimate with what you might expect 
        if you collected 5 additional samples. More samples typically lead to more precise estimates 
        (narrower confidence intervals).
      </p>
      
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-medium">Yield Analysis</h3>
        </div>
        
        <div className="p-0">
          <p className="px-4 pt-4 text-sm text-gray-600">
            The chart below shows your current yield estimate and how it might change with additional samples.
            More samples typically produce a more precise estimate (narrower confidence interval).
          </p>
          <YieldRangeVisualization 
            currentData={sampleCurrentData}
            additionalData={sampleAdditionalData}
          />
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Note: This visualization uses sample data. In a real assessment, the values would be 
        calculated based on your actual field measurements.</p>
      </div>
    </div>
  );
};

export default YieldVisualizationDemo;
