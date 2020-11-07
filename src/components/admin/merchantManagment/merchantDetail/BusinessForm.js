import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import styles from '../../../merchantProfile/form/formikContainer.module.scss';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../../../constants';
import FormikControl from '../../../merchantProfile/form/FormikControl';
import StatusCheck from '../../../../common/StatusCheck';
import { getMerchantData } from 'services/getMerchantService';
import DisplayImage from './DisplayImage';
import { Typography } from '@material-ui/core';
const BusinessForm = ({ business }) => {
  const {
    name,
    type,
    business_code : businessCode,
    vat_license : vatLicense,
    license_image,
    status: storeStatus = 0,
  } = business || {};
  // states :
  // const [storeStatus, setStoreStatus] = useState(0);
  //usEffect : decode token to get user Id

  //  Form Contants :
  const { businessForm } = constants.merchantBusinessForm;

  // Radio options :
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
    businessCode: businessCode,
    merchantType: type,
    storeName: name,
    vatLicense: String(vatLicense),
  };

  return (
    <div style={{ paddingRight: '62px' }}>
      {!business ? <Typography>پروفایل کاربری هنوز تایید نشده است</Typography> : null}
      <Formik initialValues={initialValues}>
        {(formik) => (
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
                    value={businessCode ? businessCode : " "}
                    disabled={true}
                  />
                  <FormikControl
                    control="radio"
                    label={businessForm.vatLicense}
                    name="vatLicense"
                    options={vatLicenseOptions}
                  />
                  <DisplayImage
                    label={businessForm.licenseImage}
                    imageLink={license_image}
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
                  value={name ? name : " "}
                  disabled={true}
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BusinessForm;
