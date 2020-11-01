import Layout from '../../src/components/merchantProfile/layout/Layout';
import BusinessForm from '../../src/components/merchantProfile/businessForm/BusinessForm';
import React , {useEffect} from 'react';
import { useRouter } from 'next/router';
const BusinessProfile = () => {
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
      <BusinessForm />
    </Layout>
  );
};

export default BusinessProfile;
