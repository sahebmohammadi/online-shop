import React from 'react';
import { Formik, Form } from 'formik';
import styles from '../../../merchantProfile/form/formikContainer.module.scss';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../../../constants';
import FormikControl from '../../../merchantProfile/form/FormikControl';
import StatusCheck from '../../../../common/StatusCheck';
import { getMerchantData } from 'services/getMerchantService';
import DisplayImage from '../../../../common/DisplayImage';

const BusinessForm = ({ profile }) => {
  const {
    business_name : businessName,
    type : merchantType,
    business_code : businessCode,
    vat_license : vatLicense,
    license_image,
    status: storeStatus = 0,
  } = profile || {};

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
    merchantType:merchantType,
    businessName: businessName,
    vatLicense: String(vatLicense),
  };

  return (
    <div style={{ paddingRight: '62px' }}>
      <Formik initialValues={initialValues}>
        {(formik) => (
          <Form>
            <Grid item container xs={12}>
              <p className={styles.formHint}> {businessForm.businessInfo}</p>
              <Grid item xs={12} md={6}>
                <div className={styles.inputGroup}>
                  {/* <StatusCheck status={storeStatus} /> */}
                  <FormikControl
                    control="input"
                    type="text"
                    label={businessForm.businessCode}
                    name="businessCode"
                    placeholder="XGD1456-22"
                    value={businessCode ? businessCode : ' '}
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
                  label={businessForm.businessName}
                  name="businessName"
                  placeholder="دکوژ"
                  value={businessName ? businessName : " "}
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
