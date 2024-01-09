import React from "react";
import classes from "./ImageCard.module.css";
import { Link } from "react-router-dom";

function ImageCard({ image, title, id, category, onClick }) {
  return (

    
    <div className={classes.productCard} onClick={onClick}>
      <Link to={`/collection/${category}/${id}`} className="nolinkstyle">
      <div className={classes.productImageContainer}>
      <img src={image} alt={title} className={classes.productImage} />
      </div>
      <p className="para">{title}</p>
      </Link>
    </div>
    
  );
}

export default ImageCard;
