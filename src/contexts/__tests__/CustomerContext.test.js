import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CustomerProvider, useCustomer } from '../CustomerContext';

// Test component to interact with the context
const TestComponent = () => {
  const {
    selectedCustomer,
    isCustomerRequired,
    selectCustomer,
    clearCustomer,
    requireCustomerSelection,
    hasSelectedCustomer
  } = useCustomer();

  const handleSelectCustomer = () => {
    selectCustomer({ id: '1', name: 'Test Customer' });
  };

  return (
    <div>
      <div data-testid="selected-customer">
        {selectedCustomer ? selectedCustomer.name : 'No customer'}
      </div>
      <div data-testid="is-required">
        {isCustomerRequired ? 'Required' : 'Not Required'}
      </div>
      <div data-testid="has-selected">
        {hasSelectedCustomer ? 'Has Customer' : 'No Customer'}
      </div>
      <button onClick={handleSelectCustomer}>Select Customer</button>
      <button onClick={clearCustomer}>Clear Customer</button>
      <button onClick={() => requireCustomerSelection(true)}>Require Selection</button>
    </div>
  );
};

describe('CustomerContext', () => {
  test('provides initial context values', () => {
    render(
      <CustomerProvider>
        <TestComponent />
      </CustomerProvider>
    );

    expect(screen.getByTestId('selected-customer')).toHaveTextContent('No customer');
    expect(screen.getByTestId('is-required')).toHaveTextContent('Not Required');
    expect(screen.getByTestId('has-selected')).toHaveTextContent('No Customer');
  });

  test('allows selecting and clearing customers', () => {
    render(
      <CustomerProvider>
        <TestComponent />
      </CustomerProvider>
    );

    // Select a customer
    fireEvent.click(screen.getByText('Select Customer'));
    expect(screen.getByTestId('selected-customer')).toHaveTextContent('Test Customer');
    expect(screen.getByTestId('has-selected')).toHaveTextContent('Has Customer');

    // Clear the customer
    fireEvent.click(screen.getByText('Clear Customer'));
    expect(screen.getByTestId('selected-customer')).toHaveTextContent('No customer');
    expect(screen.getByTestId('has-selected')).toHaveTextContent('No Customer');
  });

  test('allows setting customer requirement', () => {
    render(
      <CustomerProvider>
        <TestComponent />
      </CustomerProvider>
    );

    // Initially not required
    expect(screen.getByTestId('is-required')).toHaveTextContent('Not Required');

    // Set as required
    fireEvent.click(screen.getByText('Require Selection'));
    expect(screen.getByTestId('is-required')).toHaveTextContent('Required');
  });

  test('throws error when used outside provider', () => {
    // Suppress console error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useCustomer must be used within a CustomerProvider');

    consoleSpy.mockRestore();
  });
}); 