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
import { addAttributeValue } from 'services/addAttributeValueSevice';
import classes from 'src/components/admin/attributes/attributes.module.scss';

const EditForm = (data) => {
  const [attributeType, setAttributeType] = useState(null);
  const [types, setTypes] = useState(null);
  const [units, setUnits] = useState(null);
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hiddenFileInput = useRef(null);
  const hiddenEditFileInput = useRef(null);
  const [defaultColor, setDefaultColor] = useState({
    r: '0',
    g: '0',
    b: '0',
    a: '0',
  });

  let attributeInfo;
  let type_options = [];

  const getTypes = async () => {
    try {
      const res = await axios.get(`${process.env.apiUrl}/types`);
      const stateData = res.data.data.types;
      setTypes(stateData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTypes();
  }, []);

  if (types !== undefined && types !== null) {
    types.map((item) => {
      type_options.push({
        value: item.id,
        label: item.name
      })
    });
  }

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
    const token = localStorage.getItem('token');
    let data = new FormData();
    data.append( 'gallery', files[0] );

    const options = {
      timeout: 300000,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        if( percent < 100 ){
          setUploadPercentage(percent)
        }
      }
    }

    axios.post(`${process.env.apiUrl}/uploader/image`, data, options).then(res => {
      setImage(res.data.data.image.url);
      setColorValue(res.data.data.image.url);
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

  attributeInfo = data.data.attribute;

  //  initial values
  const initialValues = {
    name: '',
    main_attribute_id: attributeInfo !== undefined && attributeInfo !== null ? Number(attributeInfo.id) : '',
    value: '',
    image_id: '',
  };

  const onSubmit = async (values) => {
    setIsSubmitted(!isSubmitted);

    const token = localStorage.getItem('token');

    const allValues = {
      ...values,
      token
    };
    // CALL THE SERVER
    try {
      const response = await addAttributeValue(allValues);
      const { data } = response;
      toast.success(data.message);
    } catch (ex) {}
  };

  const editModalCloseHandler = () => {
    setShowEditModal(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {props => (
        <Form>
          <div className={classes.topForm}>
            <div>
              <label htmlFor="name" className={classes.label}>نام ویژگی</label>
              <Field readOnly value={attributeInfo !== undefined && attributeInfo !== null ? attributeInfo.name : ''} id="name" name="name" className={classes.input} placeholder="" />
            </div>
            <div>
              <label className={classes.label}>نوع ویژگی</label>
              <Field readOnly value={attributeInfo !== undefined && attributeInfo !== null ? attributeInfo.type.name : ''} id="type" name="type" className={classes.input} placeholder="" />
            </div>
            {
              attributeInfo !== undefined && attributeInfo !== null && attributeInfo.type.name === 'مقدار' ? (
                <div>
                  <label className={classes.label}>واحد ویژگی</label>
                  <Field readOnly value={attributeInfo !== undefined && attributeInfo !== null ? attributeInfo.unit.name : ''} id="type" name="type" className={classes.input} placeholder="" />
                </div>
              ) : (
                <React.Fragment />
              )
            }
          </div>
          <div className={classes.attributeForm}>
            {
              attributeInfo !== undefined && attributeInfo !== null && attributeInfo.type.name === 'کشویی' ? ( // Dropdown Form
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
                            <Field
                              name={`dropdown.${index}`}
                              value={props.values.value}
                              onChange={e => {
                                return false;
                              }}
                            />
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
                              type="submit"
                              onClick={() => {
                                return false
                              }}
                            >
                              ثبت
                            </Button>
                          </div>
                        ))}

                      <Button
                        className={classes.addInputButton}
                        type="button"
                        onClick={() => {
                          arrayHelpers.push('');
                        }}
                      >
                        + اضافه کردن مقدار جدید
                      </Button>
                    </div>
                  )}
                />
              ) : attributeInfo !== undefined && attributeInfo !== null && attributeInfo.type.name === 'رنگ' ? ( // Color Form
                <React.Fragment>
                  <div className={classes.colorForm}>
                    <div className={classes.colorFormGroup}>
                      <label className={classes.label}>نام</label>
                      <input
                        value={props.values.name}
                        onChange={e => {
                          props.setFieldValue('name', e.target.value);
                          if (attributeInfo !== undefined && attributeInfo !== null) {
                            props.setFieldValue('main_attribute_id', Number(attributeInfo.id))
                          }
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
                        defaultValue={{label: "کد رنگ", type: "color", value: 1}}
                        isSearchable={false}
                        placeholder=""
                        noOptionsMessage={() => "مقداری وجود ندارد"}
                        onChange={(option) => {
                          colorTypeHandler(option.type);
                        }}
                      />
                    </div>
                    {
                      colorType === 'color' ? (
                        <div className={classes.colorFormGroup}>
                          <label className={classes.label}>مقدار</label>
                          <input
                            name={`value`}
                            value={props.values.value}
                            onChange={e => {
                              props.setFieldValue('value', e.target.value);
                              if (attributeInfo !== undefined && attributeInfo !== null) {
                                props.setFieldValue('main_attribute_id', Number(attributeInfo.id))
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className={classes.colorFormGroup}>
                          <label className={classes.label}>مقدار</label>
                          <input
                            name={`image_id`}
                            value={image !== '' ? image : props.values.image_id}
                            onChange={e => {
                              props.setFieldValue('image_id', e.target.value);
                              if (attributeInfo !== undefined && attributeInfo !== null) {
                                props.setFieldValue('main_attribute_id', Number(attributeInfo.id))
                              }
                            }}
                          />
                        </div>
                      )
                    }
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
                              props.setFieldValue('value', color.hex);
                              if (attributeInfo !== undefined && attributeInfo !== null) {
                                props.setFieldValue('main_attribute_id', Number(attributeInfo.id))
                              }
                            }}
                          />
                        </div>
                        : null
                    }
                    <Button
                      className={props.values.name === "" ? classes.registerButtonDisabled : classes.registerButton}
                      variant="contained"
                      color="primary"
                      type="submit"
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
            className={ props.values.units_id === "" ? classes.submitButtonHidden : classes.submitButton}
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

export default EditForm;
