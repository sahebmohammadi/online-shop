import React from 'react';
import { Field, ErrorMessage } from 'formik';
import classes from './radio.module.scss';
const RadioButton = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className={classes.formControl}>
      <label>{label}</label>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div className={classes.radioControl} key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  name={name}
                  checked={field.value === option.value}
                />
                <label className={classes.radioLabel} htmlFor={option.value}>
                  {option.key}
                </label>
              </div>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component="div" className={classes.validationError} />
    </div>
  );
};

export default RadioButton;
