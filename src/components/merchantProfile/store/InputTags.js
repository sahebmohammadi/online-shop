import { WithContext as ReactTags } from 'react-tag-input';
import React, { useState } from 'react';
import classes from './inputTags.module.scss';
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const InputTags = () => {
  const [tags, setTags] = useState([]);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags((prevState) => [...prevState, tag]);
  };
  return (
    <div className={classes.formControl}>
      <label>تگ های فروشگاه</label>
      <ReactTags
        // className={classes.input}
        customInputContainerStyle = {classes.input}
        customContainerStyle = {classes.input}
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
      />
    </div>
  );
};

export default InputTags;
