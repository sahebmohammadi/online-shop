import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import classes from './toast.module.scss';

const ToastHint = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      {open ? (
        <div className = {classes.root}>
          <div className={classes.message}>
            در ابتدا اطلاعات کاربری را کامل وارد کنید و در مرحله بعدی اطلاعات تجاری را وار
            کنید.
          </div>
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </div>
      ) : null}
    </>
  );
};

export default ToastHint;
