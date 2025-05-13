import React from 'react';

/**
 * Progress indicator for multi-step assessment process
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const StepProgress = ({ currentStep, steps = ['Crop Details', 'Field Setup', 'Measurements', 'Review'] }) => {
  // Calculate progress bar width and position
  const calculateProgressStyle = () => {
    const totalSteps = steps.length;
    
    if (currentStep === 1) {
      // First step - no progress width
      return { width: '0%', left: '0%' };
    } else if (currentStep > totalSteps) {
      // Completed all steps
      return { width: '100%', left: '0%' };
    } else {
      // Calculate segment width based on number of segments (not steps)
      const segmentWidth = 100 / (totalSteps - 1);
      
      // Calculate how many segments to fill (currentStep - 1)
      const segments = currentStep - 1;
      
      // Calculate width as a percentage
      const width = `${segmentWidth * segments}%`;
      
      return { width, left: '0%' };
    }
  };
  
  const progressStyle = calculateProgressStyle();
  
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
        
        {/* Progress track and dots row - positioned in the same grid columns for alignment */}
        <div className="col-span-full mt-4 relative">
          {/* Dots container - Grid ensures dots align with step numbers */}
          <div className="grid relative" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {/* Background track - now positioned relative to the dots container for better alignment */}
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="h-0.5 w-full bg-gray-200" style={{
                // Position the line to start at the first dot and end at the last dot
                marginLeft: '2px',
                marginRight: '2px',
                width: 'calc(100% - 4px)'
              }}></div>
            </div>
            
            {/* Progress fill */}
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div 
                className="h-0.5 bg-green-600 transition-all duration-300" 
                style={{
                  // Position the progress fill to start at the first dot
                  marginLeft: '2px',
                  width: progressStyle.width,
                  left: progressStyle.left
                }}
              ></div>
            </div>
            
            {/* Render the dots */}
            {steps.map((_, index) => {
              const step = index + 1;
              return (
                <div key={step} className="flex justify-center">
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