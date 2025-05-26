import { useState } from 'react';
import { CheckCircle, ArrowLeft, UserPlus, User } from 'lucide-react';
import { FormButton } from '../ui/form';
import AuthLayout from '../layout/AuthLayout';

/**
 * Screen shown after magic link verification
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const MagicLinkVerifyScreen = ({ email, onBack, onLogin, onRegister, selectedPersona, isNewUser }) => {
  // Handle login demo - immediately login with selected persona or fallback
  const handleLoginDemo = () => {
    if (selectedPersona) {
      // Use the selected persona data
      onLogin(selectedPersona);
    } else {
      // Fallback to default user data
      onLogin({ 
        id: '1',
        email: email || 'john.doe@example.com', 
        name: 'John Doe', 
        role: 'Farm Manager',
        initials: 'JD'
      });
    }
  };
  
  // Handle registration demo - immediately go to registration
  const handleRegisterDemo = () => {
    // Redirect to registration form with email pre-filled
    onRegister(email || 'newuser@example.com');
  };
  
  return (
    <AuthLayout 
      title="Magic Link Verified"
      onBack={onBack}
      showBackButton={true}
    >
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        
        <p className="text-sm text-gray-500 mb-6">
          Email verified successfully! 
          {isNewUser 
            ? ' Since this is a new email address, please complete registration.'
            : ' For demo purposes, please select one of the following options:'}
        </p>
        
        <div className="space-y-4 mt-8">
          {isNewUser ? (
            // New user - only show registration option
            <div>
              <FormButton
                type="button"
                onClick={handleRegisterDemo}
                variant="primary"
                fullWidth
                icon={<UserPlus size={16} />}
              >
                Continue to Registration
              </FormButton>
              <p className="text-xs text-gray-500 mt-1">
                Complete your account setup
              </p>
            </div>
          ) : (
            // Existing user - show both options for demo
            <>
              <div>
                <FormButton
                  type="button"
                  onClick={handleLoginDemo}
                  variant="primary"
                  fullWidth
                  icon={<User size={16} />}
                >
                  Demo: Existing User Login
                </FormButton>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedPersona 
                    ? `Logs in as ${selectedPersona.name}`
                    : 'Simulates the login flow for a returning user'}
                </p>
              </div>
              
              <div>
                <FormButton
                  type="button"
                  onClick={handleRegisterDemo}
                  variant="outline"
                  fullWidth
                  icon={<UserPlus size={16} />}
                >
                  Demo: New User Registration
                </FormButton>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedPersona 
                    ? `Pre-fills registration form with ${selectedPersona.name}'s info`
                    : 'Simulates the registration flow for a new user'}
                </p>
              </div>
            </>
          )}
        </div>
        
        {!isNewUser && (
          <div className="border-t border-gray-200 pt-6 mt-6">
            <p className="text-sm text-gray-500">
              In a real implementation, the system would automatically determine the correct path based on whether the email is already registered.
            </p>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default MagicLinkVerifyScreen;