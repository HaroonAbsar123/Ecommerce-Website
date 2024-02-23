import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import classes from "./HomeProductCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";

import dummyImage from "../../Assets/displayImage.png";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import ProductContext from "../../Context/ProductContext";
import { toast } from "react-hot-toast";
import { db } from "../../firebase";
import { getDocs, collection, where, query, onSnapshot, doc, updateDoc, getDoc, setDoc, orderBy } from "firebase/firestore";
import Login from "../Login/Login";

// function getAllImages(item) {
//   let images = [];
//   item.colors.forEach((color) => {
//     images = [...images, ...color.images];
//   });
//   return images;
// }

function HomeProductCard({ item, title, price, discountedPrice, category, id }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [heartTrue, setHeartTrue] = useState(false);
  const [isLogin, setIsLogin] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const { userDetails, isUserLoggedIn } = useContext(ProductContext);

  const navigate=useNavigate();


  
  // const allImages = getAllImages(item);

  // const settings = {
  //   className: "slider variable-width",
  //   lazyLoad: true,
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  // };

const handleWishlistClick = async (e) => {
  e.preventDefault();

  if (userDetails) {
    setHeartTrue(true);
    const userListRef = collection(db, 'userList');
    const userDocQuery = query(userListRef, where('userId', '==', userDetails.userId));

    try {
      const querySnapshot = await getDocs(userDocQuery);
      if (querySnapshot.size === 1) {
        const userDocRef = doc(db, 'userList', querySnapshot.docs[0].id);
        const docSnapshot = await getDoc(userDocRef);

        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          let updatedWishlist=[...userData?.wishlist, item.id];
          await updateDoc(userDocRef, { wishlist: updatedWishlist });
        }

        // toast.success(`${item.title} added to wishlist`);
        setHeartTrue(true);
      } else {
        throw new Error('User document not found in Firestore');
      }
    } catch (error) {
      toast.error(`Error adding${item.title} added to wishlist`);
      setHeartTrue(false);
    }
  } else {
    toast("Please login to add items to wishlist")
    setIsLogin(true)
    setShowLoginModal(true)
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
            updatedWishlist = userData.wishlist.filter((id) => id !== item.id);
          }

          await updateDoc(userDocRef, { wishlist: updatedWishlist });
        }

        // toast.success(`${item.title} removed from wishlist`);
        setHeartTrue(false);
      } else {
        throw new Error('User document not found in Firestore');
      }
    } catch (error) {
      toast.error(`Error removing ${item.title} from wishlist`);
      setHeartTrue(true);
    }
  } else {
    navigate("/login");
  }
};

  
const checkWishlist = () => {
  if(userDetails){
    if (userDetails.wishlist?.includes(item.id)) {
      setHeartTrue(true);
    }
  }
};

// Call the function when the component mounts
useEffect(() => {
  checkWishlist();
}, [isUserLoggedIn]);



  return (
    <>
    <Link to={`/collection/${category}/${id}`} className="nolinkstyle">
      <div
       className={classes.productCard} style={{ position: "relative" }}>
     

  {
    heartTrue ?
    <button 
    className="heartButton"
onClick={handleWishlistRemove}
style={{ 
  position: "absolute", 
  top: "10px", 
  right: "10px", 
  zIndex: "1", 
  // background: "none", 
  border: "none", 
  padding: "10px", 
  cursor: "pointer",
  borderRadius: '50%'
}}
>
    <svg height="32" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H24V24H0z" fill="none"></path>
    <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z"></path>
  </svg>
  </button>
  :
  <button 
  className="heartButton"
onClick={handleWishlistClick}
style={{ 
position: "absolute", 
top: "10px", 
right: "10px", 
zIndex: "1", 
// background: "none", 
border: "none", 
padding: "10px", 
cursor: "pointer",
borderRadius: '50%'
}}
>
  <svg height="32" width="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0H24V24H0z" fill="none"></path>
  <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z" fill="transparent" stroke="rgb(255, 110, 110)" strokeWidth="2"></path>
</svg>
</button>
  }

        <div className={classes.productImageContainer}>
          {/* <Slider {...settings}>
            {allImages.map((item) => (
              <>
                {!imageLoaded && <img src={dummyImage} alt="" className={classes.productImage} />}
                <img key={item} src={item} alt="" className={classes.productImage} onLoad={() => setImageLoaded(true)} />
              </>
            ))}
          </Slider> */}
           <>
                {!imageLoaded && <img src={dummyImage} alt="" className={classes.productImage} />}
                <img key={item} src={item?.colors[0]?.images[0]} alt="" className={classes.productImage} onLoad={() => setImageLoaded(true)} />
              </>
        </div>
        <h3 className={classes.productTitle}>{title}</h3>
        {discountedPrice !== ("" || 0) ? (
          <div className={classes.priceContainer}>
            <p className={classes.regularPrice}>${price}</p>
            <p className={classes.discountedPrice}>${discountedPrice}</p>
          </div>
        ) : (
          <p className={classes.productPrice}>${price}</p>
        )}


      </div>
    </Link>
    <Login loginTrue={isLogin ? true : false} onClose={() => {setShowLoginModal(false)}} open={showLoginModal} />
        </>
  );
}


export default HomeProductCard;
