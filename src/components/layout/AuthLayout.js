import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ErrorBoundary from '../utility/ErrorBoundary';
import beetGuruWideLogo from '../../BeetGuruWide.png';

/**
 * Standardized layout component for authentication screens
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content to display
 * @param {string} props.title - Screen title
 * @param {Function} [props.onBack] - Optional back button handler
 * @param {boolean} [props.showBackButton=false] - Whether to show the back button
 * @returns {JSX.Element} Rendered component
 */
const AuthLayout = ({ 
  children, 
  title,
  onBack,
  showBackButton = false
}) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12">
      <ErrorBoundary>
        {/* Logo Section */}
        <div className="flex justify-center">
          <img 
            src={beetGuruWideLogo} 
            alt="Beet Guru Logo" 
            className="h-28 w-auto" 
          />
        </div>
        
        {/* Main Card */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Header with back button and title */}
            {title && (
              <div className="flex items-center mb-6">
                {showBackButton && onBack ? (
                  <button
                    onClick={onBack}
                    className="flex items-center text-green-600 hover:text-green-500"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    <span className="text-sm font-medium">Back</span>
                  </button>
                ) : (
                  <div className="w-16" />
                )}
                
                <div className="text-center flex-1">
                  <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                </div>
                
                <div className="w-16" />
              </div>
            )}
            
            {/* Main Content */}
            {children}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Beet Guru v1.1.0 • © {currentYear} Beet Guru Ltd.</p>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default AuthLayout;