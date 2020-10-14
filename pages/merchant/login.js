// imports
import MerchantLogin from '../../components/login/merchant/MerchantLogin';
import { ToastContainer } from 'react-toastify';
import classes from './SignUp.module.scss';

const Login = () => {
  // states

  // JSX Return
  return (
    <>
      <ToastContainer />
      <div className={classes.container}>
        <div className={classes.logoKooche}>
          <img src="/images/logo-kooche.svg" alt="logo-kooche" />
        </div>
        <div className={classes.form_bg}>
          <MerchantLogin />
        </div>
      </div>
    </>
  );
};

export default Login;
