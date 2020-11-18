import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ToastHint from './Toast';

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: '#fff',
    flexGrow: 1,
    width: '83.33%',
  },
}));

const Content = ({ children }) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Grid container>
        <Grid item xs={12}>
          <ToastHint />
        </Grid>
        <Grid item xs={12} container>
          {children}
        </Grid>
      </Grid>
    </main>
  );
};

export default Content;
