import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { FormField, FormButton } from '../ui/form';
import { useForm } from '../../hooks';
import ErrorBoundary from '../utility/ErrorBoundary';
import beetGuruWideLogo from '../../BeetGuruWide.png';
import api from '../../services/api';

/**
 * Initial Email Screen for Magic Link authentication
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const EmailScreen = ({ onEmailSubmit, onRegister, onKnownUser, onNewUser }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  
  // Form validation
  const validateEmail = (values) => {
    const errors = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    
    return errors;
  };
  
  // Form handling
  const { 
    values, 
    errors, 
    handleChange, 
    handleBlur, 
    handleSubmit,
    setValues 
  } = useForm(
    { email: '' },
    validateEmail,
    handleFormSubmit
  );
  
  // Fill form with sample data
  const fillFormWithSampleData = () => {
    setValues({
      email: 'john.doe@example.com'
    });
    setFormFilled(true);
  };
  
  // Handle form submission
  async function handleFormSubmit(formValues) {
    // First click: Fill in demo email
    if (!formFilled) {
      fillFormWithSampleData();
      return;
    }
    
    // Second click: Actually check email
    setIsProcessing(true);
    
    try {
      // Call API to check if email exists
      const checkResult = await api.auth.checkEmailExists(formValues.email);
      
      // Pass the email to parent
      onEmailSubmit(formValues.email);
      
      // Redirect based on whether the user exists
      if (checkResult.exists) {
        onKnownUser(); // Redirect to magic link sent screen for login flow
      } else {
        onNewUser(); // Redirect to register screen
      }
    } catch (error) {
      console.error('Error checking email:', error);
      // For demo purposes, just simulate the flow
      if (formValues.email === 'john.doe@example.com' || formValues.email.includes('example.com')) {
        onEmailSubmit(formValues.email);
        onKnownUser();
      } else {
        onEmailSubmit(formValues.email);
        onNewUser();
      }
    } finally {
      setIsProcessing(false);
    }
  }
  
  // Handle continue button click
  const handleContinueClick = (e) => {
    e.preventDefault();
    
    if (!formFilled) {
      fillFormWithSampleData();
    } else {
      handleSubmit(e);
    }
  };
  
  // Handle immediate continue for demo - for newly added "Demo: Continue with Email" button
  const handleDemoContinue = (e) => {
    e.preventDefault();
    
    // If form not filled, fill it first
    if (!formFilled) {
      fillFormWithSampleData();
    }
    
    // Then immediately handle submission (no need for second click)
    onEmailSubmit('john.doe@example.com');
    onKnownUser();
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
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Sign in with Email</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <FormField
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={true}
                icon={<Mail size={18} className="text-gray-400" />}
              />
              
              <div className="pt-2">
                {formFilled ? (
                  <FormButton
                    type="button"
                    onClick={handleContinueClick}
                    variant="primary"
                    fullWidth
                    isLoading={isProcessing}
                    icon={<ArrowRight size={16} />}
                  >
                    Continue with Email
                  </FormButton>
                ) : (
                  <FormButton
                    type="button"
                    onClick={handleDemoContinue}
                    variant="primary"
                    fullWidth
                    isLoading={isProcessing}
                  >
                    Demo: Continue with Email
                  </FormButton>
                )}
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 gap-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.4253 0 3.42535 2.64 1.35535 6.49998L5.27026 9.57C6.24026 6.75002 8.88028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.08L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.43C5.02498 13.67 4.88501 12.86 4.88501 12C4.88501 11.14 5.01998 10.33 5.26498 9.57L1.35001 6.5C0.484979 8.19 -1.7029e-05 10.05 -1.7029e-05 12C-1.7029e-05 13.95 0.484979 15.81 1.35001 17.5L5.26498 14.43Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24C15.2404 24 17.9654 22.89 19.9454 21.1L16.0804 18.08C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.8804 19.25 6.24039 17.25 5.27039 14.43L1.35547 17.5C3.42547 21.36 7.4254 24 12.0004 24Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span>Google</span>
                </button>
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

export default EmailScreen;