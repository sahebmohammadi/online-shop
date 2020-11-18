import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ToastHint from './Toast';
import FormikContainer from './Form/FormikContainer';

const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: '#fff',
    flexGrow: 1,
    width: '100%',
  },
  paper: {
    width: '100%',
    padding: '100px',
  },
}));

const Content = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Grid container>
        <Grid item xs={12}>
          <ToastHint />
        </Grid>
        <Grid item xs={12} container>
          <FormikContainer />
        </Grid>
      </Grid>
    </main>
  );
};

export default Content;
