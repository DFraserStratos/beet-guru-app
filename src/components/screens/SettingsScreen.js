import { useState } from 'react';
import { Save, ChevronLeft } from 'lucide-react';
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
  
  // Initialize form with user data and default farm information
  const initialValues = {
    // User profile
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    phone: '',
    
    // Location information
    city: 'Oxford',
    farmName: 'Oxford Valley Farm', // For retailers this will be store name
    farmAddress: '123 Canterbury Plains Rd', // For retailers this will be store address
    postalCode: '7495',
    region: 'Canterbury',
    country: 'New Zealand',
    
    // Retailer specific fields
    brand: '',
    branch: '',
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

  // Handle password reset
  const handlePasswordReset = () => {
    // In a real app, this would trigger password reset flow
    alert('Password reset email will be sent to your email address');
  };
  
  // Determine user type
  const isFarmer = user?.accountType === 'farmer';
  const isRetailer = user?.accountType === 'retailer';
  const isAdmin = user?.isAdmin === true || user?.accountType === 'admin';
  
  return (
    <PageContainer>
      {/* Header */}
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
          Manage your profile information and account settings
        </p>
      </div>
      
      {/* Settings Form - Full Page Layout */}
      <div className="mt-6">
        <div className="bg-white rounded-xl shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Profile Information Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            {/* Location Section - Only for farmers and retailers */}
            {!isAdmin && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                
                {/* Farmer Location Fields */}
                {isFarmer && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="City/Town"
                      name="city"
                      type="text"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.city}
                      touched={touched.city}
                      placeholder="Your city or town"
                    />
                  </div>
                )}
                
                {/* Retailer Store Address Fields */}
                {isRetailer && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Brand"
                      name="brand"
                      type="text"
                      value={values.brand}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.brand}
                      touched={touched.brand}
                      placeholder="Your brand name"
                    />
                    <FormField
                      label="Branch"
                      name="branch"
                      type="text"
                      value={values.branch}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.branch}
                      touched={touched.branch}
                      placeholder="Your branch name"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Security Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-2">Password</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Reset your password to keep your account secure
                  </p>
                  <FormButton
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePasswordReset}
                  >
                    Reset Password
                  </FormButton>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default SettingsScreen;
