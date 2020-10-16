// Imports
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {register} from '../../../../services/merchantSignUpService';
import {verifyEmail} from '../../../../services/verifyEmail';
import classes from './EmailValidationForm.module.scss';
import * as constants from '../../../../constants';
import { useRouter } from 'next/router';

//  Component :
const EmailValidationForm = (props) => {
  // Route
  const router = useRouter();
  // State
  const [time, setTime] = useState(120);
  // props
  const { merchant } = props;
  // useEffect
  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime(time - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  //  initial values
  const initialValues = {
    code: '',
  };
  //  onSubmit
  const onSubmit = async (values) => {
    console.log('form data', values);

    // CALL THE SERVER TO VERIFY EMAIL
    const obj = { email: merchant.email, code: values.code };
    try {
      const { data: response } = await verifyEmail(obj);
      console.log('response : ', response);
      toast.success(response.message);
      // Save Token :
      const { token, user } = response.data;
      console.log(token);
      console.log("user",user);
      localStorage.setItem('token', token);
      // Redirect to the profile page
      router.replace('/merchant/profile');
    } catch (err) {}
  };
  // call the server with the merchant again to resend the activtion code
  const merchantHandler = async () => {
    console.log('code resend');
    setTime(120);
    // CALL THE SERVER FOR RESEND CODE
    try {
      const { data } = await register(merchant);
      console.log('data : ', data);
      toast.success(data.message);
      // const { data: userData } = data;
      // const { user } = userData;
      // console.log(user);
    } catch (err) {}
  };
  //  validation schema
  const validationSchema = Yup.object({
    code: Yup.string().required(constants.forms.code),
  });

  return (
    <div className={classes.signupBg}>
      <p className={classes.signupText}>{constants.forms.registrationHeader}</p>
      <p className={classes.hint}>{constants.forms.validationhint}</p>
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
                {/* <label htmlFor="code">کد تایید</label> */}
                <Field
                  id="code"
                  name="code"
                  type="password"
                  placeholder="12345"
                  className={classes.input}
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className={classes.validationError}
                />
              </div>
              {time > 0 ? (
                <p className={classes.resendCodeMsg}>ارسال مجدد کد {time} ثانیه</p>
              ) : (
                // onClick event to resend cod
                <button onClick={merchantHandler}>
                  <p className={classes.resendCode}>
                    {' '}
                    {constants.forms.buttonns.resendCode}
                  </p>
                </button>
              )}
              <button className={classes.submit} disabled={!formik.isValid} type="submit">
                {constants.forms.buttonns.validation}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className={classes.existingAccountAsk}>
        <Link href="/merchant/login">
          <a className={classes.link}>{constants.forms.existingAccount}</a>
        </Link>
      </p>
    </div>
  );
};

export default EmailValidationForm;
