import React from 'react';
import Layout from 'src/components/merchantProfile/layout/Layout';
import RedirectUser from 'src/utils/RedirectUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const MerchantDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    RedirectUser(router, 'profile');
  }, []);

  return <Layout>داشبورد کسب و کار</Layout>;
};

export default MerchantDashboard;
