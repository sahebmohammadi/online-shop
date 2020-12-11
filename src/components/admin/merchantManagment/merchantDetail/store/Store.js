import { useState } from 'react';
import { Formik, Form } from 'formik';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../../../../constants';
import FormikControl from '../../../../merchantProfile/form/FormikControl';
import SelectTags from './SelectTags';
import styles from '../../../../merchantProfile/form/formikContainer.module.scss';
import DisplayImage from 'src/common/DisplayImage';
import CoverDisplayImage from './CoverDisplayImage';
import GalleryDisplayImage from './GalleryDisplayImage';

//  Form Contants :
const {
  managment,
  name,
  about,
  type,
  tag,
  callInfo,
  tel,
  address,
  image,
  logo,
  catalog,
  gallery,
  edit,
  saveChanges,
  error,
} = constants.merchantStore;

const Store = ({ store }) => {
  // props :
  const {
    name: ExName = '',
    about: ExAbout = '',
    phone = '',
    address: ExAddress = '',
    cover: ExCover,
    logo: ExLogo,
    catalogue: ExCatalogue,
    types = '',
    tags = '',
    gallery: ExGallery,
  } = store || {};
  //  initial values
  const initialValues = {
    name: ExName,
    about: ExAbout,
    tel: phone,
    address: ExAddress,
  };

  return (
    <div style={{ padding: '22px 22px' }}>
      {!store ? <Typography>پروفایل کاربری هنوز تایید نشده است</Typography> : null}
      <Formik initialValues={initialValues} enableReinitialize={true}>
        {(formik) => {
          // console.log(formik.values);
          return (
            <Form>
              <Grid item container xs={12}>
                <p className={styles.formHint}> {managment}</p>
                <Grid item xs={12}>
                  <div className={styles.inputGroup}>
                    <FormikControl
                      control="input"
                      type="text"
                      label={name}
                      name="name"
                      value={ExName}
                      disabled={true}
                    />
                    <Grid item xs={12}>
                      <FormikControl
                        control="textarea"
                        type="text"
                        label={about}
                        name="about"
                        value={ExAbout}
                        disabled={true}
                      />
                    </Grid>
                    <SelectTags label={type} defaultValues={types} />
                    <SelectTags defaultValues={tags} label={tag} />
                  </div>
                </Grid>
                <Grid item container xs={12}>
                  <p className={styles.formHint}> {callInfo}</p>
                  <div className={styles.inputGroup}>
                    <Grid item xs={12} md={5}>
                      <FormikControl
                        control="input"
                        type="text"
                        label={tel}
                        name="tel"
                        value={phone}
                        disabled={true}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <FormikControl
                        control="input"
                        type="text"
                        label={address}
                        name="address"
                        value={ExAddress}
                        disabled={true}
                      />
                    </Grid>
                  </div>
                </Grid>
                <Grid item container xs={12}>
                  <p className={styles.formHint}> {image}</p>
                  <CoverDisplayImage imageLink={ExCover} label={image} />
                </Grid>
                <Grid item md={6}>
                  <DisplayImage imageLink={ExLogo} label={logo} />
                </Grid>
                <Grid item md={6}>
                  <DisplayImage imageLink={ExCatalogue} label={catalog} />
                </Grid>
                <Grid item xs={12}>
                  <GalleryDisplayImage gallery={ExGallery} label={gallery} />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Store;
