import React from 'react';
import { FormButton } from '../form';
import { X, Save, ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * Standardized form button navigation component for consistent mobile and desktop UX
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const FormButtonNav = ({
  onCancel,
  onBack,
  onNext,
  onSaveAsDraft,
  nextLabel = 'Continue',
  showSaveAsDraft = true,
  showBack = false,
  isGeneratingReport = false,
  isMobile = true
}) => {
  // If mobile, use a vertically stacked layout with full-width buttons
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-3 pt-6 pb-16 md:pb-0 px-1">
        {/* Primary Action Button - Always at the bottom for easy thumb access */}
        <FormButton
          onClick={onNext}
          variant="primary"
          icon={nextLabel.includes('Report') ? null : <ArrowRight size={16} />}
          fullWidth
          isLoading={isGeneratingReport}
        >
          {nextLabel}
        </FormButton>
        
        {/* Back Action - If applicable */}
        {showBack && (
          <FormButton
            onClick={onBack}
            variant="secondary"
            icon={<ArrowLeft size={16} />}
            fullWidth
          >
            Back
          </FormButton>
        )}
        
        {/* Save As Draft Action - If applicable */}
        {showSaveAsDraft && (
          <FormButton
            onClick={onSaveAsDraft}
            variant="outline"
            icon={<Save size={16} />}
            fullWidth
          >
            Save as Draft
          </FormButton>
        )}
        
        {/* Cancel Action - Always available but least prominent */}
        <FormButton
          onClick={onCancel}
          variant="link"
          icon={<X size={16} />}
          fullWidth
        >
          Cancel
        </FormButton>
      </div>
    );
  }
  
  // For desktop, use a more standard horizontal layout
  return (
    <div className="hidden md:flex justify-between pt-6">
      <div className="flex space-x-4">
        <FormButton 
          onClick={onCancel}
          variant="outline"
          icon={<X size={16} />}
        >
          Cancel
        </FormButton>
        
        {showSaveAsDraft && (
          <FormButton 
            onClick={onSaveAsDraft}
            variant="outline"
            icon={<Save size={16} />}
          >
            Save as Draft
          </FormButton>
        )}
        
        {showBack && (
          <FormButton 
            onClick={onBack}
            variant="secondary"
            icon={<ArrowLeft size={16} />}
          >
            Back
          </FormButton>
        )}
      </div>
      
      <FormButton 
        onClick={onNext}
        variant="primary"
        icon={nextLabel.includes('Report') ? null : <ArrowRight size={16} />}
        isLoading={isGeneratingReport}
      >
        {nextLabel}
      </FormButton>
    </div>
  );
};

export default FormButtonNav;