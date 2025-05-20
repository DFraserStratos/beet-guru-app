import { useState, useEffect } from 'react';
import { Save, User, MapPin, Lock, ChevronLeft, Building } from 'lucide-react';
import { logger } from '../../utils/logger';
import { FormButton, FormField } from '../ui/form';
import PageContainer from '../layout/PageContainer';
import { useForm } from '../../hooks';

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
          Manage your profile, farm information, and security settings
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
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
                <SettingsNavItem
                  label="Farm Details"
                  icon={<Building size={18} />}
                  isActive={activeSection === 'farm'}
                  onClick={() => setActiveSection('farm')}
                />
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
        <div className={`${shouldShowSidebar ? 'md:w-3/4' : 'w-full'}`}>
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
              <form>
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <FormField
                    label="Full Name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                    touched={touched.name}
                    placeholder="Your full name"
                    required
                  />
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    placeholder="Your email address"
                    required
                  />
                  <FormField
                    label="Role"
                    name="role"
                    type="text"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.role}
                    touched={touched.role}
                    placeholder="Your role (e.g. Farm Manager)"
                  />
                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="text"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.phone}
                    touched={touched.phone}
                    placeholder="Your phone number"
                  />
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Profile information will be used for reports and notifications
                  </p>
                </div>
              </form>
            )}
            
            {/* Farm Details Section */}
            {activeSection === 'farm' && (
              <form>
                <h2 className="text-xl font-semibold mb-4">Farm Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <FormField
                    label="Farm Name"
                    name="farmName"
                    type="text"
                    value={values.farmName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.farmName}
                    touched={touched.farmName}
                    placeholder="Your farm name"
                    required
                  />
                  <FormField
                    label="Farm Address"
                    name="farmAddress"
                    type="text"
                    value={values.farmAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.farmAddress}
                    touched={touched.farmAddress}
                    placeholder="Street address"
                    required
                  />
                  <FormField
                    label="City/Town"
                    name="city"
                    type="text"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.city}
                    touched={touched.city}
                    placeholder="City or town"
                    required
                  />
                  <FormField
                    label="Postal Code"
                    name="postalCode"
                    type="text"
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.postalCode}
                    touched={touched.postalCode}
                    placeholder="Postal code"
                  />
                  <FormField
                    label="Region"
                    name="region"
                    type="text"
                    value={values.region}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.region}
                    touched={touched.region}
                    placeholder="Region/State/Province"
                    required
                  />
                  <FormField
                    label="Country"
                    name="country"
                    type="text"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.country}
                    touched={touched.country}
                    placeholder="Country"
                    required
                  />
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Farm details will be used on reports and for weather information
                  </p>
                </div>
              </form>
            )}
            
            {/* Security Section */}
            {activeSection === 'security' && (
              <form>
                <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                <div className="space-y-4 mb-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium mb-2">Change Password</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        placeholder="Your current password"
                      />
                      <FormField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        placeholder="New password"
                      />
                      <FormField
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                      />
                      <div>
                        <FormButton
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            alert('Password change functionality would be implemented here');
                          }}
                        >
                          Update Password
                        </FormButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500 mb-4">
                    Keeping your account secure helps protect your farm data
                  </p>
                </div>
              </form>
            )}
            
            {/* Mobile Section Navigation Buttons */}
            {isMobile && (
              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                {activeSection !== 'profile' && (
                  <FormButton
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const prevSection = activeSection === 'security' ? 'farm' : 'profile';
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
                      const nextSection = activeSection === 'profile' ? 'farm' : 'security';
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
