import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/components/admin/layout/Layout';
import MerchantManagment from 'src/components/admin/merchantManagment/MerchantManagment';
import Content from 'src/components/admin/merchantManagment/Content';
import ProfileForm from 'src/components/admin/merchantManagment/merchantDetail/ProfileForm';
import BusinessForm from 'src/components/admin/merchantManagment/merchantDetail/BusinessForm';
import Stepper from 'src/common/Stepper';
import RedirectUser from 'src/utils/RedirectUser';
import { getOneMerchant } from 'services/adminGetOneMerchantService';
import MerchantManagmentHeader from 'src/components/admin/merchantManagment/merchantDetail/MerchantManagmentHeader';
import { Typography } from '@material-ui/core';
const MerchantDetail = () => {
  // STATE
  const [profile, setProfile] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [notProfile, setNotProfile] = useState(false);
  const steps = ['اطلاعات کاربری', 'اطلاعات تجاری'];
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    getOneMerchantData();
    console.log(router.query);
    // RedirectUser(router, 'merchant-pofile','/admin/login');
  }, []);
  const getOneMerchantData = async () => {
    try {
      const token = localStorage.getItem('token');
      const id = router.query.id;
      const { data: responseData } = await getOneMerchant(token, id);
      const { user } = responseData.data;
      const { profile } = user;
      setProfile(profile);
      setNotProfile(profile ? false : true);
    } catch (error) {}
  };
  const messageStyle = {
    width: '320px',
    fontSize: '16px',
    fontFamily: 'Shabnam',
    margin: '10px auto',
    color: 'red',
  };
  const notFoundProfile = () => {
    return <p style={messageStyle}>اطلاعات کاربری و تجاری هنوز تکمیل نشده است</p>;
  };
  return (
    <Layout>
      <Content>
        <MerchantManagment>
          <MerchantManagmentHeader merchantId={router.query.id} />
        </MerchantManagment>
        <MerchantManagment>
          <Stepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            isNextStep={true}
          >
            {activeStep == 0 && profile ? (
              <ProfileForm profile={profile} />
            ) : (
              profile && <BusinessForm profile={profile} />
            )}
            {notProfile ? notFoundProfile() : null}
          </Stepper>
        </MerchantManagment>
      </Content>
    </Layout>
  );
};

export default MerchantDetail;
