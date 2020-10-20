import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import classes from './selectProvinceCity.module.scss';
import Grid from '@material-ui/core/Grid';
import * as constants from '../../../../constants';
import { apiUrl } from '../../../../config.json';
const SelectProvinceCity = ({ setProvince, setCity }) => {
  const [selectStates, setSelectStates] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const [selectCities, setSelectCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [stateId, setStateId] = useState();

  const { merchantForm } = constants.MerchantProfile;

  useEffect(() => {
    geState();
  }, []);
  useEffect(() => {
    getCity(stateId);
  }, [stateId]);

  const geState = async () => {
    try {
      const res = await axios.get(`${apiUrl}/state/get`);
      const { data: stateData } = res.data;
      const { state } = stateData;
      const options = state.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      setSelectStates(options);
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async (stateId) => {
    if (stateId) {
      try {
        const res = await axios.get(`${apiUrl}/city/get?state_id=${stateId}`);
        const { data: cityData } = res.data;
        const { city } = cityData;

        const options = city.map((d) => ({
          value: d.id,
          label: d.name,
        }));
        setSelectCities(options);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeState = (e) => {
    setSelectedState({ id: e.value, name: e.label });
    console.log('selected state', e);
    setProvince(e);
    setStateId(e.value);
    console.log(e.value);
  };
  const handleChangeCity = (e) => {
    setSelectedCity({ id: e.value, name: e.label });
    console.log('selected City', e);
    setCity(e);
    // setStateId(e.value);
  };

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      outline: 'none',
      borderRadius: 0,
      width: '231px',
      height: '37px',
      backgroundColor: 'none',
      // This line disable the blue border
      boxShadow: 'none',
    }),
  };
  return (
    <>
      <Grid item xs={12} md={6}>
        <div className={classes.formControl}>
          <label>{merchantForm.province}</label>
          <Select
            styles={style}
            className={classes.select}
            placeholder="انتخاب استان"
            options={selectStates}
            onChange={handleChangeState}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className={classes.formControl}>
          <label>{merchantForm.city}</label>
          <Select
            styles={style}
            className={classes.select}
            placeholder="انتخاب شهر"
            options={selectCities}
            onChange={handleChangeCity}
          />
        </div>
      </Grid>
    </>
  );
};

export default SelectProvinceCity;
