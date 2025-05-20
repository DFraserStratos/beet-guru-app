import { renderHook, act } from '@testing-library/react';
import useForm from '../useForm';

describe('useForm', () => {
  const initialValues = { name: '', age: '' };
  const validate = values => {
    const errors = {};
    if (!values.name) errors.name = 'Required';
    if (!values.age) errors.age = 'Required';
    return errors;
  };

  test('updates values and handles submit when valid', () => {
    const onSubmit = jest.fn((vals, done) => done());
    const { result } = renderHook(() => useForm(initialValues, validate, onSubmit));

    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'John', type: 'text' } });
    });
    expect(result.current.values.name).toBe('John');

    act(() => {
      result.current.handleBlur({ target: { name: 'name' } });
    });
    expect(result.current.touched.name).toBe(true);
    expect(result.current.errors).toEqual({ age: 'Required' });

    act(() => {
      result.current.handleChange({ target: { name: 'age', value: '30', type: 'text' } });
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} });
    });

    expect(onSubmit).toHaveBeenCalledWith({ name: 'John', age: '30' }, expect.any(Function));
    expect(result.current.isSubmitting).toBe(false);
  });

  test('resetForm restores initial state', () => {
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.setValues({ name: 'Jane', age: '40' });
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.values).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
  });
});
