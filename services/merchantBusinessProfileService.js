import http from './httpServices';

const apiEndPoint = process.env.apiUrl + '/dashboard/profile/business';

export const merchantBusinessProfile = (user) => {
  const {
    storeStatus,
    merchantCode,
    businessCode,
    merchantType,
    storeName,
    vatLicense,
    licenseImage,
    userId,
    token,
  } = user;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const formData = new FormData();
  formData.append('name', storeName);
  formData.append('type', merchantType);
  formData.append('merchant_code', merchantCode);
  formData.append('business_code', businessCode);
  formData.append('vat_license', vatLicense);
  formData.append('license_image', licenseImage);
  formData.append('user_id', userId);

  return http.post(apiEndPoint, formData, header);
};
