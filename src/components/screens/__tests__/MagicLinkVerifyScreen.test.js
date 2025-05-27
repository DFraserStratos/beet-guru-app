import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MagicLinkVerifyScreen from '../MagicLinkVerifyScreen';
import { act } from 'react-dom/test-utils';

describe('MagicLinkVerifyScreen', () => {
  // Use real timers for async flow

  test('existing user is logged in after verification', async () => {
    const onLogin = jest.fn();
    const persona = { name: 'Demo User', email: 'demo@example.com' };

    render(
      <MagicLinkVerifyScreen
        email="demo@example.com"
        onBack={() => {}}
        onLogin={onLogin}
        onRegister={() => {}}
        selectedPersona={persona}
        isNewUser={false}
      />,
    );

    await waitFor(() => expect(onLogin).toHaveBeenCalledWith(persona), { timeout: 4000 });
  });

  test('new user is redirected to registration', async () => {
    const onRegister = jest.fn();
    render(
      <MagicLinkVerifyScreen
        email="new@example.com"
        onBack={() => {}}
        onLogin={() => {}}
        onRegister={onRegister}
        selectedPersona={null}
        isNewUser
      />,
    );

    await waitFor(() => expect(onRegister).toHaveBeenCalledWith('new@example.com'), { timeout: 4000 });
  });
});
