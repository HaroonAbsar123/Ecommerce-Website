import React from "react";
import classes from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../Context/ProductContext";
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";


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
            <p className="para"><span onClick={() => {navigate("/register")}} className="navLinkUnderline">Register</span></p>
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
            <input className={classes.input} placeholder="xyx@example.com" />
            <button className={classes.button}> <FontAwesomeIcon icon={faArrowRight} size="2x" /> </button>
            </div>

            {/* <div style={{display: 'flex', gap: '10px', marginTop: '2rem', marginLeft: '5px'}}>

              <FontAwesomeIcon icon={faFacebook}  className={classes.icon} />
              
              <FontAwesomeIcon icon={faInstagram}  className={classes.icon} />

              
              <FontAwesomeIcon icon={faWhatsapp} className={classes.icon} />
              
              <FontAwesomeIcon icon={faLinkedin}  className={classes.icon} />

            </div> */}


<ul class="socail-media">
  <li>
    <a href="#">
       <svg viewBox="0 0 10.712 20" height="20" width="10.712" xmlns="http://www.w3.org/2000/svg">
  <path transform="translate(-22.89)" d="M32.9,11.25l.555-3.62H29.982V5.282a1.81,1.81,0,0,1,2.041-1.955H33.6V.245A19.255,19.255,0,0,0,30.8,0c-2.86,0-4.73,1.734-4.73,4.872V7.63H22.89v3.62h3.179V20h3.913V11.25Z" id="facebook"></path>
</svg>

    </a>
  </li>

  <li>
    <a href="#">
            <svg viewBox="0 0 20 20" height="20" width="20" xmlns="http://www.w3.org/2000/svg" id="instagram">
          <g transform="translate(15.354 3.707)" data-name="Group 64" id="Group_64">
            <g data-name="Group 63" id="Group_63">
              <path  transform="translate(-392.401 -94.739)" d="M392.871,94.739a.47.47,0,1,0,.47.47A.47.47,0,0,0,392.871,94.739Z" data-name="Path 5" id="Path_5"></path>
            </g>
          </g>
          <g transform="translate(5.837 5.837)" data-name="Group 66" id="Group_66">
            <g data-name="Group 65" id="Group_65">
              <path  transform="translate(-145.804 -145.804)" d="M149.967,145.8a4.163,4.163,0,1,0,4.163,4.163A4.168,4.168,0,0,0,149.967,145.8Z" data-name="Path 6" id="Path_6"></path>
            </g>
          </g>
          <g data-name="Group 68" id="Group_68">
            <g data-name="Group 67" id="Group_67">
              <path  d="M14.517,0H5.483A5.489,5.489,0,0,0,0,5.483v9.035A5.489,5.489,0,0,0,5.483,20h9.035A5.489,5.489,0,0,0,20,14.517V5.483A5.489,5.489,0,0,0,14.517,0ZM10,15.486A5.486,5.486,0,1,1,15.486,10,5.492,5.492,0,0,1,10,15.486Zm5.814-9.633A1.667,1.667,0,1,1,17.48,4.186,1.669,1.669,0,0,1,15.814,5.853Z" data-name="Path 7" id="Path_7"></path>
            </g>
          </g>
        </svg>

    </a>
  </li>

</ul>


          </div>

        </div>

        <div className={classes.innerFooter}>
            <div className={classes.innerFooterContent}>
            <div className={classes.secondTitle}> © 2023-2024, intellicart.com </div>
            <div className={classes.secondTitle}>Intellicart</div>
            </div>
          </div>


      </div>
      
    </div>
  );
}

export default Footer;
