import React from 'react';

/**
 * Register screen component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const RegisterScreen = ({ onNavigate, onRegister }) => {
  const handleRegister = () => {
    onRegister({
      id: '2',
      name: 'New User',
      email: 'newuser@example.com',
      role: 'Farm Manager'
    });
  };

  const handleGoToLogin = () => {
    onNavigate('login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create New Account</h1>
        
        <p className="text-gray-500 mb-4 text-center">This is a stub RegisterScreen component.</p>
        
        <div className="space-y-4 mt-6">
          <button
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            onClick={handleRegister}
          >
            Register
          </button>
          
          <div className="text-center">
            <button
              className="text-green-600 hover:text-green-700"
              onClick={handleGoToLogin}
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;