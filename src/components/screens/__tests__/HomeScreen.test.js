import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeScreen from '../HomeScreen';

describe('HomeScreen', () => {
  test('shows user name and navigates to new assessment', () => {
    const onNavigate = jest.fn();
    render(<HomeScreen onNavigate={onNavigate} user={{ name: 'Jane' }} />);
    expect(screen.getByText('Welcome, Jane')).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /New Assessment/i });
    fireEvent.click(btn);
    expect(onNavigate).toHaveBeenCalledWith('new-assessment');
  });

  test('mobile variant uses short button label', () => {
    render(<HomeScreen isMobile onNavigate={() => {}} />);
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });
});
