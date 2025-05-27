import { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, Lock, Sparkles, UserPlus } from 'lucide-react';
import { FormField, FormButton } from '../ui/form';
import { useForm } from '../../hooks';
import AuthLayout from '../layout/AuthLayout';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

/**
 * Enhanced Email Screen with progressive disclosure for password authentication
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const EmailScreen = ({ onEmailSubmit, onKnownUser, onNewUser }) => {
  const { selectPersona, login } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUnknownAccount, setIsUnknownAccount] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const passwordFieldRef = useRef(null);
  
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
    
    // Only validate password if we're expanded and trying to use password auth
    if (isExpanded && !values.password) {
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
    touched
  } = useForm(
    { email: '', password: '' },
    validateForm,
    handleFormSubmit
  );
  
  // Handle email field blur - trigger expansion for known accounts only
  const handleEmailBlur = async (e) => {
    handleBlur(e);
    
    // Only expand if we have a valid email, not already expanded, and not unknown account
    if (values.email && !errors.email && !isExpanded && !isUnknownAccount) {
      expandForm();
    }
  };
  
  // Handle password field change
  const handlePasswordChange = (e) => {
    handleChange(e);
  };
  
  // Expand the form with animation (for known accounts)
  const expandForm = () => {
    setIsExpanded(true);
    
    // Focus password field after animation
    setTimeout(() => {
      passwordFieldRef.current?.focus();
    }, 300);
  };
  
  // Fill form with known account (existing user)
  const fillFormWithKnownAccount = () => {
    setIsUnknownAccount(false);
    if (selectedPersona) {
      setValues({
        email: selectedPersona.email,
        password: selectedPersona.hasPassword ? selectedPersona.password : ''
      });
      
      // Expand form after a short delay
      setTimeout(() => {
        expandForm();
      }, 300);
    }
  };
  
  // Fill form with unknown account (new user)
  const fillFormWithUnknownAccount = () => {
    setIsUnknownAccount(true);
    setIsExpanded(false); // Don't expand for unknown accounts
    setValues({
      email: 'newuser@example.com',
      password: ''
    });
  };
  
  // Handle form submission (only used for initial continue button and unknown accounts)
  async function handleFormSubmit(formValues) {
    // For unknown accounts, go directly to magic link flow
    if (isUnknownAccount) {
      setIsProcessing(true);
      try {
        await handleMagicLinkFlow(formValues);
      } finally {
        setIsProcessing(false);
      }
      return;
    }
    
    // For known accounts, check if we need to expand first
    if (!isExpanded) {
      expandForm();
      return;
    }
  }
  
  // Handle password sign in - direct processing without form submission
  const handlePasswordSignIn = async () => {
    // Validate required fields
    if (!values.email || !values.password) {
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Try password login
      try {
        const user = await api.auth.loginWithPassword(values.email, values.password);
        
        // Pass persona data if email matches
        if (selectedPersona && selectedPersona.email === values.email) {
          selectPersona(selectedPersona);
        }

        // Direct login
        login(user);
      } catch (error) {
        // For demo: if it's a persona email with password, use the persona data
        if (selectedPersona && selectedPersona.email === values.email && selectedPersona.hasPassword) {
          selectPersona(selectedPersona);
          login(selectedPersona);
        } else {
          console.error('Password login failed:', error);
          // In a real app, show error message
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error - in real app, show error message
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Handle magic link flow
  const handleMagicLinkFlow = async (formValues) => {
    onEmailSubmit(formValues.email);
    
    if (selectedPersona && selectedPersona.email === formValues.email) {
      selectPersona(selectedPersona);
    }
    
    // For unknown accounts, always go to new user flow
    if (isUnknownAccount) {
      onNewUser();
      return;
    }
    
    // Check if user exists to determine flow
    try {
      const checkResult = await api.auth.checkEmailExists(formValues.email);
      
      if (checkResult.exists) {
        onKnownUser(); // Go to magic link sent screen for existing user
      } else {
        onNewUser(); // Go to magic link sent screen for new user (will lead to registration)
      }
    } catch (error) {
      // For demo purposes, treat any example.com email as existing user
      if (formValues.email.includes('@example.com') && formValues.email !== 'newuser@example.com') {
        onKnownUser();
      } else {
        onNewUser();
      }
    }
  };
  
  // Handle sign in button click - direct processing without double submit
  const handleSignInClick = async () => {
    // Validate fields first
    const validationErrors = validateForm(values);
    if (validationErrors.email || validationErrors.password) {
      // Touch fields to show errors
      handleBlur({ target: { name: 'email' } });
      handleBlur({ target: { name: 'password' } });
      return;
    }
    
    // Process sign in directly
    await handlePasswordSignIn();
  };
  
  // Handle magic link button click - direct processing
  const handleMagicLinkClick = async () => {
    // Validate email
    if (!values.email || errors.email) {
      handleBlur({ target: { name: 'email' } });
      return;
    }
    
    setIsProcessing(true);
    try {
      await handleMagicLinkFlow(values);
    } finally {
      setIsProcessing(false);
    }
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
        
        {/* Password Field - Animated Expansion (only for known accounts) */}
        {!isUnknownAccount && (
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
              hint={selectedPersona && !selectedPersona.hasPassword && values.email === selectedPersona.email 
                ? "This demo user doesn't have a password. Use magic link instead." 
                : null}
            />
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Unknown account - single button */}
          {isUnknownAccount ? (
            <FormButton
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isProcessing}
              disabled={!values.email || isProcessing}
              icon={<UserPlus size={16} />}
            >
              Sign up with Email
            </FormButton>
          ) : !isExpanded ? (
            // Known account - initial state - single continue button
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
            // Known account - expanded state - sign in and magic link buttons
            <>
              <FormButton
                type="button"
                variant="primary"
                fullWidth
                isLoading={isProcessing}
                disabled={isProcessing || (selectedPersona && !selectedPersona.hasPassword && values.email === selectedPersona.email)}
                onClick={handleSignInClick}
              >
                Sign in
              </FormButton>
              
              <FormButton
                type="button"
                variant="outline"
                fullWidth
                isLoading={isProcessing}
                disabled={isProcessing}
                onClick={handleMagicLinkClick}
                icon={<Sparkles size={16} />}
              >
                Use Magic Link
              </FormButton>
            </>
          )}
        </div>
        
        {/* Demo Helpers */}
        {!values.email && (
          <div className="space-y-2">
            <div className="text-center">
              <button
                type="button"
                onClick={fillFormWithKnownAccount}
                className="text-sm text-green-600 hover:text-green-500 font-medium"
              >
                Fill with known account
              </button>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={fillFormWithUnknownAccount}
                className="text-sm text-green-600 hover:text-green-500 font-medium"
              >
                Fill with unknown account
              </button>
            </div>
          </div>
        )}
        
        {/* Forgot Password Link */}
        {isExpanded && !isUnknownAccount && (
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