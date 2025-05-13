import React, { useRef, useEffect, useState } from 'react';

/**
 * Progress indicator for multi-step assessment process
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const StepProgress = ({ currentStep, steps = ['Crop Details', 'Field Setup', 'Measurements', 'Review'] }) => {
  const progressContainerRef = useRef(null);
  const [trackContainerStyle, setTrackContainerStyle] = useState({
    width: '100%',
    marginLeft: '0px',
    marginRight: '0px'
  });
  const [progressWidth, setProgressWidth] = useState('0%');
  
  // Calculate exact track container dimensions and progress width based on dot positions
  useEffect(() => {
    if (!progressContainerRef.current) return;
    
    const container = progressContainerRef.current;
    const dots = container.querySelectorAll('.step-dot');
    
    if (dots.length < 2) return;
    
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    
    // Calculate positions of first and last dots relative to the container
    const firstDot = dots[0].getBoundingClientRect();
    const lastDot = dots[dots.length - 1].getBoundingClientRect();
    
    // Get the center positions of first and last dots
    const firstDotCenter = firstDot.left + (firstDot.width / 2) - containerRect.left;
    const lastDotCenter = lastDot.left + (lastDot.width / 2) - containerRect.left;
    
    // Calculate the exact width needed for the track (distance between first and last dot centers)
    const trackWidth = lastDotCenter - firstDotCenter;
    
    // Update track container style to position it exactly between first and last dot centers
    setTrackContainerStyle({
      width: `${trackWidth}px`,
      marginLeft: `${firstDotCenter}px`,
      marginRight: `calc(100% - ${lastDotCenter}px)`
    });
    
    // Calculate progress as percentage of track width based on current step
    if (currentStep <= 1) {
      setProgressWidth('0%');
    } else {
      // Get the position of the target dot (current step - 1)
      const targetDotIndex = Math.min(currentStep - 1, dots.length - 1);
      const targetDot = dots[targetDotIndex].getBoundingClientRect();
      const targetDotCenter = targetDot.left + (targetDot.width / 2) - containerRect.left;
      
      // Calculate progress as percentage of the track width
      const progressDistance = targetDotCenter - firstDotCenter;
      const progressPercentage = (progressDistance / trackWidth) * 100;
      
      setProgressWidth(`${progressPercentage}%`);
    }
  }, [currentStep]);
  
  return (
    <div className="mb-8">
      {/* Main progress container using CSS Grid for alignment */}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {/* Step numbers and labels row */}
        <div className="col-span-full grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
          {steps.map((stepLabel, index) => {
            const step = index + 1;
            return (
              <div key={step} className="flex flex-col items-center justify-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === currentStep 
                      ? 'bg-green-600 text-white' 
                      : step < currentStep 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </div>
                <div className="text-sm mt-2 font-medium text-gray-600 text-center">
                  {stepLabel}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Progress track and dots row */}
        <div className="col-span-full mt-4">
          {/* Container for dots and progress bar */}
          <div 
            ref={progressContainerRef}
            className="grid relative h-4" 
            style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
          >
            {/* Track container - positioned exactly between dot centers */}
            <div 
              className="absolute inset-y-0 flex items-center" 
              style={trackContainerStyle}
              aria-hidden="true"
            >
              {/* Background track */}
              <div className="h-0.5 w-full bg-gray-200"></div>
              
              {/* Progress fill */}
              <div 
                className="h-0.5 bg-green-600 absolute left-0 top-0 bottom-0 transition-all duration-300" 
                style={{ width: progressWidth }}
              ></div>
            </div>
            
            {/* Dots - positioned in grid cells */}
            {steps.map((_, index) => {
              const step = index + 1;
              return (
                <div key={step} className="flex justify-center items-center h-full relative z-10">
                  <div 
                    className={`step-dot w-4 h-4 rounded-full border-2 border-white ${
                      step <= currentStep ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepProgress;