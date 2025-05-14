import { useState, useEffect } from 'react';

/**
 * Custom hook to detect device type based on screen width
 * @returns {boolean} True if device is mobile
 */
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkDeviceType();

    // Add event listener for window resize
    window.addEventListener('resize', checkDeviceType);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return isMobile;
};

export default useDeviceDetection;