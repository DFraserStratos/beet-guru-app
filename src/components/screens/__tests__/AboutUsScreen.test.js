import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUsScreen from '../AboutUsScreen';

describe('AboutUsScreen', () => {
  test('shows about content and handles mobile back', () => {
    const onNavigate = jest.fn();
    render(<AboutUsScreen onNavigate={onNavigate} isMobile />);
    expect(screen.getByText(/About Agricom/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Back/i }));
    expect(onNavigate).toHaveBeenCalledWith('more');
  });
});
