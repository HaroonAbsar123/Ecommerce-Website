import React from "react";
import classes from './One.module.css';

function One({ category }) {
  // Capitalize the first letter of the category
  const capitalizedCategory = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.secondContainer}>
        <h2 className={classes.mainHeading}>
          {capitalizedCategory === "Hot" ? "Hot Products" : capitalizedCategory}
        </h2>
      </div>
    </div>
  );
};

export default One;
