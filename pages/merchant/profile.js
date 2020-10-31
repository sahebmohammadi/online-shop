import Layout from '../../src/components/merchantProfile/layout/Layout';
import Content from '../../src/components/merchantProfile/Content';
import React , {useEffect} from 'react';
import { useRouter } from 'next/router';
const Profile = () => {
  // const [isChecked]
    // Route :
    const router = useRouter();
    // useEffect :
    useEffect(() => {
      getUser();
    }, []);
    const getUser = () => {
      try {
        const jwt = localStorage.getItem('token');
        if (!jwt) {
          router.push('/merchant/login');
        }
      } catch (error) {}
    };
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Profile;
