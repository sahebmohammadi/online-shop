import axios from "axios";
import { toast } from "react-toastify";
// import logger from "./logService";
axios.interceptors.response.use(
  null,
  (error) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (expectedError) {
      console.log("response : ", error.response);

      const { data } = error.response;
      console.log("data ", data);

      const { data: AllErros, message } = data;
      console.log("message ", message);
      toast.error(message);
      const { errors } = AllErros;
      console.log("errors : ", errors);
      console.log("Email Errors : ", errors.email);
      if (errors.email) {
        toast.error(errors.email[0]);
      }
      console.log("Password Errors : ", errors.password);
      if (errors.password) {
        toast.error(errors.password[0]);
      }
    }
    if (!expectedError) {
      logger.log(error);
      toast.error("An unexpected eror occurred");
    }
    return Promise.reject(error);
  }
);
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
