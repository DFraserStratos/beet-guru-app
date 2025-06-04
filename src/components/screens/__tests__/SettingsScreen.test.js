import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsScreen from '../SettingsScreen';

describe('SettingsScreen', () => {
  test('save and password reset show alerts', () => {
    window.alert = jest.fn();
    render(<SettingsScreen user={{ name: 'Fred', email: 'fred@beetguru.com' }} />);
    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));
    expect(window.alert).toHaveBeenCalledWith('Settings saved successfully!');
    fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));
    expect(window.alert).toHaveBeenCalledWith(
      'Password reset email will be sent to your email address'
    );
  });
});
