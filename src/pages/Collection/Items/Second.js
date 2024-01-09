import React, { useState, useEffect } from 'react';
import classes from './Second.module.css';
import Image1 from '../../../Assets/Products/Product1.png';
import Image2 from '../../../Assets/Products/1.png';
import Image3 from '../../../Assets/Products/7.png';
import Image4 from '../../../Assets/Products/8.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight, faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

function Second() {
  const [items, setItems] = useState([
    { id: 1, image: Image1, title: 'sofas' },
    { id: 2, image: Image2, title: 'armchairs' },
    { id: 3, image: Image3, title: 'lamps' },
    { id: 4, image: Image4, title: 'cushions' },
  ]);



  const scrollRight = () => {
    setItems((prevItems) => {
      const lastItem = prevItems[prevItems.length - 1];
      return [lastItem, ...prevItems.slice(0, prevItems.length - 1)];
    });
  };

  const scrollLeft = () => {
    setItems((prevItems) => {
      const firstItem = prevItems[0];
      return [...prevItems.slice(1), firstItem];
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.innerContainer}>
        <div className={classes.columnsContainer}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={classes.column}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div
                className={classes.imageFirst}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className={classes.imageFirstText}>
                  <h2 >{item.title}</h2>
                  <NavLink to={`/collection/${item.title}`}>
                  <button className="secondaryButton">See more</button>
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className={`${classes.scrollButton} ${classes.left}`} onClick={scrollLeft}>
      <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" />
      </button>
      <button className={`${classes.scrollButton} ${classes.right}`} onClick={scrollRight}>
      <FontAwesomeIcon icon={faCircleArrowRight} size="2x" />
      </button>
    </div>
  );
}

export default Second;
