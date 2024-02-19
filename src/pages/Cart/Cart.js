import React, { useState, useEffect } from "react";
import classes from "./Cart.module.css";
import FirstCard from "./FirstCard";
import SecondCard from "./SecondCard";
import Footer from "../../components/Footer";
import { useContext } from "react";
import ProductContext from "../../Context/ProductContext";

import Image1 from "../../Assets/Products/1.png";
import Image2 from "../../Assets/Products/2.png";
import Image3 from "../../Assets/Products/3.png";
import Image4 from "../../Assets/Products/4.png";
import Image5 from "../../Assets/Products/5.png";
import Image6 from "../../Assets/Products/6.png";
import Image7 from "../../Assets/Products/7.png";
import Image8 from "../../Assets/Products/8.png";
import Image9 from "../../Assets/Products/Product1.png";
import Image10 from "../../Assets/Products/Product2.png";
import Image11 from "../../Assets/Home5.png";
import Image12 from "../../Assets/Home6.png";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";

function Cart() {
const navigate=useNavigate();

  const {cart, isUserLoggedIn} = useContext(ProductContext);

  //   useEffect(() => {
  //   if (!isUserLoggedIn) {
  //     navigate("/login", { replace: true });
  //   }
  // }, []);

  // const sortedCart = [...cart].sort((a, b) => {
  //   const dateA = new Date(a.addedOn.seconds * 1000 + a.addedOn.nanoseconds / 1000000);
  //   const dateB = new Date(b.addedOn.seconds * 1000 + b.addedOn.nanoseconds / 1000000);
  //   return dateB - dateA;
  // });


  return (
    <React.Fragment>
      <div className={classes.mainContainer}>
        <Contact />
        <div className={classes.secondContainer}>
            
          <FirstCard Products={cart} />

          <SecondCard Products={cart} />
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default Cart;
