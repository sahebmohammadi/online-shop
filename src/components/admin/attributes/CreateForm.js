import React, { useEffect, useState, useRef } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import Select from 'react-select';
import axios from 'axios';
import useLocalStorage from 'src/utils/UseLocalStorage';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import ColorizeOutlinedIcon from '@material-ui/icons/ColorizeOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { ChromePicker } from 'react-color';
import classes from 'src/components/admin/attributes/attributes.module.scss';

const CreateForm = () => {
  const [attributeType, setAttributeType] = useState(null);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colorName, setColorName] = useState('');
  const [colorValue, setColorValue] = useState('');
  const [colorType, setColorType] = useState('color');
  const [image, setImage] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [editedColorValue, setEditedColorValue] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedColor, setSelectedColor] = useLocalStorage('selectedColor', null);
  const [editColorPicker, setEditColorPicker] = useState(false);
  const hiddenFileInput = useRef(null);
  const hiddenEditFileInput = useRef(null);
  const [defaultColor, setDefaultColor] = useState({
    r: '0',
    g: '0',
    b: '0',
    a: '0',
  });

  const attributeHandler = (value) => {
    setAttributeType(value);
  }

  useEffect(() => {
    attributeHandler(attributeType);
  }, [attributeType])

  const colorTypeHandler = (value) => {
    setColorType(value);
  }

  useEffect(() => {
    colorTypeHandler(colorType);
  }, [colorType])

  const colorPickerClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const colorPickerClose = () => {
    setDisplayColorPicker(false);
  };

  const editColorPickerClick = () => {
    setEditColorPicker(!editColorPicker);
  };

  const editColorPickerClose = () => {
    setEditColorPicker(false);
  };

  const uploadFile = ({ target: { files } }) =>{
    let data = new FormData();
    data.append( 'file', files[0] )

    const options = {
      timeout: 300000,
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        if( percent < 100 ){
          setUploadPercentage(percent)
        }
      }
    }

    axios.post("https://run.mocky.io/v3/95f3d373-b9fa-4b07-8943-e516f89be07f", data, options).then(res => {
      setImage(res.config.url);
      setColorValue(res.config.url);
      setUploadPercentage(100);
      setTimeout(() => {
        setUploadPercentage(0);
      }, 1000);
    })
  }

  const editUploadFile = ({ target: { files } }) =>{
    let data = new FormData();
    data.append( 'file', files[0] )

    const options = {
      timeout: 300000,
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        if( percent < 100 ){
          setUploadPercentage(percent)
        }
      }
    }

    axios.post("https://run.mocky.io/v3/95f3d373-b9fa-4b07-8943-e516f89be07f", data, options).then(res => {
      setEditedImage(res.config.url);
      setEditedColorValue(res.config.url);
      setSelectedColor({...selectedColor, value: res.config.url});
      setUploadPercentage(100);
      setTimeout(() => {
        setUploadPercentage(0);
      }, 1000);
    })
  }

  //  initial values
  const initialValues = {
    name: '',
    type: '',
    unit: '',
    amount: '',
    dropdown: [],
    color: [],
  };

  const editModalCloseHandler = () => {
    setShowEditModal(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        return null
      }}
    >
      {props => (
        <Form>
          <div className={classes.topForm}>
            <div>
              <label htmlFor="name" className={classes.label}>نام دسته بندی</label>
              <Field id="name" name="name" className={classes.input} placeholder="" />
            </div>
            <div>
              <label className={classes.label}>نوع</label>
              <Select
                options={[
                  { value: 1, label: 'مقدار', type: 'amount' },
                  { value: 2, label: 'کشویی', type: 'dropdown' },
                  { value: 3, label: 'رنگ', type: 'color' }
                ]}
                placeholder=""
                noOptionsMessage={() => "مقداری وجود ندارد"}
                onChange={(option) => {
                  attributeHandler(option.type);
                  props.setFieldValue('type', option.type);
                }}
              />
            </div>
            {
              attributeType === 'amount' ? (
                <div>
                  <label className={classes.label}>واحد</label>
                  <Select
                    options={[

                    ]}
                    placeholder=""
                    noOptionsMessage={() => "مقداری وجود ندارد"}
                  />
                </div>
              ) : (
                <div>

                </div>
              )
            }
          </div>
          <div className={classes.attributeForm}>
            {
              attributeType === 'dropdown' ? ( // Dropdown Form
                <FieldArray
                  name="dropdown"
                  render={arrayHelpers => (
                    <div>
                      {
                        props.values.dropdown &&
                        props.values.dropdown.length > 0 &&
                        props.values.dropdown.map((dropdown, index) => (
                          <div className={classes.dropdownForm} key={index}>
                            <label className={classes.label}>مقدار {index + 1}</label>
                            <Field name={`dropdown.${index}`} />
                            <Button
                              className={classes.deleteButton}
                              variant="contained"
                              color="secondary"
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              حذف
                            </Button>
                            <Button
                              className={classes.registerButton}
                              variant="contained"
                              color="primary"
                              type="button"
                              onClick={() => {
                                return false;
                              }}
                            >
                              ثبت
                            </Button>
                          </div>
                        ))}

                      <Button
                        className={classes.addInputButton}
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                      >
                        + اضافه کردن مقدار جدید
                      </Button>
                    </div>
                  )}
                />
              ) : attributeType === 'color' ? ( // Color Form
                <React.Fragment>
                  <div className={classes.colorForm}>
                    <div className={classes.colorFormGroup}>
                      <label className={classes.label}>نام</label>
                      <input
                        value={colorName}
                        onChange={e => setColorName(e.target.value)}
                      />
                    </div>
                    <div className={classes.colorFormGroup}>
                      <label className={classes.label}>نوع</label>
                      <Select
                        options={[
                          { value: 1, label: 'کد رنگ', type: 'color' },
                          { value: 2, label: 'عکس', type: 'image' }
                        ]}
                        defaultValue={{label: "کد رنگ", type: "color", value: 1}}
                        isSearchable={false}
                        placeholder=""
                        noOptionsMessage={() => "مقداری وجود ندارد"}
                        onChange={(option) => {
                          colorTypeHandler(option.type);
                        }}
                      />
                    </div>
                    <div className={classes.colorFormGroup}>
                      <label className={classes.label}>مقدار</label>
                      <input
                        name={`color.value`}
                        value={colorValue}
                        onChange={e => setColorName(e.target.value)}
                      />
                    </div>
                    {
                      colorType === "color" ? (
                        <Button
                          className={classes.colorButton}
                          variant="contained"
                          startIcon={<ColorizeOutlinedIcon/>}
                          type="button"
                          onClick={() => {
                            colorPickerClick();
                          }}
                        >
                          انتخاب
                        </Button>
                      ) : (
                        <Button
                          className={classes.photoButton}
                          variant="contained"
                          startIcon={<PublishOutlinedIcon/>}
                          type="button"
                          onClick={() => {
                            hiddenFileInput.current.click();
                          }}
                        >
                          آپلود

                          <input
                            style={{display: 'none'}}
                            type="file"
                            accept="image/*"
                            ref={hiddenFileInput}
                            onChange={uploadFile}
                          />
                          {
                            uploadPercentage !== 0 ? (
                              <CircularProgress variant="static" value={uploadPercentage} size={24} color='secondary' style={{marginRight: '10px'}} />
                            ) : (
                              <React.Fragment />
                            )
                          }
                        </Button>
                      )
                    }
                    {
                      displayColorPicker ?
                        <div className={classes.colorPickerPopover}>
                          <div className={classes.colorPickerCover} onClick={() => {
                            colorPickerClose();
                          }}/>
                          <ChromePicker
                            color={defaultColor}
                            onChange={(color) => setDefaultColor(color)}
                            onChangeComplete={(color) => {
                              setColorValue(color.hex);
                            }}
                          />
                        </div>
                        : null
                    }
                    <Button
                      className={colorName === "" || colorValue === "" ? classes.registerButtonDisabled : classes.registerButton}
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={() => {
                        let obj = {
                          name: colorName,
                          value: colorValue,
                          type: colorType
                        };
                        props.values.color.push(obj);
                        console.log(props.values.color);
                        setColorName("");
                        setColorValue("");
                      }}
                    >
                      ثبت
                    </Button>
                  </div>
                  <ul className={classes.colorList}>
                    {
                      props.values.color &&
                      props.values.color.length > 0 &&
                      props.values.color.map((color, index) => {
                        let colorData = JSON.stringify(color);
                        return (
                        <li key={index}>
                          <div>
                            {color.name}
                          </div>
                          <div>
                            {
                              color.type === 'color' ? (
                                <p>
                                  {color.value}
                                </p>
                                ) : (
                                <p>
                                  تصویر
                                </p>
                              )
                            }
                          </div>
                          {
                            color.type === 'color' ? (
                              <span style={{ backgroundColor: `${color.value}`}} />
                            ) : (
                              <img src={image} />
                            )
                          }
                          <Button
                            className={classes.editButton}
                            variant="contained"
                            type="button"
                            data-color={colorData}
                            onClick={(e) => {
                              let obj = JSON.parse(e.target.getAttribute('data-color'));
                              obj.index = index;
                              setSelectedColor(obj);
                              setShowEditModal(true);
                            }}
                          >
                            ویرایش
                          </Button>
                          <Button
                            className={classes.deleteButton}
                            variant="contained"
                            color="secondary"
                            type="button"
                            onClick={() => {
                              const newArray = [...props.values.color];
                              newArray.splice(index, 1);
                              props.setFieldValue('color', newArray);
                            }}
                          >
                            حذف
                          </Button>
                          <Dialog
                            open={showEditModal}
                            className={classes.editModal}
                            fullWidth={true}
                            maxWidth='lg'
                            onClose={editModalCloseHandler}
                            PaperProps={{
                              style: {
                                position: 'static',
                                overflow: 'visible'
                              },
                            }}
                          >
                            <DialogTitle className={classes.editModalHeader}>
                              <CloseIcon
                                onClick={() => {
                                  setShowEditModal(false);
                                }}
                              />
                            </DialogTitle>
                            <DialogContent className={classes.editModalBody}>
                              <div className={classes.colorForm}>
                                <div className={classes.colorFormGroup}>
                                  <label className={classes.label}>نام</label>
                                  <input
                                    value={selectedColor !== undefined ? selectedColor.name : ''}
                                    onChange={e => {
                                      setSelectedColor({...selectedColor, name: e.target.value});
                                    }}
                                  />
                                </div>
                                <div className={classes.colorFormGroup}>
                                  <label className={classes.label}>نوع</label>
                                  <Select
                                    options={[
                                      { value: 1, label: 'کد رنگ', type: 'color' },
                                      { value: 2, label: 'عکس', type: 'image' }
                                    ]}
                                    defaultValue={selectedColor !== undefined && selectedColor.type === 'color' ? {label: "کد رنگ", type: "color", value: 1} : { value: 2, label: 'عکس', type: 'image' }}
                                    isSearchable={false}
                                    placeholder=""
                                    noOptionsMessage={() => "مقداری وجود ندارد"}
                                    onChange={(option) => {
                                      setSelectedColor({...selectedColor, type: option.type});
                                    }}
                                  />
                                </div>
                                <div className={classes.colorFormGroup}>
                                  <label className={classes.label}>مقدار</label>
                                  <input
                                    name={`color.value`}
                                    value={selectedColor !== undefined && editedColorValue === '' && editedImage === '' ? selectedColor.value : editedImage !== '' ? editedImage : editedColorValue}
                                    onChange={e => {
                                      setSelectedColor({...selectedColor, value: e.target.value});
                                    }}
                                  />
                                </div>
                                {
                                  selectedColor !== undefined && selectedColor.type === "color" ? (
                                    <Button
                                      className={classes.colorButton}
                                      variant="contained"
                                      startIcon={<ColorizeOutlinedIcon/>}
                                      type="button"
                                      onClick={() => {
                                        editColorPickerClick();
                                      }}
                                    >
                                      انتخاب
                                    </Button>
                                  ) : (
                                    <Button
                                      className={classes.photoButton}
                                      variant="contained"
                                      startIcon={<PublishOutlinedIcon/>}
                                      type="button"
                                      onClick={() => {
                                        hiddenEditFileInput.current.click();
                                      }}
                                    >
                                      آپلود

                                      <input
                                        style={{display: 'none'}}
                                        type="file"
                                        accept="image/*"
                                        ref={hiddenEditFileInput}
                                        onChange={editUploadFile}
                                      />
                                      {
                                        uploadPercentage !== 0 ? (
                                          <CircularProgress variant="static" value={uploadPercentage} size={24} color='secondary' style={{marginRight: '10px'}} />
                                        ) : (
                                          <React.Fragment />
                                        )
                                      }
                                    </Button>
                                  )
                                }
                                {
                                  editColorPicker ?
                                    <div className={classes.colorPickerPopover}>
                                      <div className={classes.colorPickerCover} onClick={() => {
                                        editColorPickerClose();
                                      }}/>
                                      <ChromePicker
                                        color={defaultColor}
                                        onChange={(color) => setDefaultColor(color)}
                                        onChangeComplete={color => {
                                          setSelectedColor({...selectedColor, value: color.hex});
                                        }}
                                      />
                                    </div>
                                    : null
                                }
                                <Button
                                  className={selectedColor.name === '' || selectedColor.name === '' ? classes.registerButtonDisabled : classes.registerButton}
                                  variant="contained"
                                  color="primary"
                                  type="button"
                                  onClick={() => {
                                    const {index, ...updatedObj} = selectedColor;
                                    props.setFieldValue(`color[${index}]`, updatedObj);
                                    setShowEditModal(false);
                                  }}
                                >
                                  ذخیره
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </li>
                      )})
                    }
                  </ul>
                </React.Fragment>
              ) : (
                <div>

                </div>
              )
            }
          </div>
          <Button
            className={ props.values.name === "" || props.values.type === "" ? classes.submitButtonDisabled : classes.submitButton}
            variant="contained"
            color="primary"
            type="submit"
          >
            ذخیره
          </Button>
        </Form>
      )}
    </Formik>
)};

export default CreateForm;
