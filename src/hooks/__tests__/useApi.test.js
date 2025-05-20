import { renderHook, act } from '@testing-library/react';
import useApi from '../useApi';

describe('useApi', () => {
  test('successful call stores data and resets loading/error', async () => {
    const apiFn = jest.fn().mockResolvedValue('ok');
    const { result } = renderHook(() => useApi(apiFn));

    await act(async () => {
      const res = await result.current.execute('a');
      expect(res).toBe('ok');
    });

    expect(apiFn).toHaveBeenCalledWith('a');
    expect(result.current.data).toBe('ok');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('failed call stores error and returns null', async () => {
    const apiFn = jest.fn().mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useApi(apiFn));

    await act(async () => {
      const res = await result.current.execute();
      expect(res).toBeNull();
    });

    expect(result.current.error).toBe('fail');
    expect(result.current.loading).toBe(false);
  });

  test('reset clears state', async () => {
    const apiFn = jest.fn().mockResolvedValue('ok');
    const { result } = renderHook(() => useApi(apiFn));

    await act(async () => {
      await result.current.execute();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
