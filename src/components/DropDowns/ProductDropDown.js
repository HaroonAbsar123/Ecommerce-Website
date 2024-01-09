import React from "react";
import classes from './ProductDropDown.module.css'
import Image1 from '../../Assets/Home7.png'
import Image2 from '../../Assets/Home8.png'

import Image3 from '../../Assets/Home9.png'
import Image4 from '../../Assets/Home10.png'
import Image5 from '../../Assets/Home11.png'
import { useState } from "react";
import ImageCard from "./ImageCard";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../../Context/ProductContext";
import { useEffect } from "react";

function ProductDropDown({onClick}){



    const {products} = useContext(ProductContext);

    const [mainProducts, setMainProducts] = useState([]);
  
  useEffect(() => {
    const mainProductsArray = [];
  
    for (const category in products) {
      const categoryProducts = products[category].filter((item) => item?.homePageItem === true);
  
      mainProductsArray.push(...categoryProducts);
    }
  
    setMainProducts(mainProductsArray);
  }, [products]);
  
  



    function itemClickedHandler(){
        onClick(true);

    }


    


    return(
        <div >
        <div className={classes.mainContainer}>


            <div className={classes.secondContainer}>

                <div className={classes.First}>

                    <div className={classes.imageContainer} style={{marginRight: '2rem'}}>
                        {mainProducts?.map((item) => 
                        <ImageCard key={item.id} onClick={itemClickedHandler} image={item.img[0]} title={item.title} id={item.id} category={item.category} />
                        )}
                    </div>
                    
                </div>

                <div className={classes.Second}>
                <div className={classes.innerContainer}>
                        <div className={classes.columnsContainer}>
      {/* <div className={classes.column} style={{borderRight: '1px solid #ccc', paddingRight: '1rem'}}>
            <img src={Image3} alt="logo" className={classes.logoImage} />
            <h2 className="title"><NavLink to={"style"} className="navLinkUnderline" onClick={itemClickedHandler} >Style</NavLink></h2>
            <p className="para"> 
            <NavLink to={"style-1"} className="navLinkUnderline" onClick={itemClickedHandler} >style 1</NavLink>
            </p>
            <p className="para"><NavLink to={"style-2"} className="navLinkUnderline" onClick={itemClickedHandler} >style 2</NavLink></p>
            <p className="para"><NavLink to={"style-3"} className="navLinkUnderline" onClick={itemClickedHandler} >style 3</NavLink></p>
            <p className="para"><NavLink to={"style-4"} className="navLinkUnderline" onClick={itemClickedHandler} >style 4</NavLink></p>
      </div> */}

      <div className={classes.column} style={{borderRight: '1px solid #ccc', paddingRight: '1rem'}}>
      <img src={Image4} alt="logo" className={classes.logoImage} />
      <h2 className="title"><NavLink to={"collection"} className="navLinkUnderline" onClick={itemClickedHandler} >Collection</NavLink></h2>
            <p className="para"><NavLink to={"collection/sofas"} className="navLinkUnderline" onClick={itemClickedHandler} >Sofas</NavLink></p>
            <p className="para"><NavLink to={"collection/armchairs"} className="navLinkUnderline" onClick={itemClickedHandler} >Arm Chairs</NavLink></p>
            <p className="para"><NavLink to={"collection/lamps"} className="navLinkUnderline" onClick={itemClickedHandler} >Lamps</NavLink></p>
            <p className="para"><NavLink to={"collection/cushions"} className="navLinkUnderline" onClick={itemClickedHandler} >Cushions</NavLink></p>
      </div>

      <div className={classes.column}>
      <img src={Image5} alt="logo" className={classes.logoImage} />
      <h2 className="title"><NavLink to={"cart"} className="navLinkUnderline" onClick={itemClickedHandler} >Cart</NavLink></h2>
            {/* <p className="para"><NavLink to={"cart-1"} className="navLinkUnderline" onClick={itemClickedHandler} >cart 1</NavLink></p>
            <p className="para"><NavLink to={"cart-2"} className="navLinkUnderline" onClick={itemClickedHandler} >cart 2</NavLink></p> */}
      </div>

    </div>

                </div>
                </div>

            </div>

                

        </div>




<div className={classes.endLine}>
    <p className="para">Summer Sale 65% OFF. Shop Now</p>
</div>

        </div>
    )
};

export default ProductDropDown;