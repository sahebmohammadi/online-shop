// imports
import React from 'react';
import BackgroundLayout from './../../src/components/login/layout/BackgroundLayout';
import MerchantLogin from '../../src/components/login/merchant/MerchantLogin';
import RedirectUser from 'src/utils/RedirectUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Login = () => {
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    RedirectUser(router,'profile');
  }, []);
  return (
    <BackgroundLayout>
      <MerchantLogin />
    </BackgroundLayout>
  );
};

export default Login;
