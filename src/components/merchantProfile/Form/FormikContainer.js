import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import styles from './formikContainer.module.scss';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import * as constants from '../../../../constants';
import FormikControl from './FormikControl';
import DatePicker from './DatePicker';
import SelectProvinceCity from './SelectProvinceCity';
import UploadFiles from './UploadFiles';
import { merchantProfileForm } from '../../../../services/merchantProfileService';
import { toast } from 'react-toastify';
import { getMerchantData } from '../../../../services/getMerchantService';

const MerchantForm = () => {
  // states :
  const [birthday, setBirthday] = useState(null);
  const [city, setCity] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [license, setLicense] = useState(null);
  const [userId,setUserId] = useState();
  const [token, setToken] = useState();
  const [email, setEmail] = useState(null);
  //usEffect : decode token to get user Id
  useEffect(() => {
    getMerchant();
  }, []);
  const getMerchant = async () => {
    try {
      const jwt = localStorage.getItem('token');
      setToken(jwt);
      const { data: responseData } = await getMerchantData(jwt);
      // toast.success(responseData.message);
      const { user } = responseData.data;
      const { email, id} = user[0];
      setEmail(email);
      setUserId(id);
      } catch (error) {}
  };
  //  Form Contants :
  const { error, merchantForm } = constants.MerchantProfile;
  const { forms } = constants;
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
    nationalCode: '',
    tel: '',
    address: '',
    postalCode: '',
    phone: '',
  };
  //  onSubmit
  const onSubmit = async (values) => {
    setIsSubmitted(!isSubmitted);

    const allValues = {
      ...values,
      birthday,
      city,
      userId,
      license,
      profileImage,
      token,
      email,
    };
    // CALL THE SERVER
    try {
      const response = await merchantProfileForm(allValues);
      const { data } = response;
      toast.success(data.message);
    } catch (ex) {}
  };

  //  validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required(error.name),
    family: Yup.string().required(error.family),
    gender: Yup.string().required(error.gender),
    nationalCode: Yup.string()
      .required(error.nationalCode)
      .matches(/^[0-9]{10}$/, `${error.nationalCodeLength}`),
    // email: Yup.string().required(forms.email.enter).email(forms.email.check),
    tel: Yup.string()
      .required(error.tel)
      .matches(/^[0-9]{8}$/, `${error.telLength}`),
    phone: Yup.string()
      .required(error.phone)
      .matches(/^[0-9]{11}$/, `${error.phoneLength}`),
    postalCode: Yup.string().required(error.postalCode),
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
              <p className={styles.formHint}> {merchantForm.personalInfo}</p>
              <Grid item xs={12} md={6}>
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
                    label={merchantForm.nationalCode}
                    name="nationalCode"
                  />
                  <FormikControl
                    control="input"
                    type="email"
                    label={merchantForm.email}
                    name="email"
                    value={email ? email : 'example@gmail.com'}
                    disabled={true}
                  />
                </div>
              </Grid>
              <Grid item container xs={12} md={6}>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                  }}
                >
                  <UploadFiles
                    label={merchantForm.profileImage}
                    hint={merchantForm.hintProfileImage}
                    setUploadedData={setProfileImage}
                  />
                  <UploadFiles
                    label={merchantForm.license}
                    hint={merchantForm.hintLicense}
                    setUploadedData={setLicense}
                  />
                </div>
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
                <SelectProvinceCity
                  cityLabel={merchantForm.city}
                  provinceLabel={merchantForm.province}
                  setCity={setCity}
                />
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
                    label={merchantForm.postalCode}
                    name="postalCode"
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
                  disabled={
                    !formik.isValid ||
                    isSubmitted ||
                    !city ||
                    !birthday ||
                    !profileImage ||
                    !license
                  }
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
