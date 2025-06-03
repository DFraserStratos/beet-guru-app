import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterScreen from '../RegisterScreen';

describe('RegisterScreen', () => {
  test('always prefills fields with Fred Forger data', () => {
    render(
      <RegisterScreen
        onBack={() => {}}
        onComplete={() => {}}
        prefillEmail="newuser@example.com"
      />,
    );

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Fred Forger');
    expect(screen.getByLabelText(/Email address/i)).toHaveValue('newuser@example.com');
    expect(screen.getAllByLabelText(/Password/i)[0]).toHaveValue('password123');
    expect(screen.getByLabelText(/I agree/i)).toBeChecked();
  });

  test('prefills with Fred\'s email when no prefillEmail provided', () => {
    render(
      <RegisterScreen
        onBack={() => {}}
        onComplete={() => {}}
      />,
    );

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Fred Forger');
    expect(screen.getByLabelText(/Email address/i)).toHaveValue('fred@beetguru.com');
  });
});
