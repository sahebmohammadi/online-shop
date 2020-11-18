import { DropzoneArea } from 'material-ui-dropzone';
import classes from './storeImageUpload.module.scss';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  overrides: {
    MuiDropzonePreviewList: {
      image: {
        maxWidth: 'none',
        position: 'absolute',
        top: '-72px',
        right: '31px',
        width: '60vw',
        height: '259px',
      },
      imageContainer: {
        marginTop: '10px',
      },
    },
    previewGrid: {
      marginTop: '30px',
    },
    MuiDropzoneArea: {
      root: {
        minHeight: 'none',
        borderRadius: '10px',
        border: 'dashed  2px #707070',
        backgroundColor: '#f0f0f0',
        width: '98%',
        height: '259px !important',
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

const UploadFiles = ({ label, hint, setUploadedData }) => {
  const handleChange = (files) => {
    setUploadedData(files[0]);
  };
  const icon = () => <img src="/images/uploadIcon.svg" alt="uploadIcon" />;
  const HandleGetFileAddedMessage = (files) => {
    return `${files} با موفقیت بار گذاری شد`;
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
          <div className={classes.uploadContainer}>
            <DropzoneArea
              showPreviewsInDropzone={true}
              // showPreviews={true}
              variant="default"
              previewText=""
              previewGridClasses={{ container: 'previewGrid' }}
              showFileNames={true}
              filesLimit={1}
              dropzoneText={hint}
              acceptedFiles={['image/*']}
              onChange={(files) => handleChange(files)}
              Icon={icon}
              getFileAddedMessage={HandleGetFileAddedMessage}
              getFileRemovedMessage={HandleGetFileRemovedMessage}
            />
          </div>
        </div>
      </MuiThemeProvider>
    </>
  );
};

export default UploadFiles;
