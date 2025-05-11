import { useState, useEffect } from 'react';

/**
 * Hook for detecting device type based on screen width
 * @param {number} mobileBreakpoint - Width threshold to determine mobile devices
 * @returns {boolean} isMobile - Whether the current device is mobile
 */
const useDeviceDetection = (mobileBreakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < mobileBreakpoint);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileBreakpoint]);
  
  return isMobile;
};

export default useDeviceDetection;