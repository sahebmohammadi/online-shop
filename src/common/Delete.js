import React from 'react';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import classes from './delete.module.scss'
const DeleteComponent = (props) => {
  return (
      <div className ={classes.delete} onClick={props.onDelete}>
        <span>حذف</span>
        <DeleteForeverOutlinedIcon color="error" />
      </div>
  );
};

export default DeleteComponent;
