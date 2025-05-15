import { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Check } from 'lucide-react';
import { FormField, FormButton } from '../ui/form';
import { AuthLayout } from '../auth';

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
  
  const fillFormWithSampleData = () => {
    setFormData({
      name: 'Donald',
      email: prefillEmail || 'donald@stp.co.nz',
      password: 'password',
      confirmPassword: 'password',
      userType: 'farmer',
      subscribeToNews: true,
      agreeToTerms: true
    });
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
  
  return (
    <AuthLayout 
      title="Create Account"
      backButton={{
        onClick: onBack,
        text: 'Back',
        ariaLabel: 'Go back to previous screen'
      }}
    >
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
            <button
              type="button"
              onClick={() => handleUserTypeSelect('farmer')}
              className={`
                flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium 
                ${formData.userType === 'farmer' 
                  ? 'bg-green-600 text-white border-transparent' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
              `}
            >
              Farmer
            </button>
            <button
              type="button"
              onClick={() => handleUserTypeSelect('retailer')}
              className={`
                flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium 
                ${formData.userType === 'retailer' 
                  ? 'bg-green-600 text-white border-transparent' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
              `}
            >
              Retailer
            </button>
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
    </AuthLayout>
  );
};

export default RegisterScreen;