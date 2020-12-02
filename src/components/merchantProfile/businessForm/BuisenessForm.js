import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form } from 'formik';
import styles from '../form/formikContainer.module.scss';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../../constants';
import FormikControl from '../form/FormikControl';
import UploadFiles from '../form/UploadFiles';
import { getMerchantData } from 'services/getMerchantService';
import { addMerchantProfile } from 'services/merchantProfileService';
import { toast } from 'react-toastify';
import StatusCheck from '../../../common/StatusCheck';
//  Form Contants :
const { businessForm, error } = constants.merchantBusinessForm;
// Radio options :
const merchantTypeOptions = [
  { key: 'حقیقی', value: '0' },
  { key: 'حقوقی', value: '1' },
];
const vatLicenseOptions = [
  { key: 'دارم', value: '0' },
  { key: 'ندارم', value: '1' },
];

const BusinessForm = ({ merchantProfileData, setMerchantProfileData }) => {
  // PROPS
  const {
    businessName = '',
    businessCode = '',
    merchantType = '0',
    vatLicense = '0',
    licenseImage: ExLicenseImage,
  } = merchantProfileData || {};
  // states :
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [licenseImage, setLicenseImage] = useState(ExLicenseImage);
  const [storeStatus, setStoreStatus] = useState(0);

  // ! COMPONENT WILL UNMOUNT
  useEffect(() => {
    saveMerchantData();
    return () => {
      return saveMerchantData();
    };
  }, [licenseImage]);
  const saveMerchantData = () => {
    const allValues = {
      licenseImage: licenseImage ? licenseImage : ExLicenseImage,
    };
    setMerchantProfileData((prevState) => {
      return { ...prevState, ...allValues };
    });
  };
  //  initial values
  const initialValues = {
    businessCode: businessCode ? businessCode : '',
    businessName: businessName ? businessName : '',
    // merchantType: merchantType == '1' ? '1' : '0',
    merchantType: merchantType ? merchantType : '0',
    // vatLicense: vatLicense == '1' ? '1' : '0',
    vatLicense: vatLicense ? vatLicense : '0',
  };
  //  onSubmit
  const onSubmit = async (values) => {
    setIsSubmitted(!isSubmitted);
    const allValues = { ...values, licenseImage, ...merchantProfileData };
    // CALL THE SERVER
    try {
      const response = await addMerchantProfile(allValues);
      const { data } = response;
      toast.success(data.message);
    } catch (ex) {}
  };
  //   ? validation schema
  const validationSchema = Yup.object({
    merchantType: Yup.string().required(error.merchantType),
    businessName: Yup.string().required(error.businessName),
    vatLicense: Yup.string().required(error.vatLicense),
  });

  //  ? CUSTOM HANDLERS
  const handleChange = (event, setFieldValue, setFieldTouched) => {
    const value = event.target.value;
    const name = event.target.name;
    setMerchantProfileData({ ...merchantProfileData, [event.target.name]: value });
    setFieldValue(name, value);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
        enableReinitialize={true}
      >
        {(formik) => {
      //  console.log(formik.values);
          return (
            <Form>
              <Grid item container xs={12}>
                <p className={styles.formHint}> {businessForm.businessInfo}</p>
                <Grid item xs={12} md={6}>
                  <div className={styles.inputGroup}>
                    <StatusCheck status={storeStatus} />
                    <FormikControl
                      control="input"
                      type="text"
                      label={businessForm.businessCode}
                      name="businessCode"
                      placeholder="XGD1456-22"
                      value={formik.values['businessCode']}
                      onChange={(e) =>
                        handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                      }
                    />
                    <FormikControl
                      control="radio"
                      label={businessForm.vatLicense}
                      name="vatLicense"
                      options={vatLicenseOptions}
                      onChange={(e) =>
                        handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                      }
                    />
                    <UploadFiles
                      label={businessForm.licenseImage}
                      hint={businessForm.hintLicenseImage}
                      setUploadedData={setLicenseImage}
                      initialImage={licenseImage}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormikControl
                    control="radio"
                    label={businessForm.merchantType}
                    name="merchantType"
                    options={merchantTypeOptions}
                    onChange={(e) =>
                      handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                    }
                  />
                  <FormikControl
                    control="input"
                    type="text"
                    label={businessForm.businessName}
                    name="businessName"
                    placeholder="دکوژ"
                    // value={businessName}
                    value={formik.values['businessName']}
                    onChange={(e) =>
                      handleChange(e, formik.setFieldValue, formik.setFieldTouched)
                    }
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
          );
        }}
      </Formik>
    </>
  );
};

export default BusinessForm;
