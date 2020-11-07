// imports
import React from 'react';
import classes from './backgroundLayout.module.scss';

const backgroundLayout = ({ children }) => {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.logoKooche}>
          <img src="/images/logo-kooche.svg" alt="logo-kooche" />
        </div>
        <div className={classes.form_bg}>{children}</div>
      </div>
    </>
  );
};

export default backgroundLayout;
