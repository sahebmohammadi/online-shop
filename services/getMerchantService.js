import http from './httpServices';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/dashboard/profile';

export const getMerchantData = (token) => {
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return http.get(apiEndPoint, header);
};
