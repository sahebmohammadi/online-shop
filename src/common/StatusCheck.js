import React from 'react';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import classes from './statusCheck.module.scss';
import { Typography } from '@material-ui/core';
import {merchantBusinessForm} from '../../constants';
const StatusCheck = ({ status }) => {
  const {
    inActive,
    pending,
    active,
    storeStatus,
  } = merchantBusinessForm.businessForm;
  const HandleStatus = (status) => {
    switch (status) {
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
      <label>{storeStatus}</label>
      <div className={classes.input}>{HandleStatus(status)}</div>
    </div>
  );
};

export default StatusCheck;
