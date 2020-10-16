import http from './httpServices';
import { apiUrl } from '../config.json';
import { object } from 'yup';

const apiEndPoint = apiUrl + '/merchant/auth/verify';

export const verifyEmail = (user) => {
  return http.post(apiEndPoint, { email: user.email, code: user.code });
};
