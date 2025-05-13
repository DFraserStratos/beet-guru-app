import React, { useRef, useEffect, useState } from 'react';

/**
 * Progress indicator for multi-step assessment process with precise dot alignment
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const StepProgress = ({ currentStep, steps = ['Crop Details', 'Field Setup', 'Measurements', 'Review'] }) => {
  const progressContainerRef = useRef(null);
  const [progressStyle, setProgressStyle] = useState({
    width: '0%',
    marginLeft: '0px',
    marginRight: '0px'
  });
  
  // Calculate exact progress width and position based on dot positions
  useEffect(() => {
    if (progressContainerRef.current) {
      const container = progressContainerRef.current;
      const dots = container.querySelectorAll('.step-dot');
      
      if (dots.length > 0) {
        // Get positions of all dots relative to container
        const dotPositions = Array.from(dots).map(dot => {
          const rect = dot.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          // Calculate the center point of each dot
          return rect.left + (rect.width / 2) - containerRect.left;
        });
        
        // If we're on the first step or before, no progress to show
        if (currentStep <= 1) {
          setProgressStyle({
            width: '0%',
            marginLeft: '0px',
            marginRight: '0px'
          });
          return;
        }
        
        // For steps 2 and beyond, calculate the exact width needed
        // We want to go from the first dot to the dot representing current step - 1
        // (e.g., if we're on step 3, we want to go from dot 1 to dot 2)
        const startPosition = dotPositions[0];
        const endPosition = dotPositions[Math.min(currentStep - 1, dotPositions.length - 1)];
        const exactWidth = endPosition - startPosition;
        
        // Set the progress bar's width and position
        setProgressStyle({
          width: `${exactWidth}px`,
          marginLeft: `${startPosition}px`,
          marginRight: 'auto'
        });
      }
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
        <div className="col-span-full mt-4 relative">
          {/* Container for dots and progress bar with exact positioning */}
          <div 
            ref={progressContainerRef}
            className="grid relative" 
            style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
          >
            {/* Background track - contains within the dots */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center mx-2" aria-hidden="true">
              <div className="h-0.5 w-full bg-gray-200"></div>
            </div>
            
            {/* Progress fill - positioned with exact calculations */}
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
              <div 
                className="h-0.5 bg-green-600 transition-all duration-300" 
                style={progressStyle}
              ></div>
            </div>
            
            {/* Dots */}
            {steps.map((_, index) => {
              const step = index + 1;
              return (
                <div key={step} className="flex justify-center relative z-10">
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