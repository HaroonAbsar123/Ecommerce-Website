import React from "react";
import classes from "./ProductCard.module.css";
import { NavLink } from "react-router-dom";

function ProductCard({ image, title, price, discountedPrice, category, id }) {
  return (
    <NavLink to={`/collection/${category}/${id}`} className={classes.nav} >
    <div className={classes.productCard}>
      <div className={classes.productImageContainer}>
        <img src={image} alt={title} className={classes.productImage} />
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
