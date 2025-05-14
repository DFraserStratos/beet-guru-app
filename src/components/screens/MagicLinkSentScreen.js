import { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { FormButton } from '../ui/form';
import ErrorBoundary from '../utility/ErrorBoundary';
import beetGuruWideLogo from '../../BeetGuruWide.png';

/**
 * Screen shown after magic link is sent
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const MagicLinkSentScreen = ({ email, onBack, onVerify }) => {
  // Handle demo magic link click - immediately verify
  const handleDemoMagicLink = (e) => {
    e.preventDefault();
    onVerify();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ErrorBoundary>
        <div className="flex justify-center">
          <img 
            src={beetGuruWideLogo} 
            alt="Beet Guru Logo" 
            className="h-28 w-auto" 
          />
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="flex items-center mb-6">
              <button
                onClick={onBack}
                className="flex items-center text-green-600 hover:text-green-500"
              >
                <ArrowLeft size={16} className="mr-1" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <div className="text-center flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">Check your Email</h2>
              </div>
              <div className="w-16"></div> {/* Spacer for alignment */}
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Mail className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                We've sent a magic link to:
              </p>
              
              <p className="text-lg font-medium text-gray-800 mb-6">
                {email}
              </p>
              
              <p className="text-sm text-gray-500 mb-6">
                Click the link in the email to sign in to your account. If you don't see the email, check your spam folder.
              </p>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="text-sm text-gray-500 mb-6">
                  <span className="font-medium">Didn't receive the email?</span> Check your spam folder or try again.
                </p>
                
                {/* Demo button - no two-step process */}
                <FormButton
                  type="button"
                  onClick={handleDemoMagicLink}
                  variant="primary"
                  fullWidth
                >
                  Demo: Click Magic Link
                </FormButton>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Beet Guru v1.1.0 • © 2025 Beet Guru Ltd.</p>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default MagicLinkSentScreen;