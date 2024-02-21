import React, {useCallback, useEffect, useRef, useState} from "react";
import classes from "./ProductCard.module.css";
import { NavLink } from "react-router-dom";
import dummyImage from '../../Assets/displayImage.png';
import Slider from "react-slick";

function getAllImages(item) {
  let images = [];
  item.colors.forEach((color) => {
    images = [...images, ...color.images];
  });
  return images;
}

function ProductCard({ item, title, price, discountedPrice, category, id }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const allImages = getAllImages(item);

  const settings = {
    className: "slider variable-width",
    // dots: true,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <NavLink to={`/collection/${category}/${id}`} className={classes.nav} >
    <div className={classes.productCard}>
      <div className={classes.productImageContainer}>
      <Slider {...settings}>
            {allImages.map((item) => (
              <img key={item} src={item} alt="" className={classes.productImage} />
            ))}
          </Slider>
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
