// imports
import React from 'react';
import AdminLogin from '../../src/components/login/admin/AdminLogin';
import BackgroundLayout from './../../src/components/login/layout/BackgroundLayout';
import RedirectUser from 'src/utils/RedirectUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Login = () => {
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    RedirectUser(router, 'merchantManagment');
  }, []);
  return (
    <BackgroundLayout>
      <AdminLogin />
    </BackgroundLayout>
  );
};

export default Login;
