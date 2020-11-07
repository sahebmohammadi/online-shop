import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: '#fff',
    margin: '110px 35px',
    flexGrow: 1,
    width: '83.33%',
  },
}));

const Content = ({children}) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      {children}
    </main>
  );
};

export default Content;
