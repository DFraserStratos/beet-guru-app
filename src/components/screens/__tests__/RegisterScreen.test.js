import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterScreen from '../RegisterScreen';

describe('RegisterScreen', () => {
  test('fills demo data when helper clicked', () => {
    render(
      <RegisterScreen
        onBack={() => {}}
        onComplete={() => {}}
        prefillEmail="newuser@example.com"
      />,
    );

    // Initially empty
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('');
    // Use helper button to fill demo data
    fireEvent.click(screen.getByRole('button', { name: /Fill account details/i }));

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Fred Forger');
    expect(screen.getByLabelText(/Email address/i)).toHaveValue('newuser@example.com');
    expect(screen.getAllByLabelText(/Password/i)[0]).toHaveValue('password123');
    expect(screen.getByLabelText(/I agree/i)).toBeChecked();
  });

  test('fills Fred\'s email when no prefillEmail provided', () => {
    render(
      <RegisterScreen
        onBack={() => {}}
        onComplete={() => {}}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Fill account details/i }));
    expect(screen.getByLabelText(/Email address/i)).toHaveValue('fred@beetguru.com');
  });
});
