import React from "react";
import classes from './Fifth.module.css';
import { useState, useEffect } from "react";


import Image1 from '../../../Assets/Products/Product1.png';
import Image2 from '../../../Assets/Products/1.png';
import Image3 from '../../../Assets/Products/7.png';
import Image4 from '../../../Assets/Products/8.png';


import Logo from '../../../Assets/logo.png';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Fifth(){

    const [firstHovered, setFirstHovered] = useState(false);
    const [secondHovered, setSecondHovered] = useState(false);
    const [thirdHovered, setThirdHovered] = useState(false);
    const [fourthHovered, setfourthHovered] = useState(false);

    
    const navigate=useNavigate();

    function firstHoverEnter(){
        setFirstHovered(true);
    };
    function firstHoverExit(){
        setFirstHovered(false);
    };
    function secondHoverEnter(){
        setSecondHovered(true);
    };
    function secondHoverExit(){
        setSecondHovered(false);
    };
    function thirdHoverEnter(){
        setThirdHovered(true);
    };
    function thirdHoverExit(){
        setThirdHovered(false);
    };

    function fourthHoverEnter(){
        setfourthHovered(true);
    };
    function fourthHoverExit(){
        setfourthHovered(false);
    };

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 900);
      };
  
      // Set initial value
      handleResize();
  
      // Add event listener to listen for window resize
      window.addEventListener('resize', handleResize);
  
      // Remove event listener on cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return(
        

        <div className={classes.mainContainer}>

                <div className={classes.innerContainer}>



                    <div className={classes.innerHeading}>
                    <img src={Logo} alt="logo" style={{maxWidth: '15rem', marginBottom: '0px', paddingBottom: '0px'}}/>
                    <h2 style={{fontSize: '4rem', marginBottom: '0rem', marginTop: '1.5rem'}}>Premium Collections</h2>
                    <p className="para" style={{fontSize: '1.5rem'}}>Molestie vitae massa felis, aliquam lectus at. Ultricies et, quis sit fermentum aliquam et.</p>
                    <button onClick={() => {navigate("/contact")}} className="mainButton">Contact Us</button>
                    </div>


                <div style={{flex: 2, display: 'flex', justifyContent:'center', alignItems: 'center', flexWrap: isMobile? "wrap" : 'nowrap', gap: '1rem'}}>
                        <div className={classes.columnsContainer}>
      <div className={classes.column}>
      
        <div className={classes.imageFirst} style={{ backgroundImage: `url(${Image1})` }} onMouseEnter={firstHoverEnter} onMouseLeave={firstHoverExit}>
        {
                firstHovered && 
                <div className={classes.imageFirstText}>
                    <h2>Sofas</h2>
                    <NavLink to={'/collection/sofas'}>
                    <button className="secondaryButton">See more</button>
                    </NavLink>
                    </div>
            }
        </div>
      </div>
      <div className={classes.column}>
      <div className={classes.imageFirst} style={{ backgroundImage: `url(${Image2})` }} onMouseEnter={secondHoverEnter} onMouseLeave={secondHoverExit}>

      {
                secondHovered && 
                <div className={classes.imageFirstText}>
                    <h2>Armchairs</h2>
                    <NavLink to={'/collection/armchairs'}>
                    <button className="secondaryButton">See more</button>
                    </NavLink>
                    </div>
            }


      </div>
      </div>



      </div>



      <div className={classes.columnsContainer}>
      <div className={classes.column}>
      <div className={classes.imageFirst} style={{ backgroundImage: `url(${Image3})` }} onMouseEnter={thirdHoverEnter} onMouseLeave={thirdHoverExit}>
      {
                thirdHovered && 
                <div className={classes.imageFirstText}>
                    <h2>Lamps</h2>
                    <NavLink to={'/collection/lamps'}>
                    <button className="secondaryButton">See more</button>
                    </NavLink>
                    </div>
            }
      </div>
      </div>



      <div className={classes.column}>
      <div className={classes.imageFirst} style={{ backgroundImage: `url(${Image4})` }} onMouseEnter={fourthHoverEnter} onMouseLeave={fourthHoverExit}>
      {
                fourthHovered && 
                <div className={classes.imageFirstText}>
                    <h2>Cushions</h2>
                    <NavLink to={'/collection/cushions'}>
                    <button className="secondaryButton">See more</button>
                    </NavLink>
                    </div>
            }
      </div>
      </div>


      </div>

      </div>


                </div>

        </div>
    );
}

export default Fifth;