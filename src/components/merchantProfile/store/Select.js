import { useState } from 'react';
import Select from 'react-select';
import classes from '../form/selectProvinceCity.module.scss';
import Grid from '@material-ui/core/Grid';
import clx from 'classnames';

const SelectComponent = ({ setSelectedValue, label, options }) => {
  const handleChange = (e) => {
    setSelectedValue(e);
    console.log(e);
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
      <Grid item xs={12}>
        <div className={classes.formControl}>
          <label>{label}</label>
          <Select
            instanceId={label}
            styles={style}
            className={clx(classes.select, 'basic-multi-select')}
            placeholder={label}
            options={options}
            onChange={(value) => handleChange(value || [])}
            isMulti
            classNamePrefix="select"
          />
        </div>
      </Grid>
    </>
  );
};

export default SelectComponent;
