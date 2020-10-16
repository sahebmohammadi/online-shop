// Imports
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useEffect, useState } from "react";
// import * as userService from "../../Services/userService";
import classes from "./PhoneNumber.module.scss";
//  Component :
const PhoneNumberForm = (props) => {
  // props
  const { setStep } = props;
  //  initial values
  const initialValues = {
    email: "",
  password : "",
 confirmPassword : ""
  };
  //  onSubmit
  const onSubmit = async (values) => {
    console.log("form data", values);
    // CALL THE SERVER
 
    // Updating the state of SignUp
    setStep(true);
  };

  //  validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("شماره خود را بصورت صحیح وارد نمایید")
      .email("Invalid email format"),
    password: Yup.string().required("رمز عبور را وارد کنید"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "رمز عبور یکی نیست")
      .required("رمز عبور را وارد کنید"),
  });

  return (
    <div className={classes.signupBg}>
      <p className={classes.signupText}>ثبت نام در پرایس</p>
      <p className={classes.hint}>
        لطفا برای ثبت نام ابتدا شماره تلفن همراه خود را به همراه صفر و بدون ۹۸
        وارد نمایید
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Form>
            <div className={classes.inputGroup}>
              <div className={classes.formControl}>
                <label htmlFor="email">ایمیل</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className={classes.number_input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={classes.validation_error}
                />
              </div>
              <div className={classes.form_control}>
                <label htmlFor="password">رمز عبور</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="***"
                  className={classes.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={classes.validation_error}
                />
              </div>
              <div className={classes.form_control}>
                <label htmlFor="confirmPassword">تکرار رمز عبور</label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="***"
                  className={classes.repassword}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={classes.validation_error}
                />
              </div>
              {/* 
              <Field
                name="phoneNumber"
                type="text"
                placeholder="password"
                className={classes.password}
              />
              <Field
                name="phoneNumber"
                type="text"
                placeholder="password"
                className={classes.repassword}
              />

              <ErrorMessage
                name="phoneNumber"
                component="div"
                className={classes.validation_error}
              /> */}
              <button
                className={classes.submit}
                disabled={!formik.isValid}
                type="submit"
              >
                دریافت کد
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className={classes.existing_account_ask}>
        <Link href="/user/Login">
          <a className={classes.link}>در کوچه مبل حساب کاربری دارید؟ ورود</a>
        </Link>
      </p>
    </div>
  );
};

export default PhoneNumberForm;
