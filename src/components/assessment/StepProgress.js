import React from 'react';

/**
 * Progress indicator for multi-step assessment process
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const StepProgress = ({ currentStep, steps = ['Crop Details', 'Field Setup', 'Measurements', 'Review'] }) => {
  return (
    <div className="mb-8">
      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {steps.map((stepLabel, index) => {
          const step = index + 1;
          return (
            <div key={step} className="flex flex-col items-center relative">
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
              <div className="text-sm mt-2 font-medium text-gray-600">
                {stepLabel}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="relative mt-4">
        {/* Background track */}
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
        
        {/* Progress indicators */}
        <div className="relative">
          <div className="flex justify-between">
            {steps.map((_, index) => {
              const step = index + 1;
              return (
                <div 
                  key={step} 
                  className={`w-4 h-4 rounded-full border-2 border-white ${
                    step <= currentStep ? 'bg-green-600' : 'bg-gray-200'
                  } ${step === steps.length ? '' : ''}`}
                  style={{
                    marginLeft: step === 1 ? '0' : '',
                    marginRight: step === steps.length ? '0' : '',
                  }}
                ></div>
              );
            })}
          </div>
          
          {/* Progress fill */}
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div 
              className="h-0.5 bg-green-600 transition-all duration-300" 
              style={{ 
                width: `${(currentStep - 1) / (steps.length - 1) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepProgress;