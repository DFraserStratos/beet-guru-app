import React from 'react';

/**
 * Progress indicator for multi-step assessment process
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const StepProgress = ({ currentStep, steps = ['Crop Details', 'Field Setup', 'Measurements', 'Review'] }) => {
  // Calculate progress width to exactly match step positions
  const calculateProgressWidth = () => {
    // Zero-indexed step for calculations
    const stepIndex = currentStep - 1;
    const totalSteps = steps.length;
    
    if (stepIndex === 0) {
      // First step, no progress
      return '0%';
    } else if (stepIndex >= totalSteps) {
      // Beyond last step, full progress
      return '100%';
    } else {
      // Calculate percentage based on current step position
      // This ensures the progress bar always ends exactly at the current step's dot
      return `${(stepIndex / (totalSteps - 1)) * 100}%`;
    }
  };
  
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
          {/* Dots container with relative positioning to serve as reference for the line */}
          <div className="grid relative" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {/* Background track - positioned relative to the dots */}
            <div className="absolute inset-0 flex items-center pointer-events-none" aria-hidden="true">
              {/* Position this line to start at the center of the first dot and end at the center of the last dot */}
              <div className="h-0.5 bg-gray-200" style={{
                position: 'absolute',
                left: '2px', // Half the dot width (4px / 2)
                right: '2px', // Half the dot width (4px / 2)
                width: 'calc(100% - 4px)'
              }}></div>
            </div>
            
            {/* Progress fill - aligned to start at the first dot's center */}
            <div className="absolute inset-0 flex items-center pointer-events-none" aria-hidden="true">
              <div 
                className="h-0.5 bg-green-600 transition-all duration-300" 
                style={{
                  position: 'absolute',
                  left: '2px', // Half the dot width (4px / 2)
                  width: calculateProgressWidth()
                }}
              ></div>
            </div>
            
            {/* Dots themselves */}
            {steps.map((_, index) => {
              const step = index + 1;
              return (
                <div key={step} className="flex justify-center relative z-10">
                  <div 
                    className={`w-4 h-4 rounded-full border-2 border-white ${
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