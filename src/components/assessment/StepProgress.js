import React, { useRef, useEffect, useState } from 'react';

/**
 * Progress indicator for multi-step assessment process
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const StepProgress = ({ currentStep, steps = ['Crop Details', 'Field Setup', 'Measurements', 'Review'] }) => {
  const progressContainerRef = useRef(null);
  const [progressBarStyle, setProgressBarStyle] = useState({
    width: '0',
    left: '0'
  });
  
  // Calculate and update progress bar dimensions based on actual dot positions
  useEffect(() => {
    if (!progressContainerRef.current) return;
    
    const container = progressContainerRef.current;
    const dots = container.querySelectorAll('.step-dot');
    
    if (dots.length === 0) return;
    
    // Calculate positions of all dots relative to the container
    const containerRect = container.getBoundingClientRect();
    const dotPositions = Array.from(dots).map(dot => {
      const rect = dot.getBoundingClientRect();
      // Return the center position of the dot
      return rect.left + (rect.width / 2) - containerRect.left;
    });
    
    // No progress for step 1
    if (currentStep <= 1) {
      setProgressBarStyle({
        width: '0',
        left: `${dotPositions[0]}px`
      });
      return;
    }
    
    // Calculate exact progress width based on current step
    // Progress should go from first dot to the dot representing previous step
    const targetDotIndex = Math.min(currentStep - 1, dots.length - 1);
    const startPos = dotPositions[0];
    const endPos = dotPositions[targetDotIndex];
    const width = endPos - startPos;
    
    // Update progress bar style with exact positioning
    setProgressBarStyle({
      width: `${width}px`,
      left: `${startPos}px`
    });
    
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
            {/* Background track - spans between first and last dot */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center" aria-hidden="true">
              <div className="h-0.5 w-full bg-gray-200"></div>
            </div>
            
            {/* Progress fill - with exact positioning to align with dots */}
            <div className="absolute inset-y-0 flex items-center pointer-events-none" aria-hidden="true">
              <div 
                className="h-0.5 bg-green-600 transition-all duration-300" 
                style={{ 
                  position: 'absolute',
                  width: progressBarStyle.width,
                  left: progressBarStyle.left
                }}
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