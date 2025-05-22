import React from 'react';
import YieldRangeVisualization from '../components/ui/YieldRangeVisualization';
import Card from '../components/ui/Card';
import PageContainer from '../components/layout/PageContainer';

/**
 * Demo screen to showcase the YieldRangeVisualization component
 */
const YieldVisualizationDemo = ({ isMobile }) => {
  // Example data for demonstration
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

  // Alternative example with different values
  const alternativeCurrentData = {
    mean: 15.5,
    upperLimit: 19.2,
    lowerLimit: 11.8,
    bulbYield: 12.8,
    leafYield: 2.7
  };

  const alternativeAdditionalData = {
    mean: 16.3,
    upperLimit: 18.1,
    lowerLimit: 14.5,
    bulbYield: 13.5,
    leafYield: 2.8
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

      {/* Default Example */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Example 1: Default Values</h2>
        <YieldRangeVisualization 
          currentData={currentData}
          additionalData={additionalData}
        />
      </div>

      {/* Alternative Example */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Example 2: Lower Yield Scenario</h2>
        <YieldRangeVisualization 
          currentData={alternativeCurrentData}
          additionalData={alternativeAdditionalData}
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
            Clear labeling with mean values displayed above bars
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            Grid lines for easy value reading
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
            Accepts custom className for additional styling
          </li>
        </ul>
      </Card>
    </PageContainer>
  );
};

export default YieldVisualizationDemo;
