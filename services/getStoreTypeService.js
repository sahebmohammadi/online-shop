import http from './httpServices';
const apiEndPoint = process.env.apiUrl + '/admin/store_types';

export const getTypes = (token) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return http.get(apiEndPoint, header);
};
