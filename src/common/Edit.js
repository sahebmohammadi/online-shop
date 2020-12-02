import React from 'react';
import EditIcon from '@material-ui/icons/EditOutlined';
import classes from 'src/common/edit.module.scss'
const EditComponent = (props) => {
  return (
      <div className ={classes.edit} onClick={props.onClick}>
        <span>ویرایش</span>
        <EditIcon />
      </div>
  );
};

export default EditComponent;
