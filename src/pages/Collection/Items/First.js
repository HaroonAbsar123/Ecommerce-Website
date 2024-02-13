import React from "react";
import classes from "./First.module.css";
import Image1 from '../../../Assets/Home3.png';

function First(){

    return(

        <div className={classes.mainContainer}>

            <div className={classes.TextContainer}>
                <div >
                   <div className={classes.Text}> Refined Relaxation</div>
                    <div>
                    <button className="mainButton">Shop Now</button>
                    </div>
                </div>
            </div>

            <div className={classes.ImageContainer}>
                <img src={Image1} alt='HomeImage' className={classes.Image} />
            </div>

            
        </div>
    );
};

export default First;