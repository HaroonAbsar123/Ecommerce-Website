import React from "react";
import classes from './SecondCard.module.css';
import { useState, useEffect } from "react";
import { Backdrop, Button } from "@mui/material";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ProductContext from "../../Context/ProductContext";


function SecondCard({Products}){

    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [open, setOpen] = useState(false);

    const [subTotal, setSubTotal] = useState(0);

    const {couponApplied} = useContext(ProductContext);


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  
    useEffect(() => {
      // Update the totalItems whenever the cart changes


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

      const newShipping = newTotalItems*newQuantity;
      const finalShipping = newShipping/100;

      setShipping(finalShipping)



      let subTotal = newTotalItems + finalShipping;
      
        if(Object.keys(couponApplied).length > 0){
          const discountMultiplier = 1 - couponApplied.discount;
          subTotal = subTotal * discountMultiplier;
        }
      
      
      setSubTotal(subTotal.toFixed(2));
      



      }, [Products])



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
                <p className="para">Shipping ({quantity} items)</p>
                <div style={{width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                <p className="para">Shipping Cost</p>
                <div>
                <p className="para">${shipping}</p>
                </div>
                </div>
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



            <Button  variant="contained" onClick={handleOpen} style={{width: '100%', marginTop: '10px', backgroundColor: '#1e1e1e', color: 'white'}}>Proceed to Checkout</Button>


                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                
                >
                    
                    
                    <div style={{width: '90%', backgroundColor: 'white', color: 'black', height: '100%', maxHeight: '70vh', marginTop: '5rem', overflow: 'hidden',   maxWidth: '2200px'}}>
                    <div style={{height: '10%', width: '100%', flex: 1, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', borderBottom: '1px solid #ccc', alignItems: 'center'}}>
                        <h2 className="title" style={{fontSize: '2rem', margin: '0px', paddingLeft: '1rem'}}>Billing Details</h2>
                    <button onClick={handleClose} style={{background: 'none', border: 'none'}}><FontAwesomeIcon icon={faCircleXmark} size="1x" style={{fontSize: '2.5rem'}} /></button>
                    </div>
                    
                        <div style={{ height: '90%', overflow: 'auto', width: '100%'}}>

                            <div style={{padding: '3rem', paddingTop: '2rem'}}>
                            <Form total={total} shipping={shipping} quantity={quantity} />
                            </div>
                        
                        </div>
                        
                    </div>

                </Backdrop>


        </div></div>
    </div>
    );
};


export default SecondCard;