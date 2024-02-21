import React, { useState, useEffect } from 'react';
import classes from './Second.module.css';
import Image1 from '../../../Assets/Products/Product1.png';
import Image2 from '../../../Assets/Products/1.png';
import Image3 from '../../../Assets/Products/7.png';
import Image4 from '../../../Assets/Products/8.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

function Second() {
  const [items, setItems] = useState([
    { id: 1, image: Image1, title: 'sofas' },
    { id: 2, image: Image2, title: 'armchairs' },
    { id: 3, image: Image3, title: 'lamps' },
    { id: 4, image: Image4, title: 'cushions' },
  ]);

  const [slidesToShow, setSlidesToShow] = useState(4);
  useEffect(() => {
    const handleResize = () => {
     if (window.innerWidth < 1000) {
          setSlidesToShow(2);
      } else{
        setSlidesToShow(4);
    }
  };
  

    // Set initial value
    handleResize();

    // Add event listener to listen for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  var settings = {

    dots: false,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className={classes.mainContainer}>
    <Slider {...settings}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={classes.column}
            >
              <div
                className={classes.imageFirst}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className={classes.imageFirstText}>
                  <h2 className={classes.headingSecond} >{item.title}</h2>
                  <NavLink to={`/collection/${item.title}`}>
                  <button className={classes.secondaryButton}>See more</button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
          </Slider>
    </div>
  );
}

export default Second;