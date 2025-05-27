import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MagicLinkSentScreen from '../MagicLinkSentScreen';

describe('MagicLinkSentScreen', () => {
  test('demo button triggers verification', () => {
    const onVerify = jest.fn();
    render(<MagicLinkSentScreen email="a@b.com" onBack={() => {}} onVerify={onVerify} />);
    fireEvent.click(screen.getByRole('button', { name: /Demo: Click Magic Link/i }));
    expect(onVerify).toHaveBeenCalled();
  });
});
