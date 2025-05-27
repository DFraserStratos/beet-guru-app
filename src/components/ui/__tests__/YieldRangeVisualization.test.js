import React from 'react';
import { render, screen } from '@testing-library/react';
import YieldRangeVisualization from '../YieldRangeVisualization';

describe('YieldRangeVisualization', () => {
  const mockCurrentData = {
    mean: 17.2,
    upperLimit: 22.6,
    lowerLimit: 11.8,
    bulbYield: 14.3,
    leafYield: 2.9
  };

  const mockAdditionalData = {
    mean: 18.0,
    upperLimit: 21.4,
    lowerLimit: 14.7,
    bulbYield: 15.1,
    leafYield: 2.9
  };

  test('renders without crashing', () => {
    render(
      <YieldRangeVisualization 
        currentData={mockCurrentData}
        additionalData={mockAdditionalData}
      />
    );
    
    expect(screen.getByText('Yield Analysis')).toBeInTheDocument();
  });

  test('displays correct mean values', () => {
    render(
      <YieldRangeVisualization 
        currentData={mockCurrentData}
        additionalData={mockAdditionalData}
      />
    );
    
    // Check that mean values are displayed
    expect(screen.getAllByText('17.2')[0]).toBeInTheDocument();
    expect(screen.getAllByText('18.0')[0]).toBeInTheDocument();
  });

  test('shows correct statistics in tables', () => {
    render(
      <YieldRangeVisualization 
        currentData={mockCurrentData}
        additionalData={mockAdditionalData}
      />
    );
    
    // Check current data statistics
    expect(screen.getAllByText('22.6')[0]).toBeInTheDocument(); // Upper limit
    expect(screen.getAllByText('11.8')[0]).toBeInTheDocument(); // Lower limit
    expect(screen.getAllByText('14.3')[0]).toBeInTheDocument(); // Bulb yield
    
    // Check additional data statistics
    expect(screen.getAllByText('21.4')[0]).toBeInTheDocument(); // Upper limit
    expect(screen.getAllByText('14.7')[0]).toBeInTheDocument(); // Lower limit
    expect(screen.getAllByText('15.1')[0]).toBeInTheDocument(); // Bulb yield
  });

  test('renders with default data when no props provided', () => {
    render(<YieldRangeVisualization />);
    
    expect(screen.getByText('Yield Analysis')).toBeInTheDocument();
    expect(screen.getAllByText('17.2')[0]).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const { container } = render(
      <YieldRangeVisualization 
        currentData={mockCurrentData}
        additionalData={mockAdditionalData}
        className="custom-class"
      />
    );
    
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });
});
