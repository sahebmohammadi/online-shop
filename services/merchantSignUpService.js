import http from "./httpServices";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/merchant/auth/sign-up";

export const register= (user)=> {
  return http.post(apiEndPoint, {
    email: user.email,
    password: user.password,
    password_confirmation: user.confirmPassword
  });
}



