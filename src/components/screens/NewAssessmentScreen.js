import React, { useState, useEffect } from 'react';
import ErrorBoundary from '../utility/ErrorBoundary';
import { 
  StepProgress, 
  CropDetailsStep, 
  FieldSetupStep, 
  MeasurementsStep, 
  ReviewStep 
} from '../assessment';
import ReportViewerScreen from './ReportViewerScreen';

/**
 * Screen for creating a new assessment with multi-step wizard
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const NewAssessmentScreen = ({ 
  isMobile = false, 
  onNavigate = () => {},
  prefillLocation = null,
  draftAssessment = null 
}) => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // State for current step in the wizard
  const [currentStep, setCurrentStep] = useState(1);
  
  // State for viewing a generated report
  const [viewingReportId, setViewingReportId] = useState(null);
  
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
      { id: 1, leafWeight: '8.2', bulbWeight: '16.9', plantCount: '24' }
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
  
  // Navigation between steps
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
    }
  };
  
  // Handle field changes in any step
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  
  // Handle viewing a generated report
  const handleViewReport = (reportId) => {
    // Set the report ID to view
    setViewingReportId(reportId);
    // Scroll to top
    window.scrollTo(0, 0);
  };
  
  // Handle back from report viewer
  const handleBackFromReport = () => {
    setViewingReportId(null);
    // Return to the assessments screen
    onNavigate('assessments');
  };
  
  // Handle assessment completion
  const handleComplete = (assessment) => {
    // Reset form and return to assessments screen
    setFormData({});
    setCurrentStep(1);
    onNavigate('assessments');
  };
  
  // Handle cancel
  const handleCancel = () => {
    // Confirm before canceling
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      setFormData({});
      setCurrentStep(1);
      onNavigate('assessments');
    }
  };
  
  // If viewing a report, show the report viewer
  if (viewingReportId) {
    return (
      <ReportViewerScreen 
        reportId={viewingReportId} 
        onBack={handleBackFromReport}
        isMobile={isMobile}
      />
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
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
                onNext={nextStep}
                onCancel={handleCancel}
                prefillLocation={prefillLocation}
                isMobile={isMobile}
              />
            )}
            
            {currentStep === 2 && (
              <FieldSetupStep
                formData={formData}
                onChange={handleFieldChange}
                onNext={nextStep}
                onBack={prevStep}
                onCancel={handleCancel}
                isMobile={isMobile}
              />
            )}
            
            {currentStep === 3 && (
              <MeasurementsStep
                formData={formData}
                onChange={handleFieldChange}
                onNext={nextStep}
                onBack={prevStep}
                onCancel={handleCancel}
                isMobile={isMobile}
              />
            )}
            
            {currentStep === 4 && (
              <ReviewStep
                formData={formData}
                onBack={prevStep}
                onComplete={handleComplete}
                onCancel={handleCancel}
                onGenerateReport={handleViewReport}
                isMobile={isMobile}
              />
            )}
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default NewAssessmentScreen;