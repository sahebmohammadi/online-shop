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
}) => {
  const [selectStates, setSelectStates] = useState([]);
  const [selectedState, setSelectedState] = useState({});
  const [selectCities, setSelectCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [stateId, setStateId] = useState();

  useEffect(() => {
    geState();
  }, [defaultProvince]);
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeState = (e) => {
    setSelectedState({ value: e.value, label: e.label });
    console.log(e);
    // setProvince(e);
    setStateId(e.value);
  };
  const handleChangeCity = (e) => {
    setSelectedCity({ id: e.value, name: e.label });
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
            // value={selectStates.filter((option) => option.value === 12)}
            // value={selectStates[13]}
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
