import React, { useState } from "react";
import classes from './One.module.css';
import Plant from '../../../Assets/plant.png'

function One({ category }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  // Capitalize the first letter of the category
  const capitalizedCategory = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.secondContainer}>
        <div style={{flex: 1}}>
        <h2 className={classes.mainHeading}>
          {capitalizedCategory === "Hot" ? "Hot Products" : capitalizedCategory}
        </h2>
        </div>

        <div style={{transform: 'translateY(-6rem)', flex: 1}}>
          <img style={{display: imageLoaded ? "inherit" : 'none'}} onLoad={() => setImageLoaded(true)}  src={Plant} className={classes.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default One;
