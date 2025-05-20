import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns default value when none stored', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  test('updates localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'start'));
    act(() => {
      result.current[1]('next');
    });
    expect(JSON.parse(localStorage.getItem('key'))).toBe('next');
  });
});
