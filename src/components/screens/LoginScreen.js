import React from 'react';

/**
 * Login screen component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const LoginScreen = ({ onNavigate, onLogin }) => {
  const handleLogin = () => {
    onLogin({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Farm Manager'
    });
  };

  const handleGoToRegister = () => {
    onNavigate('register');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to Beet Guru</h1>
        
        <p className="text-gray-500 mb-4 text-center">This is a stub LoginScreen component.</p>
        
        <div className="space-y-4 mt-6">
          <button
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            onClick={handleLogin}
          >
            Sign In
          </button>
          
          <div className="text-center">
            <button
              className="text-green-600 hover:text-green-700"
              onClick={handleGoToRegister}
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;