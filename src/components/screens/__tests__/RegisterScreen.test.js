import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterScreen from '../RegisterScreen';

describe('RegisterScreen', () => {
  test('prefills fields with selected persona', () => {
    const persona = {
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password',
      hasPassword: true,
      role: 'Farm Manager',
      farmName: 'Sunny Farm',
      location: 'Canterbury',
    };

    render(
      <RegisterScreen
        onBack={() => {}}
        onComplete={() => {}}
        selectedPersona={persona}
      />,
    );

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Demo User');
    expect(screen.getByLabelText(/Email address/i)).toHaveValue('demo@example.com');
    expect(screen.getAllByLabelText(/Password/i)[0]).toHaveValue('password');
    expect(screen.getByLabelText(/I agree/i)).toBeChecked();
  });
});
