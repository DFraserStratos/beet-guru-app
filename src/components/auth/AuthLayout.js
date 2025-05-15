import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ErrorBoundary from '../utility/ErrorBoundary';
import beetGuruWideLogo from '../../BeetGuruWide.png';

/**
 * Reusable layout component for authentication screens
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const AuthLayout = ({ 
  title,
  backButton,
  children,
  footerVersion = 'v1.1.0',
  footerCopyright = '© 2025 Beet Guru Ltd.'
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <ErrorBoundary>
        {/* Logo */}
        <div className="flex justify-center">
          <img 
            src={beetGuruWideLogo} 
            alt="Beet Guru Logo" 
            className="h-28 w-auto" 
          />
        </div>
        
        {/* Content Card */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Card Header with optional back button */}
            {(title || backButton) && (
              <div className="flex items-center mb-6">
                {backButton && (
                  <button
                    onClick={backButton.onClick}
                    className="flex items-center text-green-600 hover:text-green-500"
                    aria-label={backButton.ariaLabel || 'Go back'}
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    <span className="text-sm font-medium">{backButton.text || 'Back'}</span>
                  </button>
                )}
                <div className="text-center flex-1">
                  {title && <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>}
                </div>
                {backButton && <div className="w-16"></div>} {/* Spacer for alignment when back button is present */}
              </div>
            )}
            
            {/* Main Content */}
            {children}
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Beet Guru {footerVersion} • {footerCopyright}</p>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default AuthLayout;