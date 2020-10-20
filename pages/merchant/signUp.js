// importing Components
import SignUpForm from '../../src/components/signUp/merchant/SignUpForm';
import EmailValidationForm from '../../src/components/signUp/merchant/EmailValidationForm';

// importing Styles
import classes from './SignUp.module.scss';
import { useState } from 'react';

const SignUp = () => {
  // states
  const [step, setStep] = useState(false);
  const [merchant, setMerchant] = useState({});
  // JSX Return
  return (
    <>
      <div className={classes.container}>
        <div className={classes.logoKooche}>
          <img src="/images/logo-kooche.svg" alt="logo-kooche" />
        </div>
        <div className={classes.form_bg}>
          {!step ? (
            <SignUpForm setMerchant={setMerchant} setStep={setStep} />
          ) : (
            <EmailValidationForm merchant={merchant} />
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
