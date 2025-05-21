import { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, ArrowLeft, Check } from 'lucide-react';
import beetGuruWideLogo from '../../BeetGuruWide.png';
import { FormField, FormButton } from '../ui/form';
import { PrimaryButton } from '../ui/buttons';
import PageContainer from '../layout/PageContainer';
import { cn } from '../../utils/cn';
import { getDemoRegistrationData, getRandomDemoPersona } from '../../utils/demoData';

const RegisterScreen = ({ onBack, onComplete, prefillEmail = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: prefillEmail || '',
    password: '',
    confirmPassword: '',
    userType: '',
    subscribeToNews: false,
    agreeToTerms: false
  });
  
  const [formFilled, setFormFilled] = useState(false);
  const formRef = useRef(null);
  
  // Reset form state when component mounts (in case user returns from login)
  useEffect(() => {
    setFormData({
      name: '',
      email: prefillEmail || '',
      password: '',
      confirmPassword: '',
      userType: '',
      subscribeToNews: false,
      agreeToTerms: false
    });
    setFormFilled(false);
  }, [prefillEmail]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };
  
  const handleUserTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, userType: type }));
  };

  const userTypeUnselectedClass =
    'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50';
  const getUserTypeButtonClasses = (type) =>
    cn(formData.userType !== type && userTypeUnselectedClass);

  const fillFormWithSampleData = () => {
    const persona = getRandomDemoPersona();
    setFormData(getDemoRegistrationData(prefillEmail, persona));
    setFormFilled(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // First click: Fill in the form with sample data
    if (!formFilled) {
      fillFormWithSampleData();
      return;
    }
    
    // Second click: Complete registration
    onComplete({ 
      email: formData.email,
      name: formData.name,
      role: formData.userType === 'farmer' ? 'Farm Manager' : 'Retail Consultant',
      initials: formData.name ? formData.name.split(' ').map(n => n && n[0]).join('') : 'D'
    });
  };
  
  const handleContinueClick = (e) => {
    e.preventDefault();
    
    if (!formFilled) {
      fillFormWithSampleData();
    } else {
      // Handle the second click (complete registration)
      onComplete({ 
        email: formData.email,
        name: formData.name,
        role: formData.userType === 'farmer' ? 'Farm Manager' : 'Retail Consultant',
        initials: formData.name ? formData.name.split(' ').map(n => n && n[0]).join('') : 'D'
      });
    }
  };
  
  const handleBackClick = () => {
    // Reset form state when going back to login
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: '',
      subscribeToNews: false,
      agreeToTerms: false
    });
    setFormFilled(false);
    onBack();
  };
  
  return (
    <PageContainer className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
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
              onClick={handleBackClick}
              className="flex items-center text-green-600 hover:text-green-500"
            >
              <ArrowLeft size={16} className="mr-1" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
            </div>
            <div className="w-16"></div> {/* Spacer for alignment */}
          </div>
          
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} noValidate>
            <FormField
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              icon={<User size={18} className="text-gray-400" />}
            />
            
            <FormField
              label="Email address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              icon={<Mail size={18} className="text-gray-400" />}
            />
            
            <FormField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              icon={<Lock size={18} className="text-gray-400" />}
            />
            
            <FormField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <PrimaryButton
                  type="button"
                  onClick={() => handleUserTypeSelect('farmer')}
                  className={getUserTypeButtonClasses('farmer')}
                >
                  Farmer
                </PrimaryButton>
                <PrimaryButton
                  type="button"
                  onClick={() => handleUserTypeSelect('retailer')}
                  className={getUserTypeButtonClasses('retailer')}
                >
                  Retailer
                </PrimaryButton>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="subscribeToNews"
                  name="subscribeToNews"
                  type="checkbox"
                  checked={formData.subscribeToNews}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="subscribeToNews" className="ml-2 block text-sm text-gray-700">
                  Subscribe to news & updates
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-green-600 hover:text-green-500">Terms and Conditions</a>
                </label>
              </div>
            </div>
            
            <div>
              <FormButton
                type="button" 
                onClick={handleContinueClick}
                variant="primary"
                fullWidth
                icon={formFilled ? <Check size={16} /> : null}
              >
                {formFilled ? 'Complete Registration' : 'Continue'}
              </FormButton>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Beet Guru v1.1.0 • © 2025 Beet Guru Ltd.</p>
      </div>
    </PageContainer>
  );
};

export default RegisterScreen;
