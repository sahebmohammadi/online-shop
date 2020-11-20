import Layout from '../../src/components/admin/layout/Layout';
import MerchantManagment from '../../src/components/admin/merchantManagment/MerchantManagment';
import MerchantTable from '../../src/components/admin/merchantManagment/MerchantTable';
import MerchantTableHeader from '../../src/components/admin/merchantManagment/merchantTableHeader';
import Content from '../../src/components/admin/merchantManagment/Content';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import RedirectUser from 'src/utils/RedirectUser';

const admin = () => {
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    RedirectUser(router, 'merchant-managment', '/admin/login');
  }, []);
  return (
    <Layout>
      <Content>
        <MerchantManagment>
          <MerchantTableHeader />
          <MerchantTable />
        </MerchantManagment>
      </Content>
    </Layout>
  );
};

export default admin;
