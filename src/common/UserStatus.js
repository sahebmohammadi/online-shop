import React from 'react';
import classes from './userStatus.module.scss';
import { Typography } from '@material-ui/core';
import { merchantBusinessForm } from '../../constants';
const StatusCheck = ({ status }) => {
  const { inActive, pending, active } = merchantBusinessForm.businessForm;
  const HandleStatus = (status) => {
    switch (status) {
      case 0:
        return (
          <>
            <Typography className={classes.font} color="error">
              {inActive}
            </Typography>
          </>
        );
        break;
      case 1:
        return (
          <>
            <Typography className={classes.font} style={{ color: '#f99300' }}>
              {pending}
            </Typography>
          </>
        );
        break;
      case 2:
        return (
          <>
            <Typography className={classes.font} style={{ color: '#44a570' }}>
              {active}
            </Typography>
          </>
        );
        break;
      default:
        return ' ';
        break;
    }
  };
  return <>{HandleStatus(status)}</>;
};

export default StatusCheck;
