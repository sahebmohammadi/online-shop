import React from 'react';
import { Field, ErrorMessage } from 'formik';
import classes from './radio.module.scss';
import uuid from 'react-uuid';
const RadioButton = (props) => {
  const { label, name, options,onChange, ...rest } = props;
  return (
    <div className={classes.formControl} key={uuid()}>
      <label>{label}</label>
      <Field name={name} {...rest} key={uuid()}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <div style={{ width: '115px' }} key={uuid()}>
                <div className={classes.radioControl} key={option.key}>
                  <input
                    type="radio"
                    id={option.value}
                    {...field}
                    value={option.value}
                    onChange = {onChange}
                    name={name}
                    checked={field.value === option.value}
                  />
                  <label className={classes.radioLabel} htmlFor={option.value}>
                    {option.key}
                  </label>
                </div>
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
