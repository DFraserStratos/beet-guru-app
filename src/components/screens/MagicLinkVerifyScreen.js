import { CheckCircle, ArrowLeft, UserPlus, User } from 'lucide-react';
import { FormButton } from '../ui/form';
import ErrorBoundary from '../utility/ErrorBoundary';
import beetGuruWideLogo from '../../BeetGuruWide.png';
import PageContainer from '../layout/PageContainer';

/**
 * Screen shown after magic link verification
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const MagicLinkVerifyScreen = ({ email, onBack, onLogin, onRegister, demoPersona }) => {
  // Handle login demo - immediately login
  const handleLoginDemo = () => {
    const persona = demoPersona || { name: 'John Doe', email: 'john.doe@example.com', userType: 'farmer' };
    onLogin({
      id: '1',
      email: persona.email,
      name: persona.name,
      role: persona.userType === 'farmer' ? 'Farm Manager' : 'Retail Consultant',
      initials: persona.name
        .split(' ')
        .map(n => n && n[0])
        .join('')
    });
  };
  
  // Handle registration demo - immediately go to registration
  const handleRegisterDemo = () => {
    const persona = demoPersona || { email: 'john.doe@example.com' };
    onRegister(persona.email);
  };
  
  return (
    <PageContainer className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
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
                <h2 className="text-2xl font-semibold text-gray-800">Magic Link Verified</h2>
              </div>
              <div className="w-16"></div> {/* Spacer for alignment */}
            </div>
            
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                Email verified successfully! For demo purposes, please select one of the following options:
              </p>
              
              <div className="space-y-4 mt-8">
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
                    Simulates the login flow for a returning user
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
                    Simulates the registration flow for a new user
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="text-sm text-gray-500">
                  In a real implementation, the system would automatically determine the correct path based on whether the email is already registered.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Beet Guru v1.1.0 • © 2025 Beet Guru Ltd.</p>
        </div>
      </ErrorBoundary>
    </PageContainer>
  );
};

export default MagicLinkVerifyScreen;
