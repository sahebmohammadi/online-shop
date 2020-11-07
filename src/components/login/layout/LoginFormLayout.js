// Import
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from 'services/merchantSigninService';
import { toast } from 'react-toastify';
import * as constants from '../../../../constants';
import classes from './loginFormLayout.module.scss';
//  Component :
const LoginFormLayout = ({ redirectLink }) => {
  const {forms} = constants;
  const router = useRouter();
  //  initial values
  const initialValues = {
    email: '',
    password: '',
  };
  //  onSubmit
  const onSubmit = async (values) => {
    // CALL THE SERVER
    try {
      const { data: response } = await login(values);
      toast.success(response.message);
      // Save Token :
      const { token } = response.data;
      localStorage.setItem('token', token);
      // Redirect
      router.replace(redirectLink);
    } catch (ex) {}
  };

  //  validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(forms.email.enter)
      .email(forms.email.check),
    password: Yup.string().required(forms.password.enter),
  });

  return (
    <div className={classes.signupBg}>
      <p className={classes.signupText}>{forms.loginHeader}</p>
      <p className={classes.hint}>{forms.loginHint}</p>
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
                <label htmlFor="email">{forms.labels.email}</label>
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
                <label htmlFor="password">{forms.labels.password}</label>
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
                {forms.buttonns.login}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className={classes.existingAccountAsk}>
        <Link href="/merchant/signUp">
          <a className={classes.link}>{forms.notRegistered}</a>
        </Link>
      </p>
    </div>
  );
};

export default LoginFormLayout;
