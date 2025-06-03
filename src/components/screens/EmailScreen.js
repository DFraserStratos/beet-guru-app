import { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, Lock, Shield, UserPlus } from 'lucide-react';
import { FormField, FormButton } from '../ui/form';
import { useForm } from '../../hooks';
import AuthLayout from '../layout/AuthLayout';
import api from '../../services/api';
import { logger } from '../../utils/logger';
import fredTheFarmer from '../../config/user';

/**
 * Enhanced Email Screen with progressive disclosure for password authentication
 * Updated to use verification codes instead of magic links
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const EmailScreen = ({ onEmailSubmit, onSendCode, onLogin }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUnknownAccount, setIsUnknownAccount] = useState(false);
  const passwordFieldRef = useRef(null);
  
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
  
  // Fill form with Fred's account details (existing user)
  const fillFormWithKnownAccount = () => {
    setIsUnknownAccount(false);
    setValues({
      email: fredTheFarmer.email,
      password: fredTheFarmer.password
    });
    
    // Expand form after a short delay
    setTimeout(() => {
      expandForm();
    }, 300);
  };
  
  // Fill form with new farmer account (new user registration)
  const fillFormWithUnknownAccount = () => {
    setIsUnknownAccount(true);
    setIsExpanded(false); // Don't expand for unknown accounts
    setValues({
      email: 'demo.farmer@example.com', // Use different email to trigger registration flow
      password: ''
    });
  };
  
  // Fill form with retailer account details (existing user)
  const fillFormWithKnownRetailer = () => {
    setIsUnknownAccount(false);
    setValues({
      email: 'roland@beetguru.com', // Roland's email
      password: 'password123'
    });
    
    // Expand form after a short delay
    setTimeout(() => {
      expandForm();
    }, 300);
  };
  
  // Fill form with unknown retailer account (new user registration) 
  const fillFormWithUnknownRetailer = () => {
    setIsUnknownAccount(true);
    setIsExpanded(false); // Don't expand for unknown accounts
    setValues({
      email: 'demo.retailer@example.com', // Use different email to trigger registration flow
      password: ''
    });
  };
  
  // Handle form submission (only used for initial continue button and unknown accounts)
  async function handleFormSubmit(formValues) {
    // For unknown accounts, go directly to verification code flow
    if (isUnknownAccount) {
      setIsProcessing(true);
      try {
        await handleVerificationCodeFlow(formValues);
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
        // Direct login
        onLogin(user);
      } catch (error) {
        // For demo: if it's Fred's email with password, use Fred's data
        if (values.email === fredTheFarmer.email && values.password === fredTheFarmer.password) {
          onLogin(fredTheFarmer);
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
  
  // Handle verification code flow
  const handleVerificationCodeFlow = async (formValues) => {
    onEmailSubmit(formValues.email);
    
    try {
      // Generate and send verification code
      await api.auth.generateVerificationCode(formValues.email);
      
      // Navigate to verification code screen
      onSendCode();
    } catch (error) {
      console.error('Error sending verification code:', error);
      // In real app, show error message
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
  
  // Handle verification code button click - direct processing
  const handleVerificationCodeClick = async () => {
    // Validate email
    if (!values.email || errors.email) {
      handleBlur({ target: { name: 'email' } });
      return;
    }
    
    setIsProcessing(true);
    try {
      await handleVerificationCodeFlow(values);
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
            // Known account - expanded state - sign in and verification code buttons
            <>
              <FormButton
                type="button"
                variant="primary"
                fullWidth
                isLoading={isProcessing}
                disabled={isProcessing}
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
                onClick={handleVerificationCodeClick}
                icon={<Shield size={16} />}
              >
                Use Verification Code
              </FormButton>
            </>
          )}
        </div>
        
        {/* Demo Account Options */}
        {!values.email && (
          <div className="space-y-4">
            <div className="text-center text-sm text-gray-600 font-medium">
              Demo Account Options
            </div>
            
            {/* 2x2 Grid Layout */}
            <div className="grid grid-cols-2 gap-3">
              {/* Left Column - Farmer Options */}
              <div className="space-y-2">
                <div className="text-xs text-gray-500 font-medium text-center mb-2">
                  Farmer Accounts
                </div>
                <button
                  type="button"
                  onClick={fillFormWithKnownAccount}
                  className="w-full text-xs text-green-600 hover:text-green-500 font-medium py-2 px-3 border border-green-200 rounded-md hover:bg-green-50 transition-colors"
                  title="Fills in Fred's existing account (fred@beetguru.com)"
                >
                  Fill in Known Farmer
                  <div className="text-xs text-green-500 mt-1">Fred's Account</div>
                </button>
                <button
                  type="button"
                  onClick={fillFormWithUnknownAccount}
                  className="w-full text-xs text-green-600 hover:text-green-500 font-medium py-2 px-3 border border-green-200 rounded-md hover:bg-green-50 transition-colors"
                  title="Creates a new farmer account using Fred's persona"
                >
                  Fill in Unknown Farmer
                  <div className="text-xs text-green-500 mt-1">New Registration</div>
                </button>
              </div>
              
              {/* Right Column - Retailer Options */}
              <div className="space-y-2">
                <div className="text-xs text-gray-500 font-medium text-center mb-2">
                  Retailer Accounts
                </div>
                <button
                  type="button"
                  onClick={fillFormWithKnownRetailer}
                  className="w-full text-xs text-green-600 hover:text-green-500 font-medium py-2 px-3 border border-green-200 rounded-md hover:bg-green-50 transition-colors"
                  title="Fills in Roland's existing account (roland@beetguru.com)"
                >
                  Fill in Known Retailer
                  <div className="text-xs text-green-500 mt-1">Roland's Account</div>
                </button>
                <button
                  type="button"
                  onClick={fillFormWithUnknownRetailer}
                  className="w-full text-xs text-green-600 hover:text-green-500 font-medium py-2 px-3 border border-green-200 rounded-md hover:bg-green-50 transition-colors"
                  title="Creates a new retailer account using Roland's persona"
                >
                  Fill in Unknown Retailer
                  <div className="text-xs text-green-500 mt-1">New Registration</div>
                </button>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 text-center">
              Choose a demo account type to quickly fill in credentials
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