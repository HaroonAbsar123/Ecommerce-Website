import React from "react";
import classes from './ItemOne.module.css';
import ImageCarousel from "./ImageCarousel";
import ItemDetails from "./ItemDetails";



function ItemOne({Products}){


    return(
        <div>
        <div className={classes.mainContainer}>
            

            <div className={classes.First}>
                <ImageCarousel Products={Products} />
            </div>


            <div className={classes.Second}>
                <ItemDetails  Products={Products} />
            </div>

        </div>


        </div>
    );
};


export default ItemOne;


