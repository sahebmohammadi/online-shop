import { Formik } from 'formik';
import React from 'react';
import {Field, ErrorMessage} from 'formik';
import TextError from './TextError';
import classses from './form.module.css';
const Input = (props) => {
    const {label, name, ...rest} = props;
    return (  
        <div className="form-control">
            <label htmlFor={name}>{label}</label>
            <Field name = {name} id = {name} {...rest}/>
            <ErrorMessage name = {name} component ={TextError}/>
        </div>
    );
}
 
export default Input;