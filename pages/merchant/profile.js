import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMerchantData } from 'services/getMerchantService';
import Layout from 'src/components/merchantProfile/layout/Layout';
import Content from 'src/components/merchantProfile/Content';
import ProfileForm from 'src/components/merchantProfile/form/ProfileForm';
import BusinessForm from 'src/components/merchantProfile/businessForm/BuisenessForm';
import Stepper from 'src/common/Stepper';
import RedirectUser from 'src/utils/RedirectUser';
const steps = ['اطلاعات کاربری', 'اطلاعات تجاری'];
const Profile = () => {
  // STATE
  const [merchantProfileData, setMerchantProfileData] = useState({
    name: '',
    family: '',
    userId: ' ',
    phone: '',
    birthday: '',
    gender: '',
    nationalCode: '',
    tel: '',
    status: 0,
    nationalCardImage: '',
    profileImage: '',
    businessName: '',
    businessCode: '',
    merchantType: '',
    vatLicense: '',
    licenseImage: '',
    address: ' ',
  });
  const [activeStep, setActiveStep] = useState(0);

  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    RedirectUser(router, 'profile', '/merchant/login');
  }, []);
  //usEffect : get merchant id and email with token
  useEffect(() => {
    getMerchant();
  }, []);
  const getMerchant = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data: responseData } = await getMerchantData(token);
      const { user } = responseData.data;
      const { profile, email, id: userId } = user;
      const {
        name = '',
        family = '',
        phone = '',
        birthday = '',
        gender = '',
        national_code: nationalCode = '',
        tel = '',
        status = 0,
        national_card_image: nationalCardImage = '',
        profile_image: profileImage = '',
        business_name: businessName = '',
        business_code: businessCode = '',
        type: merchantType = '',
        vat_license: vatLicense = '',
        license_image: licenseImage = '',
        address = ' ',
      } = profile || {};
      setMerchantProfileData({
        name,
        userId,
        family,
        email,
        phone,
        birthday,
        gender,
        nationalCode,
        tel,
        status,
        nationalCardImage,
        profileImage,
        businessCode,
        businessName,
        merchantType,
        vatLicense,
        licenseImage,
        address,
        token: token,
      });
    } catch (error) {}
  };

  return (
    <Layout>
      <Content>
        <Stepper activeStep={activeStep} setActiveStep={setActiveStep} steps={steps}>
          {activeStep == 0 ? (
            <ProfileForm
              setMerchantProfileData={setMerchantProfileData}
              merchantProfileData={merchantProfileData}
            />
          ) : (
            <BusinessForm
              merchantProfileData={merchantProfileData}
              setMerchantProfileData={setMerchantProfileData}
            />
          )}
        </Stepper>
      </Content>
    </Layout>
  );
};

export default Profile;

// useEffect(() => {
//   getMerchant();
// }, []);
// const getMerchant = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     const { data: responseData } = await getMerchantData(token);
//     const { user } = responseData.data;
//     const { profile, email } = user;
//     const {
//       name,
//       family,
//       user_id: userId,
//       phone,
//       birthday,
//       gender,
//       national_code: nationalCode,
//       tel,
//       status = 0,
//       national_card_image: nationalCardImage,
//       profile_image: profileImage,
//       business_name: businessName,
//       type,
//       vat_license: vatLicense,
//       license_image: licenseImage,
//       address,
//     } = profile || {};
//     // console.log("profile", profile);
//     setState({
//       name,
//       family,
//       userId,
//       email,
//       phone,
//       birthday,
//       gender,
//       nationalCode,
//       tel,
//       status,
//       nationalCardImage,
//       profileImage,
//       businessName,
//       type,
//       vatLicense,
//       licenseImage,
//       address,
//       token: token,
//     });
//   } catch (error) {}
// };
