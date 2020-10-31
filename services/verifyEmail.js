import http from './httpServices';

const apiEndPoint = process.env.apiUrl + '/merchant/auth/verify';

export const verifyEmail = (user) => {
  return http.post(apiEndPoint, { email: user.email, code: user.code });
};
