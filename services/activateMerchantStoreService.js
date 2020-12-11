import http from './httpServices';
const apiEndPoint = process.env.apiUrl + '/admin/merchants';

export const activateMerchantStore = (token, id, status, message = null) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return http.put(apiEndPoint + `/${id}/active/store`, { status, message }, header);
};
