import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterScreen from '../RegisterScreen';

describe('RegisterScreen', () => {
  test('demo fill button populates fields with Fred\'s data', () => {
    render(
      <RegisterScreen
        onBack={() => {}}
        onComplete={() => {}}
        prefillEmail="newuser@example.com"
      />,
    );

    // Initially fields are empty except email
    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email address/i)).toHaveValue('newuser@example.com');

    // Click the demo helper link to fill the form
    act(() => {
      screen.getByRole('button', { name: /Fill account details/i }).click();
    });

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Fred Forger');
    expect(screen.getAllByLabelText(/Password/i)[0]).toHaveValue('password123');
    expect(screen.getByLabelText(/I agree/i)).toBeChecked();
  });

  test('demo fill uses Fred\'s default email when none provided', () => {
    render(
      <RegisterScreen
        onBack={() => {}}
        onComplete={() => {}}
      />,
    );

    act(() => {
      screen.getByRole('button', { name: /Fill account details/i }).click();
    });

    expect(screen.getByLabelText(/Email address/i)).toHaveValue('fred@beetguru.com');
  });
});
