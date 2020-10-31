import http from './httpServices';

const apiEndPoint = process.env.apiUrl + '/dashboard/profile';

export const getMerchantData = (token) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return http.get(apiEndPoint, header);
};
