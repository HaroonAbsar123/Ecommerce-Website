import React, {useState} from "react";
import classes from "./ProductCard.module.css";
import { NavLink } from "react-router-dom";
import dummyImage from '../../Assets/displayImage.png';

function ProductCard({ image, title, price, discountedPrice, category, id }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <NavLink to={`/collection/${category}/${id}`} className={classes.nav} >
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
      {discountedPrice ? (
        <div className={classes.priceContainer}>
          <p className={classes.regularPrice}>${price}</p>
          <p className={classes.discountedPrice}>${discountedPrice}</p>
        </div>
      ) : (
        <p className={classes.productPrice}>${price}</p>
      )}
    </div>
    </NavLink>
  );
}

export default ProductCard;
