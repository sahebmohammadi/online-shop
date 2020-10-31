import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'next/link';
const useStyles = makeStyles((theme) => ({
  root: {
    direction : "ltr",
    width: 'auto',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  closeButton: {
    display: 'flex',
    alignItems: 'flex-start !important',
  },
  hintButton: {
    backgroundColor: '#ffa500',
    margin: '5px 50%',
    width: '167px',
  },
  link: {
    textDecoration: 'none',
  },
}));

const ToastHint = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          classes={{ action: classes.closeButton}}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          اگر هنوز اطلاعات تجاری را تکمیل نکرده اید روی لینک زیر کلیک کنید تا وارد صفحه
          مربوط به اطلاعات تجاری شوید.
          <p>
            <Link href="/merchant/businessProfile">
              <a className={classes.link}>
                <Button className={classes.hintButton} variant="contained">
                  تکمیل اطلاعات تجاری
                </Button>
              </a>
            </Link>
          </p>
        </Alert>
      </Collapse>
    </div>
  );
};

export default ToastHint;
