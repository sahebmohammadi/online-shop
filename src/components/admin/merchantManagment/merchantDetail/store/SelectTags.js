import { useState } from 'react';
import Select from 'react-select';
import classes from './selectTags.module.scss';
import Grid from '@material-ui/core/Grid';
import clx from 'classnames';

const SelectComponent = ({ label, defaultValues = null }) => {
  const handleChange = (e) => {
    // setSelectedValue(e);
    // console.log(e);
  };
  const defaultTags = defaultValues.map((d) => ({
    value: d.id,
    label: d.title,
  }));
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
            value={defaultTags}
            instanceId={label}
            styles={style}
            className={clx(classes.select, 'basic-multi-select')}
            placeholder={label}
            // options={}
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
