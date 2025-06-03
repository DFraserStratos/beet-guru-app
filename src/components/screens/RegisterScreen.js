import { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, ArrowLeft, Check, Building2, MapPin } from 'lucide-react';
import AuthLayout from '../layout/AuthLayout';
import { FormField, FormButton } from '../ui/form';
import fredTheFarmer from '../../config/user';

const RegisterScreen = ({ onBack, onComplete, prefillEmail = '' }) => {
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
  
  // Pre-fill form data on mount - only set email if provided
  useEffect(() => {
    // Only pre-fill the email if provided from the email screen
    if (prefillEmail) {
      setFormData(prev => ({
        ...prev,
        email: prefillEmail
      }));
    }
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      // Move to step 2
      setStep(2);
    } else {
      // Complete registration
      const userData = {
        id: String(Date.now()), // Simple ID generation
        name: formData.name,
        email: formData.email, // Use the email they entered (could be different from Fred's)
        password: formData.password,
        hasPassword: true,
        role: formData.userType === 'farmer' ? 'Farm Manager' : 'Retail Consultant',
        accountType: formData.userType,
        initials: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        city: formData.city,
        location: formData.city + ', New Zealand' // Default to NZ
      };
      
      // Add additional fields based on user type
      if (formData.userType === 'retailer') {
        userData.farmName = formData.farmName;
        userData.farmAddress = formData.farmAddress;
        userData.postalCode = formData.postalCode;
        userData.region = formData.region;
        userData.country = formData.country;
        userData.location = `${formData.city}, ${formData.country}`;
      }
      
      onComplete(userData);
    }
  };
  
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      onBack();
    }
  };
  
  // Validate current step
  const isStepValid = () => {
    if (step === 1) {
      return formData.name && 
             formData.email && 
             formData.password && 
             formData.confirmPassword && 
             formData.password === formData.confirmPassword &&
             formData.userType && 
             formData.agreeToTerms;
    } else {
      // For farmers, only city is required
      if (formData.userType === 'farmer') {
        return formData.city;
      }
      // For retailers, all address fields are required (future use)
      return formData.farmName && 
             formData.farmAddress && 
             formData.city && 
             formData.postalCode && 
             formData.region;
    }
  };
  
  // Fill form with demo data
  const fillDemoData = () => {
    if (step === 1) {
      // Fill step 1 data with Fred's details
      setFormData(prev => ({
        ...prev,
        name: fredTheFarmer.name,
        email: prefillEmail || fredTheFarmer.email,
        password: fredTheFarmer.password,
        confirmPassword: fredTheFarmer.password,
        userType: 'farmer',
        agreeToTerms: true
      }));
    } else {
      // Fill step 2 data based on user type
      if (formData.userType === 'farmer') {
        // For farmers, only fill city
        setFormData(prev => ({
          ...prev,
          city: 'Canterbury'
        }));
      } else {
        // For retailers, fill all farm details
        setFormData(prev => ({
          ...prev,
          farmName: fredTheFarmer.farmName,
          farmAddress: '123 Canterbury Plains Rd',
          city: 'Canterbury',
          postalCode: '7495',
          region: 'Canterbury',
          country: 'New Zealand'
        }));
      }
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
      // For farmers, only check city
      if (formData.userType === 'farmer') {
        return !formData.city;
      }
      // For retailers, check all fields
      return !formData.farmName && 
             !formData.farmAddress && 
             !formData.city && 
             !formData.postalCode && 
             !formData.region;
    }
  };
  
  return (
    <AuthLayout 
      title={step === 1 ? "Create Account" : formData.userType === 'farmer' ? "Location Details" : "Farm Details"}
      onBack={handleBack}
      showBackButton={true}
    >
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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
                disabled={!isStepValid()}
              >
                Continue
              </FormButton>
            </div>
          </>
        ) : (
          // Step 2: Location/Farm Details
          <>
            {formData.userType === 'farmer' ? (
              // Simplified form for farmers - only city/town
              <>
                <p className="text-sm text-gray-500 mb-6">
                  We only need to know your general location for weather information and reports
                </p>
                
                <FormField
                  label="City/Town"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Oxford"
                  icon={<MapPin size={18} className="text-gray-400" />}
                  required
                />
              </>
            ) : (
              // Full address form for retailers (future use)
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
              </>
            )}
            
            <div>
              <FormButton
                type="submit"
                variant="primary"
                fullWidth
                disabled={!isStepValid()}
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
              Fill {step === 1 ? 'account details' : formData.userType === 'farmer' ? 'location details' : 'farm details'}
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