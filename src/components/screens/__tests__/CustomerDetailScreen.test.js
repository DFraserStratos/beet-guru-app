import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomerDetailScreen from '../CustomerDetailScreen';

jest.mock('../../../hooks', () => ({
  useApi: jest.fn(),
  usePagination: jest.fn()
}));

const { useApi, usePagination } = require('../../../hooks');

const mockPagination = (data) => ({
  currentData: data,
  currentPage: 1,
  totalPages: 1,
  totalItems: data.length,
  goToPage: jest.fn(),
  goToPrevPage: jest.fn(),
  goToNextPage: jest.fn(),
  hasNextPage: false,
  hasPrevPage: false,
  startIndex: 0,
  endIndex: data.length
});

describe('CustomerDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading skeleton', () => {
    useApi
      .mockReturnValueOnce({ data: null, loading: true, error: null, execute: jest.fn() })
      .mockReturnValue({ data: [], loading: false, error: null, execute: jest.fn() });
    usePagination.mockReturnValue(mockPagination([]));
    const { container } = render(
      <CustomerDetailScreen customerId="1" onBack={() => {}} isMobile={false} />
    );
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  test('renders customer info and create assessment action', () => {
    const customer = { id: '1', name: 'Fred Forger', email: 'fred@b.com', status: 'active' };
    const locations = [{ id: 'l1', name: 'Paddock 1', area: 1 }];
    useApi
      .mockReturnValueOnce({ data: customer, loading: false, error: null, execute: jest.fn() })
      .mockReturnValueOnce({ data: locations, loading: false, error: null, execute: jest.fn() })
      .mockReturnValueOnce({ data: [], loading: false, error: null, execute: jest.fn() })
      .mockReturnValueOnce({ data: [], loading: false, error: null, execute: jest.fn() });
    usePagination.mockReturnValue(mockPagination([]));
    const onCreate = jest.fn();
    render(
      <CustomerDetailScreen
        customerId="1"
        onBack={() => {}}
        onCreateAssessment={onCreate}
        onViewReport={() => {}}
        isMobile={false}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Create New Assessment/i }));
    expect(onCreate).toHaveBeenCalledWith(customer);
    expect(screen.getByText('No reports found')).toBeInTheDocument();
  });
});
