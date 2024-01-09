import React from "react";
import classes from './FifthContainer.module.css';
import { useState } from "react";
import { Link } from "react-router-dom";

function FifthContainer(){

    const [firstHovered, setFirstHovered] = useState(false);
    const [secondHovered, setSecondHovered] = useState(false);
    const [thirdHovered, setThirdHovered] = useState(false);
    const [fourthHovered, setFourthHovered] = useState(false);

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
        setFourthHovered(true);
    };
    function fourthHoverExit(){
        setFourthHovered(false);
    };


    return(
        

        <div className={classes.mainContainer}>

                <div className={classes.innerContainer}>
                    <h2 className={classes.heading}>Interior architectural styles</h2>



                        <div className={classes.columnsContainer}>
      <div className={classes.column}>
      
        <div className={classes.imageFirst} onMouseEnter={firstHoverEnter} onMouseLeave={firstHoverExit}>
        {
                firstHovered && 
                <div className={classes.imageFirstText}>
                    <h2>Sofas</h2>
                    <Link to={'/collection/sofas'}>
                    <button className="secondaryButton">Shop Now</button>
                    </Link>
                    </div>
            }
        </div>
      </div>
      <div className={classes.column}>
      <div className={classes.imageSecond} onMouseEnter={secondHoverEnter} onMouseLeave={secondHoverExit}>

      {
                secondHovered && 
                <div className={classes.imageFirstSecond}>
                    <h2>ArmChairs</h2>
                    <Link to={'/collection/armchairs'}>
                    <button className="secondaryButton">Shop Now</button>
                    </Link>
                    </div>
            }


      </div>
      </div>
      <div className={classes.column}>
      <div className={classes.imageThird} onMouseEnter={thirdHoverEnter} onMouseLeave={thirdHoverExit}>
      {
                thirdHovered && 
                <div className={classes.imageFirstText}>
                    <h2>Lamps</h2>
                    <Link to={'/collection/lamps'}>
                    <button className="secondaryButton">Shop Now</button>
                    </Link>
                    </div>
            }
      </div>
      </div>

      

      <div className={classes.column}>
      <div className={classes.imageSecond} onMouseEnter={fourthHoverEnter} onMouseLeave={fourthHoverExit}>
      {
                fourthHovered && 
                <div className={classes.imageFirstSecond}>
                    <h2>Cushions</h2>
                    <Link to={'/collection/cushions'}>
                    <button className="secondaryButton">Shop Now</button>
                    </Link>
                    </div>
            }
      </div>
      </div>



    </div>

                </div>

        </div>
    );
}

export default FifthContainer;