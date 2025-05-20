import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FormButton } from '../ui/form';

/**
 * Screen for displaying the About Us information
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const AboutUsScreen = ({ onNavigate, isMobile = false }) => {
  return (
    <div className="space-y-6">
      {/* Header with back button - only shown on mobile */}
      {isMobile && (
        <div className="flex items-center mb-4">
          <FormButton
            variant="outline"
            icon={<ArrowLeft size={16} />}
            onClick={() => onNavigate('more')}
            size="sm"
          >
            Back
          </FormButton>
        </div>
      )}
      
      {/* Main content */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">About Agricom</h1>
        
        <div className="mb-6">
          <img 
            src="https://www.agricom.co.nz/themes/custom/agricom/logo.svg" 
            alt="Agricom Logo" 
            className="h-16 mb-4"
          />
          <p className="text-gray-600 mb-4">
            Agricom has been a leader in the New Zealand pastoral industry for over 30 years, 
            bringing farmers the best forage cultivars from around the world.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h2>
        <p className="text-gray-600 mb-6">
          To provide New Zealand farmers with superior forage solutions, backed by proven research and 
          dedicated technical support to help maximize their on-farm productivity and profitability.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Beet Guru App</h2>
        <p className="text-gray-600 mb-4">
          The Beet Guru app was developed to help farmers manage their fodder beet crops more efficiently 
          through easy-to-use digital tools for measuring, monitoring, and planning.
        </p>
        <p className="text-gray-600 mb-4">
          With Beet Guru, farmers can accurately assess crop yield, determine dry matter content, 
          and plan feeding schedules to optimize animal nutrition and farm productivity.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Expertise</h2>
        <p className="text-gray-600 mb-4">
          With decades of experience in fodder beet research and development, our team provides 
          farmers with the knowledge and tools they need to succeed with this valuable crop.
        </p>
        <p className="text-gray-600 mb-4">
          We work closely with farmers across New Zealand to understand their unique challenges 
          and develop solutions that work in real-world farm environments.
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
        <div className="text-gray-600">
          <p className="mb-2">Agricom</p>
          <p className="mb-2">PO Box 3761</p>
          <p className="mb-2">Christchurch 8140</p>
          <p className="mb-2">New Zealand</p>
          <p className="mb-2">Phone: +64 3 372 0800</p>
          <p>Email: info@agricom.co.nz</p>
        </div>
      </div>
      
      {/* App version info */}
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-gray-500 text-sm">Beet Guru v1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">© 2025 Agricom New Zealand</p>
      </div>
    </div>
  );
};

export default AboutUsScreen;
