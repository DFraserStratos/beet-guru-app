import { useEffect, useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import AuthLayout from '../layout/AuthLayout';
import fredTheFarmer from '../../config/user';

/**
 * Screen shown when clicking a magic link - simulates automatic verification
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const MagicLinkVerifyScreen = ({ email, onBack, onLogin, onRegister }) => {
  const [verificationState, setVerificationState] = useState('verifying'); // 'verifying', 'verified', 'redirecting'
  const [redirectMessage, setRedirectMessage] = useState('');
  
  useEffect(() => {
    let isMounted = true;

    // Simulate the magic link verification process
    const simulateVerification = async () => {
      if (!isMounted) return;
      // Step 1: Verifying the link (1.5 seconds)
      setVerificationState('verifying');
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (!isMounted) return;

      // Step 2: Show verified state (1 second)
      setVerificationState('verified');
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (!isMounted) return;

      // Step 3: Show redirecting message and redirect (0.5 seconds)
      setVerificationState('redirecting');
      
      // Check if this is Fred's email or a new user
      const isExistingUser = email === fredTheFarmer.email;
      
      if (isExistingUser) {
        setRedirectMessage(`Logging you in as ${fredTheFarmer.name}...`);
      } else {
        setRedirectMessage('Redirecting to complete registration...');
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      if (!isMounted) return;

      // Step 4: Actually redirect
      if (isExistingUser) {
        // Auto-login for Fred's email
        onLogin(fredTheFarmer);
      } else {
        // Redirect to registration for any other email
        onRegister(email || 'newuser@example.com');
      }
    };

    simulateVerification();

    return () => {
      isMounted = false;
    };
  }, [email, onLogin, onRegister]);
  
  return (
    <AuthLayout 
      title=""
      showBackButton={false} // No back button during auto-verification
    >
      <div className="text-center">
        {/* Icon and Status */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          {verificationState === 'verifying' ? (
            <Loader2 className="h-8 w-8 text-green-600 animate-spin" aria-hidden="true" />
          ) : (
            <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
          )}
        </div>
        
        {/* Status Messages */}
        {verificationState === 'verifying' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Verifying Magic Link
            </h2>
            <p className="text-sm text-gray-500">
              Please wait while we verify your authentication link...
            </p>
          </>
        )}
        
        {verificationState === 'verified' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Email Verified!
            </h2>
            <p className="text-sm text-gray-500">
              Your email has been successfully verified.
            </p>
          </>
        )}
        
        {verificationState === 'redirecting' && (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Welcome Back!
            </h2>
            <p className="text-sm text-gray-500">
              {redirectMessage}
            </p>
            
            {/* Loading dots animation */}
            <div className="flex justify-center items-center space-x-1 mt-4">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </>
        )}
        
        {/* Email Display */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">
            Verifying email
          </p>
          <p className="text-sm font-medium text-gray-900">
            {email || 'user@example.com'}
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default MagicLinkVerifyScreen;
