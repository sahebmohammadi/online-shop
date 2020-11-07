import React, { useState } from 'react';
import FormikControl from '../../../merchantProfile/form/FormikControl';
import DatePicker from '../../../merchantProfile/form/DatePicker';
import SelectProvinceCity from '../../../merchantProfile/form/SelectProvinceCity';
import { Formik, Form } from 'formik';
import * as constants from '../../../../../constants';
import styles from '../../../merchantProfile/form/formikContainer.module.scss';
import DisplayImage from './DisplayImage';
import { Grid } from '@material-ui/core';
const ProfileForm = ({ profile }) => {
  //props :
  const {
    name,
    family,
    gender,
    national_code: nationalCode,
    email,
    tel,
    address,
    postal_code: postalCode,
    phone,
    birthday,
    city_id: cityId,
    national_card_image,
    profile_image,
  } = profile || {};
  //  initial values
  const initialValues = {
    name: name,
    family: family,
    gender: gender === '1' ? '1' : '2',
    nationalCode: nationalCode,
    tel: tel,
    address: address,
    postalCode: postalCode,
    phone: phone,
  };
  const [city, setCity] = useState(cityId);
  //  Form Contants :
  const { merchantForm } = constants.MerchantProfile;
  const { forms } = constants;
  // Radio options :
  const radioOptions = [
    { key: 'مرد', value: '1' },
    { key: 'خانم', value: '2' },
  ];

  return (
    <div style={{ paddingRight: '62px' }}>
      <Formik initialValues={initialValues}>
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
                    value={name ? name : ' '}
                    disabled={true}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label={merchantForm.family}
                    name="family"
                    value={family ? family : ' '}
                    disabled={true}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    name="birthday"
                    label={merchantForm.birthday}
                    value={birthday ? birthday.slice(0, 10) : ' '}
                    disabled={true}
                  />
                  <FormikControl
                    control="radio"
                    label={merchantForm.gender}
                    name="gender"
                    options={radioOptions}
                    disabled={true}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label={merchantForm.nationalCode}
                    name="nationalCode"
                    value={nationalCode ? nationalCode : ' '}
                    disabled={true}
                  />
                  <FormikControl
                    control="input"
                    type="email"
                    label={merchantForm.email}
                    name="email"
                    value={email ? email : ' '}
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
                  <DisplayImage
                    label={merchantForm.profileImage}
                    imageLink={profile_image}
                  />
                  <DisplayImage
                    label={merchantForm.license}
                    imageLink={national_card_image}
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
                    value={tel ? tel : ' '}
                    disabled={true}
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
                    value={phone ? phone : ' '}
                    disabled={true}
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
                    value={address ? address : ' '}
                    disabled={true}
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
                    value={postalCode ? postalCode : ' '}
                    disabled={true}
                  />
                </div>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
