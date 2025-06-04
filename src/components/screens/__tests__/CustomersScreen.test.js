import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomersScreen from '../CustomersScreen';

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

describe('CustomersScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading skeleton', () => {
    useApi.mockReturnValue({ data: null, loading: true, error: null, execute: jest.fn() });
    usePagination.mockReturnValue(mockPagination([]));
    const { container } = render(<CustomersScreen user={{ id: '2' }} />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  test('renders customers and handles row click', () => {
    const customers = [{ id: '1', name: 'Fred Forger', email: 'fred@b.com', status: 'active', location: 'NZ' }];
    useApi.mockReturnValue({ data: customers, loading: false, error: null, execute: jest.fn() });
    usePagination.mockReturnValue(mockPagination(customers));
    const onViewCustomer = jest.fn();
    render(<CustomersScreen user={{ id: '2' }} onViewCustomer={onViewCustomer} />);
    fireEvent.click(screen.getByText('Fred Forger'));
    expect(onViewCustomer).toHaveBeenCalledWith('1');
  });

  test('shows empty state when no customers', () => {
    useApi.mockReturnValue({ data: [], loading: false, error: null, execute: jest.fn() });
    usePagination.mockReturnValue(mockPagination([]));
    render(<CustomersScreen user={{ id: '2' }} />);
    expect(screen.getByText('No customers found')).toBeInTheDocument();
  });
});
