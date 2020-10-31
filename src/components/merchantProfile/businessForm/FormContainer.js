import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import styles from '../form/formikContainer.module.scss';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../../constants';
import FormikControl from '../form/FormikControl';
import UploadFiles from '../form/UploadFiles';
import { getMerchantData } from './../../../../services/getMerchantService';
import { merchantBusinessProfile } from '../../../../services/merchantBusinessProfileService';
import { toast } from 'react-toastify';
const FormContainer = () => {
  // states :
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [licenseImage, setLicenseImage] = useState(null);
  const [token, setToken] = useState();
  const [userId,setUserId] = useState();
  //  Form Contants :
  const { businessForm, error } = constants.merchantBusinessForm;
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
        const {id} = user[0];
        setUserId(id)
        } catch (error) {}
    };
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
    businessCode: '',
    merchantType: '',
    storeName: '',
    vatLicense: '',
  };
  //  onSubmit
  const onSubmit = async (values) => {
    setIsSubmitted(!isSubmitted);
    const merchantCode = userId;
    const allValues = { ...values, licenseImage, token, userId, merchantCode };
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
                    value={userId ? userId : 'XGD1456-22'}
                    placeholder="XGD1456-22"
                    disabled={true}
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label={businessForm.businessCode}
                    name="businessCode"
                    placeholder="XGD1456-22"
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
                  placeholder="دکوژ"
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
                  disabled={!formik.isValid || isSubmitted || !licenseImage}
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
