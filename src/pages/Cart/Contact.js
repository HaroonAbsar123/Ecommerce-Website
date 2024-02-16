import React from "react";
import classes from './Contact.module.css';
import Plant from '../../Assets/plantSecond.png'

function Contact() {

  return (
    <div className={classes.mainContainer}>
      <div className={classes.secondContainer}>
        <div style={{flex: 1}}>
        <h2 className={classes.mainHeading}>
          My Cart
        </h2>
        </div>

        <div style={{transform: 'translateY(-6rem)', flex: 1}}>
          <img src={Plant} className={classes.image} alt="Plant" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
