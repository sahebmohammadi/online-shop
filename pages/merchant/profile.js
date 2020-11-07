import Layout from '../../src/components/merchantProfile/layout/Layout';
import Content from '../../src/components/merchantProfile/Content';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import RedirectUser from 'src/utils/RedirectUser';
const Profile = () => {
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    RedirectUser(router,'profile' ,'/merchant/login');
  }, []);
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Profile;
