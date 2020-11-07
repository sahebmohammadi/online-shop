import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../src/components/admin/layout/Layout';
import MerchantManagment from '../../src/components/admin/merchantManagment/MerchantManagment';
import Content from '../../src/components/admin/merchantManagment/Content';
import ProfileForm from '../../src/components/admin/merchantManagment/merchantDetail/ProfileForm';
import BusinessForm from '../../src/components/admin/merchantManagment/merchantDetail/BusinessForm';
import Stepper from '../../src/components/admin/merchantManagment/merchantDetail/Stepper';
import RedirectUser from 'src/utils/RedirectUser';
import { getOneMerchant } from '../../services/adminGetOneMerchantService';
import MerchantManagmentHeader from 'src/components/admin/merchantManagment/merchantDetail/MerchantManagmentHeader';
const MerchantDetail = () => {
  // STATE
  const [profile, setProfile] = useState(null);
  const [business, setBusiness] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    getOneMerchantData();
    console.log(router.query);
    // RedirectUser(router, 'merchantManagment','/admin/login');
  }, []);
  const getOneMerchantData = async () => {
    try {
      const token = localStorage.getItem('token');
      const id = router.query.id;
      const { data: responseData } = await getOneMerchant(token, id);
      // console.log({ responseData });
      const { user } = responseData.data;
      const { profile, business } = user[0];
      setProfile(profile);
      setBusiness(business);

      console.log({ profile, business });
    } catch (error) {}
  };
  return (
    <Layout>
      <Content>
        <MerchantManagment>
          <MerchantManagmentHeader/>
        </MerchantManagment>
        <MerchantManagment>
          <Stepper activeStep={activeStep} setActiveStep={setActiveStep}>
            {activeStep == 0 && profile ? (
              <ProfileForm profile={profile} />
            ) : (
              business && <BusinessForm business={business} />
            )}
          </Stepper>
        </MerchantManagment>
      </Content>
    </Layout>
  );
};

export default MerchantDetail;
