import React from 'react';
import { Formik, Form } from 'formik';
import styles from './formikContainer.module.scss';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import * as constants from '../../../../constants';
import FormikControl from './FormikControl';
import { useState } from 'react';
import DatePicker from './DatePicker';
import SelectProvinceCity from './SelectProvinceCity';
import clsx from 'classnames';
const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    padding: '100px',
    backgroundColor: 'red',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

const MerchantForm = () => {
  // states :
  const [birthday, setBirthday] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  //  Form Contants :
  const { error, merchantForm } = constants.MerchantProfile;
  const { forms } = constants;
  const classes = useStyles();
  // Radio options :
  const radioOptions = [
    { key: 'مرد', value: '1' },
    { key: 'خانم', value: '2' },
  ];
  //  initial values
  const initialValues = {
    name: '',
    family: '',
    gender: '',
    national_code: '',
    email: '',
    tel: '',
    address: '',
    postal_code: '',
    phone: '',
    user_id: '',
  };
  //  onSubmit
  const onSubmit = async (values) => {
    setIsSubmitted(!isSubmitted);
    console.log('form data', values);
    const allValues = { ...values, birthday, city, province };
    // CALL THE SERVER
    // try {
    //   const response = await userService.register(values);
    //   console.log('response ', response);
    //   const { data } = response;
    //   console.log('data : ', data);
    //   toast.success(data.message);
    //   const { data: userData } = data;
    //   const { user } = userData;
    //   console.log(user);
    //   // Set Merchant
    //   setMerchant(values);
    //   // Updating the state of SignUp
    //   setStep(true);
    // } catch (ex) {}
  };

  //  validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required(error.name),
    family: Yup.string().required(error.family),
    // // birthday: Yup.string().required(error.birthday),
    gender: Yup.string().required(error.gender),
    national_code: Yup.string().required(error.national_code),
    email: Yup.string().required(forms.email.enter).email(forms.email.check),
    tel: Yup.string().required(error.tel),
    phone: Yup.string().required(error.phone),
    postal_code: Yup.string().required(error.postal_code),
    // // province: Yup.string().required(error.province),
    // // city: Yup.string().required(error.city),
    address: Yup.string().required(error.address),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => (
          <Form>
            <Grid item container xs={12}>
              <Grid item xs={12} md={6}>
                <p className={styles.formHint}> {MerchantForm.personalInfo}</p>
                <div className={styles.inputGroup}>
                  <FormikControl
                    control="input"
                    type="text"
                    label={merchantForm.name}
                    name="name"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label={merchantForm.family}
                    name="family"
                  />
                  <DatePicker
                    name="birthday"
                    label={merchantForm.birthday}
                    setBirthday={setBirthday}
                  />
                  <FormikControl
                    control="radio"
                    label={merchantForm.gender}
                    name="gender"
                    options={radioOptions}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label={merchantForm.national_code}
                    name="national_code"
                  />
                  <FormikControl
                    control="input"
                    type="email"
                    label={merchantForm.email}
                    name="email"
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>From</Paper>
              </Grid>
              <p className={styles.formHint}>{merchantForm.callInfo}</p>
              <Grid item xs={12} md={6}>
                <div className={styles.inputGroup}>
                  <FormikControl
                    control="input"
                    type="text"
                    label={merchantForm.tel}
                    name="tel"
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className={styles.inputGroup}>
                  <FormikControl
                    control="input"
                    type="text"
                    label={merchantForm.phone}
                    name="phone"
                  />
                </div>
              </Grid>

              <Grid item container xs={12}>
                <SelectProvinceCity setProvince={setProvince} setCity={setCity} />
              </Grid>
              <Grid item xs={12}>
                <div className={styles.inputGroup}>
                  <FormikControl
                    control="input"
                    label={merchantForm.address}
                    name="address"
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className={styles.inputGroup}>
                  <FormikControl
                    control="input"
                    type="text"
                    label={merchantForm.postal_code}
                    name="postal_code"
                  />
                </div>
              </Grid>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  className={styles.submit}
                  disabled={!isSubmitted}
                  onClick={() => {
                    setIsSubmitted(!isSubmitted);
                  }}
                >
                  {merchantForm.edit}
                </button>
                <button
                  className={styles.submit}
                  disabled={!formik.isValid || isSubmitted}
                  type="submit"
                >
                  {merchantForm.saveChanges}
                </button>
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MerchantForm;
