import React, {useState} from "react";
import classes from "./HomeProductCard.module.css";
import { Link } from "react-router-dom";

import dummyImage from '../../Assets/displayImage.png';

function HomeProductCard({ image, title, price, discountedPrice, category, id }) {

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <Link to={`/collection/${category}/${id}`} className="nolinkstyle">
    <div className={classes.productCard}>
        <div className={classes.productImageContainer}>
        {!imageLoaded && <img src={dummyImage} alt={title} className={classes.productImage} />}
          <img
            src={image}
            alt={title} 
            className={`${classes.productImage} ${imageLoaded ? classes.showImage : classes.hideImage}`}
            onLoad={handleImageLoaded}
          />
      </div>
      <h3 className={classes.productTitle}>{title}</h3>
      {discountedPrice !== "" ? (
        <div className={classes.priceContainer}>
          <p className={classes.regularPrice}>${price}</p>
          <p className={classes.discountedPrice}>${discountedPrice}</p>
        </div>
      ) : (
        <p className={classes.productPrice}>${price}</p>
      )}
    </div>
    </Link>
  );
}

export default HomeProductCard;
