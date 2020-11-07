import http from './httpServices';
const apiEndPoint = process.env.apiUrl + '/admin/merchants';

export const getMerchantsList = (token) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return http.get(apiEndPoint, header);
};
