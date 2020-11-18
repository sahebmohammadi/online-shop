import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormContainer from './FormContainer';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: '#fff',
    flexGrow: 1,
    width: '100%',
  },
}));

const BusinessForm = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <Grid container>
        <Grid item xs={12} container>
          <FormContainer />
        </Grid>
      </Grid>
    </main>
  );
};

export default BusinessForm;
