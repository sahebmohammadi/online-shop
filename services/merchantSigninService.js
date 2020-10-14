import http from './httpServices';
import { apiUrl } from '../config.json';

const apiEndPoint = apiUrl + '/merchant/auth/sign-in';

export const login = (user) => {
  return http.post(apiEndPoint, { email: user.email, password: user.password });
};
