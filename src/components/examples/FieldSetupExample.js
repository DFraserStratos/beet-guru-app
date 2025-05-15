import React from 'react';
import { 
  Form, 
  FormSection, 
  FormInput, 
  NumberField, 
  DateField, 
  ToggleTypeField,
  FormButton
} from '../ui/form';
import { rules, createValidationSchema } from '../ui/form/FormValidation';

/**
 * Example component using the new form system
 * This demonstrates how the Field Setup screen could be implemented with the new form components
 */
const FieldSetupExample = () => {
  // Create validation schema
  const validationSchema = createValidationSchema({
    rowSpacing: [
      rules.required('Row spacing is required'),
      rules.numeric('Must be a valid number'),
      rules.min(0.1, 'Must be at least 0.1m')
    ],
    measurementLength: [
      rules.required('Measurement length is required'),
      rules.numeric('Must be a valid number'),
      rules.min(1, 'Must be at least 1m')
    ],
    bulbDryMatter: [
      rules.required('Bulb dry matter is required'),
      rules.numeric('Must be a valid number'),
      rules.min(1, 'Must be at least 1%'),
      rules.max(30, 'Must not exceed 30%')
    ],
    leafDryMatter: [
      rules.required('Leaf dry matter is required'),
      rules.numeric('Must be a valid number'),
      rules.min(1, 'Must be at least 1%'),
      rules.max(30, 'Must not exceed 30%')
    ],
    valueType: []
  });

  // Initial values
  const initialValues = {
    rowSpacing: '0.5',
    measurementLength: '4',
    bulbDryMatter: '12',
    leafDryMatter: '16',
    valueType: 'estimate'
  };

  // Form submission handler
  const handleSubmit = (values) => {
    console.log('Field setup data:', values);
    // Process form data...
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Field Setup</h2>
        
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Information alert */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Please enter accurate row spacing and default dry matter percentage for best results.
                </p>
              </div>
            </div>
          </div>
          
          {/* Field Measurements section */}
          <FormSection title="Field Measurements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
              <NumberField
                label="Row Spacing (m)"
                name="rowSpacing"
                unit="m"
                min={0.1}
                max={2.0}
                step={0.1}
                precision={1}
                required
                hint="Distance between rows"
              />
              
              <NumberField
                label="Measurement Length (m)"
                name="measurementLength"
                unit="m"
                min={1}
                max={100}
                step={1}
                precision={0}
                required
                hint="Length of the measurement area"
              />
            </div>
            
            {/* Calculated Area */}
            <div className="mt-6 bg-green-50 p-4 rounded-md">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800 font-medium">Calculated Measurement Area</span>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-green-700">
                  2.00 m²
                </p>
                <p className="text-xs text-green-600 mt-1">
                  This is the area of a single row sample based on your measurements
                </p>
              </div>
            </div>
          </FormSection>
          
          {/* Dry Matter Estimates section */}
          <FormSection title="Dry Matter Estimates">
            <div className="mb-4">
              <ToggleTypeField
                name="valueType"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-0">
              <NumberField
                label="Bulb Estimate (DM%)"
                name="bulbDryMatter"
                unit="%"
                min={1}
                max={30}
                step={1}
                precision={0}
                required
                hint="Estimated dry matter percentage for bulbs"
              />
              
              <NumberField
                label="Leaf Estimate (DM%)"
                name="leafDryMatter"
                unit="%"
                min={1}
                max={30}
                step={1}
                precision={0}
                required
                hint="Estimated dry matter percentage for leaves"
              />
            </div>
          </FormSection>
          
          {/* Form navigation */}
          <div className="pt-4 flex justify-between border-t border-gray-200">
            <FormButton type="button" variant="outline">
              Back
            </FormButton>
            
            <div className="flex space-x-2">
              <FormButton type="button" variant="secondary">
                Save as Draft
              </FormButton>
              <FormButton type="submit" variant="primary">
                Continue
              </FormButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default FieldSetupExample;