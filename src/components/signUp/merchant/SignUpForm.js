import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../../../services/merchantSignUpService';
import Link from 'next/link';
import * as constants from '../../../../constants';
import classes from './signUpForm.module.scss';
import { toast } from 'react-toastify';
//  Component :
const SignUpForm = (props) => {
  const {forms} = constants;
  // props
  const { setStep, setMerchant } = props;
  //  initial values
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };
  //  onSubmit
  const onSubmit = async (values) => {
    // console.log('form data', values);
    localStorage.setItem('email', values.email);
    // CALL THE SERVER
    try {
      const response = await register(values);
      const { data } = response;
      toast.success(data.message);
      const { data: userData } = data;
      const { user } = userData;
      // Set Merchant
      setMerchant(values);
      // Updating the state of SignUp
      setStep(true);
    } catch (ex) {}
  };

  //  validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(forms.email.enter)
      .email(forms.email.check),
    password: Yup.string()
      .required(forms.password.enter)
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        `${forms.password.validation}`,
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], forms.password.check)
      .required(forms.password.enter),
      acceptTerms: Yup.bool().oneOf([true], forms.acceptTerms.error)
  });

  return (
    <div className={classes.signupBg}>
      <p className={classes.signupText}>{forms.registrationHeader}</p>
      <p className={classes.hint}>{forms.emailPasswordHint}</p>
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
              <div className={classes.formControl}>
                <label htmlFor="confirmPassword">
                  {forms.labels.confirmPassword}
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
              <div className={classes.formControl}>
                <Field type="checkbox" name="acceptTerms" />
                <label htmlFor="acceptTerms" className="form-check-label">
                {forms.acceptTerms.hint}
                </label>
                <ErrorMessage
                  name="acceptTerms"
                  component="div"
                  className={classes.validationError}
                />
              </div>

              <button className={classes.submit} disabled={!formik.isValid} type="submit">
                {forms.buttonns.registration}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <p className={classes.existingAccountAsk}>
        <Link href="/merchant/login">
          <a className={classes.link}>{forms.existingAccount}</a>
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
