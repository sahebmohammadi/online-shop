import http from './httpServices';

const apiEndPoint = process.env.apiUrl + '/dashboard/profile';

export const addMerchantProfile = (user) => {
  const {
    name,
    family,
    gender,
    nationalCode,
    email,
    tel,
    address,
    postalCode,
    phone,
    birthday,
    userId,
    city,
    nationalCardImage,
    profileImage,
    token,
    businessCode,
    merchantType,
    businessName,
    vatLicense,
    licenseImage,
  } = user;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const formData = new FormData();
  formData.append('name', name);
  formData.append('family', family);
  formData.append('gender', gender);
  formData.append('national_code', nationalCode);
  formData.append('email', email);
  formData.append('tel', tel);
  formData.append('address', address);
  formData.append('postal_code', postalCode);
  formData.append('phone', phone);
  formData.append('birthday', birthday);
  formData.append('user_id', userId);
  formData.append('city_id', city);
  formData.append('national_card_image', nationalCardImage);
  formData.append('profile_image', profileImage);
  formData.append('business_name', businessName);
  formData.append('type', merchantType);
  formData.append('business_code', businessCode);
  formData.append('vat_license', vatLicense);
  formData.append('license_image', licenseImage);

  return http.post(apiEndPoint, formData, header);
};
