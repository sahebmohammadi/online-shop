import http from './httpServices';
const apiEndPoint = process.env.apiUrl + '/store_types';

export const getTypes = (token) => {
  return http.get(apiEndPoint);
};
