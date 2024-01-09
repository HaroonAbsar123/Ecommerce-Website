import React from "react";
import classes from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../Context/ProductContext";

function Footer() {
  
  const {isUserLoggedIn} = useContext(ProductContext);

  const navigate=useNavigate()
  return (
    <div className={classes.Footer}>
      <div className={classes.innerContainer}>
        <div className={classes.columnsContainer}>
          <div className={classes.column}>
            <h2 className={classes.title}>Quick Links</h2>
            <p className="para"><span onClick={() => {navigate("/")}} className="navLinkUnderline">Home</span></p>
            <p className="para"><span onClick={() => {navigate("/collection")}} className="navLinkUnderline">Collection</span></p>
            <p className="para"><span onClick={() => {navigate("/contact")}} className="navLinkUnderline">Contact</span></p>
            <p className="para"><span onClick={() => {navigate("/login")}} className="navLinkUnderline">Login</span></p>
          </div>

          <div className={classes.column}>
            <h2 className={classes.title}>Collections</h2>
            <p className="para"><span  onClick={() => {navigate("/collection/armchairs")}} className="navLinkUnderline">Arm Chairs</span></p>
            <p className="para"><span onClick={() => {navigate("/collection/sofas")}} className="navLinkUnderline">Sofas</span></p>
            <p className="para"><span onClick={() => {navigate("/collection/cushions")}} className="navLinkUnderline">Cushions</span></p>
            <p className="para"><span onClick={() => {navigate("/collection/lamps")}} className="navLinkUnderline">Lamps</span></p>
          </div>

          <div className={classes.column}>
            <h2 className={classes.title}>More</h2>
            <p className="para"><span onClick={() => {isUserLoggedIn ? navigate("/cart") : navigate("/login")}} className="navLinkUnderline">Cart</span></p>
            <p className="para"><span onClick={() => {isUserLoggedIn ? navigate("/profile") : navigate("/login")}} className="navLinkUnderline">Profile</span></p>
          </div>

          <div className={classes.column}>
            <h2 className={classes.title}>Don't Miss Any Update</h2>
            <p className="para">Please enter email to keep up to date on our offers and products.</p>
            <div className={classes.inputContainer}>
            <input className={classes.input} />
            <button className={classes.button}> <FontAwesomeIcon icon={faArrowRight} size="2x" /> </button>
            </div>
          </div>

        </div>

        <div className={classes.innerFooter}>
            <div className={classes.innerFooterContent}>
            <div className="title"> Payment Options </div>
            <div className="title">Intellicart @2024</div>
            </div>
          </div>


      </div>
      
    </div>
  );
}

export default Footer;
