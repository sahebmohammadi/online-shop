import React from 'react';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import classes from './storeStatus.module.scss';
import { Typography } from '@material-ui/core';
import {merchantBusinessForm} from '../../../../constants';
const SwitchStoreStatus = ({ storeStatus }) => {
  const {
    inActive,
    pending,
    active,
    storeStatus: status,
  } = merchantBusinessForm.businessForm;
  const HandleStoreStatus = (storeStatus) => {
    switch (storeStatus) {
      case 0:
        return (
          <>
            <Brightness1Icon color="error" />
            <Typography color="error">{inActive}</Typography>
          </>
        );
        break;
      case 1:
        return (
          <>
            <Brightness1Icon style={{ color: '#ffa500' }} />
            <Typography style={{ color: '#ffa500' }}>{pending}</Typography>
          </>
        );
        break;
      case 2:
        return (
          <>
            <Brightness1Icon style={{ color: 'green' }} />
            <Typography style={{ color: 'green' }}>{active}</Typography>
          </>
        );
        break;
      default:
        return ' ';
        break;
    }
  };
  return (
    <div className={classes.formControl}>
      <label>{status}</label>
      <div className={classes.input}>{HandleStoreStatus(storeStatus)}</div>
    </div>
  );
};

export default SwitchStoreStatus;
