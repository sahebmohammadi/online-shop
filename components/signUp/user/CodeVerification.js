// import Styles
import classes from "./CodeVerification.module.scss";
import { useEffect, useState } from "react";
// imports
import Link from "next/link";

//  formik
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CodeVerification = (props) => {
  const [time, setTime] = useState(45);

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  //  initial values
  const initialValues = {
    code: "",
  };
  //  onSubmit
  const onSubmit = (values) => {
    console.log("form data", values);
    // CALL THE SERVER
  };

  //  validation schema
  const validationSchema = Yup.object({
    code: Yup.string().required("کد تایید را وارد کنید"),
  });

  return (
    <div className={classes.signup_bg}>
      <p className={classes.signup_text}>ثبت نام در پرایس</p>
      <p className={classes.hint}>کد دریافتی را در کادر زیر وارد نمایید</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Form>
            <div className={classes.input_group}>
              <Field
                name="code"
                type="text"
                placeholder="کدتایید"
                className={classes.number_input}
              />
              <ErrorMessage
                name="code"
                component="div"
                className={classes.validation_error}
              />
              {time > 0 ? (
                <p className={classes.resend_code_msg}>
                  ارسال مجدد کد {time} ثانیه
                </p>
              ) : (
                // should be edited ! onClick event to resend cod
                <button>
                  <p className={classes.resend_code}> ارسال مجدد</p>
                </button>
              )}
              <button
                className={classes.submit}
                disabled={!formik.isValid}
                type="submit"
              >
                اعتبار سنجی
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

export default CodeVerification;
