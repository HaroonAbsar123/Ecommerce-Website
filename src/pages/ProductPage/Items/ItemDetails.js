import React, { useState } from "react";
import classes from "./ItemDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ProductContext from "../../../Context/ProductContext";
import { useNavigate } from "react-router-dom";

function ItemDetails({Products}) {
  const [selectedColor, setSelectedColor] = useState(Products.specs[0].color);
  const [selectedSize, setSelectedSize] = useState(Products.specs[0].available[0].size);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const navigate=useNavigate();

  const {CartAddItem, isUserLoggedIn} = useContext(ProductContext);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedSize(Products.specs[0].available[0].size);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {

    if (isUserLoggedIn){

    const newPrice=Products.discountedPrice ? Products.discountedPrice : Products.price;

    const Product={
      cartID: Math.floor(10000000 + Math.random() * 90000000),
      product: Products,
      selectedQuantity: selectedQuantity,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      price: newPrice,
    }

    console.log(Product);


    CartAddItem(Product)
    // Add the item to the cart
    console.log(`Added to cart \n chosen size: ${selectedSize} \n chosenColor: ${selectedColor} \n chosenQuantity: ${selectedQuantity}\n ${Product}`);
  } else {navigate("/login")}

};

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
    
    // Proceed with the purchase
    console.log("Buy now");
  };

  const getProductDetails = () => {
    const product = Products;
    const selectedSpec = product.specs.find((spec) => spec.color === selectedColor);
    const selectedAvailability = selectedSpec.available.find((avail) => avail.size === selectedSize);
    const isOutOfStock = selectedAvailability.availability === false;

    return (
      <div className={classes.mainContainer}>

        <div className={classes.secondContainer}>
        <h2 className={classes.title}>{product.title}</h2>
        
        <div className={classes.price}>
            
        {product.discountedPrice ? (
        <div className={classes.priceContainer}>
          <p className={classes.regularPrice}>${product.price}</p>
          <p className={classes.discountedPrice}>${product.discountedPrice}</p>
        </div>
      ) : (
        <p className={classes.productPrice}>${product.price}</p>
      )}
      
      </div>
        {/* <div className={classes.color}>
            <div className={classes.colorTitles}>
          <b>Color:</b> {selectedColor}
          </div>
          <div className={classes.colorButtons}>
          {product.specs.map((spec) => (
            <button
              key={spec.color}
              className={`${classes.colorOption} ${selectedColor === spec.color ? classes.active : ""}`}
              style={{ backgroundColor: spec.color }}
              onClick={() => handleColorChange(spec.color)}
            />
          ))}
          </div>
        </div> */}
        {/* <div className={classes.size}>
            <div className={classes.colorTitles}>
            <b>Size:</b> {selectedSize}
          </div>

          <div  className={classes.colorButtons}>
          {selectedSpec.available.map((avail) => (
            <button
              key={avail.size}
              className={`${classes.sizeOption} ${selectedSize === avail.size ? classes.active : ""}`}
              onClick={() => handleSizeChange(avail.size)}
            >
              {avail.size}
            </button>
          ))}
          </div>
        </div> */}
        <div className={classes.availability} style={isOutOfStock ? { color: 'red' } : {}}>
        <b>Availability:</b> {isOutOfStock ? "Out of Stock" : `In Stock`}
        </div>
        <div className={classes.quantity}>
            <div className={classes.quantityTitle}>
            <b>Quantity:</b> {selectedQuantity}
          </div>




<div className={classes.buttonsContainer}>

<div className={`${classes.quantityContainer} ${isOutOfStock ? classes.disabled : ""}`}>

          <button disabled={isOutOfStock} onClick={() => { selectedQuantity > 1 && setSelectedQuantity(selectedQuantity - 1) }}><FontAwesomeIcon icon={faMinus} size="1x" /></button>
  <p>{selectedQuantity}</p>
  <button disabled={isOutOfStock} 
  // onClick={() => { selectedQuantity < selectedAvailability.quantity && setSelectedQuantity(selectedQuantity + 1) 
    onClick={() => {  setSelectedQuantity(selectedQuantity + 1) 
  }}><FontAwesomeIcon icon={faPlus} size="1x" /></button>
 
</div>




        <button
          className={classes.addToCartButton}
          onClick={handleAddToCart}
          disabled={isOutOfStock}
        >
          Add to Cart
        </button>



        </div>

        </div>

        
        <button
          className={classes.buyNowButton}
          onClick={handleBuyNow}
          disabled={isOutOfStock}
        >
          Buy Now
        </button>


        <div style={{borderBottom: '1px solid #ccc', paddingBottom: '2rem', marginTop: '2rem'}}>
        <p className="para"><FontAwesomeIcon icon={faTruck} size="1x" /><span style={{marginLeft: '1rem'}}>Estimated Delivery: within 5-7 days</span></p>
        <p className="para"><FontAwesomeIcon icon={faShoppingCart} size="1x" /><span style={{marginLeft: '1rem'}}>Free shipping: On orders over $1499 and above</span></p>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <p className="para"><b>ID: </b>{product.id}</p>
        <p className="para"><b>Category: </b>{product.category}</p>
        </div>

      </div>
      </div>
    );
  };

  return <div className={classes.itemDetails}>{getProductDetails()}</div>;
}

export default ItemDetails;
