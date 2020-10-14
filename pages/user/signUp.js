// importing Components
import PhoneNumber from "../../components/SignUp/PhoneNumberForm/PhoneNumber";
import CodeValidation from "../../components/SignUp/CodeVerification/CodeVerification";
// importing Styles
import classes from "./SignUp.module.scss";
import { useState } from "react";

const SginUp = () => {
  // states
  const [step, setStep] = useState(false);
  // JSX Return
  return (
    <>
      <div className={classes.container}>
        <img
          className={classes.signupimage}
          src="/images/sign-merchant-1.png"
          alt="signup-image"
        />
  
        <div className={classes.form_bg}>
          {!step ? <PhoneNumber setStep = {setStep} /> : <CodeValidation />}
        </div>
      </div>
    </>
  );
};

export default SginUp;
