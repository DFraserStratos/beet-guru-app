import React from 'react';
import { X } from 'lucide-react';
import { FormField, FormButton } from '../ui/form';
import { IconButton } from '../ui/buttons';
import { useForm } from '../../hooks';

/**
 * Location Form Component
 * 
 * Form for creating and editing farm locations, includes fields
 * for location name and area.
 * 
 * @param {Object} props
 * @param {Object} props.location - Location data for editing (null for new location)
 * @param {Function} props.onSubmit - Submit handler
 * @param {Function} props.onCancel - Cancel handler
 * @returns {JSX.Element}
 */
const LocationForm = ({ location, onSubmit, onCancel }) => {
  const isEditMode = Boolean(location);
  
  // Form validation function
  const validateForm = (values) => {
    const errors = {};
    
    if (!values.name) {
      errors.name = 'Location name is required';
    }
    
    if (values.area && (isNaN(values.area) || values.area <= 0)) {
      errors.area = 'Area must be a positive number';
    }
    
    return errors;
  };
  
  // Initialize form with location data or defaults
  const initialValues = {
    name: location?.name || '',
    area: location?.area || '',
    id: location?.id || null,
  };
  
  // Set up form handling with custom hook
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(initialValues, validateForm, (formValues) => {
    // Format values before submit
    const submittedValues = {
      ...formValues,
      area: formValues.area ? parseFloat(formValues.area) : null,
    };
    
    onSubmit(submittedValues);
  });

  return (
    <>
      {/* Form Header */}
      <div className="flex items-center justify-between bg-green-700 text-white p-4 rounded-t-xl">
        <h2 className="text-lg font-semibold">
          {isEditMode ? 'Edit Paddock' : 'Add New Paddock'}
        </h2>
        <IconButton
          onClick={onCancel}
          icon={<X size={20} />}
          label="Close"
          className="text-white hover:text-gray-200"
        />
      </div>
      
      {/* Form Content */}
      <div className="p-6">
        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Paddock Name"
            name="name"
            type="text"
            placeholder="e.g., North Paddock"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            required
          />
          
          <FormField
            label="Area (hectares)"
            name="area"
            type="number"
            placeholder="e.g., 2.5"
            value={values.area}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.area}
            touched={touched.area}
            hint="Enter the size of the paddock in hectares"
          />
          
          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-8">
            <FormButton
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </FormButton>
            <FormButton
              type="submit"
              variant="primary"
            >
              {isEditMode ? 'Save Changes' : 'Create Paddock'}
            </FormButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default LocationForm;
