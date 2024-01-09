import React from "react";
import classes from './Three.module.css';
import { NavLink } from "react-router-dom";

function Three(){


    return(
        <div className={classes.mainContainer}>
            <div className={classes.textContainer}>
                <h2 className={classes.text}>Checkout our Collection</h2>
                <NavLink to={'/collection'}>
                <button className="mainButton">Shop Now</button>
                </NavLink>
            </div>
                
        </div>
    )
};


export default Three;