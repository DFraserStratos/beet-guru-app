import { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, ArrowLeft, Check } from 'lucide-react';
import beetGuruWideLogo from '../../assets/BeetGuruWide.png';

const RegisterScreen = ({ onBack, onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      email: '',
      password: '',
      confirmPassword: '',
      userType: '',
      subscribeToNews: false,
      agreeToTerms: false
    });
    setFormFilled(false);
  }, []);
  
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
      email: 'donald@stp.co.nz',
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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <img 
          src={beetGuruWideLogo} 
          alt="Beet Guru Logo" 
          className="h-16 w-auto" 
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
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter your name"
                />
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
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>
            
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
              <button
                type="button" // Changed from submit to button to prevent form validation
                onClick={handleContinueClick}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {formFilled ? 'Complete Registration' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Beet Guru v1.0.0 • © 2025 Beet Guru Ltd.</p>
      </div>
    </div>
  );
};

export default RegisterScreen;