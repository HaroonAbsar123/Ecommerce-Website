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
            <FontAwesomeIcon icon={faShippingFast} />
                <div>
                    <h2 className={classes.title}>Free Shipping</h2>
                    <p className="para">Get free shipping over $1499</p>
                </div>

            </div>

            <div className={classes.secondContainer}>
            <FontAwesomeIcon icon={faMoneyBill}  />
                <div>

                    <h2 className={classes.title}>Easy Payment</h2>
                    <p className="para">Easily pay on item delivery</p>
                </div>

            </div>

            <div className={classes.secondContainer}>
            <FontAwesomeIcon icon={faCartShopping} />
                <div>

                    <h2 className={classes.title}>Easy Return</h2>
                    <p className="para">Easy return within 24 hours</p>
                </div>

            </div>

            <div className={classes.secondContainer}>
            <FontAwesomeIcon icon={faHeadset}/>
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