import React, { useState } from 'react';
import ErrorBoundary from '../utility/ErrorBoundary';
import { 
  StepProgress, 
  CropDetailsStep, 
  FieldSetupStep, 
  MeasurementsStep, 
  ReviewStep 
} from '../assessment';

/**
 * Screen for creating a new assessment with multi-step wizard
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const NewAssessmentScreen = ({ isMobile = false, onNavigate = () => {} }) => {
  // State for current step in the wizard
  const [currentStep, setCurrentStep] = useState(1);
  
  // State for form data across all steps
  const [formData, setFormData] = useState({
    // Initial values for the form
    locationId: '',
    growerId: '',
    cropTypeId: '',
    cultivarId: '',
    plantingDate: '2024-10-20',
    waterType: 'irrigated',
    estimatedGrowingCost: '2500',
    dryMatterPercentage: '14',
    rowSpacing: '0.5',
    rowCount: '0',
    fieldArea: '',
    sampleAreas: [
      { id: 1, sampleLength: '2', weight: '25.4', dryMatter: '14.2', notes: 'Northern edge of field, good plant density' },
      { id: 2, sampleLength: '', weight: '', dryMatter: '', notes: '' },
      { id: 3, sampleLength: '', weight: '', dryMatter: '', notes: '' }
    ]
  });
  
  // Navigation between steps
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Handle field changes in any step
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  
  // Handle assessment completion
  const handleComplete = (assessment) => {
    // Reset form and return to assessments screen
    setFormData({});
    setCurrentStep(1);
    onNavigate('assessments');
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <ErrorBoundary>
        {/* Progress Steps */}
        <StepProgress currentStep={currentStep} />
        
        {/* Step Content */}
        <div className="bg-white rounded-xl shadow p-6">
          <ErrorBoundary>
            {currentStep === 1 && (
              <CropDetailsStep
                formData={formData}
                onChange={handleFieldChange}
                onNext={nextStep}
              />
            )}
            
            {currentStep === 2 && (
              <FieldSetupStep
                formData={formData}
                onChange={handleFieldChange}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            
            {currentStep === 3 && (
              <MeasurementsStep
                formData={formData}
                onChange={handleFieldChange}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            
            {currentStep === 4 && (
              <ReviewStep
                formData={formData}
                onBack={prevStep}
                onComplete={handleComplete}
              />
            )}
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default NewAssessmentScreen;