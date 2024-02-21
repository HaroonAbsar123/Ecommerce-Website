import React, { useState, useEffect } from "react";
import classes from "./ItemDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ProductContext from "../../../Context/ProductContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import toast from "react-hot-toast";
import RegularHeart from '../../../Assets/heartRegular.svg';
import { db } from "../../../firebase";
import { getDocs, collection, where, query, onSnapshot, doc, updateDoc, getDoc, setDoc, orderBy } from "firebase/firestore";


function ItemDetails({ Product, colorIndex, setColorIndex }) {
  const [selectedColor, setSelectedColor] = useState(
    Product.colors[colorIndex].name
  );
  const [selectedSize, setSelectedSize] = useState(
    Product.colors[colorIndex].sizes[0].name
  );
  
  const { CartAddItem, isUserLoggedIn, userDetails, cart } =
    useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [heartTrue, setHeartTrue] = useState(false);
  // const [isOutOfStock, setIsOutOfStock] = useState(false);
  


  const handleWishlistClick = async (e) => {
    e.preventDefault();
    setHeartTrue(true);
  
    if (userDetails) {
      const userListRef = collection(db, 'userList');
      const userDocQuery = query(userListRef, where('userId', '==', userDetails.userId));
  
      try {
        const querySnapshot = await getDocs(userDocQuery);
        if (querySnapshot.size === 1) {
          const userDocRef = doc(db, 'userList', querySnapshot.docs[0].id);
          const docSnapshot = await getDoc(userDocRef);
  
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            let updatedWishlist=[];
            if(userData.wishlist){
           updatedWishlist = userData.wishlist?.includes(Product.id)
              ? userData.wishlist
              : [...userData.wishlist, Product.id];
            } else {
              updatedWishlist=[Product.id]
            }
            await updateDoc(userDocRef, { wishlist: updatedWishlist });
          }
  
          // toast.success(`${item.title} added to wishlist`);
          setHeartTrue(true);
        } else {
          throw new Error('User document not found in Firestore');
        }
      } catch (error) {
        toast.error(`Error adding${Product.title} added to wishlist`);
        setHeartTrue(false);
      }
    } else {
      navigate("/login");
    }
  };
  
  const handleWishlistRemove = async (e) => {
    e.preventDefault();
    setHeartTrue(false);
  
    if (userDetails) {
      const userListRef = collection(db, 'userList');
      const userDocQuery = query(userListRef, where('userId', '==', userDetails.userId));
  
      try {
        const querySnapshot = await getDocs(userDocQuery);
        if (querySnapshot.size === 1) {
          const userDocRef = doc(db, 'userList', querySnapshot.docs[0].id);
          const docSnapshot = await getDoc(userDocRef);
  
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            let updatedWishlist = [];
  
            if (userData.wishlist) {
              updatedWishlist = userData.wishlist?.filter((id) => id !== Product.id);
            }
  
            await updateDoc(userDocRef, { wishlist: updatedWishlist });
          }
  
          // toast.success(`${item.title} removed from wishlist`);
          setHeartTrue(false);
        } else {
          throw new Error('User document not found in Firestore');
        }
      } catch (error) {
        toast.error(`Error removing ${Product.title} from wishlist`);
        setHeartTrue(true);
      }
    } else {
      navigate("/login");
    }
  };
  
    
  const checkWishlist = () => {
    if(userDetails){
      if (userDetails.wishlist?.includes(Product.id)) {
        setHeartTrue(true);
      }
    }
  };
  
  // Call the function when the component mounts
  useEffect(() => {
    checkWishlist();
  }, []);


  const navigate = useNavigate();

  const updateURL = (color, size) => {
    const urlParams = new URLSearchParams(location.search);


    // Update color parameter if provided or append to existing
    if (color!==null) {
        urlParams.set('color', color);
    }

    // Update size parameter if provided or append to existing
    if (size!==null) {
        urlParams.set('size', size);
    }

    const newUrl = `${location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
};





  const [color, setColor] = useState("");
  const [size, setSize] = useState("")

  const location = useLocation();

   useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const currColor = urlParams.get('color');
    const currSize = urlParams.get('size');
    if (currColor) {
      setColor(currColor);
    }
    if (currSize) {
      setSize(currSize);
    }
  }, [location]);


  const findColorIndex = (colorName) => {
    const colorIndex = Product.colors.findIndex((color) => color?.name?.toLowerCase() === colorName?.toLowerCase());
    return colorIndex;
};

useEffect(() => { 
  if (colorIndex !== undefined && colorIndex >= 0) {
      setSelectedColor(Product.colors[colorIndex].name);
  }
}, [colorIndex]);

useEffect(() => {
  const index = findColorIndex(color);
  if (index >= 0) {
      setColorIndex(index);
      updateURL(color, selectedSize);
  } else {
      // toast(`${color} color not available`);
      updateURL(Product.colors[0].name, selectedSize);
  }
}, [color]);

const findSizeIndex = () => {
  
  const sizeSearchParams = new URLSearchParams(location.search);
  const sizeIndex = Product.colors[colorIndex].sizes.findIndex((size) => size.name?.toLowerCase() === sizeSearchParams.get('size')?.toLowerCase());
  return sizeIndex;
};

useEffect(() => {
  const index = findSizeIndex();
  // console.log("SIZE INDEX", index)
  if (index >= 0) {
      setSelectedSize(Product.colors[colorIndex].sizes[index].name);
      updateURL(Product.colors[colorIndex].name, Product.colors[colorIndex].sizes[index].name);
  } else {
      const defaultSize = Product.colors[colorIndex].sizes[0].name;
      setSelectedSize(defaultSize);
      updateURL(Product.colors[colorIndex].name, defaultSize);
      
  }
}, [size, colorIndex]);


const handleColorChange = (color, index) => {
  setColorIndex(index);
  updateURL(color, selectedSize);
};

const handleSizeChange = (size) => {
  setSelectedSize(size);
  updateURL(selectedColor, size);
};






  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  useEffect(() => {
    const selectedSpec = Product?.colors[colorIndex];
    const selectedAvailability = selectedSpec?.sizes.find(
      (size) => size?.name === selectedSize
    );

    const newPrice = selectedAvailability?.discountedPrice
      ? selectedAvailability?.discountedPrice
      : selectedAvailability?.price;

    const { colors, ...productWithoutColors } = Product;

    setSelectedProduct({
      ...productWithoutColors,
      ...selectedAvailability,
      selectedColor: Product?.colors[colorIndex]?.name,
      name: Product?.title,
      selectedQuantity: selectedQuantity,
      price: newPrice,
      img: Product?.colors[colorIndex]?.images,
    });
  }, [colorIndex]);

  const handleAddToCart = () => {
    if (isUserLoggedIn) {
      // const newPrice = Product.discountedPrice
      //   ? Product.discountedPrice
      //   : Product.price;

      const selectedSpec = Product?.colors[colorIndex];
      const selectedAvailability = selectedSpec?.sizes.find(
        (size) => size?.name === selectedSize
      );

      const newPrice = selectedAvailability?.discountedPrice
        ? selectedAvailability?.discountedPrice
        : selectedAvailability?.price;

      const { colors, ...productWithoutColors } = Product;

      const ProductData = {
        cartID: `${Math.floor(10000000 + Math.random() * 90000000)}${
          userDetails?.cart?.length
        }`,
        productId: selectedProduct.id,
        product: {
          ...productWithoutColors,
          ...selectedAvailability,
          selectedColor: Product?.colors[colorIndex]?.name,
          name: Product?.title,
          selectedQuantity: selectedQuantity,
          price: newPrice,
          img: Product?.colors[colorIndex]?.images,
        },
        selectedQuantity: selectedQuantity,
        selectedColor: Product?.colors[colorIndex]?.name,
        selectedSize: selectedSize,
        price: newPrice,
      };

      console.log("ADDING ITEM TO CART", ProductData);

      CartAddItem(ProductData);

      toast.success(`${ProductData.product.title} added to cart`);
    } else {
      toast("Please login to add items to cart");
      navigate("/login");
    }
  };

  const handleBuyNow = () => {
    if (isUserLoggedIn) {
      handleAddToCart();
      navigate("/cart");
    } else {
      toast("Please login to buy products");
      navigate("/login");
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 900); // You can adjust the width threshold as needed
  };

  useEffect(() => {
    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile); // Add event listener

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);



  // const [disableButtons, setDisableButtons] = useState(false);
  // const [maxQty, setMaxQty] = useState(0);
  // const [error, setError] = useState("");


  // useEffect(() => {
  //   const selectedSpec = Product.colors[colorIndex];
  //   const selectedAvailability = selectedSpec.sizes.find(
  //     (size) => size.name === selectedSize
  //   );
  //   setIsOutOfStock(selectedAvailability?.quantity === 0)



  //   let MaxAvailable = selectedAvailability?.quantity;

  //   const item=cart.find((item) => item.productId===Product.id)
  //     if(item){
  //       MaxAvailable = selectedAvailability?.quantity - (selectedQuantity + item.selectedQuantity)
  //       setMaxQty(MaxAvailable);
  //       if(MaxAvailable<=0){
  //         setError("Maximum stock quantity reached. (cart items included)")
  //       } else {
  //         setError("");
  //       }
  //     }
  //     else {
  //       setMaxQty(selectedAvailability?.quantity)
  //     }
  //     console.log("MaxAvailable", MaxAvailable)

  // }, [colorIndex, selectedSize, selectedColor, cart, selectedQuantity])


  const getProductDetails = () => {
    const selectedSpec = Product.colors[colorIndex];
    const selectedAvailability = selectedSpec.sizes.find(
      (size) => size.name === selectedSize
    );

    const isOutOfStock = selectedAvailability?.quantity === 0;

    let MaxAvailable = selectedAvailability?.quantity;
    let maxQty=0;
    let error = "";

    
    const item=cart.find((item) => item.productId === Product.id &&
    item.selectedColor === selectedColor &&
    item.selectedSize === selectedSize)

    console.log("item", item)
      if(item){
        console.log("item in loop", item)
        MaxAvailable = selectedAvailability?.quantity - item.selectedQuantity
        // MaxAvailable = selectedAvailability?.quantity - (selectedQuantity + item.selectedQuantity) + 1
        maxQty=MaxAvailable;
        if(MaxAvailable<=0){
          error="Maximum stock quantity reached. (cart items included)";
        } else {
          error="";
        }
      }
      else {
        maxQty=MaxAvailable;
      }
      
    console.log("MaxAvailable", MaxAvailable)
    console.log("maxQty", maxQty)

    return (
      <div className={classes.mainContainer}>
        <div className={classes.secondContainer}>
          {!isMobile && <h2 className={classes.title}>{Product.title}</h2>}
          <div className={classes.price}>
            {selectedAvailability?.discountedPrice &&
            selectedAvailability?.discountedPrice <
              selectedAvailability?.price ? (
              <div className={classes.priceContainer}>
                <p className={classes.regularPrice}>
                  ${selectedAvailability?.price}
                </p>
                <p className={classes.discountedPrice}>
                  ${selectedAvailability?.discountedPrice}
                </p>
              </div>
            ) : (
              <p className={classes.productPrice}>
                ${selectedAvailability?.price}
              </p>
            )}
          </div>
          <div className={classes.color}>
            <div className={classes.colorTitles}>
              <b>Color:</b> {selectedColor}
            </div>
            <div className={classes.colorButtons}>
              {Product.colors.map((spec, index) => (
                <div
                  key={spec.name}
                  className={`${classes.colorOption} ${
                    selectedColor === spec.name ? classes.active : ""
                  }`}
                  style={{ backgroundColor: spec.name }}
                  onClick={() => handleColorChange(spec.name, index)}
                ></div>
              ))}
            </div>
          </div>
          <div className={classes.size}>
            <div className={classes.colorTitles}>
              <b>Size:</b> {selectedSize}
            </div>
            <div className={classes.colorButtons}>
              {selectedSpec.sizes.map((size) => (
                <Button
                  variant="outlined"
                  key={size.name}
                  style={{
                    color: "#1e1e1e",
                    // borderColor: "#1e1e1e",
                    margin: "3px",
                    borderWidth: "1px",
                    border:
                      selectedSize === size.name
                        ? "1px solid #1e1e1e"
                        : "1px solid #ccc",
                    background:
                      selectedSize === size.name ? "#fff" : "transparent",
                  }}
                  onClick={() => handleSizeChange(size.name)}
                >
                  {size.name}
                </Button>
              ))}
            </div>
          </div>
          <div
            className={classes.availability}
            style={isOutOfStock ? { color: "red" } : {}}
          >
            <b>Availability:</b>{" "}
            {isOutOfStock ? (
              "Out of Stock"
            ) : (
              <>{isUserLoggedIn &&
              
              <>
                {maxQty<=selectedQuantity ? (
                  <>{selectedAvailability?.quantity} items in stock
                  <span style={{ color: "red",  marginLeft: '5px', fontSize: '1rem' }}><br/>
                    (Max stock quantity reached. Cart items included)
                  </span>
                  </>
                ) : (
                  `${selectedAvailability?.quantity} items in stock`
                )}
                </>}
              </>
            )}
          </div>
          {/* PREVIOUS BUTTONS SETTING */}
          {/* <div className={classes.quantity}>
            <div className={classes.quantityTitle}>
              <b>Quantity:</b> {selectedQuantity}
            </div>
            <div className={classes.buttonsContainer}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  disabled={isOutOfStock}
                  style={{
                    backgroundColor: isOutOfStock ? "#ccc" : "#1e1e1e",
                    color: "#fff",
                    overflow: "hidden",
                    fontSize: "1rem",
                  }}
                  onClick={() => {
                    selectedQuantity > 1 &&
                      setSelectedQuantity((prev) => prev - 1);
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} size="1x" />
                </IconButton>
                <div
                  style={{
                    color: isOutOfStock ? "#ccc" : "#1e1e1e",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  {selectedQuantity}
                </div>
                <IconButton
                  disabled={
                    isOutOfStock ||
                        maxQty<=selectedQuantity
                  }
                  style={{
                    backgroundColor:
                      (isOutOfStock ||
                        maxQty<=selectedQuantity)
                        ? "#ccc"
                        : "#1e1e1e",
                    color: "#fff",
                    overflow: "hidden",
                    fontSize: "1rem",
                  }}
                  onClick={() => {
                    setSelectedQuantity((prev) => prev + 1);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} size="1x" />
                </IconButton>
              </div>

              <Button
                variant="outlined"
                style={{
                  color: (isOutOfStock || maxQty<=0) ? "#ccc" : "#1e1e1e",
                  borderColor: "#1e1e1e",
                  flex: 1,
                  borderColor: (isOutOfStock || maxQty<=0) ? "#ccc" : "#1e1e1e",
                }}
                onClick={handleAddToCart}
                disabled={isOutOfStock || maxQty<=0}
              >
                Add to Cart
              </Button>
            </div>
          </div>
          <Button
            style={{
              backgroundColor: isOutOfStock ? "#ccc" : "#1e1e1e",
              color: "#fff",
              flex: 1,
              width: "100%",
            }}
            variant="contained"
            onClick={handleBuyNow}
            disabled={isOutOfStock}
          >
            Buy Now
          </Button> */}

<div className={classes.quantity}>
            <div className={classes.quantityTitle}>
              <b>Quantity:</b> {selectedQuantity}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  disabled={isOutOfStock}
                  style={{
                    backgroundColor: isOutOfStock ? "#ccc" : "#1e1e1e",
                    color: "#fff",
                    overflow: "hidden",
                    fontSize: "1rem",
                  }}
                  onClick={() => {
                    selectedQuantity > 1 &&
                      setSelectedQuantity((prev) => prev - 1);
                  }}
                >
                  <FontAwesomeIcon icon={faMinus} size="1x" />
                </IconButton>
                <div
                  style={{
                    color: isOutOfStock ? "#ccc" : "#1e1e1e",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  {selectedQuantity}
                </div>
                <IconButton
                  disabled={
                    isOutOfStock ||
                        maxQty<=selectedQuantity
                  }
                  style={{
                    backgroundColor:
                      (isOutOfStock ||
                        maxQty<=selectedQuantity)
                        ? "#ccc"
                        : "#1e1e1e",
                    color: "#fff",
                    overflow: "hidden",
                    fontSize: "1rem",
                  }}
                  onClick={() => {
                    setSelectedQuantity((prev) => prev + 1);
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} size="1x" />
                </IconButton>
              </div>

            <div className={classes.buttonsContainer} style={{marginTop: '1rem'}}>

            {
    heartTrue ?
              <IconButton
              onClick={handleWishlistRemove}
                variant="outlined"
                style={{
                  color:"#1e1e1e",
                  border: '1px solid #1e1e1e',
                  borderRadius: '5px'
                }}
              >
                <FontAwesomeIcon icon={faHeart} style={{height: '25px'}}/>
              </IconButton>
              :
              <IconButton
              onClick={handleWishlistClick}
              variant="outlined"
              style={{
                color:"#1e1e1e",
                border: '1px solid #1e1e1e',
                borderRadius: '5px'
              }}
            >
<img src={RegularHeart} alt="wishlist" height={'25px'} />
            </IconButton>
  }

              <Button
            style={{
              backgroundColor: (isOutOfStock || maxQty<=0) ? "#ccc" : "#1e1e1e",
              color: "#fff",
              flex: 1,
              width: "100%",
            }}
            variant="contained"
            onClick={handleAddToCart}
            disabled={isOutOfStock || maxQty<=0}
          >
            Add to Cart
          </Button>
            </div>
          </div>
          
          <div
            style={{
              borderBottom: "1px solid #ccc",
              paddingBottom: "2rem",
              marginTop: "2rem",
            }}
          >
            <p className="para">
              <FontAwesomeIcon icon={faTruck} size="1x" />
              <span style={{ marginLeft: "1rem" }}>
                Estimated Delivery: within 5-7 days
              </span>
            </p>
            <p className="para">
              <FontAwesomeIcon icon={faShoppingCart} size="1x" />
              <span style={{ marginLeft: "1rem" }}>
                Free shipping: On orders over $1499 and above
              </span>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {/* <p className="para">
              <b>ID: </b>
              {Product.id}
            </p> */}
            <p className="para">
              <b>Category: </b>
              {Product.category}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return <div className={classes.itemDetails}>{getProductDetails()}</div>;
}

export default ItemDetails;
