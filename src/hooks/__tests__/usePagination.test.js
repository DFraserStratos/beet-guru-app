import { renderHook, act } from '@testing-library/react';
import usePagination from '../usePagination';

describe('usePagination', () => {
  test('navigates through pages', () => {
    const data = Array.from({ length: 12 }, (_, i) => i + 1);
    const { result } = renderHook(() => usePagination(data, 5));

    expect(result.current.currentData).toEqual([1, 2, 3, 4, 5]);

    act(() => {
      result.current.goToNextPage();
    });
    expect(result.current.currentData).toEqual([6, 7, 8, 9, 10]);

    act(() => {
      result.current.goToNextPage();
    });
    expect(result.current.currentData).toEqual([11, 12]);

    act(() => {
      result.current.goToPrevPage();
    });
    expect(result.current.currentData).toEqual([6, 7, 8, 9, 10]);
  });
});
