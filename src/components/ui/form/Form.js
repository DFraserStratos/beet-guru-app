import React from 'react';
import { FormProvider } from './FormContext';

/**
 * Form component that manages state and validation through FormProvider
 * @param {Object} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const Form = ({
  children,
  initialValues = {},
  validationSchema = {},
  onSubmit = () => {},
  className = '',
  id = '',
  method = 'post',
  noValidate = true,
  ...rest
}) => {
  return (
    <FormProvider
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <form
          id={id}
          className={className}
          onSubmit={handleSubmit}
          method={method}
          noValidate={noValidate}
          {...rest}
        >
          {typeof children === 'function' 
            ? children({ handleSubmit })
            : children
          }
        </form>
      )}
    </FormProvider>
  );
};

export default Form;