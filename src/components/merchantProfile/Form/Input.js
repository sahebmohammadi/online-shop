import React from 'react';
import { Field, ErrorMessage } from 'formik';
import classes from './input.module.scss';

const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className={classes.formControl}>
      <label htmlFor={name}>{label}</label>
      <Field name={name} id={name} {...rest} className = {classes.input}/>
      <ErrorMessage name={name} component="div" className={classes.validationError} />
    </div>
  );
};

export default Input;
