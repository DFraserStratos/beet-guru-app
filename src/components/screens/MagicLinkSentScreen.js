import { Mail } from 'lucide-react';
import { FormButton } from '../ui/form';
import AuthLayout from '../layout/AuthLayout';

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
    <AuthLayout
      title="Check your Email"
      onBack={onBack}
      showBackButton={true}
    >
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
    </AuthLayout>
  );
};

export default MagicLinkSentScreen;