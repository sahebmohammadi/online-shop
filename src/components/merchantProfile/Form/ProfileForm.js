import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../../constants';
import FormikControl from './FormikControl';
import DatePicker from './DatePicker';
import SelectProvinceCity from './SelectProvinceCity';
import UploadFiles from './UploadFiles';
import styles from './formikContainer.module.scss';
import ToastHint from '../Toast';
//  Form Contants :
const { error, merchantForm } = constants.MerchantProfile;
// Radio options :
const radioOptions = [
  { key: 'مرد', value: '1' },
  { key: 'خانم', value: '2' },
];
const ProfileForm = ({ setMerchantProfileData, merchantProfileData }) => {
  // ?
  useEffect(() => {
    setMerchantProfileData(merchantProfileData);
  }, [merchantProfileData]);
  // PROPS
  const {
    email,
    name = '',
    family = '',
    gender = '1',
    nationalCode = '',
    tel = '',
    address: addressObject = '',
    phone = '',
    birthday: ExBirthday,
    city: ExCity = '',
    nationalCardImage: ExNationalCardImage,
    profileImage: ExProfileImage,
  } = merchantProfileData || {};
  const { address = '', postal_code: postalCode = '', city: cityObject } =
    addressObject || {};
  const { state_id: stateId, id: ExCityId = '', name: defaultCityName = '' } =
    cityObject || {};
  useEffect(() => {
    setCity(ExCityId);
  }, [cityObject]);
  // STATES
  const [birthday, setBirthday] = useState(ExBirthday);
  const [city, setCity] = useState(ExCityId);
  const [profileImage, setProfileImage] = useState(ExProfileImage);
  const [nationalCardImage, setNationalCardImage] = useState(ExNationalCardImage);
  // ! COMPONENT WILL UNMOUNT
  useEffect(() => {
    saveMerchantData();
    return () => {
      return saveMerchantData();
    };
  }, [city, birthday, profileImage, nationalCardImage]);
  const saveMerchantData = () => {
    const allValues = {
      birthday: birthday ? birthday : ExBirthday,
      city: city ? city : ExCityId,
      nationalCardImage: nationalCardImage ? nationalCardImage : ExNationalCardImage,
      profileImage: profileImage ? profileImage : ExProfileImage,
    };
    setMerchantProfileData((prevState) => {
      return { ...prevState, ...allValues };
    });
  };
  //  initial values
  const initialValues = {
    name: name,
    family: family,
    gender: gender ? gender : '1',
    nationalCode: nationalCode,
    tel: tel,
    address: address,
    postalCode: postalCode,
    phone: phone,
  };
  //  validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required(error.name),
    family: Yup.string().required(error.family),
    gender: Yup.string().required(error.gender),
    nationalCode: Yup.string()
      .required(error.nationalCode)
      .matches(/^[0-9]{10}$/, `${error.nationalCodeLength}`),
    tel: Yup.string()
      .required(error.tel)
      .matches(/^[0-9]{8}$/, `${error.telLength}`),
    phone: Yup.string()
      .required(error.phone)
      .matches(/^[0-9]{11}$/, `${error.phoneLength}`),
    postalCode: Yup.string().required(error.postalCode),
    address: Yup.string().required(error.address),
  });
  // ? CUSTOM HANDLERS
  const handleChange = (event, setFieldValue, setFieldTouched) => {
    const value = event.target.value;
    const name = event.target.name;
    setMerchantProfileData({ ...merchantProfileData, [event.target.name]: value });
    setFieldValue(name, value);
  };

  return (
    <>
      <Grid container xs={12}>
        <ToastHint />
      </Grid>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        setFieldValue
        enableReinitialize={true}
      >
        {(formik) => {
          return (
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
                      value={formik.values['name']}
                      onChange={(e) =>
                        handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                      }
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label={merchantForm.family}
                      name="family"
                      value={formik.values['family']}
                      onChange={(e) =>
                        handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                      }
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
                      value={nationalCode}
                      onChange={(e) =>
                        handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                      }
                    />
                    <FormikControl
                      control="input"
                      type="text"
                      label={merchantForm.nationalCode}
                      name="nationalCode"
                      value={formik.values['nationalCode']}
                      onChange={(e) =>
                        handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                      }
                    />
                    <FormikControl
                      control="input"
                      type="email"
                      label={merchantForm.email}
                      name="email"
                      value={email ? email : ''}
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
                      initialImage={ExProfileImage}
                    />
                    <UploadFiles
                      label={merchantForm.license}
                      hint={merchantForm.hintLicense}
                      setUploadedData={setNationalCardImage}
                      initialImage={ExNationalCardImage}
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
                      value={formik.values['tel']}
                      onChange={(e) =>
                        handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                      }
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
                      value={formik.values['phone']}
                      onChange={(e) =>
                        handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                      }
                    />
                  </div>
                </Grid>

                <Grid item container xs={12}>
                  <SelectProvinceCity
                    cityLabel={merchantForm.city}
                    provinceLabel={merchantForm.province}
                    setCity={setCity}
                    defaultProvince={stateId}
                    // defaultCity={{ label: cityName, value: city }}
                    defaultCityId={ExCityId}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className={styles.inputGroup}>
                    <FormikControl
                      control="input"
                      label={merchantForm.address}
                      name="address"
                      value={formik.values['address']}
                      onChange={(e) =>
                        handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                      }
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
                      value={formik.values['postalCode']}
                      onChange={(e) =>
                        handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                      }
                    />
                  </div>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ProfileForm;
