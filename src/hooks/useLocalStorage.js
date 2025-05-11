import { useState, useEffect } from 'react';

/**
 * Hook for using localStorage with state
 * @param {string} key - localStorage key
 * @param {any} initialValue - Default value if not in localStorage
 * @returns {Array} [storedValue, setValue] - State and setter
 */
const useLocalStorage = (key, initialValue) => {
  // Get from localStorage or use initialValue
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;