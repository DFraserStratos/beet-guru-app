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
            <div key={step} className="flex flex-col items-center">
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
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="h-0.5 w-full bg-gray-200"></div>
        </div>
        <div className="relative flex justify-start">
          <div
            className={`h-0.5 ${currentStep >= 1 ? 'bg-green-600' : 'bg-gray-200'}`}
            style={{ width: `${100 / 3}%` }}
          ></div>
          <div
            className={`h-0.5 ${currentStep >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}
            style={{ width: `${100 / 3}%` }}
          ></div>
          <div
            className={`h-0.5 ${currentStep >= 3 ? 'bg-green-600' : 'bg-gray-200'}`}
            style={{ width: `${100 / 3}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StepProgress;