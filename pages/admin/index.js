import React from 'react';
import Layout from 'src/components/admin/layout/Layout';
import RedirectUser from 'src/utils/RedirectUser';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const AdminDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    RedirectUser(router, 'merchant-managment');
  }, []);

  return <Layout>دشبورد ادمین</Layout>;
};

export default AdminDashboard;
