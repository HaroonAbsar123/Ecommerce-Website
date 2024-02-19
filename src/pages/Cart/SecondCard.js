import React from "react";
import classes from './SecondCard.module.css';
import { useState, useEffect } from "react";
import { Backdrop, Button } from "@mui/material";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faShippingFast, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ProductContext from "../../Context/ProductContext";
import CustomModal from "../../components/CustomModal";


function SecondCard({Products}){

  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [open, setOpen] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const { couponApplied, cartError } = useContext(ProductContext);
  const [shippingPercentage, setShippingPercentage] = useState(0.05)
  
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if(total >= 1499){
      setShippingPercentage(0)
    } else {
      setShippingPercentage(0.05)
    }
  }, [total])
  
  useEffect(() => {
    const newTotalItems = Products.reduce(
      (total, item) => total + item.selectedQuantity * item.price,
      0
    );
    setTotal(newTotalItems);
  
    const newQuantity = Products.reduce(
      (total, item) => total + item.selectedQuantity,
      0
    );
    setQuantity(newQuantity);
  
    const newShipping = newTotalItems * shippingPercentage;
    setShipping(newShipping);
  
    let subTotal = newTotalItems + newShipping;
  
    if (Object.keys(couponApplied).length > 0) {
      const discountMultiplier = 1 - couponApplied.discount;
      subTotal = subTotal * discountMultiplier;
    }
  
    setSubTotal(subTotal.toFixed(2));
  }, [Products, shippingPercentage]);
  


    return(
    <div className={classes.mainContainer}>
        <div className={classes.secondContainer}>
          <div style={{flex: 1, overflow: 'auto'}}>
            <div style={{width: '100%', borderBottom: '1px solid #ccc'}}>
                <h2 className="title">Cart Totals</h2>
            </div>


            <div style={{width: '100%', borderBottom: '1px solid #ccc', flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <p className="para">Sub Total</p>
                <div>
                <p className="para">${total}</p>
                </div>
            </div>


            



            <div style={{width: '100%', borderBottom: '1px solid #ccc'}}>
                {/* <p className="para">Shipping ({quantity} items)</p> */}
                <div style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <p className="para">Shipping ({shippingPercentage*100}%)</p>
                <div>
                <p className="para">${shipping}</p>
                </div>
                </div>

                <p className="para" style={{fontSize: 'small', textAlign: 'center'}}>
              <FontAwesomeIcon icon={faShippingFast} />
              <span style={{ marginLeft: "5px" }}>
                Free shipping: On orders over $1499 and above
              </span>
            </p>
            </div>



            {Object.keys(couponApplied).length > 0 && (
  <div style={{ width: '100%', borderBottom: '1px solid #ccc', flexDirection: 'row', display: 'flex', justifyContent: 'space-between' }}>
    <p className="para">Coupon Discount</p>
    <div>
      <p className="para">{couponApplied.discount * 100}% OFF</p>
    </div>
  </div>
)}



            <div style={{width: '100%', borderBottom: '1px solid #ccc', flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <p className="para">Total</p>
                <div>
                <p className="para">${subTotal}</p>
                </div>

                
               
            </div>



              
            <Button disabled={cartError}  variant="contained" onClick={handleOpen} style={{width: '100%', marginTop: '10px', backgroundColor: cartError ? "#ccc" : '#1e1e1e', color: 'white'}}>Proceed to Checkout</Button>
            {
  cartError && (
    <div style={{ marginTop: '10px', color: 'red' }}>
      Please consider making suggested alterations to your cart before proceeding to checkout.
    </div>
  )
}


                <CustomModal
                open={open} 
                >
                            <Form shippingPercentage={shippingPercentage} total={total} shipping={shipping} quantity={quantity} handleClose={handleClose} />

                </CustomModal>


        </div></div>
    </div>
    );
};


export default SecondCard;