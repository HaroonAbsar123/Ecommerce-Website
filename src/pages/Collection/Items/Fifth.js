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

    const [firstHovered, setFirstHovered] = useState(true);
    const [secondHovered, setSecondHovered] = useState(true);
    const [thirdHovered, setThirdHovered] = useState(true);
    const [fourthHovered, setfourthHovered] = useState(true);

    
    const navigate=useNavigate();

    function firstHoverEnter(){
        setFirstHovered(true);
    };
    function firstHoverExit(){
        // setFirstHovered(false);
    };
    function secondHoverEnter(){
        setSecondHovered(true);
    };
    function secondHoverExit(){
        // setSecondHovered(false);
    };
    function thirdHoverEnter(){
        setThirdHovered(true);
    };
    function thirdHoverExit(){
        // setThirdHovered(false);
    };

    function fourthHoverEnter(){
        setfourthHovered(true);
    };
    function fourthHoverExit(){
        // setfourthHovered(false);
    };

    const [isMobile, setIsMobile] = useState(false);
    const [remPadding, setRemPadding] = useState(false);
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 900);
        setRemPadding(window.innerWidth < 1200)
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



                    <div className={classes.innerHeading} style={{position: 'relative'}}>
                        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                    <img src={Logo} alt="logo" className={classes.image} style={{alignSelf: remPadding ? 'center' : "flex-start"}}/>
                    <h2 className={classes.heading}>Premium Collections</h2>
                    <p className="para">Molestie vitae massa felis, aliquam lectus at. Ultricies et, quis sit fermentum aliquam et.</p>
                    <button style={{alignSelf: remPadding ? 'center' : "flex-start"}} onClick={() => {navigate("/contact")}} className="mainButton">Contact Us</button>
                    </div>
                    
                    </div>


                <div style={{transform: remPadding ? "none" : 'skewX(-10deg)' ,overflow: 'hidden' ,flex: 1, display: 'flex', justifyContent:'center', alignItems: 'center', flexWrap: isMobile? "wrap" : 'nowrap', paddingTop: remPadding ? "1rem" : '3rem' }}>
                       
                        <div style={{display: 'flex', flexDirection: 'column', transform: remPadding ? "none" : 'skewX(10deg)' }} >

      <div className={classes.column}>
      
        <div className={classes.imageFirst} style={{ backgroundImage: `url(${Image1})` }} onMouseEnter={firstHoverEnter} onMouseLeave={firstHoverExit}>
        {
                firstHovered && 
                <div className={classes.imageFirstText}>
                    <h2 className={classes.headingSecond}>Sofas</h2>
                    <NavLink to={'/collection/sofas'}>
                    <button className={classes.secondaryButton}>See more</button>
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
                    <h2 className={classes.headingSecond}>Armchairs</h2>
                    <NavLink to={'/collection/armchairs'}>
                    <button className={classes.secondaryButton}>See more</button>
                    </NavLink>
                    </div>
            }


      </div>
      </div>



      </div>



      <div style={{display: 'flex', justifyContent:'center', alignItems: 'center', flexDirection: 'column', transform: remPadding ? "none" : 'skewX(10deg)'}} >

      <div className={classes.column}>
      <div className={classes.imageFirst} style={{ backgroundImage: `url(${Image3})` }} onMouseEnter={thirdHoverEnter} onMouseLeave={thirdHoverExit}>
      {
                thirdHovered && 
                <div className={classes.imageFirstText}>
                    <h2 className={classes.headingSecond}>Lamps</h2>
                    <NavLink to={'/collection/lamps'}>
                    <button className={classes.secondaryButton}>See more</button>
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
                    <h2 className={classes.headingSecond}>Cushions</h2>
                    <NavLink to={'/collection/cushions'}>
                    <button className={classes.secondaryButton}>See more</button>
                    </NavLink>
                    </div>
            }
      </div>
      </div>


      </div>

      </div>


                </div>
                <div class="custom-shape-divider-bottom-1708534212">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z" class="shape-fill"></path>
    </svg>
</div>
        </div>
    );
}

export default Fifth;