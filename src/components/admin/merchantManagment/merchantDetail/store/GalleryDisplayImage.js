import classes from './galleryDisplayImage.module.scss';
const GalleryDisplayImage = ({ gallery, label }) => {
  return (
    <div className={classes.formControl}>
      <label>{label}</label>
      <div className={classes.container}>
        {gallery &&
          gallery.map((item) => {
            return (
              <div className={classes.input}>
                {gallery ? <img src={item.url} /> : null}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GalleryDisplayImage;
