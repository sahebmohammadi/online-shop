// importing Components
import React, { useState } from 'react';
import SignUpForm from '../../src/components/signUp/merchant/SignUpForm';
import EmailValidationForm from '../../src/components/signUp/merchant/EmailValidationForm';
import BackgroundLayout from './../../src/components/login/layout/BackgroundLayout';
import RedirectUser from 'src/utils/RedirectUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const SignUp = () => {
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    RedirectUser(router,'profile');
  }, []);
  // states
  const [step, setStep] = useState(false);
  const [merchant, setMerchant] = useState({});
  // JSX Return
  return (
    <BackgroundLayout>
      {!step ? (
        <SignUpForm setMerchant={setMerchant} setStep={setStep} />
      ) : (
        <EmailValidationForm merchant={merchant} />
      )}
    </BackgroundLayout>
  );
};

export default SignUp;
