import { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { FormField, FormButton } from '../ui/form';
import { useForm } from '../../hooks';
import AuthLayout from '../layout/AuthLayout';
import api from '../../services/api';

/**
 * Enhanced Email Screen with progressive disclosure for password authentication
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const EmailScreen = ({ onEmailSubmit, onKnownUser, onNewUser, onSelectPersona, onLogin }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [authMethod, setAuthMethod] = useState(null); // 'password' | 'magic-link' | null
  const passwordFieldRef = useRef(null);
  const emailCheckAbortRef = useRef(null);
  
  // Select a random persona when the component mounts
  useEffect(() => {
    const getRandomPersona = async () => {
      try {
        const persona = await api.auth.getRandomPersona();
        setSelectedPersona(persona);
        console.log('Selected persona:', persona.name, persona.hasPassword ? '(has password)' : '(magic link only)');
      } catch (error) {
        console.error('Error getting random persona:', error);
      }
    };
    
    getRandomPersona();
  }, []);
  
  // Form validation
  const validateForm = (values) => {
    const errors = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Only validate password if form is expanded and password method is selected
    if (isExpanded && authMethod === 'password' && !values.password) {
      errors.password = 'Password is required';
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
    setValues,
    touched,
    setTouched
  } = useForm(
    { email: '', password: '' },
    validateForm,
    handleFormSubmit
  );
  
  // Handle email field blur - trigger expansion
  const handleEmailBlur = async (e) => {
    handleBlur(e);
    
    // Only expand if we have a valid email and not already expanded
    if (values.email && !errors.email && !isExpanded) {
      expandForm();
    }
  };
  
  // Handle password field change - cancel any pending email check
  const handlePasswordChange = (e) => {
    handleChange(e);
    
    // If user starts typing password, cancel email check
    if (emailCheckAbortRef.current) {
      emailCheckAbortRef.current.abort();
      emailCheckAbortRef.current = null;
    }
  };
  
  // Expand the form with animation
  const expandForm = () => {
    setIsExpanded(true);
    setAuthMethod('password'); // Default to password
    
    // Focus password field after animation
    setTimeout(() => {
      passwordFieldRef.current?.focus();
    }, 300);
  };
  
  // Fill form with demo data
  const fillFormWithDemoData = () => {
    if (selectedPersona) {
      setValues({
        email: selectedPersona.email,
        password: selectedPersona.hasPassword ? selectedPersona.password : ''
      });
      setTouched({ email: true });
      
      // Expand form after a short delay
      setTimeout(() => {
        expandForm();
      }, 300);
    }
  };
  
  // Handle form submission
  async function handleFormSubmit(formValues) {
    setIsProcessing(true);
    
    try {
      // If not expanded yet, expand the form
      if (!isExpanded) {
        expandForm();
        setIsProcessing(false);
        return;
      }
      
      // Handle based on selected auth method
      if (authMethod === 'password') {
        // Try password login
        try {
          const user = await api.auth.loginWithPassword(formValues.email, formValues.password);
          
          // Pass persona data if email matches
          if (selectedPersona && selectedPersona.email === formValues.email) {
            onSelectPersona(selectedPersona);
          }
          
          // Direct login
          onLogin(user);
        } catch (error) {
          // For demo: if it's a persona email, use the persona data
          if (selectedPersona && selectedPersona.email === formValues.email) {
            onSelectPersona(selectedPersona);
            onLogin(selectedPersona);
          } else {
            throw error;
          }
        }
      } else {
        // Magic link flow
        onEmailSubmit(formValues.email);
        
        if (selectedPersona && selectedPersona.email === formValues.email) {
          onSelectPersona(selectedPersona);
        }
        
        // Check if user exists to determine flow
        const checkResult = await api.auth.checkEmailExists(formValues.email);
        
        if (checkResult.exists) {
          onKnownUser();
        } else {
          onNewUser();
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error - in real app, show error message
    } finally {
      setIsProcessing(false);
    }
  }
  
  // Handle magic link button click
  const handleMagicLinkClick = async () => {
    setAuthMethod('magic-link');
    handleSubmit({ preventDefault: () => {} });
  };
  
  const handleFormSubmitWrapper = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };
  
  return (
    <AuthLayout title="Sign in to Beet Guru">
      <form className="space-y-6" onSubmit={handleFormSubmitWrapper} noValidate>
        {/* Email Field */}
        <FormField
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          error={errors.email}
          touched={touched.email}
          icon={<Mail size={18} className="text-gray-400" />}
          autoComplete="email"
          disabled={isProcessing}
        />
        
        {/* Password Field - Animated Expansion */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <FormField
            ref={passwordFieldRef}
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handlePasswordChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            icon={<Lock size={18} className="text-gray-400" />}
            autoComplete="current-password"
            disabled={isProcessing}
            hint={!selectedPersona?.hasPassword ? "This demo user doesn't have a password. Use magic link instead." : null}
          />
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          {!isExpanded ? (
            // Initial state - single continue button
            <FormButton
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isProcessing}
              disabled={!values.email}
            >
              Continue
            </FormButton>
          ) : (
            // Expanded state - sign in and magic link buttons
            <>
              <FormButton
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isProcessing && authMethod === 'password'}
                disabled={isProcessing || (!selectedPersona?.hasPassword && values.email === selectedPersona?.email)}
                onClick={() => setAuthMethod('password')}
              >
                Sign in
              </FormButton>
              
              <FormButton
                type="button"
                variant="outline"
                fullWidth
                isLoading={isProcessing && authMethod === 'magic-link'}
                disabled={isProcessing}
                onClick={handleMagicLinkClick}
                icon={<Sparkles size={16} />}
              >
                Use Magic Link
              </FormButton>
            </>
          )}
        </div>
        
        {/* Demo Helper */}
        {!values.email && (
          <div className="text-center">
            <button
              type="button"
              onClick={fillFormWithDemoData}
              className="text-sm text-green-600 hover:text-green-500 font-medium"
            >
              Fill with demo account
            </button>
          </div>
        )}
        
        {/* Forgot Password Link */}
        {isExpanded && (
          <div className="text-center">
            <a href="#" className="text-sm text-green-600 hover:text-green-500">
              Forgot your password?
            </a>
          </div>
        )}
      </form>
    </AuthLayout>
  );
};

export default EmailScreen;