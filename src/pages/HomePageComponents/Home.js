import React, { useState } from 'react';
import classes from './Home.module.css';
import MainProduct from '../../Assets/Product.png';
import SecondContainer from './SecondContainer';
import ThirdContainer from './ThirdContainer';
import FourthContainer from './FourthContainer';
import FifthContainer from './FifthContainer';
import SixthContainer from './SixthContainer';
import Footer from '../../components/Footer';
import { useContext } from 'react';
import ProductContext from '../../Context/ProductContext';
import { useNavigate } from 'react-router-dom';


function Home(){

    const {fetchData, updateData} = useContext(ProductContext);
    const [imageLoaded, setImageLoaded] = useState(false);

    const navigate=useNavigate();

    return(

        <div className={classes.home}>


            <div className={classes.mainImage}>

                <div className={classes.mainImageComponent}>
                    <div className={classes.mainImageText}>
                    <h2 className={classes.mainHeading}>Renovate your Interior</h2>
                    <p>Fill your home with our premium quality furnitures</p>
                    <button onClick={() => {navigate("/collection")}} className='mainButton'>Shop Now</button>
                    </div>
                </div>

                <div className={classes.mainImageComponent}>
                    <img style={{
                 display: imageLoaded ? "inherit" : 'none',
               }} src={MainProduct} alt='' className={classes.mainProductImage} onLoad={() => setImageLoaded(true)} />

                </div>
                <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0,
    }}>
    <svg style={{
        position: 'relative',
        display: 'block',
        width: 'calc(107% + 1.3px)',
        height: '61px',
    }} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z" style={{fill: '#fff'}}></path>
    </svg>
</div>
            </div>

            <div className={classes.content}>
                <SecondContainer />
                <ThirdContainer />
                <FourthContainer />
                <FifthContainer />
                <SixthContainer />
                <Footer />
            </div>
            

        </div>
    )
};


export default Home;