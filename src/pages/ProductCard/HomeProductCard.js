import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./HomeProductCard.module.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import dummyImage from "../../Assets/displayImage.png";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

function getAllImages(item) {
  let images = [];
  item.colors.forEach((color) => {
    images = [...images, ...color.images];
  });
  return images;
}

function HomeProductCard({ item, title, price, discountedPrice, category, id }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heartTrue, setHeartTrue] = useState(false)

  const allImages = getAllImages(item);

  const settings = {
    className: "slider variable-width",
    lazyLoad: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    console.log("WISH LIST");
    setHeartTrue(!heartTrue);
  };

  return (
    <Link to={`/collection/${category}/${id}`} className="nolinkstyle">
      <div className={classes.productCard} style={{ position: "relative" }}>
     
      <button 
      className="heartButton"
  onClick={handleWishlistClick}
  style={{ 
    position: "absolute", 
    top: "10px", 
    right: "10px", 
    zIndex: "1", 
    background: "none", 
    border: "none", 
    padding: "10px", 
    cursor: "pointer",
    borderRadius: '50%'
  }}
>
  {
    heartTrue ?
    <svg height="32" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H24V24H0z" fill="none"></path>
    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
  </svg>
  :
  <svg height="32" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0H24V24H0z" fill="none"></path>
  <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z" fill="transparent" stroke="rgb(255, 110, 110)" strokeWidth="2"></path>
</svg>
  }

</button>

        {/* <IconButton
         onClick={handleWishlistClick}
         style={{ position: "absolute", top: "10px", right: "10px", zIndex: "1" }}
         size="large"
        >
          <FontAwesomeIcon icon={faHeart} style={{color: 'darkgrey'}} />
        </IconButton> */}
        <div className={classes.productImageContainer}>
          <Slider {...settings}>
            {allImages.map((item) => (
              <>
                {!imageLoaded && <img src={dummyImage} alt="" className={classes.productImage} />}
                <img key={item} src={item} alt="" className={classes.productImage} onLoad={() => setImageLoaded(true)} />
              </>
            ))}
          </Slider>
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
