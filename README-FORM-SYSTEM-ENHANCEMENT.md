# Form System Enhancement

This branch introduces a significant enhancement to the form handling system in the Beet Guru application. The new system provides centralized form state management, robust validation, specialized field components, and improved organization while maintaining backward compatibility.

## Key Features

1. **FormProvider Context**: Centralized form state management
2. **Validation System**: Declarative validation rules
3. **Specialized Form Fields**: Domain-specific input components
4. **Form Layout Components**: Standard structure for forms
5. **Backward Compatibility**: Works alongside existing implementation

## How to Use

### Basic Usage (New Components)

The new form system makes creating forms simpler and more declarative:

```jsx
import { Form, FormInput, NumberField, FormSection, DateField } from '../components/ui/form';
import { rules, createValidationSchema } from '../components/ui/form/FormValidation';

// Define validation schema
const validationSchema = createValidationSchema({
  location: [rules.required('Please select a location')],
  rowSpacing: [
    rules.required('Row spacing is required'),
    rules.numeric('Must be a valid number'),
    rules.min(0.1, 'Must be at least 0.1m')
  ],
  sowingDate: [rules.required('Sowing date is required')]
});

// Component using the new form system
const MyFormComponent = () => {
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    // Process form values...
  };

  return (
    <Form
      initialValues={{
        location: '',
        rowSpacing: '0.5',
        sowingDate: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <FormSection title="Crop Information">
        <FormInput
          label="Location"
          name="location"
          type="select"
          options={[
            { value: 'north-field', label: 'North Field' },
            { value: 'south-field', label: 'South Field' }
          ]}
          placeholder="Select a location"
          required
        />
        
        <NumberField
          label="Row Spacing"
          name="rowSpacing"
          unit="m"
          min={0.1}
          max={2.0}
          step={0.1}
          precision={1}
          required
          hint="Distance between rows in meters"
        />
        
        <DateField
          label="Sowing Date"
          name="sowingDate"
          required
        />
      </FormSection>
      
      <div className="flex justify-end">
        <FormButton type="submit" variant="primary">
          Submit
        </FormButton>
      </div>
    </Form>
  );
};
```

### Backward Compatibility (Enhanced useForm Hook)

The enhanced `useForm` hook works with both old and new patterns:

```jsx
// Old pattern still works
const {
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit
} = useForm(
  initialValues,
  validate,
  onSubmit
);

// New pattern with validation schema
const {
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue  // New method
} = useForm(
  initialValues,
  validationSchema,  // Can now accept validation schema
  onSubmit
);
```

## New Components

### 1. Form Components

- `Form`: Container component that manages form state through FormProvider
- `FormProvider`: Context provider for form state and handlers
- `useFormContext`: Hook to access form context in child components

### 2. Field Components

- `FormInput`: Enhanced input field that works with FormContext
- `NumberField`: Input for numeric values with unit display
- `DateField`: Date picker with calendar popup
- `ToggleField`: Toggle switch for boolean values
- `ToggleTypeField`: Field with togglable values (e.g., Estimate/Actual)

### 3. Layout Components

- `FormSection`: Section container for grouping fields

### 4. Validation System

- `rules`: Predefined validation rules
- `createValidationSchema`: Helper for creating validation schemas
- `validateField`: Validates a single field
- `validateForm`: Validates all fields in a form

## Migration Guide

### Step 1: Update Imports

Replace:
```jsx
import { FormField, FormButton } from '../components/ui/form';
```

With:
```jsx
import { Form, FormInput, FormButton } from '../components/ui/form';
import { rules, createValidationSchema } from '../components/ui/form/FormValidation';
```

### Step 2: Convert Validation Logic

Replace manual validation:
```jsx
const validate = (values) => {
  const errors = {};
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  
  return errors;
};
```

With validation schema:
```jsx
const validationSchema = createValidationSchema({
  email: [
    rules.required('Email is required'),
    rules.email('Email is invalid')
  ]
});
```

### Step 3: Convert Form Structure

Replace:
```jsx
<form onSubmit={handleSubmit}>
  <FormField
    label="Email"
    name="email"
    type="email"
    value={values.email}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.email}
    touched={touched.email}
  />
  
  <FormButton type="submit">Submit</FormButton>
</form>
```

With:
```jsx
<Form
  initialValues={{ email: '' }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  <FormInput
    label="Email"
    name="email"
    type="email"
  />
  
  <FormButton type="submit">Submit</FormButton>
</Form>
```

## Benefits

1. **Reduced Boilerplate**: Less repetitive code for form handling
2. **Consistent Validation**: Standard validation across all forms
3. **Better Organization**: Clear structure for complex forms
4. **Specialized Components**: Field types designed for our domain
5. **Improved Developer Experience**: Simpler API, better feedback
