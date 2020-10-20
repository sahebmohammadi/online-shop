// import PhoneNumber from '../../components/signUp/PhoneNumberForm/PhoneNumber';
// import CodeValidation from '../../components/signUp/CodeVerification/CodeVerification';
import classes from './SignUp.module.scss';
import { useState } from 'react';

const SignUp = () => {
  // const [step, setStep] = useState(false);
  return (
    <>
      <div className={classes.container}>
        <img
          className={classes.signupimage}
          src="/images/sign-merchant-1.png"
          alt="signup-image"
        />
        <div className={classes.form_bg}>
          {/* {!step ? <PhoneNumber setStep={setStep} /> : <CodeValidation />} */}
        </div>
      </div>
    </>
  );
};

export default SignUp;
