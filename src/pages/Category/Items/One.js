import React from "react";
import classes from './One.module.css';
import Plant from '../../../Assets/plant.png'

function One({ category }) {
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
          <img src={Plant} className={classes.image} alt="Plant" />
        </div>
      </div>
    </div>
  );
};

export default One;
