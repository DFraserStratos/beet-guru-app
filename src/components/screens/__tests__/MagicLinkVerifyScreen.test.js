import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MagicLinkVerifyScreen from '../MagicLinkVerifyScreen';
import { act } from 'react-dom/test-utils';

describe('MagicLinkVerifyScreen', () => {
  // Use real timers for async flow

  test('existing user is logged in after verification', async () => {
    const onLogin = jest.fn();

    render(
      <MagicLinkVerifyScreen
        email="fred@beetguru.com"
        onBack={() => {}}
        onLogin={onLogin}
        onRegister={() => {}}
        isNewUser={false}
      />,
    );

    await waitFor(() => expect(onLogin).toHaveBeenCalledWith({
      id: '1',
      name: 'Fred Forger',
      email: 'fred@beetguru.com',
      password: 'password123',
      hasPassword: true,
      role: 'Farm Manager',
      initials: 'FF',
      farmName: 'Fred\'s Farm',
      location: 'Canterbury, New Zealand'
    }), { timeout: 4000 });
  });

  test('new user is redirected to registration', async () => {
    const onRegister = jest.fn();
    render(
      <MagicLinkVerifyScreen
        email="new@example.com"
        onBack={() => {}}
        onLogin={() => {}}
        onRegister={onRegister}
        isNewUser
      />,
    );

    await waitFor(() => expect(onRegister).toHaveBeenCalledWith('new@example.com'), { timeout: 4000 });
  });
});
