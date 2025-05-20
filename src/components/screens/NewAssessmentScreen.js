import React, { useState, useEffect } from 'react';
import ErrorBoundary from '../utility/ErrorBoundary';
import PageContainer from '../layout/PageContainer';
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
import ErrorBoundary from '../utility/ErrorBoundary';
import { useNavigation } from '../../context/NavigationContext';

const NewAssessmentScreen = ({
  isMobile = false,
  onViewReport = () => {},
  prefillLocation = null,
  draftAssessment = null
}) => {
  const { navigate } = useNavigation();
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // State for current step in the wizard
  const [currentStep, setCurrentStep] = useState(1);
  
  // State for form data across all steps
  const [formData, setFormData] = useState({
    // Initial values for the form
    locationId: '',
    stockType: '',
    cultivarId: '',
    customCultivarName: '',
    sowingDate: '2024-10-20',  // Renamed from plantingDate to sowingDate
    assessmentDate: today,     // New field for assessment date
    waterType: 'irrigated',
    estimatedGrowingCost: '2500',
    
    // Field Setup - new structure
    rowSpacing: '0.5',
    measurementLength: '4',
    bulbEstimate: '2',
    leafEstimate: '3',
    valueType: 'estimate',
    
    // Field measurements
    sampleAreas: [
      { id: 1, sampleLength: '2', weight: '25.4', dryMatter: '14.2', notes: 'Northern edge of field, good plant density' },
      { id: 2, sampleLength: '', weight: '', dryMatter: '', notes: '' },
      { id: 3, sampleLength: '', weight: '', dryMatter: '', notes: '' }
    ]
  });
  
  // Handle prefilled location and draft assessment
  useEffect(() => {
    if (draftAssessment) {
      // Load draft assessment data
      setFormData({
        ...draftAssessment,
        locationId: draftAssessment.locationId || (prefillLocation ? prefillLocation.id : '')
      });
    } else if (prefillLocation) {
      // Just prefill location
      setFormData(prevData => ({
        ...prevData,
        locationId: prefillLocation.id
      }));
    }
  }, [prefillLocation, draftAssessment]);

  const scrollToTop = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0 });
      return;
    }
    window.scrollTo({ top: 0 });
  };

  // Navigation between steps
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      scrollToTop();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      scrollToTop();
    }
  };
  
  // Handle field changes in any step
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  
  // Handle assessment completion
  const handleComplete = (assessment) => {
    // If there's a report ID, navigate to the report viewer
    if (assessment && assessment.reportId) {
      onViewReport(assessment.reportId);
    } else {
      // Otherwise, reset form and return to assessments screen
      setFormData({});
      setCurrentStep(1);
      navigate('assessments');
    }
  };
  
  // Handle cancel
  const handleCancel = () => {
    // Confirm before canceling
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      setFormData({});
      setCurrentStep(1);
      navigate('assessments');
    }
  };
  
  return (
    <PageContainer className="max-w-4xl">
      <ErrorBoundary>
        {/* Progress Steps */}
        <StepProgress currentStep={currentStep} />
        
        {/* Step Content */}
        <div className="bg-white rounded-xl shadow p-6 mb-4">
          <ErrorBoundary>
            {currentStep === 1 && (
              <CropDetailsStep
                formData={formData}
                onChange={handleFieldChange}
                onNext={handleNextStep}
                onCancel={handleCancel}
                prefillLocation={prefillLocation}
                isMobile={isMobile}
              />
            )}
            
            {currentStep === 2 && (
              <FieldSetupStep
                formData={formData}
                onChange={handleFieldChange}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                onCancel={handleCancel}
                isMobile={isMobile}
              />
            )}
            
            {currentStep === 3 && (
              <MeasurementsStep
                formData={formData}
                onChange={handleFieldChange}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                onCancel={handleCancel}
                isMobile={isMobile}
              />
            )}
            
            {currentStep === 4 && (
              <ReviewStep
                formData={formData}
                onBack={handlePrevStep}
                onComplete={handleComplete}
                onCancel={handleCancel}
                isMobile={isMobile}
              />
            )}
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </PageContainer>
  );
};

export default NewAssessmentScreen;
