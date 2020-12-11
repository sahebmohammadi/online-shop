import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/components/admin/layout/Layout';
import MerchantManagment from 'src/components/admin/merchantManagment/MerchantManagment';
import Content from 'src/components/admin/merchantManagment/Content';
import RedirectUser from 'src/utils/RedirectUser';
import { getOneMerchant } from 'services/adminGetOneMerchantService';
import StoreManagmentHeader from 'src/components/admin/merchantManagment/MerchantDetail/store/StoreManagmentHeader';
import Store from 'src/components/admin/merchantManagment/merchantDetail/store/Store';

const MerchantDetail = () => {
  // STATE
  const [store, setStore] = useState(null);
  const [notStore, setNotStore] = useState(false);
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
      console.log(store);
      setStore(store);
      setNotStore(store ? false : true);
    } catch (error) {}
  };
  const messageStyle = {
    width: '320px',
    fontSize: '16px',
    fontFamily: 'Shabnam',
    margin: '30px auto',
    color: 'red',
  };
  const notFoundStore = () => {
    return <p style={messageStyle}>فروشگاه هنوز ایجاد نگردیده است</p>;
  };
  return (
    <Layout>
      <Content>
        <MerchantManagment>
          <StoreManagmentHeader merchantId={router.query.id} />
        </MerchantManagment>
        <MerchantManagment>
          {store ? <Store store={store} /> : null}
          {notStore ? notFoundStore() : null}
        </MerchantManagment>
      </Content>
    </Layout>
  );
};

export default MerchantDetail;
