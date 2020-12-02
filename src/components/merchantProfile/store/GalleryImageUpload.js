import { DropzoneArea } from 'material-ui-dropzone';
import classes from './GalleryImageUpload.module.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { imageUploader } from 'services/imageUploaderService';
const theme = createMuiTheme({
  overrides: {
    MuiGrid: {
      // width :'100%',
      container: {
        width: '50vw !important',
        padding: '10px !important',
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
      },
    },
    MuiDropzonePreviewList: {
      // width: '100%',
      image: {
        maxWidth: 'none',
        position: 'relative',
        // top: '52px',
        // right: '31px',
        width: '150px',
        height: '104px',
      },
      imageContainer: {
        marginTop: '10px',
        // padding: '0 10px'
        width: '99vw !important',
        display: 'flex',
        flexWrap: 'nowrap',
        boxSizing: 'border-box',
      },
    },
    previewGrid: {
      // marginTop: '30px',
    },
    MuiDropzoneArea: {
      root: {
        minHeight: 'none',
        borderRadius: '10px',
        border: 'dashed  2px #707070',
        backgroundColor: '#f0f0f0',
        width: '184px',
        height: '104px !important',
        opacity: '0.5',
      },
      text: {
        margin: '18px 0 !important',
      },
    },
    MuiTypography: {
      h5: {
        fontSize: '12px !important',
        fontFamily: 'Shabnam',
      },
    },
    MuiDropzoneSnackbar: {
      errorAlert: {
        backgroundColor: '#efefef',
        color: 'red',
      },
      successAlert: {
        backgroundColor: 'green',
        color: '#fff',
      },
    },
  },
});

let i = 0;
const GalleryImageUpload = ({ label, hint, setUploadedData, gallery }) => {
  const handleChange = (files) => {
    console.log(i);
    if (files[i]) {
      postGalleryImage(files[i]);
      i = i + 1;
    }
  };
  const handleDelete = (files) => {};
  const postGalleryImage = async (uploadedImage) => {
    try {
      const token = localStorage.getItem('token');
      const values = { token: token, galleryImage: uploadedImage };
      const { data: responseData } = await imageUploader(values);
      const { image } = responseData.data;
      setUploadedData((prevState) => {
        return [...prevState, image.id];
      });
    } catch (error) {}
  };

  const icon = () => <img src="/images/uploadIcon.svg" alt="uploadIcon" />;
  const HandleGetFileAddedMessage = (files) => {
    return `${files} با موفقیت بار گذاری شد`;
    [];
  };
  const HandleGetFileRemovedMessage = (files) => {
    return `${files} با موفقیت حذف شد`;
  };

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <div className={classes.formControl}>
        <label>
            {label} <span style={{ color: 'red !important' }}>*</span>
          </label>
          {/* {typeof initialImage === 'string' ? (
            <div className={classes.exImage}>
              <img src={initialImage} alt=""></img>
            </div>
          ) : null} */}

          <div className={classes.uploadContainer}>
            <DropzoneArea
              showPreviewsInDropzone={false}
              showPreviews={true}
              variant="default"
              previewText=""
              previewGridClasses={{ container: 'previewGrid' }}
              showFileNames={true}
              filesLimit={6}
              dropzoneText={hint}
              acceptedFiles={['image/*']}
              onChange={(files) => handleChange(files)}
              onDelete={(files) => handleDelete(files)}
              Icon={icon}
              getFileAddedMessage={HandleGetFileAddedMessage}
              getFileRemovedMessage={HandleGetFileRemovedMessage}
              // initialFiles={initialImage ? [initialImage] : null}
            />
          </div>
         {/* <label></label> */}
          <div className={classes.container}>
        {gallery &&
          gallery.map((item) => {
            return (
              <div className={classes.input}>
                {gallery ? <img src={item.url} /> : null}
              </div>
            );
          })}
      </div>
        </div>
      </MuiThemeProvider>
    </>
  );
};

export default GalleryImageUpload;
