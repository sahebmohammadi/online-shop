import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/components/merchantProfile/layout/Layout';
import Content from 'src/components/merchantProfile/Content';
import Store from 'src/components/merchantProfile/store/Store';
import RedirectUser from 'src/utils/RedirectUser';

const Profile = () => {
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    // RedirectUser(router, 'store', '/merchant/login');
  }, []);
  return (
    <Layout>
      <Content>
      <Store />
      </Content>
    </Layout>
  );
};

export default Profile;
