import React from "react";
import classes from "./ImageCard.module.css";
import { Link } from "react-router-dom";

function ImageCard({ image,title, price, discountedPrice, id, category }) {
  return (
    <Link to={`/collection/${category}/${id}`} className="nolinkstyle"  >
    <div className={classes.productCard}>
      <div className={classes.productImage}>

      
      <img src={image} alt={price} className={classes.productImage} />
      </div>

      <div className={classes.textContainer}>
        <h2 className="title" style={{ marginBottom: "0rem"}}>{title}</h2>
        {discountedPrice ? (
        <div className={classes.priceContainer}>
          <p className={classes.regularPrice} >{price}</p>
          <p className={classes.discountedPrice}>{discountedPrice}</p>
        </div>
      ) : (
        <p className={classes.productPrice}>{price}</p>
      )}
      </div>
    </div>
    </Link>
  );
}

export default ImageCard;
