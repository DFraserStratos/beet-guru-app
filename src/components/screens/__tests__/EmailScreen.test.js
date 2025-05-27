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
      getRandomPersona: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        password: 'password',
        hasPassword: true,
      }),
    },
  };
});

describe('EmailScreen', () => {
  test('expands form after submitting email', async () => {
    render(
      <EmailScreen
        onEmailSubmit={() => {}}
        onKnownUser={() => {}}
        onNewUser={() => {}}
        onSelectPersona={() => {}}
        onLogin={() => {}}
      />,
    );

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'user@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
    });
  });
});
