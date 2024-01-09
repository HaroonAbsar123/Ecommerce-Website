import React from "react";
import classes from './ThirdContainer.module.css'
import { Link } from "react-router-dom";

function ThirdContainer(){


    return(
        <div className={classes.mainContainer}>
            <div className={classes.textContainer}>
                <h2 className={classes.text}>Lets modify your interior modern looks</h2>
                <Link to={'collection'}>
                <button className="mainButton">Shop Now</button>
                </Link>
            </div>
                
        </div>
    )
};


export default ThirdContainer;