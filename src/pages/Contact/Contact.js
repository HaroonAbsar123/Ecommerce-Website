import React, {useState} from "react";
import classes from './Contact.module.css';
import Plant from '../../Assets/plantSecond.png'

function Contact() {

  const [imageLoaded, setImageLoaded] = useState(false);


  return (
    <div className={classes.mainContainer}>
      <div className={classes.secondContainer}>
        <div style={{flex: 1}}>
        <h2 className={classes.mainHeading}>
          Contact Us
        </h2>
        </div>

        <div style={{transform: 'translateY(-6rem)', flex: 1}}>
          <img style={{display: imageLoaded ? "inherit" : 'none'}} src={Plant} className={classes.image} alt="" onLoad={() => setImageLoaded(true)} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
