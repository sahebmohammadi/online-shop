import http from './httpServices';
const apiEndPoint = process.env.apiUrl + '/admin/tag';

export const activateMerchantProfile = (token, type) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = { tittle: '...', type: 'store | category | product' };
  return http.post(apiEndPoint, body, header);
};
