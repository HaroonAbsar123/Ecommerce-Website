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
    if (Array.isArray(products[category])) { 

    // Find the products with the specified id in the current category
    const categoryProducts = Array.isArray(products[category])
        ? products[category].filter((item) => item?.hot === true)
        : [];

    // Add the hot products of the current category to the array
    hotProductsArray.push(...categoryProducts);
  }
  }

  // Update the state with all the hot products
  setHotProducts(hotProductsArray?.slice(0,8));
}, [products]);



  
  
    return (
      <div className={classes.mainContainer}>
        <div className={classes.innerContainer}>
          <h2 className={classes.heading}>Deal on interior modular</h2>
          <p className="para">Donec a mattis elit sed fermentum tellus mauris</p>
        </div>
  
  <div className={classes.secondContainer}>
            <div  style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
        <div className={classes.productsContainer}> 
          {hotProducts?.map((item, index) => (
            <HomeProductCard
           
            key={index} 
              category={item.category}
              id={item.id}
              item={item}
              title={item.title}
              price={item.colors[0]?.sizes[0]?.price}
              discountedPrice={item.colors[0]?.sizes[0]?.discountedPrice}
            />
          ))}
        </div>
            </div>
        </div>

        <div>
          <Link to={'/collection/hot'} className="nolinkstyle">
            <button className="mainButton" style={{minWidth: "13rem"}}>More Collection</button>
            </Link>
        </div>
      </div>
    );
  }
  
  export default FourthContainer;