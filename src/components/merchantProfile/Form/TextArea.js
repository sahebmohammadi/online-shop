import {Field, ErrorMessage} from 'formik';
import classes from './textArea.module.scss'
import React from 'react'
const TextArea = (props) => {
    const {label, name, ...rest} = props;
    return (
        <div className={classes.formControl}>
            <label htmlFor={name}>{label}</label>
            <Field  as="textarea" name = {name} id = {name} {...rest} className = {classes.input}/>
            <ErrorMessage name = {name} component ="div" className = {classes.validationError}/>
        </div>
    );
}

export default TextArea;
