import React from "react";
import classes from "./HomeProductCard.module.css";
import { Link } from "react-router-dom";

function HomeProductCard({ image, title, price, discountedPrice, category, id }) {
  return (
    <Link to={`/collection/${category}/${id}`} className="nolinkstyle">
    <div className={classes.productCard}>
        <div className={classes.productImageContainer}>
      <img src={image} alt={title} className={classes.productImage} />
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
