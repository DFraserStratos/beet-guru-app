import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmailScreen from '../EmailScreen';

jest.mock('../../../services/api', () => {
  const actual = jest.requireActual('../../../services/api');
  return {
    ...actual,
    auth: {
      ...actual.auth,
      getUser: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Fred Forger',
        email: 'fred@beetguru.com',
        password: 'password123',
        hasPassword: true,
      }),
    },
  };
});

describe('EmailScreen', () => {
  test('renders email input', () => {
    render(<EmailScreen onEmailSubmit={() => {}} onSendCode={() => {}} onLogin={() => {}} />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
