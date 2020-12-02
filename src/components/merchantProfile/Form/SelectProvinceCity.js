import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import classes from './selectProvinceCity.module.scss';
import Grid from '@material-ui/core/Grid';

const SelectProvinceCity = ({
  setCity,
  cityLabel,
  provinceLabel,
  defaultProvince,
  defaultCityId,
}) => {
  const [selectStates, setSelectStates] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const [selectCities, setSelectCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [stateId, setStateId] = useState();

  useEffect(() => {
    geState();
    getDefaultCity(defaultProvince);
  }, [defaultProvince, defaultCityId]);
  // ? realize default city
  const getDefaultCity = async (id) => {
    if (id) {
      try {
        const res = await axios.get(`${process.env.apiUrl}/city/get?state_id=${id}`);
        const { data: cityData } = res.data;
        const { city } = cityData;
        const options = city.map((d) => ({
          value: d.id,
          label: d.name,
        }));
        setSelectCities(options);
        if (defaultCityId) {
          const ExCity = options.find(({ value }) => value === defaultCityId);
          console.log('ex city ...');
          setSelectedCity({
            value: defaultCityId,
            label: ExCity.label,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCity(stateId);
  }, [stateId]);

  const geState = async () => {
    try {
      const res = await axios.get(`${process.env.apiUrl}/state/get`);
      const { data: stateData } = res.data;
      const { state } = stateData;
      const options = state.map((d) => ({
        value: d.id,
        label: d.name,
      }));
      setSelectStates(options);
      if (defaultProvince) {
        setSelectedState({
          value: defaultProvince,
          label: options[defaultProvince - 1].label,
        });
        setStateId(defaultProvince);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async (stateId) => {
    if (stateId) {
      try {
        const res = await axios.get(`${process.env.apiUrl}/city/get?state_id=${stateId}`);
        const { data: cityData } = res.data;
        const { city } = cityData;
        const options = city.map((d) => ({
          value: d.id,
          label: d.name,
        }));
        setSelectCities(options);
        // if (defaultCity) {
        //   const city = options.find(({ value }) => value === defaultCity);
        //   console.log('city', city);
        //   setSelectedCity({
        //     value: city.value,
        //     label: city.label,
        //   });
        // }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeState = (e) => {
    setSelectedState({ value: e.value, label: e.label });
    setStateId(e.value);
  };
  const handleChangeCity = (e) => {
    setSelectedCity({ value: e.value, label: e.label });
    setCity(e.value);
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
          <label>{provinceLabel}</label>
          <Select
            value={selectedState}
            instanceId={provinceLabel}
            styles={style}
            className={classes.select}
            placeholder={provinceLabel}
            options={selectStates}
            onChange={handleChangeState}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className={classes.formControl}>
          <label>{cityLabel}</label>
          <Select
            value={selectedCity}
            instanceId={cityLabel}
            styles={style}
            className={classes.select}
            placeholder={cityLabel}
            options={selectCities}
            onChange={handleChangeCity}
          />
        </div>
      </Grid>
    </>
  );
};

export default SelectProvinceCity;
