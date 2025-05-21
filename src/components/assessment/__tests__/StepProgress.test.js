import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepProgress from '../StepProgress';

// Helper to mock getBoundingClientRect with predictable values
const mockRects = (currentStep) => {
  // container, first dot, last dot, target dot
  const rects = [
    { left: 0, width: 200, top: 0 },
    { left: 0, width: 10, top: 0 },
    { left: 150, width: 10, top: 0 },
  ];
  if (currentStep > 1) {
    const positions = [0, 50, 100, 150];
    const index = Math.min(currentStep - 1, 3);
    rects.push({ left: positions[index], width: 10, top: 0 });
  }
  jest
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(() => rects.shift() || { left: 0, width: 0, top: 0 });
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe('StepProgress', () => {
  test('renders steps and highlights current step', () => {
    mockRects(1);
    const { container } = render(<StepProgress currentStep={1} />);
    const dots = container.querySelectorAll('.step-dot');
    expect(dots.length).toBe(4);
    const stepNumbers = [...container.querySelectorAll('div')].filter((el) =>
      ['1', '2', '3', '4'].includes(el.textContent)
    );
    expect(stepNumbers[0]).toHaveClass('bg-green-600');
  });

  test('calculates progress width when step changes', async () => {
    mockRects(2);
    const { container } = render(<StepProgress currentStep={2} />);
    await waitFor(() => {
      const progress = container.querySelector('.bg-green-600.absolute');
      expect(progress.style.width).toBe('33.33333333333333%');
    });
  });
});
