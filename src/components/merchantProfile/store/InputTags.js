import { WithContext as ReactTags } from 'react-tag-input';
import React, { useState } from 'react';
import classes from './inputTags.module.scss';
const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const InputTags = ({tags,setTags,suggestions}) => {
  // const [tags, setTags] = useState([]);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags((prevState) => [...prevState, tag]);
  };
  const handleDrag =(tag, currPos, newPos)=> {
        // const tags = [...tags];
        // const newTags = tags.slice();

        // newTags.splice(currPos, 1);
        // newTags.splice(newPos, 0, tag);

        // // re-render
        // setTags({ tags: newTags });
    }
    // const handleChange = ()=>{
    //   console.log('')
    // }
  return (
    <div className={classes.formControl}>
      <label>تگ های فروشگاه</label>
      <ReactTags
      classNames={{
        tags: classes.tags,
        tagInput: classes.tagInput,
        tagInputField:classes.tagInputField ,
        selected: classes.selected,
        tag: classes.tag,
        remove: classes.remove,
        suggestions: classes.suggestions,
        activeSuggestion: classes.activeSuggestion
      }}
        inputFieldPosition="top"
        tags={tags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        delimiters={delimiters}
        placeholder = "تگ های فروشگاه"
        // suggestions = {suggestions}
      />
    </div>
  );
};

export default InputTags;
