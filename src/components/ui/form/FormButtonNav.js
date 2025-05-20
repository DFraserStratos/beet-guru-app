import React from 'react';
import FormButton from './FormButton';
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
  isMobile = false
}) => {
  // If mobile, use a vertically stacked layout with full-width buttons
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-3 pt-6 mb-2">
        {/* Primary Action Button - Always at the bottom for easy thumb access */}
        <FormButton
          onClick={onNext}
          variant="primary"
          icon={<ArrowRight size={16} />}
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
  
  // For desktop, use a horizontal layout with clear visual hierarchy
  return (
    <div className="hidden md:flex justify-between items-center pt-6 border-t mt-6">
      {/* Left side - Secondary actions */}
      <div className="flex items-center space-x-3">
        {/* Cancel - Least prominent */}
        <FormButton 
          onClick={onCancel}
          variant="link"
          icon={<X size={16} />}
          size="sm"
        >
          Cancel
        </FormButton>
        
        {/* Back - Secondary prominence */}
        {showBack && (
          <FormButton 
            onClick={onBack}
            variant="secondary"
            icon={<ArrowLeft size={16} />}
            size="md"
          >
            Back
          </FormButton>
        )}
      </div>
      
      {/* Right side - Primary actions */}
      <div className="flex items-center space-x-3">
        {/* Save as Draft - Tertiary prominence */}
        {showSaveAsDraft && (
          <FormButton 
            onClick={onSaveAsDraft}
            variant="outline"
            icon={<Save size={16} />}
            size="md"
          >
            Save as Draft
          </FormButton>
        )}
        
        {/* Next/Generate - Highest prominence */}
        <FormButton 
          onClick={onNext}
          variant="primary"
          icon={<ArrowRight size={16} />}
          isLoading={isGeneratingReport}
          size="md"
        >
          {nextLabel}
        </FormButton>
      </div>
    </div>
  );
};

export default FormButtonNav;
