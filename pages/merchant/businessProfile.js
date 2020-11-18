import Layout from '../../src/components/merchantProfile/layout/Layout';
import BusinessForm from '../../src/components/merchantProfile/businessForm/Content';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import RedirectUser from 'src/utils/RedirectUser';
const BusinessProfile = () => {
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    RedirectUser(router,'businessProfile',"/merchant/login");
  }, []);
  return (
    <Layout>
      <BusinessForm />
    </Layout>
  );
};

export default BusinessProfile;
