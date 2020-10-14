import React from "react";
import Input from "./Input";
import TextArea from './TextArea.js'
import Select from './Select';
//  decide which of form filed has to be rendered !
const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea": return <TextArea {...rest} />
    case "select": return <Select {...rest}/>
    case "radio":
    default:
      return null;
  }
};

export default FormikControl;
