// Import
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import {login} from '../../../../services/merchantSigninService';
import classes from './merchantLogin.module.scss';
import { toast } from 'react-toastify';
import * as constants from '../../../../constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
//  Component :
const MerchantLogin = (props) => {
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    try {
      const jwt = localStorage.getItem('token');
      console.log('Token', jwt);
      if (jwt) {
        router.push('/merchant/profile');
      }
    } catch (error) {}
  };

  //  initial values
  const initialValues = {
    email: '',
    password: '',
  };
  //  onSubmit
  const onSubmit = async (values) => {
    localStorage.setItem("email",values.email)
    // console.log('form data', values);
    // CALL THE SERVER
    try {
      const { data: response } = await login(values);
      console.log('response : ', response);
      console.log(response.message);
      toast.success(response.message);
      // Save Token :
      const { token, user } = response.data;
      console.log(token);
      console.log('user', user);
      localStorage.setItem('token', token);
      // Redirect to the profile page
      router.replace('/merchant/profile');

      console.log(Router);
    } catch (ex) {}
  };

  //  validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(constants.forms.email.enter)
      .email(constants.forms.email.check),
    password: Yup.string().required(constants.forms.password.enter),
  });

  return (
    <div className={classes.signupBg}>
      <p className={classes.signupText}>{constants.forms.loginHeader}</p>
      <p className={classes.hint}>{constants.forms.loginHint}</p>
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
                <label htmlFor="email">{constants.forms.labes.email}</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className={classes.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={classes.validationError}
                />
              </div>
              <div className={classes.formControl}>
                <label htmlFor="password">{constants.forms.labes.password}</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="*****"
                  className={classes.input}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={classes.validationError}
                />
              </div>
              <button className={classes.submit} disabled={!formik.isValid} type="submit">
                {constants.forms.buttonns.login}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className={classes.existingAccountAsk}>
        <Link href="/merchant/signUp">
          <a className={classes.link}>{constants.forms.notRegistered}</a>
        </Link>
      </p>
    </div>
  );
};

export default MerchantLogin;
