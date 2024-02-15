import ProductContext from "./ProductContext";
import React, { useState } from "react";
import { useEffect } from "react";
import { database, db } from "../firebase";
import { getDocs, collection, where, query, onSnapshot, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { debounce } from 'lodash';
import Image1 from "../Assets/Products/1.png";
import Image2 from "../Assets/Products/2.png";
import Image3 from "../Assets/Products/3.png";
import Image4 from "../Assets/Products/4.png";
import Image5 from "../Assets/Products/5.png";
import Image6 from "../Assets/Products/6.png";
import Image7 from "../Assets/Products/7.png";
import Image8 from "../Assets/Products/8.png";
import Image9 from "../Assets/Products/9.png";
import { onValue, ref } from "firebase/database";


const initialCoupons = [
  { id: 1, couponCode: "CODE1", discount: 0.1 }, // 10% off coupon with code "CODE1"
  { id: 2, couponCode: "CODE2", discount: 0.1 }, // 10% off coupon with code "CODE2"
  { id: 3, couponCode: "CODE3", discount: 0.2 }, // 20% off coupon with code "CODE3"
  { id: 4, couponCode: "CODE4", discount: 0.2 }, // 20% off coupon with code "CODE4"
  { id: 5, couponCode: "CODE5", discount: 0.2 }, // 20% off coupon with code "CODE5"
];

function ProductContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [couponApplied, setCouponApplied] = useState({});

  function CartUpdateItem(product) {
    const updatedCart = cart.map((item) =>
      item.cartID === product.cartID
        ? { ...item, selectedQuantity: product.selectedQuantity }
        : item
    );

    setCart(updatedCart);
  }

  function CartAddItem(product) {
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.product.id === product.product.id &&
        item.selectedColor === product.selectedColor &&
        item.selectedSize === product.selectedSize
    );

    if (existingItemIndex !== -1) {
      // Item with the same properties already exists, update its quantity and total
      const updatedCart = cart.map((item, index) =>
        index === existingItemIndex
          ? {
              ...item,
              selectedQuantity:
                item.selectedQuantity + product.selectedQuantity,
            }
          : item
      );
      setCart(updatedCart);
    } else {
      // Item with the same properties does not exist, add the new item to the cart
      setCart([...cart, product]);
    }
  }

  function CartRemoveItem(id) {
    const updatedCart = cart.filter((item) => item.cartID !== id);
    setCart(updatedCart);
  }

  function DisplayCart() {
    console.log("Cart", cart);
  }

  function DisplayProducts() {
    console.log("Products", products);
  }

  

  const fetchData = () => {
    const productsRef = ref(database, "products");
  
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      // Assuming setProducts is a state update function
      setProducts(data);
      console.log("Data Fetched:", data);
    }, (error) => {
      console.error("Error while fetching data:", error);
    });
  };
  
  
  useEffect(() => {
    fetchData();
  }, []);


  // const updateData = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://ecommerce-791a1-default-rtdb.firebaseio.com/products.json", // Append "/products.json" to the URL to access the "Products" node.
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(Products), // Assuming "Products" is a valid object or array containing the data you want to update.
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(
  //         "Failed to update data in the Firebase Realtime Database."
  //       );
  //     }

  //     console.log("Data Updated");
  //   } catch (error) {
  //     console.error("Error while updating data:", error);
  //   }
  // };

  // updateData();


  // _____________________________________________________________

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState("")
  const [userType, setUserType] = useState("")
  const userId = localStorage.getItem('userId');
  const [isCartFetched, setIsCartFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [initialCart, setInitialCart] = useState(null);
  useEffect(() => {
    fetchDataHandler();
  }, []); // Run only once on component mount

  function fetchDataHandler() {
    const localIsUserLoggedIn = localStorage.getItem('isLoggedIn');

    if (localIsUserLoggedIn === 'true') {
      setIsUserLoggedIn(true);

      const userListRef = collection(db, 'userList');
      const q = query(userListRef, where('userId', '==', userId));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.size === 1) {
          querySnapshot.forEach((doc) => {
            const userDetails = doc.data();
            setUserDetails(userDetails);
            setUserType(userDetails.type);
            const cartData = userDetails.cart || [];
            setCart(cartData);
            setInitialCart(cartData);
            setIsCartFetched(true);
            setLoading(false); // Set loading to false when data is fetched
            console.log("USER DATA FETCHEDDDDDDDDDDDDDDDD");
          });
        } else {
          console.log('User not found in Firestore');
          setLoading(false); // Set loading to false if user is not found
        }
      }, (error) => {
        console.error('Error fetching user details: ', error);
        setLoading(false); // Set loading to false if there's an error
        alert("Error fetching user details");
      });

      return () => {
        unsubscribe();
      };
    } else {
      setIsUserLoggedIn(false);
      setLoading(false); // Set loading to false if user is not logged in
    }
  }

  
const DEBOUNCE_DELAY = 1000; // Adjust the debounce delay as needed

  const [shouldPostCart, setShouldPostCart] = useState(false);

  useEffect(() => {
    if (!isCartFetched) {
      console.log("DATA NOT FETCHED");
      return;
    }

    console.log("POSTING CART FETCHED");

    const localIsUserLoggedIn = localStorage.getItem('isLoggedIn');
    if (localIsUserLoggedIn !== 'true') return;

    const userListRef = collection(db, 'userList');
    const userDocQuery = query(userListRef, where('userId', '==', userId));

    const debouncePostCart = debounce(() => {
      getDocs(userDocQuery)
        .then((querySnapshot) => {
          if (querySnapshot.size === 1) {
            const userDocRef = doc(db, 'userList', querySnapshot.docs[0].id);
            return updateDoc(userDocRef, { cart: cart });
          } else {
            throw new Error('User document not found in Firestore');
          }
        })
        .then(() => {
          console.log('Cart data posted to Firestore successfully');
          setInitialCart(cart);
        })
        .catch((error) => {
          console.error('Error posting/updating cart data to Firestore: ', error);
          alert('Failed to update your cart. Please try again.');
        });
    }, DEBOUNCE_DELAY);

    if (shouldPostCart) {
      debouncePostCart();
      setShouldPostCart(false);
    }

    return () => debouncePostCart.cancel(); // Cancel debounce on unmount or dependencies change
  }, [cart, isCartFetched, shouldPostCart, userId]);

  useEffect(() => {
    // Set shouldPostCart to true whenever the cart changes
    setShouldPostCart(true);
  }, [cart]);


  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        coupons,
        couponApplied,
        setCouponApplied,
        CartAddItem,
        CartRemoveItem,
        DisplayCart,
        DisplayProducts,
        // updateData,
        fetchData,
        CartUpdateItem,
        isUserLoggedIn,
        userDetails,
        userType,
        setIsUserLoggedIn,
        setUserDetails,
        setUserType,
        isUserLoggedIn,
        loading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
