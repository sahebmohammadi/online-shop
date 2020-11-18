import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  content: {
    backgroundColor: '#fff',
    flexGrow: 1,
    width: '100%',
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
