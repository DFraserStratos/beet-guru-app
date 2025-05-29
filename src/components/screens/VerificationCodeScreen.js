import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import AuthLayout from '../layout/AuthLayout';
import { FormButton } from '../ui/form';
import { authAPI } from '../../services/api';

/**
 * Verification Code Screen Component
 * Handles 6-digit verification code entry for email authentication
 * 
 * @param {Object} props - Component props
 * @param {string} props.email - Email address where code was sent
 * @param {Function} props.onBack - Handler for back navigation
 * @param {Function} props.onVerify - Handler for successful verification
 * @param {Object} props.selectedPersona - Selected demo persona
 * @returns {JSX.Element} Rendered component
 */
const VerificationCodeScreen = ({ 
  email, 
  onBack, 
  onVerify,
  selectedPersona 
}) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [attempts, setAttempts] = useState(0);
  const inputRefs = useRef([]);
  
  // Start countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);
  
  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(''); // Clear error on input
    
    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto-submit when all digits entered
    if (value && index === 5 && newCode.every(digit => digit)) {
      handleVerifyCode(newCode.join(''));
    }
  };
  
  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handlePaste(e);
    }
  };
  
  const handlePaste = async (e) => {
    const pastedData = e.clipboardData?.getData('text') || await navigator.clipboard.readText();
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (digits.length === 6) {
      const newCode = digits.split('');
      setCode(newCode);
      inputRefs.current[5]?.focus();
      handleVerifyCode(digits);
    }
  };
  
  const fillDemoCode = () => {
    const demoCode = '123456';
    const digits = demoCode.split('');
    setCode(digits);
    setError('');
    
    // Focus last input to show it's filled
    inputRefs.current[5]?.focus();
    
    // Auto-submit after a short delay for visual feedback
    setTimeout(() => {
      handleVerifyCode(demoCode);
    }, 300);
  };
  
  const handleVerifyCode = async (codeString) => {
    if (codeString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Demo mode - accept code 123456
      if (selectedPersona || email === 'demo@example.com' || email.includes('@example.com')) {
        if (codeString === '123456') {
          // Simulate verification success
          setTimeout(() => {
            onVerify(email, selectedPersona);
          }, 1000);
          return;
        }
      }
      
      // Normal verification flow
      const result = await authAPI.verifyCode(email, codeString);
      
      if (result.success) {
        onVerify(email, result.user);
      } else {
        throw new Error(result.message || 'Invalid code');
      }
    } catch (err) {
      setAttempts(prev => prev + 1);
      
      if (attempts >= 2) {
        setError('Too many attempts. Please request a new code.');
        setCanResend(true);
      } else {
        setError(err.message || 'Invalid code. Please try again.');
      }
      
      // Clear code on error
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    if (!canResend) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await authAPI.generateVerificationCode(email);
      
      // Reset state
      setCode(['', '', '', '', '', '']);
      setCanResend(false);
      setResendCountdown(60);
      setAttempts(0);
      setError('');
      
      // Show success message temporarily
      setError('New code sent! Check your email.');
      setTimeout(() => setError(''), 3000);
      
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerifyCode(code.join(''));
  };
  
  // Check if this is a demo email
  const isDemoMode = selectedPersona || email === 'demo@example.com' || email.includes('@example.com');
  
  return (
    <AuthLayout 
      title="Enter verification code" 
      onBack={onBack}
      showBackButton={true}
    >
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            We've sent a 6-digit code to
          </p>
          <p className="text-sm font-medium text-gray-900 mt-1">
            {email}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Code input boxes */}
          <div className="flex justify-center space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                pattern="\d{1}"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`
                  w-12 h-12 text-center text-xl font-semibold
                  border-2 rounded-lg transition-all
                  ${error ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                  focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                  ${digit ? 'bg-green-50 border-green-500' : ''}
                `}
                disabled={isLoading}
              />
            ))}
          </div>
          
          {/* Error message */}
          {error && (
            <div className={`flex items-center text-sm ${
              error.includes('sent') ? 'text-green-600' : 'text-red-600'
            }`}>
              <AlertCircle size={16} className="mr-1" />
              {error}
            </div>
          )}
          
          {/* Submit button */}
          <FormButton
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={code.some(digit => !digit)}
          >
            Verify Code
          </FormButton>
          
          {/* Resend section */}
          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-sm text-green-600 hover:text-green-500 font-medium inline-flex items-center"
              >
                <RefreshCw size={16} className="mr-1" />
                Resend code
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                Resend code in {resendCountdown}s
              </p>
            )}
          </div>
        </form>
        
        {/* Demo Helper - single button */}
        {isDemoMode && !code.every(digit => digit) && (
          <div className="text-center">
            <button
              type="button"
              onClick={fillDemoCode}
              className="text-sm text-green-600 hover:text-green-500 font-medium"
            >
              Fill in Code
            </button>
          </div>
        )}
        
        {/* Help text */}
        <div className="text-center text-xs text-gray-500 mt-4">
          <p>Can't find the email? Check your spam folder.</p>
          <p className="mt-1">Code expires in 10 minutes.</p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerificationCodeScreen;