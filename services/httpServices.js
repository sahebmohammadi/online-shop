import axios from 'axios';
import { toast } from 'react-toastify';
// import logger from "./logService";
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response && error.response.status >= 400 && error.response.status < 500;
  if (expectedError) {

    const { data } = error.response;

    const { data: AllErros, message } = data;
    toast.error(message);
    const { errors } = AllErros;
    if (errors.email) {
      toast.error(errors.email[0]);
    }
    console.log('Password Errors : ', errors.password);
    if (errors.password) {
      toast.error(errors.password[0]);
    }
  }
  if (!expectedError) {
    toast.error('An unexpected eror occurred');
  }
  return Promise.reject(error);
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
