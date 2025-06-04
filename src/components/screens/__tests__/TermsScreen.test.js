import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TermsScreen from '../TermsScreen';

describe('TermsScreen', () => {
  test('renders terms heading and back button on mobile', () => {
    const onNavigate = jest.fn();
    render(<TermsScreen onNavigate={onNavigate} isMobile />);
    expect(
      screen.getByRole('heading', { name: /Terms & Conditions/i })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Back/i }));
    expect(onNavigate).toHaveBeenCalledWith('more');
  });
});
