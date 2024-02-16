import React from "react";
import classes from './Three.module.css'
import { Link } from "react-router-dom";

function ThirdContainer(){


    return(
        <div className={classes.mainContainer}>
            <div className={classes.textContainer}>
                <h2 className={classes.text}>Checkout our collection</h2>
                <Link to={'/collection'}>
                <button className="mainButton">Shop Now</button>
                </Link>
            </div>
                
        </div>
    )
};


export default ThirdContainer;