import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/components/admin/layout/Layout';
import MerchantManagment from 'src/components/admin/merchantManagment/MerchantManagment';
import Content from 'src/components/admin/merchantManagment/Content';
import RedirectUser from 'src/utils/RedirectUser';
import { getOneMerchant } from 'services/adminGetOneMerchantService';
import MerchantManagmentHeader from 'src/components/admin/merchantManagment/merchantDetail/MerchantManagmentHeader';
import Store from 'src/components/admin/merchantManagment/merchantDetail/store/Store';
const MerchantDetail = () => {
  // STATE
  const [store, setStore] = useState(null);

  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    getOneMerchantData();
    // console.log(router.query);
    // RedirectUser(router, 'merchant-sofile','/admin/login');
  }, []);
  const getOneMerchantData = async () => {
    try {
      const token = localStorage.getItem('token');
      const id = router.query.id;
      const { data: responseData } = await getOneMerchant(token, id);
      const { user } = responseData.data;
      const { store } = user;
      console.log(responseData.data);
      setStore(store);
    } catch (error) {}
  };

  return (
    <Layout>
      <Content>
        <MerchantManagment>
          <MerchantManagmentHeader merchantId = {router.query.id} />
        </MerchantManagment>
  <MerchantManagment>{store ? <Store store={store}/> : null}</MerchantManagment>
      </Content>
    </Layout>
  );
};

export default MerchantDetail;
