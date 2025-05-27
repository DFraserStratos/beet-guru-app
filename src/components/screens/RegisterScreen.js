import { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, ArrowLeft, Check, Building2, MapPin } from 'lucide-react';
import AuthLayout from '../layout/AuthLayout';
import { FormField, FormButton } from '../ui/form';

const RegisterScreen = ({ onBack, onComplete, prefillEmail = '', selectedPersona = null }) => {
  const [step, setStep] = useState(1); // 1 = account details, 2 = farm details
  const [formData, setFormData] = useState({
    // Step 1 - Account Details
    name: '',
    email: prefillEmail || '',
    password: '',
    confirmPassword: '',
    userType: '',
    agreeToTerms: false,
    // Step 2 - Farm Details
    farmName: '',
    farmAddress: '',
    city: '',
    postalCode: '',
    region: '',
    country: 'New Zealand' // Default to NZ
  });
  
  // Pre-fill form data on mount if we have a selected persona or email
  useEffect(() => {
    if (selectedPersona) {
      // Pre-fill with persona data
      const userType = selectedPersona.role.toLowerCase().includes('farm') ? 'farmer' : 'retailer';
      
      setFormData(prev => ({
        ...prev,
        name: selectedPersona.name,
        email: selectedPersona.email,
        password: selectedPersona.hasPassword ? selectedPersona.password : 'password123',
        confirmPassword: selectedPersona.hasPassword ? selectedPersona.password : 'password123',
        userType: userType,
        agreeToTerms: true,
        farmName: selectedPersona.farmName || '',
        farmAddress: selectedPersona.farmAddress || '',
        city: selectedPersona.city || selectedPersona.location || '',
        postalCode: selectedPersona.postalCode || '',
        region: selectedPersona.region || selectedPersona.location || '',
        country: selectedPersona.country || 'New Zealand'
      }));
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
  
  const handleContinue = (e) => {
    e.preventDefault();
    if (isStep1Valid()) {
      setStep(2);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Complete registration with all data
    onComplete({ 
      email: formData.email,
      name: formData.name,
      role: formData.userType === 'farmer' ? 'Farm Manager' : 'Retail Consultant',
      initials: formData.name ? formData.name.split(' ').map(n => n && n[0]).join('') : 'XX',
      farmName: formData.farmName,
      farmAddress: formData.farmAddress,
      city: formData.city,
      postalCode: formData.postalCode,
      region: formData.region,
      country: formData.country,
      // Include additional fields from the selected persona if available
      ...(selectedPersona ? {
        location: selectedPersona.location,
        gender: selectedPersona.gender
      } : {})
    });
  };
  
  const isStep1Valid = () => {
    return formData.name && 
           formData.email && 
           formData.password && 
           formData.confirmPassword && 
           formData.userType && 
           formData.agreeToTerms &&
           formData.password === formData.confirmPassword;
  };
  
  const isStep2Valid = () => {
    return formData.farmName && 
           formData.farmAddress && 
           formData.city && 
           formData.region && 
           formData.country;
  };
  
  // Fill form with demo data
  const fillDemoData = () => {
    if (step === 1) {
      // Fill step 1 data
      if (selectedPersona) {
        const userType = selectedPersona.role.toLowerCase().includes('farm') ? 'farmer' : 'retailer';
        setFormData(prev => ({
          ...prev,
          name: selectedPersona.name,
          email: selectedPersona.email,
          password: selectedPersona.hasPassword ? selectedPersona.password : 'password123',
          confirmPassword: selectedPersona.hasPassword ? selectedPersona.password : 'password123',
          userType: userType,
          agreeToTerms: true
        }));
      } else {
        // Fallback demo data if no persona
        setFormData(prev => ({
          ...prev,
          name: 'New User',
          email: prefillEmail || 'newuser@example.com',
          password: 'password123',
          confirmPassword: 'password123',
          userType: 'farmer',
          agreeToTerms: true
        }));
      }
    } else {
      // Fill step 2 data
      setFormData(prev => ({
        ...prev,
        farmName: selectedPersona?.farmName || 'Oxford Valley Farm',
        farmAddress: selectedPersona?.farmAddress || '123 Canterbury Plains Rd',
        city: selectedPersona?.city || selectedPersona?.location || 'Oxford',
        postalCode: selectedPersona?.postalCode || '7495',
        region: selectedPersona?.region || 'Canterbury',
        country: selectedPersona?.country || 'New Zealand'
      }));
    }
  };
  
  // Check if current step form is empty
  const isCurrentStepEmpty = () => {
    if (step === 1) {
      return !formData.name && 
             !formData.password && 
             !formData.confirmPassword && 
             !formData.userType && 
             !formData.agreeToTerms;
    } else {
      return !formData.farmName && 
             !formData.farmAddress && 
             !formData.city && 
             !formData.postalCode && 
             !formData.region;
    }
  };
  
  const handleBackClick = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onBack();
    }
  };
  
  return (
    <AuthLayout 
      title={step === 1 ? "Create Account" : "Farm Details"}
      onBack={handleBackClick}
      showBackButton={true}
    >
      <form className="space-y-6" onSubmit={step === 1 ? handleContinue : handleSubmit} noValidate>
        {step === 1 ? (
          // Step 1: Account Details
          <>
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
                <FormButton
                  type="button"
                  onClick={() => handleUserTypeSelect('farmer')}
                  variant={formData.userType === 'farmer' ? 'primary' : 'outline'}
                  fullWidth
                >
                  Farmer
                </FormButton>
                <FormButton
                  type="button"
                  onClick={() => handleUserTypeSelect('retailer')}
                  variant={formData.userType === 'retailer' ? 'primary' : 'outline'}
                  fullWidth
                >
                  Retailer
                </FormButton>
              </div>
            </div>
            
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
            
            <div>
              <FormButton
                type="submit"
                variant="primary"
                fullWidth
                disabled={!isStep1Valid()}
              >
                Continue
              </FormButton>
            </div>
          </>
        ) : (
          // Step 2: Farm Details
          <>
            <p className="text-sm text-gray-500 mb-6">
              Farm details will be used on reports and for weather information
            </p>
            
            <FormField
              label="Farm Name"
              name="farmName"
              type="text"
              value={formData.farmName}
              onChange={handleChange}
              placeholder="Enter your farm name"
              icon={<Building2 size={18} className="text-gray-400" />}
              required
            />
            
            <FormField
              label="Farm Address"
              name="farmAddress"
              type="text"
              value={formData.farmAddress}
              onChange={handleChange}
              placeholder="123 Main Road"
              icon={<MapPin size={18} className="text-gray-400" />}
              required
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="City/Town"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Oxford"
                required
              />
              
              <FormField
                label="Postal Code"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="7495"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Region"
                name="region"
                type="text"
                value={formData.region}
                onChange={handleChange}
                placeholder="Canterbury"
                required
              />
              
              <FormField
                label="Country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                placeholder="New Zealand"
                required
              />
            </div>
            
            <div>
              <FormButton
                type="submit"
                variant="primary"
                fullWidth
                disabled={!isStep2Valid()}
              >
                Complete Registration
              </FormButton>
            </div>
          </>
        )}
        
        {/* Demo Helper - show for current step */}
        {isCurrentStepEmpty() && (
          <div className="text-center">
            <button
              type="button"
              onClick={fillDemoData}
              className="text-sm text-green-600 hover:text-green-500 font-medium"
            >
              Fill {step === 1 ? 'account details' : 'farm details'}
            </button>
          </div>
        )}
        
        {/* Step indicator */}
        <div className="flex justify-center items-center space-x-2 mt-6">
          <div className={`h-2 w-2 rounded-full ${step === 1 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          <div className={`h-2 w-2 rounded-full ${step === 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterScreen;