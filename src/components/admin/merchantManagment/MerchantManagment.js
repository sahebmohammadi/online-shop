import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  merchantManagment: {
    width: '100%',
    // height: '580px',
    minHeight: '239px',
    borderRadius: '30px',
    boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.05)',
    border: 'solid 0.5px #e8e8e8',
    backgroundColor: '#ffffff',
    marginBottom : "45px"
  },
}));

const MerchantManagment = ({ children }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} container>
        <div className={classes.merchantManagment}>{children}</div>
      </Grid>
    </Grid>
  );
};

export default MerchantManagment;
