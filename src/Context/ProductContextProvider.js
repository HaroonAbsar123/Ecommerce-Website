import ProductContext from "./ProductContext";
import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { getDocs, collection, where, query, onSnapshot, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

import Image1 from "../Assets/Products/1.png";
import Image2 from "../Assets/Products/2.png";
import Image3 from "../Assets/Products/3.png";
import Image4 from "../Assets/Products/4.png";
import Image5 from "../Assets/Products/5.png";
import Image6 from "../Assets/Products/6.png";
import Image7 from "../Assets/Products/7.png";
import Image8 from "../Assets/Products/8.png";
import Image9 from "../Assets/Products/9.png";
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

  
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://ecommerce-791a1-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to fetch data from the Firebase Realtime Database."
        );
      }

      const data = await response.json();
      setProducts(data);
      console.log("Data Fetched:", data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const updateData = async () => {
    try {
      const response = await fetch(
        "https://ecommerce-791a1-default-rtdb.firebaseio.com/products.json", // Append "/products.json" to the URL to access the "Products" node.
        {
          method: "PUT",
          body: JSON.stringify(Products), // Assuming "Products" is a valid object or array containing the data you want to update.
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update data in the Firebase Realtime Database."
        );
      }

      console.log("Data Updated");
    } catch (error) {
      console.error("Error while updating data:", error);
    }
  };

  // updateData();


  // _____________________________________________________________

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState("")
  const [userType, setUserType] = useState("")
  const userId = localStorage.getItem('userId');
  const [isCartFetched, setIsCartFetched] = useState(false);

  
  const [initialCart, setInitialCart] = useState(null);
  function fetchDataHandler(){

    // Fetch the 'isUserLoggedIn' value from local storage
    const localIsUserLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (localIsUserLoggedIn === 'true') {
      setIsUserLoggedIn(true);
  
      // Query Firestore to get user details based on userId
      const userListRef = collection(db, 'userList');
      const q = query(userListRef, where('userId', '==', userId));
      
      // Attach an onSnapshot listener to the query
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.size === 1) {
          querySnapshot.forEach((doc) => {
            const userDetails = doc.data();
            setUserDetails(userDetails); // Set the user details in your context
            setUserType(userDetails.type);
            const cartData = userDetails.cart || [];
            setCart(cartData);
            setInitialCart(cartData);  // Set the initial fetched cart here
            setIsCartFetched(true);
            console.log("USER DATA FETCHEDDDDDDDDDDDDDDDD")
          });
        } else {
          console.log('User not found in Firestore');
        }
      }, (error) => {
        console.error('Error fetching user details: ', error);
        alert("Error fetching user details")
      });
      
      // Return a cleanup function to unsubscribe from the listener when the component unmounts
      return () => {
        unsubscribe();
      };
    } else {
      setIsUserLoggedIn(false);
    }
  }
  // FETCHDATA
  useEffect(() => {
    fetchDataHandler()
  }, [isUserLoggedIn]);


    // POST DATA
useEffect(() => {
  if (!isCartFetched) {
    console.log("DATA NOT FETCHED")
    return};  // If cart data is not fetched, return
    console.log("POSTING CART FETCHED")
  const localIsUserLoggedIn = localStorage.getItem('isLoggedIn');
  if (localIsUserLoggedIn !== 'true') return;  // If the user is not logged in, return

  const userListRef = collection(db, 'userList');
  const userDocQuery = query(userListRef, where('userId', '==', userId));

  getDocs(userDocQuery)
    .then((querySnapshot) => {
      if (querySnapshot.size === 1) {
        const userDocRef = doc(db, 'userList', querySnapshot.docs[0].id);
        return updateDoc(userDocRef, { cart: cart });  // We return the promise here for chaining
      } else {
        throw new Error('User document not found in Firestore');
      }
    })
    .then(() => {
        console.log('Cart data posted to Firestore successfully');
        setInitialCart(cart);  // Update the initial cart after a successful post
    })
    .catch((error) => {
      console.error('Error posting/updating cart data to Firestore: ', error);
      alert('Failed to update your cart. Please try again.');
    });
}, [cart, isCartFetched, initialCart, userId]);


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
        updateData,
        fetchData,
        CartUpdateItem,
        isUserLoggedIn,
        userDetails,
        userType,
        setIsUserLoggedIn,
        setUserDetails,
        setUserType,
        isUserLoggedIn
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;

const Products = {
  armchairs: [
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image1, Image2, Image3, Image4, Image5],
      title: "Premium ArmChair 1",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "armchairs",
      packof: 1,
      hot: true,
      homePageItem: true,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },

    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image1, Image2, Image3, Image4, Image5],
      title: "Premium ArmChair Brown 2",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "armchairs",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image1, Image2, Image3, Image4, Image5],
      title: "Premium ArmChair 3",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "armchairs",
      packof: 1,
      hot: true,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },

    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image1, Image2, Image3, Image4, Image5],
      title: "Premium ArmChair Brown 4",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "armchairs",
      packof: 1,
      hot: true,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image1, Image2, Image3, Image4, Image5],
      title: "Premium ArmChair 5",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "armchairs",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },

    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image1, Image2, Image3, Image4, Image5],
      title: "Premium ArmChair Brown 6",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "armchairs",
      packof: 1,
      hot: true,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image1, Image2, Image3, Image4, Image5],
      title: "Premium ArmChair 7",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "armchairs",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },

    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image1, Image2, Image3, Image4, Image5],
      title: "Premium ArmChair Brown 8",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "armchairs",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
  ],

  sofas: [
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image9, Image8, Image7, Image6, Image5],
      title: "Premium Sofa Brown 1",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "sofas",
      packof: 1,
      hot: false,
      homePageItem: true,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image9, Image8, Image7, Image6, Image5],
      title: "Premium Sofa Brown 2",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "sofas",
      packof: 1,
      hot: true,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image9, Image8, Image7, Image6, Image5],
      title: "Premium Sofa Brown 3",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "sofas",
      packof: 1,
      hot: true,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image9, Image8, Image7, Image6, Image5],
      title: "Premium Sofa Brown 4",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "sofas",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image9, Image8, Image7, Image6, Image5],
      title: "Premium Sofa Brown 5",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "sofas",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image9, Image8, Image7, Image6, Image5],
      title: "Premium Sofa Brown 6",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "sofas",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
  ],

  lamps: [
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image7, Image6, Image5, Image4, Image3],
      title: "Premium Lamp 7",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "lamps",
      packof: 1,
      hot: true,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },

    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image7, Image6, Image5, Image4, Image3],
      title: "Premium Lamp 8",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "lamps",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image7, Image6, Image5, Image4, Image3],
      title: "Premium Lamp 9",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "lamps",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image7, Image6, Image5, Image4, Image3],
      title: "Premium Lamp 10",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "lamps",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image7, Image6, Image5, Image4, Image3],
      title: "Premium Lamp 11",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "lamps",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image7, Image6, Image5, Image4, Image3],
      title: "Premium Lamp 12",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "lamps",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image7, Image6, Image5, Image4, Image3],
      title: "Premium Lamp 13",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "lamps",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
  ],

  cushions: [
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image8, Image7, Image6, Image5, Image4],
      title: "Premium Cushion 1",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "cushions",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image8, Image7, Image6, Image5, Image4],
      title: "Premium Cushion 2",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "cushions",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image8, Image7, Image6, Image5, Image4],
      title: "Premium Cushion 3",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "cushions",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image8, Image7, Image6, Image5, Image4],
      title: "Premium Cushion 4",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "cushions",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image8, Image7, Image6, Image5, Image4],
      title: "Premium Cushion 5",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "cushions",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image8, Image7, Image6, Image5, Image4],
      title: "Premium Cushion 6",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "cushions",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image8, Image7, Image6, Image5, Image4],
      title: "Premium Cushion 7",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "cushions",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image8, Image7, Image6, Image5, Image4],
      title: "Premium Cushion 8",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "cushions",
      packof: 1,
      hot: false,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image8, Image7, Image6, Image5, Image4],
      title: "Premium Cushion 9",
      specs: [
        {
          color: "red",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "blue",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
        {
          color: "green",
          available: [
            { size: "S", availability: true },
            { size: "L", availability: true },
            { size: "XL", availability: false },
            { size: "XXL", availability: true },
          ],
        },
      ],
      price: 99,
      discountedPrice: 89,
      category: "cushions",
      packof: 1,
      hot: true,
      homePageItem: false,
      description:
        "Armchairs are a popular and classic type of seating furniture designed for comfort and relaxation. They are single-seat chairs typically distinguished by their deep, wide seats, high backs, and armrests on either side. These features provide excellent support and make armchairs perfect for lounging, reading, or simply unwinding after a long day.\nArmchairs come in various styles, ranging from traditional to modern, and can be made from a variety of materials, including wood, metal, and upholstery fabrics. The design possibilities are vast, allowing armchairs to complement various interior decor themes and settings. \nOne of the key advantages of armchairs is their versatility. They can be placed in living rooms, bedrooms, home offices, or any other space where a comfortable and stylish seating option is needed. Some armchairs may have additional features like reclining mechanisms, swivel bases, or built-in cup holders, enhancing their functionality and convenience.\nOver the years, armchairs have evolved to meet different ergonomic needs and aesthetic preferences, making them a timeless and beloved piece of furniture in homes, hotels, offices, and other public spaces. With their inviting and cozy appeal, armchairs continue to be an essential element in interior design, providing individuals with a perfect spot to unwind and enjoy moments of relaxation.",
    },
  ],
};
