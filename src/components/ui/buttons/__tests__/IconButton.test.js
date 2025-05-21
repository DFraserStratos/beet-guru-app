import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconButton from '../IconButton';

describe('IconButton', () => {
  test('applies aria-label and renders icon', () => {
    const icon = <svg data-testid="icon" />;
    render(<IconButton icon={icon} label="Add" />);
    const button = screen.getByLabelText('Add');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
