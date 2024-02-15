import React from "react";
import classes from './SecondContainer.module.css';
import ProductCard from "../ProductCard/ProductCard";
import Product1 from '../../Assets/Products/Product1.png';
import Product2 from '../../Assets/Products/Product2.png';
import ProductContext from "../../Context/ProductContext";
import { useContext, useEffect } from "react";
import { useState } from "react";


function SecondContainer(){

    const {products} = useContext(ProductContext);

  const [mainProducts, setMainProducts] = useState([]);

useEffect(() => {
  // Collect all hot products in this array
  const mainProductsArray = [];

  for (const category in products) {
    // Find the products with the specified id in the current category
    const categoryProducts = products[category].filter((item) => item?.homePageItem === true);

    // Add the hot products of the current category to the array
    mainProductsArray.push(...categoryProducts);
  }

  // Update the state with all the hot products
  setMainProducts(mainProductsArray.slice(0,2));
}, [products]);

const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 1100);
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

      {!isMobile && 
            <div className={classes.firstHalf}>

                <div className={classes.firstHalfContainer}>
                </div>

            </div>
          }
            <div className={classes.secondHalf}>

            <h1 className={classes.secondHalfTitle}>Renovate your interior with moduler design</h1>
            <div className={classes.secondHalfProducts}>
                {mainProducts?.map(item => 
                <ProductCard key={item.id} category={item.category} id={item.id} image={item.img[0]} title={item.title} price={item.price} discountedPrice={item.discountedPrice} />
                    )}
            {/* <ProductCard image={Product1} title={"Velvet Armchair"} price={"$560.00"} to={'/product'} />
            <ProductCard image={Product2} title={"Green Armchair"} price={"$450.00"} discountedPrice={"$380.00"}/> */}
            </div>
            </div>
        </div>
    )
};

export default SecondContainer;