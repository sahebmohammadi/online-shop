import http from './httpServices';

const apiEndPoint = process.env.apiUrl + '/dashboard/store';

export const addMerchantStore = (user) => {
  const {
    name,
    about,
    tel,
    address,
    storeImage,
    logoImage,
    catalogImage,
    tagsId,
    storeTypesId,
    galleryImage,
    userId,
    token,
  } = user;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const formData = new FormData();
  formData.append('name', name);
  formData.append('about', about);
  formData.append('phone', tel);
  formData.append('address', address);
  formData.append('cover', storeImage);
  formData.append('logo', logoImage);
  formData.append('catalogue', catalogImage);
  formData.append('tags', JSON.stringify(tagsId));
  formData.append('gallery', JSON.stringify(galleryImage));
  formData.append('store_types', JSON.stringify(storeTypesId));
  formData.append('user_id', userId);
  console.log('formData', formData);
  return http.post(apiEndPoint, formData, header);
};
