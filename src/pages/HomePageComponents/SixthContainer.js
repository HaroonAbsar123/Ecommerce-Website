import React from "react";
import classes from './SixthContainer.module.css';
import { faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";

function SixthContainer(){


    return(
        <div >
        <div className={classes.mainContainer}>

            <div className={classes.secondContainer}>
            <FontAwesomeIcon icon={faShippingFast} size="3x" />
                <div>
                    <h2 className={classes.title}>Free Shipping</h2>
                    <p className="para">Get free shipping over $1499</p>
                </div>

            </div>

            <div className={classes.secondContainer}>
            <FontAwesomeIcon icon={faMoneyBill} size="3x" />
                <div>

                    <h2 className={classes.title}>Quick Payment</h2>
                    <p className="para">Online Quick Payment easily</p>
                </div>

            </div>

            <div className={classes.secondContainer}>
            <FontAwesomeIcon icon={faCartShopping} size="3x" />
                <div>

                    <h2 className={classes.title}>Easy Return</h2>
                    <p className="para">Easy return within 24 hours</p>
                </div>

            </div>

            <div className={classes.secondContainer}>
            <FontAwesomeIcon icon={faHeadset} size="3x" />
                <div>

                    <h2 className={classes.title}>24/7 Support</h2>
                    <p className="para">Customer Online Support</p>
                </div>

            </div>



        </div>
        </div>
    )


};

export default SixthContainer;