// Import
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import  {register} from '../../../../services/merchantSignUpService';
import classes from './signUpForm.module.scss';
import { toast } from 'react-toastify';
import * as constants from '../../../../constants';
import { Router } from 'next/router';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

//  Component :
const SignUpForm = (props) => {
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    try {
      const jwt = localStorage.getItem('token');
      if (jwt) {
        router.push('/merchant/login');
      }
    } catch (error) {}
  };
  // props
  const { setStep, setMerchant } = props;

  //  initial values
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  //  onSubmit
  const onSubmit = async (values) => {
    // console.log('form data', values);
    localStorage.setItem("email",values.email)
    // CALL THE SERVER
    try {
      const response = await register(values);
      console.log('response ', response);
      const { data } = response;
      console.log('data : ', data);
      toast.success(data.message);
      const { data: userData } = data;
      const { user } = userData;
      console.log(user);
      // Set Merchant
      setMerchant(values);
      // Updating the state of SignUp
      setStep(true);
    } catch (ex) {}
  };

  //  validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(constants.forms.email.enter)
      .email(constants.forms.email.check),
    password: Yup.string()
      .required(constants.forms.password.enter)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        `${constants.forms.password.validation}`,
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], constants.forms.password.check)
      .required(constants.forms.password.enter),
  });

  return (
    <div className={classes.signupBg}>

      <p className={classes.signupText}>{constants.forms.registrationHeader}</p>
      <p className={classes.hint}>{constants.forms.emailPasswordHint}</p>
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
              <div className={classes.formControl}>
                <label htmlFor="confirmPassword">
                  {constants.forms.labes.confirmPassword}
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="*****"
                  className={classes.input}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={classes.validationError}
                />
              </div>

              <button className={classes.submit} disabled={!formik.isValid} type="submit">
                {constants.forms.buttonns.registration}
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

export default SignUpForm;
