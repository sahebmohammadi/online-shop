import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({ open, onClose, message, setMessage, onDelete }) {
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"> علت حذف یا غیرفعال کردن </DialogTitle>
        <DialogContent>
          <DialogContentText>
            لطفا برای حذف یا غیر فعال کردن پیشه ور علت خود را به صورت مختصر وارد کنید
          </DialogContentText>
          <TextField
            value={message}
            onChange={handleChange}
            autoFocus
            margin="dense"
            id="name"
            label="علت حذف پیشه ور"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            لغو
          </Button>
          <Button onClick={onDelete} color="primary">
            ثبت علت
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
