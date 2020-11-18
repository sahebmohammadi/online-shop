import React from 'react';
import Input from './Input';
import RadioButton from './RadioButton';
import TextArea from './TextArea';
//  decide which of form filed has to be rendered !
const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'radio':
      return <RadioButton {...rest} />;
    case 'textarea':
      return <TextArea {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
