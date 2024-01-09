import React, { useEffect, useState } from "react";
import classes from './FourthContainer.module.css';
import HomeProductCard from "../ProductCard/HomeProductCard";
import ProductContext from "../../Context/ProductContext";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";


function FourthContainer() {

  const {products} = useContext(ProductContext);

  const [hotProducts, setHotProducts] = useState([]);

useEffect(() => {
  // Collect all hot products in this array
  const hotProductsArray = [];

  for (const category in products) {
    // Find the products with the specified id in the current category
    const categoryProducts = products[category].filter((item) => item?.hot === true);

    // Add the hot products of the current category to the array
    hotProductsArray.push(...categoryProducts);
  }

  // Update the state with all the hot products
  setHotProducts(hotProductsArray);
}, [products]);



  
  
    return (
      <div className={classes.mainContainer}>
        <div className={classes.innerContainer}>
          <h2 className={classes.heading}>Deal on interior modular</h2>
          <p className="para">Donec a mattis elit sed fermentum tellus mauris</p>
        </div>
  
  <div className={classes.secondContainer}>
        <div className={classes.productsContainer}> 
          {hotProducts?.map((product, index) => (
            <HomeProductCard
              key={index} 
              image={product.img[0]}
              title={product.title}
              price={product.price}
              discountedPrice={product.discountedPrice}
              category={product.category}
              id={product.id}
            />
          ))}
        </div>
        </div>

        <div>
          <Link to={'/collection/hot'} className="nolinkstyle">
            <button className="mainButton" style={{border: "1px solid black", minWidth: "13rem"}}>More Collection</button>
            </Link>
        </div>
      </div>
    );
  }
  
  export default FourthContainer;