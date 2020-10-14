import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";


const FormikContainer = () => {
  const dropDownOptions = [
    { key: "select an option", value: "" },
    { key: "option 1", value: "opotion1" },
    { key: "option 2", value: "opotion2" },
    { key: "option 3", value: "opotion3" },
  ]
  //  initial values
  const initialValues = {
    email: "",
    description: "",
    selectOption: ""
  };
  //  onSubmit
  const onSubmit = (values) => {
    console.log("form data", values);
    // CALL THE SERVER
  };

  //  validation schema
  const validationSchema = Yup.object({
    email: Yup.string().required("required").email("Invalid email format"),
    description: Yup.string().required("required"),
    selectOption: Yup.string().required("required"),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="email"
            label="email"
            name="email"
          />
          <FormikControl
            control="textarea"
            label="description"
            name="description"
          />
          <FormikControl
            control="select"
            label="select a topic"
            name="selectOption"
            options={dropDownOptions}
          />
          <button type="submit"> submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
