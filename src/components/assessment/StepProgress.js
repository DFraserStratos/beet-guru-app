import React, { useRef, useEffect, useState } from 'react';

/**
 * Progress indicator for multi-step assessment process
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const StepProgress = ({ currentStep, steps = ['Crop Details', 'Field Setup', 'Measurements', 'Review'] }) => {
  const dotsContainerRef = useRef(null);
  const [progressWidth, setProgressWidth] = useState('0%');
  
  // Calculate progress width based on dots positions
  useEffect(() => {
    if (dotsContainerRef.current) {
      const container = dotsContainerRef.current;
      const dots = container.querySelectorAll('.step-dot');
      
      // If we have dots and a current step
      if (dots.length > 0 && currentStep > 1) {
        // Get first dot position (left edge of container is 0)
        const firstDot = dots[0].getBoundingClientRect();
        const firstDotCenter = firstDot.left + (firstDot.width / 2) - container.getBoundingClientRect().left;
        
        // Get position of the current step's dot
        const currentStepIndex = Math.min(currentStep - 1, dots.length - 1);
        const currentDot = dots[currentStepIndex].getBoundingClientRect();
        const currentDotCenter = currentDot.left + (currentDot.width / 2) - container.getBoundingClientRect().left;
        
        // Calculate the exact width needed
        const exactWidth = currentDotCenter - firstDotCenter;
        
        // Set progress width as a percentage of container width
        const containerWidth = container.offsetWidth;
        const widthPercentage = (exactWidth / containerWidth) * 100;
        
        setProgressWidth(`${widthPercentage}%`);
      } else {
        setProgressWidth('0%');
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
          {/* Dots container */}
          <div 
            ref={dotsContainerRef}
            className="grid relative" 
            style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
          >
            {/* Background track - spans between first and last dot centers */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none" aria-hidden="true">
              <div className="h-0.5 w-full bg-gray-200"></div>
            </div>
            
            {/* Progress fill - positioned to start at first dot center */}
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none" aria-hidden="true">
              <div 
                className="h-0.5 bg-green-600 transition-all duration-300" 
                style={{ width: progressWidth }}
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