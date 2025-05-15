import React from 'react';
import { useFormContext } from './FormContext';

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
    <form
      id={id}
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(initialValues);
      }}
      method={method}
      noValidate={noValidate}
      {...rest}
    >
      {typeof children === 'function' 
        ? children({ handleSubmit: onSubmit })
        : children
      }
    </form>
  );
};

export default Form;