import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import styles from '../form/formikContainer.module.scss';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../../constants';
import FormikControl from '../form/FormikControl';
import UploadFiles from '../form/UploadFiles';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { merchantBusinessProfile } from '../../../../services/merchantBusinessProfileService';

const FormContainer = () => {
  // states :
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [licenseImage, setLicenseImage] = useState();
  const [merchant, setMerchant] = useState();
  const [token, setToken] = useState();
  //  Form Contants :
  const { businessForm, error } = constants.merchantBusinessForm;
  // useEffect
  useEffect(() => {
    try {
      const jwt = localStorage.getItem('token');
      setToken(jwt);
      const merchant = jwtDecode(jwt);
      setMerchant(merchant);
    } catch (error) {}
  }, []);
  // Radio options :
  const storeStatusOptions = [
    { key: 'غیرفعال', value: '0' },
    { key: 'فعال', value: '1' },
  ];
  const merchantTypeOptions = [
    { key: 'حقیقی', value: '0' },
    { key: 'حقوقی', value: '1' },
  ];
  const vatLicenseOptions = [
    { key: 'دارم', value: '0' },
    { key: 'ندارم', value: '1' },
  ];
  //  initial values
  const initialValues = {
    storeStatus: '',
    merchantCode: '',
    businessCode: '',
    merchantType: '',
    storeName: '',
    vatLicense: '',
  };
  //  onSubmit
  const onSubmit = async (values) => {
    setIsSubmitted(!isSubmitted);
    const userId = merchant.sub;
    const allValues = { ...values, licenseImage, token, userId };
    // CALL THE SERVER
    try {
      const response = await merchantBusinessProfile(allValues);
      const { data } = response;
      toast.success(data.message);
    } catch (ex) {}
  };

  //  validation schema
  const validationSchema = Yup.object({
    storeStatus: Yup.string().required(error.storeStatus),
    merchantCode: Yup.string().required(error.merchantCode),
    businessCode: Yup.string().required(error.businessCode),
    merchantType: Yup.string().required(error.merchantType),
    storeName: Yup.string().required(error.storeName),
    vatLicense: Yup.string().required(error.vatLicense),
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
              <p className={styles.formHint}> {businessForm.businessInfo}</p>
              <Grid item xs={12} md={6}>
                <div className={styles.inputGroup}>
                  <FormikControl
                    control="radio"
                    label={businessForm.storeStatus}
                    name="storeStatus"
                    options={storeStatusOptions}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label={businessForm.merchantCode}
                    name="merchantCode"
                    placeholder = "XGD1456-22"
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label={businessForm.businessCode}
                    name="businessCode"
                    placeholder = "XGD1456-22"
                  />
                  <UploadFiles
                    label={businessForm.licenseImage}
                    hint={businessForm.hintLicenseImage}
                    setUploadedData={setLicenseImage}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormikControl
                  control="radio"
                  label={businessForm.merchantType}
                  name="merchantType"
                  options={merchantTypeOptions}
                />
                <FormikControl
                  control="input"
                  type="text"
                  label={businessForm.storeName}
                  name="storeName"
                  placeholder = "دکوژ"
                />
                <FormikControl
                  control="radio"
                  label={businessForm.vatLicense}
                  name="vatLicense"
                  options={vatLicenseOptions}
                />
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
                  {businessForm.edit}
                </button>
                <button
                  className={styles.submit}
                  disabled={!formik.isValid || isSubmitted}
                  type="submit"
                >
                  {businessForm.saveChanges}
                </button>
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormContainer;
