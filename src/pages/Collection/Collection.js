import React from 'react';
import classes from './Collection.module.css';
import First from './Items/First';
import Second from './Items/Second';
import Third from './Items/Third';
import Footer from '../../components/Footer';
import Fourth from './Items/Fourth';
import Fifth from './Items/Fifth';

function Collection(){

    return(

        <div className={classes.home}>

                <div className={classes.mainContentBox}>


                        <Fifth />

                        
                        


                        <Third />


                        <Second />

                        <First/>
                        {/* <Fourth /> */}

                </div>

            <Footer />
            
        </div>
    )
};


export default Collection;

