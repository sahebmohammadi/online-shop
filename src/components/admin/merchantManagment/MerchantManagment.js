import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MerchantTable from './MerchantTable';
import Link from 'next/link';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: '#fff',
    margin: '110px 35px',
    flexGrow: 1,
    width: '83.33%',
  },
  paper: {
    width: '100%',
    padding: '100px',
  },
  merchantManagment: {
    width: '100%',
    height: '580px',
    borderRadius: '30px',
    boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.05)',
    border: 'solid 0.5px #e8e8e8',
    backgroundColor: '#ffffff',
  },
  tableTop: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '25px 41px',
  },
  addingMerchant: {
    // width: '240px !important',
    cursor: 'pointer',
    padding: '15px 5px',
    height: '39px',
    borderRadius: '10px',
    boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.05)',
    border: 'solid 0.5px #e8e8e8',
    backgroundColor: '#052971',
    display: 'flex',
    alignItems: 'center',
  },
}));

const MerchantManagment = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Grid container>
        <Grid item xs={12} container>
          <div className={classes.merchantManagment}>
            <div className={classes.tableTop}>
              <Typography style={{ fontSize: '20px' }}>مدیریت پیشه وران</Typography>
              <Link href="#">
                <div className={classes.addingMerchant}>
                  <AddRoundedIcon style={{ color: '#ffffff' }} />
                  <Typography style={{ fontSize: '15px', color: '#fff' }}>
                    اضافه کردن پیشه ور
                  </Typography>
                </div>
              </Link>
            </div>
            <MerchantTable />
          </div>
        </Grid>
      </Grid>
    </main>
  );
};

export default MerchantManagment;
