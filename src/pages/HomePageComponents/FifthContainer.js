import React, { useEffect } from "react";
import classes from './FifthContainer.module.css';
import { useState } from "react";
import { Link } from "react-router-dom";

function FifthContainer(){

    const [firstHovered, setFirstHovered] = useState(false);
    const [secondHovered, setSecondHovered] = useState(false);
    const [thirdHovered, setThirdHovered] = useState(false);
    const [fourthHovered, setFourthHovered] = useState(false);

    // const [isMobile, setIsMobile] = useState(false);

    // const checkIsMobile = () => {
    //   setIsMobile(window.innerWidth <= 900); // You can adjust the width threshold as needed
    //   if(window.innerWidth <= 900){
    //     setFirstHovered(true)
    //     setSecondHovered(true)
    //     setThirdHovered(true)
    //     setFourthHovered(true)
    //   }
    // };
    // useEffect(() => {
    //     checkIsMobile(); // Initial check
    //     window.addEventListener("resize", checkIsMobile); // Add event listener
    
    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //       window.removeEventListener("resize", checkIsMobile);
    //     };
    //   }, []);
    

    function firstHoverEnter(){
        setFirstHovered(true);
    };
    function firstHoverExit(){
        // if(!isMobile){setFirstHovered(false)};
        setFirstHovered(false)
    };
    function secondHoverEnter(){
        setSecondHovered(true);
    };
    function secondHoverExit(){
        // if(!isMobile){setSecondHovered(false)};
        setSecondHovered(false)
    };
    function thirdHoverEnter(){
        setThirdHovered(true);
    };
    function thirdHoverExit(){
        // if(!isMobile){setThirdHovered(false)};
        setThirdHovered(false)
    };

    function fourthHoverEnter(){
        setFourthHovered(true);
    };
    function fourthHoverExit(){
        // if(!isMobile){setFourthHovered(false)};
        setFourthHovered(false)
    };


    return(
        

        <div className={classes.mainContainer}>

                <div className={classes.innerContainer}>
                    <h2 className={classes.heading}>Interior architectural styles</h2>


        <div style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
                        <div className={classes.columnsContainer}>
      <div className={classes.column}>
      
        <div className={classes.imageFirst} onMouseEnter={firstHoverEnter} onMouseLeave={firstHoverExit}>
        {
                firstHovered && 
                <div className={classes.imageFirstText}>
                    <h2 className={classes.headingSecond}>Sofa</h2>
                    <Link to={'/collection/sofas'}>
                    <button  className={classes.secondaryButton}>Shop Now</button>
                    </Link>
                    </div>
            }
        </div>
      </div>
      <div className={classes.column}>
      <div className={classes.imageSecond} onMouseEnter={secondHoverEnter} onMouseLeave={secondHoverExit}>

      {
                secondHovered && 
                <div className={classes.imageSecondText}>
                    <h2 className={classes.headingSecond}>ArmChair</h2>
                    <Link to={'/collection/armchairs'}>
                    <button  className={classes.secondaryButton}>Shop Now</button>
                    </Link>
                    </div>
            }


      </div>
      </div>
      <div className={classes.column}>
      <div className={classes.imageThird} onMouseEnter={thirdHoverEnter} onMouseLeave={thirdHoverExit}>
      {
                thirdHovered && 
                <div className={classes.imageThirdText}>
                    <h2 className={classes.headingSecond}>Lamp</h2>
                    <Link to={'/collection/lamps'}>
                    <button  className={classes.secondaryButton}>Shop Now</button>
                    </Link>
                    </div>
            }
      </div>
      </div>
      <div className={classes.column}>
      <div className={classes.imageFourth} onMouseEnter={fourthHoverEnter} onMouseLeave={fourthHoverExit}>
      {
                fourthHovered && 
                <div className={classes.imageFourthText}>
                    <h2 className={classes.headingSecond}>Cushion</h2>
                    <Link to={'/collection/cushions'}>
                    <button className={classes.secondaryButton}>Shop Now</button>
                    </Link>
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

export default FifthContainer;