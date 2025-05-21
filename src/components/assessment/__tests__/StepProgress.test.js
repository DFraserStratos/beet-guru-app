import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepProgress from '../StepProgress';


describe('StepProgress', () => {
  test('renders steps and highlights current step', () => {
    const { container } = render(<StepProgress currentStep={1} />);
    const dots = container.querySelectorAll('.step-dot');
    expect(dots.length).toBe(4);
    const stepNumbers = [...container.querySelectorAll('div')].filter((el) =>
      ['1', '2', '3', '4'].includes(el.textContent)
    );
    expect(stepNumbers[0]).toHaveClass('bg-green-600');
  });

  test('calculates progress width when step changes', () => {
    const { getByTestId } = render(<StepProgress currentStep={2} />);
    const progress = getByTestId('progress-fill');
    expect(progress.style.width).toBe('33.33333333333333%');
  });
});
