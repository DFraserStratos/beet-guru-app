import { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, Check } from 'lucide-react';

const RegisterScreen = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUserTypeSelect = (type) => {
    setFormData(prev => ({ ...prev, userType: type }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (step === 1) {
      // Move to user type selection
      setStep(2);
    } else {
      // Complete registration
      onComplete({ 
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        role: formData.userType === 'farmer' ? 'Farm Manager' : 'Retail Consultant',
        initials: `${formData.firstName[0]}${formData.lastName[0]}`
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <div className="flex items-center">
          <div className="bg-green-800 rounded-full h-14 w-14 flex items-center justify-center mr-3">
            <div className="text-white font-bold text-2xl">B</div>
          </div>
          <span className="font-bold text-2xl text-green-800">Beet Guru</span>
        </div>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="flex items-center mb-4">
            <button
              onClick={onBack}
              className="flex items-center text-green-600 hover:text-green-500"
            >
              <ArrowLeft size={16} className="mr-1" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {step === 1 ? 'Create Account' : 'Select Account Type'}
              </h2>
            </div>
            <div className="w-16"></div> {/* Spacer for alignment */}
          </div>
          
          {/* Step 1: Account Information */}
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Continue
                </button>
              </div>
            </form>
          )}
          
          {/* Step 2: User Type Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <p className="text-sm text-gray-600 mb-4">
                Please select your account type. This determines what features and permissions you'll have in the app.
              </p>
              
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => handleUserTypeSelect('farmer')}
                  className={`relative w-full flex items-start p-4 border ${
                    formData.userType === 'farmer' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  } rounded-lg hover:bg-gray-50 transition`}
                >
                  <div className="flex items-center h-5">
                    <div className={`w-5 h-5 rounded-full ${
                      formData.userType === 'farmer' ? 'bg-green-500' : 'border border-gray-300'
                    } flex items-center justify-center`}>
                      {formData.userType === 'farmer' && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <label className="font-medium text-gray-700">Farmer / Grower</label>
                    <p className="text-gray-500 text-sm">
                      You grow crops and want to track, manage, and analyze your beet production.
                    </p>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => handleUserTypeSelect('retailer')}
                  className={`relative w-full flex items-start p-4 border ${
                    formData.userType === 'retailer' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  } rounded-lg hover:bg-gray-50 transition`}
                >
                  <div className="flex items-center h-5">
                    <div className={`w-5 h-5 rounded-full ${
                      formData.userType === 'retailer' ? 'bg-green-500' : 'border border-gray-300'
                    } flex items-center justify-center`}>
                      {formData.userType === 'retailer' && <Check size={14} className="text-white" />}
                    </div>
                  </div>
                  <div className="ml-3 flex-1">
                    <label className="font-medium text-gray-700">Retailer / Consultant</label>
                    <p className="text-gray-500 text-sm">
                      You support multiple farmers and need to track data across different operations.
                    </p>
                  </div>
                </button>
              </div>
              
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={!formData.userType}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    formData.userType ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  Complete Registration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Beet Guru v1.0.0 • © 2025 Beet Guru Ltd.</p>
      </div>
    </div>
  );
};

export default RegisterScreen;