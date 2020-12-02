import classes from './CoverDisplayImage.module.scss';
const DisplayImage = ({ imageLink, label }) => {
  return (
    <div className={classes.formControl}>
      <label>{label}</label>
      <div className={classes.input}>{imageLink ? <img src={imageLink} /> : null}</div>
    </div>
  );
};

export default DisplayImage;
