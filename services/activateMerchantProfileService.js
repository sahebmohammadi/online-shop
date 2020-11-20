import http from './httpServices';
const apiEndPoint = process.env.apiUrl + '/admin/merchants';

export const activateMerchantProfile = (token, id, status, message = null) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return http.put(apiEndPoint + `/${id}/active/profile`, { status, message }, header);
};
