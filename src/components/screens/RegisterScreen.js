import { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, ArrowLeft, Check } from 'lucide-react';
import AuthLayout from '../layout/AuthLayout';
import { FormField, FormButton } from '../ui/form';
import { PrimaryButton } from '../ui/buttons';
import { cn } from '../../utils/cn';

const RegisterScreen = ({ onBack, onComplete, prefillEmail = '', selectedPersona = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: prefillEmail || '',
    password: '',
    confirmPassword: '',
    userType: '',
    subscribeToNews: false,
    agreeToTerms: false
  });
  
  // Pre-fill form data on mount if we have a selected persona or email
  useEffect(() => {
    if (selectedPersona) {
      // Pre-fill with persona data
      const userType = selectedPersona.role.toLowerCase().includes('farm') ? 'farmer' : 'retailer';
      
      setFormData({
        name: selectedPersona.name,
        email: selectedPersona.email,
        password: selectedPersona.hasPassword ? selectedPersona.password : 'password123',
        confirmPassword: selectedPersona.hasPassword ? selectedPersona.password : 'password123',
        userType: userType,
        subscribeToNews: true,
        agreeToTerms: true
      });
    } else if (prefillEmail) {
      // Just pre-fill the email if that's all we have
      setFormData(prev => ({
        ...prev,
        email: prefillEmail
      }));
    }
  }, [prefillEmail, selectedPersona]);
  
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Direct submission - no double-click needed
    onComplete({ 
      email: formData.email,
      name: formData.name,
      role: formData.userType === 'farmer' ? 'Farm Manager' : 'Retail Consultant',
      initials: formData.name ? formData.name.split(' ').map(n => n && n[0]).join('') : 'XX',
      // Include additional fields from the selected persona if available
      ...(selectedPersona ? {
        farmName: selectedPersona.farmName,
        location: selectedPersona.location,
        gender: selectedPersona.gender
      } : {})
    });
  };
  
  const isFormValid = () => {
    return formData.name && 
           formData.email && 
           formData.password && 
           formData.confirmPassword && 
           formData.userType && 
           formData.agreeToTerms &&
           formData.password === formData.confirmPassword;
  };
  
  return (
    <AuthLayout 
      title="Create Account"
      onBack={onBack}
      showBackButton={true}
    >
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <FormField
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          icon={<User size={18} className="text-gray-400" />}
          required
        />
        
        <FormField
          label="Email address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          icon={<Mail size={18} className="text-gray-400" />}
          required
        />
        
        <FormField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          icon={<Lock size={18} className="text-gray-400" />}
          required
        />
        
        <FormField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={formData.confirmPassword && formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
          touched={formData.confirmPassword !== ''}
          required
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
            type="submit"
            variant="primary"
            fullWidth
            disabled={!isFormValid()}
          >
            Complete Registration
          </FormButton>
          
          {selectedPersona && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Registering as {selectedPersona.name}
            </p>
          )}
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterScreen;