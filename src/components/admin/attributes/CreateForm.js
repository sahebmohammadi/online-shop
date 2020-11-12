import React, { useEffect, useState, useRef } from 'react';
import { Formik, Field, Form, FieldArray } from 'formik';
import Select from 'react-select';
import axios from 'axios';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ColorizeOutlinedIcon from '@material-ui/icons/ColorizeOutlined';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import { ChromePicker } from 'react-color';
import classes from 'src/components/admin/attributes/attributes.module.scss';

const CreateForm = () => {
  const [attributeType, setAttributeType] = useState(null);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [colorName, setColorName] = useState('');
  const [colorValue, setColorValue] = useState('');
  const [colorType, setColorType] = useState('color');
  const [image, setImage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const hiddenFileInput = useRef(null);
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

  //  initial values
  const initialValues = {
    name: '',
    type: '',
    unit: '',
    amount: '',
    dropdown: [],
    color: [],
  };

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
                      <input name={`color.value`} value={colorValue} onChange={e => setColorName(e.target.value)}/>
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
                      props.values.color.map((color, index) => (
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
                        </li>
                      ))
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
