import http from './httpServices';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/dashboard/profile';

export const merchantProfileForm = (user) => {
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
    license,
    profileImage,
    token,
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
  formData.append('national_card_image', license);
  formData.append('profile_image', profileImage);
  // console.log('formData', formData.get('profile_image'));
  return http.post(apiEndPoint, formData, header);
};
