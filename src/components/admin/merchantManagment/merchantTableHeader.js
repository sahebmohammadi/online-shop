import React from 'react';
import {Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
const useStyles = makeStyles((theme) => ({
  tableTop: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '25px 41px',
  },
  addingMerchant: {
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

const MerchantTableHeader = () => {
  const classes = useStyles();
  return (
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
  );
};

export default MerchantTableHeader;
