import React from 'react';
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

    const navigate=useNavigate();

    return(

        <div className={classes.home}>


            <div className={classes.mainImage}>

                <div className={classes.mainImageComponent}>
                    <div className={classes.mainImageText}>
                    <h2 className={classes.mainHeading}>Renovate your Interior</h2>
                    <p>Fill your home with our premium quality furnitures</p>
                    <button onClick={() => {navigate("/collection")}}  className='mainButton'>Shop Now</button>
                    </div>
                </div>

                <div className={classes.mainImageComponent}>
                    <img src={MainProduct} alt='MainProduct' className={classes.mainProductImage} />

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