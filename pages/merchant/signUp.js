// importing Components
import EmailPassword from "../../components/SignUp/merchant/EmaiPassword";
import EmailValidation from "../../components/SignUp/merchant/EmailValidation";
import { ToastContainer } from "react-toastify";
// importing Styles
import classes from "./SignUp.module.scss";
import { useState } from "react";

const SginUp = () => {
  // states
  const [step, setStep] = useState(false);
  const [merchant, setMerchant] = useState({});
  // JSX Return
  return (
    <>
      <ToastContainer />
      <div className={classes.container}>
        <div className = {classes.logoKooche}>
          <img src="/images/logo-kooche.svg" alt="logo-kooche" />
        </div>
        <div className={classes.form_bg}>
          {!step ? (
            <EmailPassword setMerchant={setMerchant} setStep={setStep} />
          ) : (
            <EmailValidation merchant={merchant} />
          )}
        </div>
      </div>
    </>
  );
};

export default SginUp;
