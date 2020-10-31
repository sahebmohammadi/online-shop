import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import classes from './input.module.scss';
import clsx from 'classnames';
const Input = (props) => {
  const { label, name, placeholder, value, disabled, ...rest } = props;
  // const [address, setAddress] = useState(false);
  // if (name === 'address') {
  //   setAddress(!address);
  // }
  return (
    <div className={classes.formControl}>
      <label htmlFor={name}>{label}</label>
      <Field
        name={name}
        value={value}
        id={name}
        {...rest}
        placeholder={placeholder}
        disabled={disabled}
        // className={clsx(classes.input, { [classes.address]: address })}
        className={classes.input}
      />
      <ErrorMessage name={name} component="div" className={classes.validationError} />
    </div>
  );
};

export default Input;
