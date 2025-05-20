import { renderHook, act } from '@testing-library/react';
import useDeviceDetection from '../useDeviceDetection';

describe('useDeviceDetection', () => {
  const originalWidth = window.innerWidth;

  afterEach(() => {
    window.innerWidth = originalWidth;
  });

  test('detects mobile and desktop based on window width', () => {
    window.innerWidth = 500;
    const { result } = renderHook(() => useDeviceDetection(768));
    expect(result.current).toBe(true);

    act(() => {
      window.innerWidth = 1024;
      window.dispatchEvent(new Event('resize'));
    });
    expect(result.current).toBe(false);
  });
});
