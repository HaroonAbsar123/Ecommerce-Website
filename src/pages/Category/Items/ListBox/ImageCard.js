import React, { useState } from "react";
import classes from "./ImageCard.module.css";
import { Link } from "react-router-dom";

import dummyImage from '../../../../Assets/displayImage.png';

function ImageCard({ image, title, price, discountedPrice, id, category }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <Link to={`/collection/${category}/${id}`} className="nolinkstyle"  >
      <div className={classes.productCard}>
        <div className={classes.productImage}>
          {!imageLoaded && <img src={dummyImage} alt={title} className={classes.productImage} />}
          <img
            src={image}
            alt={price}
            className={`${classes.productImage} ${imageLoaded ? classes.showImage : classes.hideImage}`}
            onLoad={handleImageLoaded}
          />
        </div>
        <div className={classes.textContainer}>
          <h2 className="title" style={{ marginBottom: "0rem" }}>{title}</h2>
          {discountedPrice ? (
            <div className={classes.priceContainer}>
              <p className={classes.regularPrice}>${price}</p>
              <p className={classes.discountedPrice}>${discountedPrice}</p>
            </div>
          ) : (
            <p className={classes.productPrice}>${price}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ImageCard;
