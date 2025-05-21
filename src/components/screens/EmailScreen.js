import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { FormField, FormButton } from '../ui/form';
import { useForm } from '../../hooks';
import ErrorBoundary from '../utility/ErrorBoundary';
import beetGuruWideLogo from '../../BeetGuruWide.png';
import api from '../../services/api';
import PageContainer from '../layout/PageContainer';
import { getDemoEmail, getRandomDemoPersona } from '../../utils/demoData';

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
    const persona = getRandomDemoPersona();
    const { email } = getDemoEmail(persona);
    setValues({ email });
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
                <FormButton
                  type="button"
                  onClick={handleContinueClick}
                  variant="primary"
                  fullWidth
                  isLoading={isProcessing}
                  icon={formFilled ? <ArrowRight size={16} /> : null}
                >
                  {formFilled ? 'Continue with Email' : 'Continue'}
                </FormButton>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Beet Guru v1.1.0 • © 2025 Beet Guru Ltd.</p>
        </div>
      </ErrorBoundary>
    </PageContainer>
  );
};

export default EmailScreen;
