import React from 'react';
import YieldRangeVisualization from '../components/ui/YieldRangeVisualization';
import Card from '../components/ui/Card';
import PageContainer from '../components/layout/PageContainer';

/**
 * Demo screen to showcase the YieldRangeVisualization component
 */
const YieldVisualizationDemo = ({ isMobile }) => {
  // Example data for demonstration - matching the screenshot
  const screenshotData = {
    current: {
      mean: 22.4,
      upperLimit: 29.1,
      lowerLimit: 15.7,
      bulbYield: 15.7,
      leafYield: 6.7
    },
    additional: {
      mean: 23.5,
      upperLimit: 28.2,
      lowerLimit: 18.8,
      bulbYield: 16.5,
      leafYield: 6.7
    }
  };

  // Original default data
  const defaultData = {
    current: {
      mean: 17.2,
      upperLimit: 22.6,
      lowerLimit: 11.8,
      bulbYield: 14.3,
      leafYield: 2.9
    },
    additional: {
      mean: 18.0,
      upperLimit: 21.4,
      lowerLimit: 14.7,
      bulbYield: 15.1,
      leafYield: 2.9
    }
  };

  // Alternative example with different values
  const alternativeData = {
    current: {
      mean: 15.5,
      upperLimit: 19.2,
      lowerLimit: 11.8,
      bulbYield: 12.8,
      leafYield: 2.7
    },
    additional: {
      mean: 16.3,
      upperLimit: 18.1,
      lowerLimit: 14.5,
      bulbYield: 13.5,
      leafYield: 2.8
    }
  };

  return (
    <PageContainer>
      <Card className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Yield Range Visualization Demo</h1>
        <p className="text-gray-600 mt-2">
          This page demonstrates the YieldRangeVisualization component used for displaying 
          crop yield estimates and confidence intervals.
        </p>
      </Card>

      {/* Screenshot Example */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Example 1: Screenshot Values (Extended Scale)</h2>
        <p className="text-sm text-gray-600 mb-4">
          This example uses the exact values from the screenshot. Note how the scale extends beyond 23 to accommodate the data.
        </p>
        <YieldRangeVisualization 
          currentData={screenshotData.current}
          additionalData={screenshotData.additional}
        />
      </div>

      {/* Default Example */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Example 2: Default Values (Standard Scale)</h2>
        <p className="text-sm text-gray-600 mb-4">
          This example shows data that fits within the standard 11-23 scale.
        </p>
        <YieldRangeVisualization 
          currentData={defaultData.current}
          additionalData={defaultData.additional}
        />
      </div>

      {/* Alternative Example */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Example 3: Lower Yield Scenario</h2>
        <p className="text-sm text-gray-600 mb-4">
          This example demonstrates how the visualization clearly shows the narrowing of confidence intervals with additional samples.
        </p>
        <YieldRangeVisualization 
          currentData={alternativeData.current}
          additionalData={alternativeData.additional}
        />
      </div>

      {/* Usage Example */}
      <Card className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Usage Example</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import YieldRangeVisualization from './components/ui/YieldRangeVisualization';

const MyComponent = () => {
  const currentData = {
    mean: 17.2,
    upperLimit: 22.6,
    lowerLimit: 11.8,
    bulbYield: 14.3,
    leafYield: 2.9
  };

  const additionalData = {
    mean: 18.0,
    upperLimit: 21.4,
    lowerLimit: 14.7,
    bulbYield: 15.1,
    leafYield: 2.9
  };

  return (
    <YieldRangeVisualization 
      currentData={currentData}
      additionalData={additionalData}
      className="my-custom-class"
    />
  );
};`}
        </pre>
      </Card>

      {/* Component Features */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Component Features</h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Responsive design that works on mobile and desktop
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Visual representation of confidence intervals with colored bars
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Clear labeling with mean values positioned at their actual location
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Grid lines at key reference points (11, 17, and max)
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Dynamic scale that extends when data exceeds standard range
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Detailed statistics table below the chart
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Color-coded sections (green for current, blue for additional samples)
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Clearly shows narrowing of confidence interval with more samples
          </li>
        </ul>
      </Card>
    </PageContainer>
  );
};

export default YieldVisualizationDemo;
