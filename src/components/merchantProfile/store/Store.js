import React, { useState, useEffect } from 'react';
import { getMerchantData } from 'services/getMerchantService';
import { addMerchantStore } from 'services/merchantStoreService';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../../constants';
import FormikControl from '../form/FormikControl';
import UploadFiles from '../form/UploadFiles';
import { toast } from 'react-toastify';
import SelectTags from 'src/common/SelectTags';
import StoreImageUpload from './StoreImageUpload';
import GalleryImageUpload from './GalleryImageUpload';
import styles from '../form/formikContainer.module.scss';
import { getTags } from 'services/getTagService';
import { getTypes } from 'services/getStoreTypeService';
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
// const myGallery = [
//   { id: 61, url: 'http://api.decooj.com//storage/gallery/phpPox9ac.png' },
//   { id: 62, url: 'http://api.decooj.com//storage/gallery/phpAppdB3.png' },
//   { id: 63, url: 'http://api.decooj.com//storage/gallery/phpEZlD6s.jpg' },
//   { id: 64, url: 'http://api.decooj.com//storage/gallery/phpyD1QU0.jpg' },
// ];
const Store = () => {
  // ? get store tags
  const getStoreTags = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data: responseData } = await getTags(token, 'store');
      const { tag } = responseData.data;
      const options = tag.map((tag) => ({
        value: tag.id,
        label: tag.title,
      }));
      setTagOptions(options);
    } catch (error) {}
  };
  // ? get store tags
  const getStoreTypes = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data: responseData } = await getTypes(token);
      const { user } = responseData.data;
      const options = user.map((item) => ({
        value: item.id,
        label: item.title,
      }));
      setTypeOptions(options);
    } catch (error) {}
  };
  // ? GET MERCHANT SOTRE DATA
  useEffect(() => {
    getMerchant();
    getStoreTags();
    getStoreTypes();
  }, []);
  const getMerchant = async () => {
    try {
      const token = localStorage.getItem('token');
      setToken(token);
      const { data: responseData } = await getMerchantData(token);
      const { user } = responseData.data;
      const { id, store } = user;
      setStore(store);
      setUserId(id);
    } catch (error) {}
  };
  // states :
  const [tagOptions, setTagOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [store, setStore] = useState({});
  const [storeTypes, setStoreTypes] = useState(null);
  const [tags, setTags] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    name: exName = '',
    about: exAbout = '',
    phone: exPhone = '',
    address: exAddress = '',
    cover: exCover,
    logo: exLogo,
    catalogue: exCatalog,
    types: exTypes = '',
    // tags = '',
    gallery: exGallery =[],
  } = store || {};
  const [storeImage, setStoreImage] = useState(exCover);
  const [logoImage, setLogoImage] = useState(exLogo);
  const [catalogImage, setCatalogImage] = useState(exCatalog);
  const [galleryImage, setGalleyImage] = useState([]);
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  // ?
  useEffect(() => {
    setStoreImage(exCover);
    setLogoImage(exLogo);
    setCatalogImage(exCatalog);
    setGalleyImage(exGallery);
  }, [store]);
  //  initial values
  const initialValues = {
    name: exName,
    about: exAbout,
    tel: exPhone,
    address: exAddress,
  };

  //  onSubmit
  const onSubmit = async (values) => {
    setIsSubmitted(!isSubmitted);
    let tagsId = tags.map((a) => a.value);
    let storeTypesId = storeTypes.map(a => a.value);
    const allValues = {
      ...values,
      tagsId,
      storeTypesId,
      userId,
      token,
      storeImage,
      logoImage,
      catalogImage,
      galleryImage,
    };
    // CALL THE SERVER
    try {
      const response = await addMerchantStore(allValues);
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
      .matches(/^[0-9]{11}$/, `${error.telLength}`),
    address: Yup.string().required(error.address),
  });

  const handleChange = (event, setFieldValue) => {
    const value = event.target.value;
    const name = event.target.name;
    // setFormikStoreData({ ...formikStoreData, [event.target.name]: value });
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
                      value={formik.values['name']}
                      onChange={(e) => handleChange(e, formik.setFieldValue)}
                    />
                    <Grid item xs={12}>
                      <FormikControl
                        control="textarea"
                        type="text"
                        label={about}
                        name="about"
                        value={formik.values['about']}
                        onChange={(e) => handleChange(e, formik.setFieldValue)}
                      />
                    </Grid>
                    <SelectTags
                      setSelectedValue={setStoreTypes}
                      label={type}
                      options={typeOptions}
                    />
                    <SelectTags
                      setSelectedValue={setTags}
                      label={tag}
                      options={tagOptions}
                    />
                    {/* <InputTags tags={tags} setTags={setTags} suggestions = {tagSuggestions} /> */}
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
                        value={formik.values['tel']}
                        onChange={(e) => handleChange(e, formik.setFieldValue)}
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <FormikControl
                        control="input"
                        type="text"
                        label={address}
                        name="address"
                        value={formik.values['address']}
                        onChange={(e) => handleChange(e, formik.setFieldValue)}
                      />
                    </Grid>
                  </div>
                </Grid>
                <Grid item container xs={12}>
                  <p className={styles.formHint}> {image}</p>
                  <StoreImageUpload
                    label={image}
                    hint={image}
                    setUploadedData={setStoreImage}
                    initialImage={storeImage}
                  />
                </Grid>
                <Grid item md={6}>
                  <UploadFiles
                    label={logo}
                    hint={logo}
                    setUploadedData={setLogoImage}
                    initialImage={logoImage}
                  />
                </Grid>
                <Grid item md={6}>
                  <UploadFiles
                    label={catalog}
                    hint={catalog}
                    setUploadedData={setCatalogImage}
                    initialImage={catalogImage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <GalleryImageUpload
                    label={gallery}
                    hint={gallery}
                    setUploadedData={setGalleyImage}
                    gallery={exGallery}
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
          );
        }}
      </Formik>
    </>
  );
};

export default Store;
