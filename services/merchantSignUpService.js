import http from './httpServices';

const apiEndPoint = process.env.apiUrl + '/merchant/auth/sign-up';

export const register = (user) => {
  return http.post(apiEndPoint, {
    email: user.email,
    password: user.password,
    password_confirmation: user.confirmPassword,
  });
};
