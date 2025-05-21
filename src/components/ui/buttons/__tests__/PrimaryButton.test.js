import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrimaryButton from '../PrimaryButton';

describe('PrimaryButton', () => {
  test('renders children and forwards onClick', () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick}>Press</PrimaryButton>);
    const button = screen.getByRole('button', { name: 'Press' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  test('applies disabled prop', () => {
    render(<PrimaryButton disabled>Disabled</PrimaryButton>);
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
  });
});
