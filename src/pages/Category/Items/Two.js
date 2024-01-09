import React, { useState, useEffect } from "react";
import classes from "./Two.module.css";
import ListBox from "./ListBox/ListBox";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../../../Context/ProductContext";

function Two() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);






  const [currentItems, setCurremtItems] = useState([]);


  const {category} = useParams();

  const {products} = useContext(ProductContext);


    




  // Helper functions to get the minimum and maximum price from the Products array
  function getMinPrice(products) {
    return Math.min(
      ...products.map(
        (product) => product?.discountedPrice || product?.price
      )
    );
  }

  function getMaxPrice(products) {
    return Math.max(
      ...products.map(
        (product) => product?.discountedPrice || product?.price
      )
    );
  }

  useEffect(() => {

    let currentArray = products[category];

    if(category==='hot'){
       
      currentArray=[];

      for (const category in products) {
        const categoryProducts = products[category]?.filter((item) => item?.hot === true);
        currentArray.push(...categoryProducts);
      }
    
      setCurremtItems(currentArray);

    } else {
    
    setCurremtItems(currentArray);
  }
  
    // Update the min and max prices whenever the Products or category changes
    setMinPrice(getMinPrice(currentArray));
    setMaxPrice(getMaxPrice(currentArray));
  }, [category, products]);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.First}>
        <ListBox
          Products={currentItems.filter(
            (product) =>
              (product?.discountedPrice || product?.price) >= minPrice &&
              (product?.discountedPrice || product?.price) <= maxPrice
          )}

          category={category}
        />
      </div>

      <div className={classes.Second}>
        <div className={classes.navLinks}>
          <h2 className="title">Collection</h2>

          <NavLink to={'/collection/hot'}>
  <p className="navLinkUnderline">Hot</p>
</NavLink>

          <NavLink to={'/collection/sofas'}>
  <p className="navLinkUnderline">Sofas</p>
</NavLink>

<NavLink to={'/collection/armchairs'}>
  <p className="navLinkUnderline">Armchairs</p>
</NavLink>

<NavLink to={'/collection/lamps'}>
  <p className="navLinkUnderline">Lamps</p>
</NavLink>

<NavLink to={'/collection/cushions'}>
  <p className="navLinkUnderline">Cushions</p>
</NavLink>

        </div>
        {/* Filter component */}
        <div className={classes.FilterContainer}>
          <div className={classes.filterInputContainer}>
            <label htmlFor="minPrice" className={classes.filterText}>
              Min Price:
            </label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              min={getMinPrice(currentItems)}
              max={maxPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className={classes.filterInputContainer}>
            <label htmlFor="maxPrice" className={classes.filterText}>
              Max Price:
            </label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              min={minPrice}
              max={getMaxPrice(currentItems)}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Two;
