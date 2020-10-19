import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ToastHint from './Toast';
import FormikContainer from './Form/FormikContainer';
// Styling
const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: '#fff',
    marginTop: '75px',
    padding: '55px',
    flexGrow: 1,
    width: '83.33%',
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
            <ToastHint/>
        </Grid>
        <Grid item xs={12} container>
            <FormikContainer/>
          {/* <Paper className={classes.paper}>From</Paper> */}
        </Grid>
      </Grid>
    </main>
  );
};

export default Content;
