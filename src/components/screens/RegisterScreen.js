import { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, ChevronRight } from 'lucide-react';

const RegisterScreen = ({ onBack, onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'farmer',
    subscribeToNews: false,
    agreeToTerms: false
  });
  
  const [formFilled, setFormFilled] = useState(false);
  
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
    
    // First click: Fill in the form with sample data
    if (!formFilled) {
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
      return;
    }
    
    // Second click: Complete registration
    onComplete({ 
      email: formData.email,
      name: formData.name,
      role: formData.userType === 'farmer' ? 'Farm Manager' : 'Retail Consultant',
      initials: formData.name.split(' ').map(n => n[0]).join('')
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-green-800 text-white px-4 py-3 flex justify-between items-center">
        <div className="w-24">
          <button
            onClick={onBack}
            className="flex items-center text-white"
          >
            <ArrowLeft size={20} className="mr-1" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </div>
        <div className="text-center flex-1">
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
        <div className="w-24 text-right">
          <button
            onClick={onBack}
            className="text-white font-medium"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="border-b">
            <div className="px-4 py-4">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-none text-gray-800 text-base focus:outline-none bg-transparent"
                placeholder="Enter your name"
              />
            </div>
          </div>
          
          <div className="border-b">
            <div className="px-4 py-4">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-none text-gray-800 text-base focus:outline-none bg-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div className="border-b">
            <div className="px-4 py-4">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Type
              </label>
              <div className="flex justify-end">
                <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleUserTypeSelect('farmer')}
                    className={`px-6 py-2 text-sm font-medium ${
                      formData.userType === 'farmer' 
                        ? 'bg-green-800 text-white' 
                        : 'bg-white text-gray-500'
                    }`}
                  >
                    Farmer
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUserTypeSelect('retailer')}
                    className={`px-6 py-2 text-sm font-medium ${
                      formData.userType === 'retailer' 
                        ? 'bg-green-800 text-white' 
                        : 'bg-white text-gray-500'
                    }`}
                  >
                    Retailer
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-b">
            <div className="px-4 py-4 flex justify-between items-center">
              <label className="text-sm font-bold text-gray-900">
                Subscribe to News & Updates
              </label>
              <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="subscribeToNews"
                  id="subscribeToNews"
                  checked={formData.subscribeToNews}
                  onChange={handleChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="subscribeToNews"
                  className={`toggle-label block overflow-hidden h-6 rounded-full ${formData.subscribeToNews ? 'bg-green-500' : 'bg-gray-300'} cursor-pointer`}
                ></label>
              </div>
            </div>
          </div>
          
          <div className="px-4 py-4 bg-gray-100">
            <h2 className="text-xl font-semibold text-gray-800">Terms</h2>
          </div>
          
          <div className="border-b">
            <div className="px-4 py-4 flex justify-between items-center">
              <div className="text-gray-800 font-medium">View Terms</div>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </div>
          
          <div className="border-b">
            <div className="px-4 py-4 flex justify-between items-center">
              <label className="text-sm font-bold text-gray-900">
                Yes, I agree to these Terms
              </label>
              <div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="agreeToTerms"
                  className={`toggle-label block overflow-hidden h-6 rounded-full ${formData.agreeToTerms ? 'bg-green-500' : 'bg-gray-300'} cursor-pointer`}
                ></label>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-400 hover:bg-green-500 text-white font-bold rounded text-center"
            >
              {formFilled ? 'CONFIRM' : 'CONTINUE'}
            </button>
          </div>
        </form>
      </div>
      
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #fff;
        }
        .toggle-label {
          transition: background-color 0.2s ease;
        }
        .toggle-checkbox {
          right: 0;
          transition: all 0.2s ease;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #10B981;
        }
      `}</style>
    </div>
  );
};

export default RegisterScreen;