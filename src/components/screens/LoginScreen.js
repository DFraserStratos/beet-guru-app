import { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import { FormField, FormButton } from '../ui/form';
import { useForm } from '../../hooks';
import api from '../../services/api';
import ErrorBoundary from '../utility/ErrorBoundary';
import beetGuruWideLogo from '../../BeetGuruWide.png';

/**
 * Login screen component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const LoginScreen = ({ onLogin, onRegister }) => {
  const [formFilled, setFormFilled] = useState(false);
  
  // Form validation
  const validateLogin = (values) => {
    const errors = {};
    
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!values.password) {
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
    setValues 
  } = useForm(
    { email: '', password: '', rememberMe: false },
    validateLogin,
    handleLogin
  );
  
  // Fill form with sample data
  const fillFormWithSampleData = () => {
    setValues({
      email: 'john.doe@example.com',
      password: 'password',
      rememberMe: false
    });
    setFormFilled(true);
  };
  
  // Handle login submission
  function handleLogin(formValues) {
    // First click: Fill in fake credentials
    if (!formFilled) {
      fillFormWithSampleData();
      return;
    }
    
    // Second click: Actually log in
    onLogin({ 
      id: '1',  // Make sure this matches the userId in the mock locations
      email: formValues.email, 
      name: 'John Doe', 
      role: 'Farm Manager',
      initials: 'JD'
    });
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
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Log in to your account</h2>
            
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
                icon={<User size={18} className="text-gray-400" />}
              />
              
              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={true}
                icon={<Lock size={18} className="text-gray-400" />}
              />
              
              <div className="flex items-center justify-between">
                <FormField
                  name="rememberMe"
                  type="checkbox"
                  value={values.rememberMe}
                  onChange={handleChange}
                >
                  Remember me
                </FormField>
                
                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              
              <FormButton
                type="button"
                onClick={handleContinueClick}
                variant="primary"
                fullWidth
                icon={formFilled ? <ArrowRight size={16} /> : null}
              >
                {formFilled ? 'Sign in' : 'Continue'}
              </FormButton>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>
              
              <div className="mt-6">
                <FormButton
                  onClick={onRegister}
                  variant="outline"
                  fullWidth
                >
                  Create new account
                </FormButton>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Beet Guru v1.0.0 • © 2025 Beet Guru Ltd.</p>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default LoginScreen;