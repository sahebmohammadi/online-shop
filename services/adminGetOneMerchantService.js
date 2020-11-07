import http from './httpServices';
const apiEndPoint = process.env.apiUrl + '/admin/merchants';

export const getOneMerchant = (token,id) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return http.get(apiEndPoint + `/${id}`, header);
};
