import { useState, useRef } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';

const LoginScreen = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formFilled, setFormFilled] = useState(false);
  const formRef = useRef(null);
  
  const fillFormWithSampleData = () => {
    setEmail('john.doe@example.com');
    setPassword('password');
    setFormFilled(true);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    
    // First click: Fill in fake credentials
    if (!formFilled) {
      fillFormWithSampleData();
      return;
    }
    
    // Second click: Actually log in
    onLogin({ 
      email, 
      name: 'John Doe', 
      role: 'Farm Manager',
      initials: 'JD'
    });
  };
  
  const handleContinueClick = (e) => {
    e.preventDefault();
    
    if (!formFilled) {
      fillFormWithSampleData();
    } else {
      // Second click: Actually log in
      onLogin({ 
        email, 
        name: 'John Doe', 
        role: 'Farm Manager',
        initials: 'JD'
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
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Log in to your account</h2>
          
          <form ref={formRef} className="space-y-6" onSubmit={handleLogin} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="button" // Changed from submit to button to bypass form validation
                onClick={handleContinueClick}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {formFilled ? (
                  <>
                    Sign in <ArrowRight size={16} className="ml-2" />
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
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
              <button
                onClick={onRegister}
                className="w-full flex justify-center py-2 px-4 border border-green-500 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Beet Guru v1.0.0 • © 2025 Beet Guru Ltd.</p>
      </div>
    </div>
  );
};

export default LoginScreen;