import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Formik, Field, Form } from 'formik';
import Select from 'react-select';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { createAttribute } from 'services/createAttributeService';
import classes from 'src/components/admin/attributes/attributes.module.scss';
import toast from 'react-toastify/dist/react-toastify.cjs.production.min';

const CreateForm = () => {
  const router = useRouter();
  const [attributeType, setAttributeType] = useState(null);
  const [units, setUnits] = useState(null);
  const [types, setTypes] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  let type_options = [];
  let unit_options = [];

  const getTypes = async () => {
    try {
      const res = await axios.get(`${process.env.apiUrl}/types`);
      const stateData = res.data.data.types;
      setTypes(stateData);
    } catch (error) {
      console.log(error);
    }
  };

  const getUnits = async () => {
    try {
      const res = await axios.get(`${process.env.apiUrl}/units`);
      const stateData = res.data.data.units;
      setUnits(stateData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTypes();
    getUnits();
  }, []);

  if (types !== undefined && types !== null) {
    types.map((item) => {
      type_options.push({
        value: item.id,
        label: item.name
      })
    });
  }

  if (units !== undefined && units !== null) {
    units.map((item) => {
      unit_options.push({
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

  //  initial values
  const initialValues = {
    name: '',
    attribute_types_id: '',
    units_id: ''
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
      const response = await createAttribute(allValues);
      const { data } = response;
      toast.success(data.message);
      if (data.message === "success") {
        router.push({
          pathname: "/admin/attributes",
        });
      }
    } catch (err) {
      // Cannot read property 'error' of undefined. solve this problem if you can :) thank you
      toast.error(err?.message);
    }
  };

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
              <Field id="name" name="name" className={classes.input} placeholder="" />
            </div>
            <div>
              <label className={classes.label}>نوع ویژگی</label>
              <Select
                options={type_options}
                placeholder=""
                noOptionsMessage={() => "مقداری وجود ندارد"}
                onChange={(option) => {
                  attributeHandler(option.label);
                  props.setFieldValue('attribute_types_id', option.value);
                }}
              />
            </div>
            {
              attributeType === 'مقدار' ? (
                <div>
                  <label className={classes.label}>واحد ویژگی</label>
                  <Select
                    options={unit_options}
                    placeholder=""
                    noOptionsMessage={() => "مقداری وجود ندارد"}
                    onChange={(option) => {
                      props.setFieldValue('units_id', option.value);
                    }}
                  />
                </div>
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
