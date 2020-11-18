import React, { useState, useEffect } from 'react';
import { getMerchantData } from 'services/getMerchantService';
import { merchantProfileForm } from 'services/merchantProfileService';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../../constants';
import FormikControl from '../form/FormikControl';
import UploadFiles from '../form/UploadFiles';
import { toast } from 'react-toastify';
import Select from './Select';
import InputTags from './InputTags';
import StoreImage from './StoreImageUpload';
import styles from '../form/formikContainer.module.scss';
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
const typeOptions = [
  { value: 1, label: 'نمایشگاه دار' },
  { value: 2, label: 'مواد اولیه' },
  { value: 3, label: ' کوفت' },
];
const tagOptions = [
  { value: 1, label: 'نمایشگاه دار' },
  { value: 2, label: 'مواد اولیه' },
  { value: 3, label: ' کوفت' },
];
const Store = () => {
  // states :
  const [tags, setTags] = useState(null);
  const [types, setTypes] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [storeImage, setStoreImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [catalogImage, setCatalogImage] = useState(null);
  const [galleryImage, setGalleyImage] = useState(null);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  //usEffect : decode token to get user Id
  useEffect(() => {
    getMerchant();
  }, []);
  const getMerchant = async () => {
    try {
      const jwt = localStorage.getItem('token');
      setToken(jwt);
      const { data: responseData } = await getMerchantData(jwt);
      const { user } = responseData.data;
      const { email, id } = user[0];
      setEmail(email);
      setUserId(id);
    } catch (error) {}
  };
  //  initial values
  const initialValues = {
    name: '',
    about: '',
    // type: '',
    // tag: '',
    tel: '',
    address: '',
  };
  //  onSubmit
  const onSubmit = async (values) => {
    setIsSubmitted(!isSubmitted);

    const allValues = {
      ...values,
      userId,
      token,
      storeImage,
      logoImage,
      catalogImage,
      galleryImage,
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
    about: Yup.string().required(error.about),
    tel: Yup.string()
      .required(error.tel)
      .matches(/^[0-9]{8}$/, `${error.telLength}`),
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
              <p className={styles.formHint}> {managment}</p>
              <Grid item xs={12}>
                <div className={styles.inputGroup}>
                  <FormikControl control="input" type="text" label={name} name="name" />
                  <Grid item xs={12}>
                    <FormikControl
                      control="textarea"
                      type="text"
                      label={about}
                      name="about"
                    />
                  </Grid>
                  <Select
                    setSelectedValue={setTypes}
                    label={type}
                    options={typeOptions}
                  />
                  {/* <Select setSelectedValue={setTags} label={tag} options={tagOptions} /> */}
                  <InputTags />
                </div>
              </Grid>
              <Grid item container xs={12}>
                <p className={styles.formHint}> {callInfo}</p>
                <div className={styles.inputGroup}>
                  <Grid item xs={12} md={5}>
                    <FormikControl control="input" type="text" label={tel} name="tel" />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <FormikControl
                      control="input"
                      type="text"
                      label={address}
                      name="address"
                    />
                  </Grid>
                </div>
              </Grid>
              <Grid item container xs={12}>
                <p className={styles.formHint}> {image}</p>
                <StoreImage label={image} hint={image} setUploadedData={setStoreImage} />
              </Grid>
              <Grid item md={6}>
                <UploadFiles label={logo} hint={logo} setUploadedData={setLogoImage} />
              </Grid>
              <Grid item md={6}>
                <UploadFiles
                  label={catalog}
                  hint={catalog}
                  setUploadedData={setCatalogImage}
                />
              </Grid>
              <Grid item xs={6}>
                <UploadFiles
                  label={gallery}
                  hint={gallery}
                  setUploadedData={setGalleyImage}
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
                  {edit}
                </button>
                <button
                  className={styles.submit}
                  disabled={
                    !formik.isValid ||
                    isSubmitted ||
                    !type ||
                    !tag ||
                    !storeImage ||
                    !logoImage ||
                    !catalogImage ||
                    !galleryImage
                  }
                  type="submit"
                >
                  {saveChanges}
                </button>
              </div>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Store;
