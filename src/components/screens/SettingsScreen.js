import { useState } from 'react';
import { Save, User, Lock, ChevronLeft, Building } from 'lucide-react';
import { logger } from '../../utils/logger';
import { FormButton } from '../ui/form';
import PageContainer from '../layout/PageContainer';
import { useForm } from '../../hooks';
import ProfileSettings from './settings/ProfileSettings';
import FarmSettings from './settings/FarmSettings';
import SecuritySettings from './settings/SecuritySettings';

/**
 * Settings screen for managing user and farm information
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const SettingsScreen = ({ isMobile, onNavigate, user }) => {
  const [activeSection, setActiveSection] = useState('profile');
  
  // Initialize form with user data and default farm information
  const initialValues = {
    // User profile
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    phone: '',
    
    // Farm information
    farmName: 'Oxford Valley Farm',
    farmAddress: '123 Canterbury Plains Rd',
    city: 'Oxford',
    postalCode: '7495',
    region: 'Canterbury',
    country: 'New Zealand',
  };
  
  // Set up form management
  const { 
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue
  } = useForm(initialValues);
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the settings to the backend
    logger.info('Saving settings:', values);
    
    // Show success message
    alert('Settings saved successfully!');
  };
  
  // Determine if we should show the sidebar (desktop) or use mobile view
  const shouldShowSidebar = !isMobile;
  
  // Check if user is a farmer (hide farm details for farmers, show for retailers)
  const isFarmer = user?.accountType === 'farmer';
  
  return (
    <PageContainer>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {isMobile && (
              <button
                onClick={() => onNavigate('more')}
                className="mr-2 p-1.5 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          </div>
          <FormButton
            variant="primary"
            icon={<Save size={16} />}
            onClick={handleSubmit}
          >
            Save Changes
          </FormButton>
        </div>
        <p className="text-gray-600">
          Manage your profile{!isFarmer ? ', farm information,' : ''} and security settings
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Settings Navigation */}
        {shouldShowSidebar && (
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <ul className="divide-y divide-gray-100">
                <SettingsNavItem
                  label="Profile Information"
                  icon={<User size={18} />}
                  isActive={activeSection === 'profile'}
                  onClick={() => setActiveSection('profile')}
                />
                {!isFarmer && (
                  <SettingsNavItem
                    label="Farm Details"
                    icon={<Building size={18} />}
                    isActive={activeSection === 'farm'}
                    onClick={() => setActiveSection('farm')}
                  />
                )}
                <SettingsNavItem
                  label="Security"
                  icon={<Lock size={18} />}
                  isActive={activeSection === 'security'}
                  onClick={() => setActiveSection('security')}
                />
              </ul>
            </div>
          </div>
        )}
        
        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow p-6">
            {/* Mobile Tab Navigation */}
            {isMobile && (
              <div className="mb-6 flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className={`flex-1 py-2 px-3 text-center text-sm font-medium ${
                    activeSection === 'profile' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveSection('profile')}
                >
                  Profile
                </button>
                {!isFarmer && (
                  <button
                    className={`flex-1 py-2 px-3 text-center text-sm font-medium ${
                      activeSection === 'farm' 
                        ? 'bg-green-50 text-green-600' 
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveSection('farm')}
                  >
                    Farm
                  </button>
                )}
                <button
                  className={`flex-1 py-2 px-3 text-center text-sm font-medium ${
                    activeSection === 'security' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveSection('security')}
                >
                  Security
                </button>
              </div>
            )}
            
            {/* Profile Information Section */}
            {activeSection === 'profile' && (
              <ProfileSettings
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            )}
            
            {/* Farm Details Section - Only show for non-farmers */}
            {activeSection === 'farm' && !isFarmer && (
              <FarmSettings
                values={values}
                errors={errors}
                touched={touched}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            )}
            
            {/* Security Section */}
            {activeSection === 'security' && <SecuritySettings />}
            
            {/* Mobile Section Navigation Buttons */}
            {isMobile && (
              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                {activeSection !== 'profile' && (
                  <FormButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Determine previous section based on current section and user type
                      let prevSection = 'profile';
                      if (activeSection === 'security') {
                        prevSection = isFarmer ? 'profile' : 'farm';
                      }
                      setActiveSection(prevSection);
                    }}
                  >
                    Previous
                  </FormButton>
                )}
                {activeSection === 'profile' && (
                  <div></div> // Empty div for spacing when on first section
                )}
                {activeSection !== 'security' && (
                  <FormButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Determine next section based on current section and user type
                      let nextSection = 'security';
                      if (activeSection === 'profile') {
                        nextSection = isFarmer ? 'security' : 'farm';
                      }
                      setActiveSection(nextSection);
                    }}
                  >
                    Next
                  </FormButton>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

/**
 * Navigation item for the settings sidebar
 */
const SettingsNavItem = ({ label, icon, isActive, onClick }) => {
  return (
    <li>
      <button
        className={`w-full p-4 flex items-center text-left ${
          isActive ? 'bg-green-50 text-green-600 font-medium' : 'hover:bg-gray-50'
        }`}
        onClick={onClick}
      >
        <div className={`mr-3 ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
          {icon}
        </div>
        <span>{label}</span>
      </button>
    </li>
  );
};

export default SettingsScreen;
