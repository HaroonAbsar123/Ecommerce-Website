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
import Cookies from 'universal-cookie';


const initialCoupons = [
  { id: 1, couponCode: "CODE1", discount: 0.1 }, // 10% off coupon with code "CODE1"
  { id: 2, couponCode: "CODE2", discount: 0.1 }, // 10% off coupon with code "CODE2"
  { id: 3, couponCode: "CODE3", discount: 0.2 }, // 20% off coupon with code "CODE3"
  { id: 4, couponCode: "CODE4", discount: 0.2 }, // 20% off coupon with code "CODE4"
  { id: 5, couponCode: "CODE5", discount: 0.2 }, // 20% off coupon with code "CODE5"
];

function ProductContextProvider({ children }) {

  
  const cookies = new Cookies();

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [couponApplied, setCouponApplied] = useState({});

  function CartUpdateItem(product) {
    
    const updatedProduct = {...product, addedOn: new Date}

    const updatedCart = cart.map((item) =>
      item.cartID === updatedProduct.cartID
        ? { ...item, selectedQuantity: updatedProduct.selectedQuantity, addedOn: new Date }
        : item
    );

    setCart(updatedCart);
  }

  function CartAddItem(product) {
    const updatedProduct = {...product, addedOn: new Date}

    const existingItemIndex = cart.findIndex(
      (item) =>
        item.product.id === updatedProduct.product.id &&
        item.selectedColor === updatedProduct.selectedColor &&
        item.selectedSize === updatedProduct.selectedSize
    );

    if (existingItemIndex !== -1) {
      // Item with the same properties already exists, update its quantity and total
      const updatedCart = cart.map((item, index) =>
        index === existingItemIndex
          ? {
              ...item,
              selectedQuantity:
                item.selectedQuantity + updatedProduct.selectedQuantity,
              addedOn: new Date
            }
          : item
      );
      setCart(updatedCart);
    } else {
      // Item with the same properties does not exist, add the new item to the cart
      setCart([...cart, updatedProduct]);
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


  const updateData = async () => {
    try {
      const response = await fetch(
        "https://ecommerce-791a1-default-rtdb.firebaseio.com/products.json", // Append "/products.json" to the URL to access the "Products" node.
        {
          method: "PUT",
          body: JSON.stringify(items), // Assuming "Products" is a valid object or array containing the data you want to update.
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




  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState("")
  const [userType, setUserType] = useState("")
  const userId = cookies.get("userId");
  const [isCartFetched, setIsCartFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [initialCart, setInitialCart] = useState(null);
  useEffect(() => {
    fetchDataHandler();
  }, []); // Run only once on component mount

  function fetchDataHandler() {
    // const localIsUserLoggedIn = localStorage.getItem('isLoggedIn');

    const userId = cookies.get("userId");
    const localIsUserLoggedIn = cookies.get("isLoggedIn");

    if (localIsUserLoggedIn === true) {
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

    const localIsUserLoggedIn = cookies.get("isLoggedIn");

    if (localIsUserLoggedIn !== true) return;

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


  
  // updateData();

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
        loading,
        updateData
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;


const items = {
  lamps: [
  {
    category: "lamps",
    description: "Premium Lamp",
    discountedPrice: 28,
    homePageItem: true,
    hot: true,
    id: "rYzHjcbwygyA",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FrYzHjcbwygyA%2FTu05zkVO62lN?alt=media&token=166e15b8-1c4c-409a-a6ac-9702903dd3cc",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FrYzHjcbwygyA%2FCJR8sZNp8dYa?alt=media&token=59c0e9de-95bf-4646-9b53-7691877fcdee"
    ],
    packof: 1,
    price: 30,
    specs: [
      {
        available: [
          {
            availability: true,
            size: "L"
          }
        ],
        color: "red"
      }
    ],
    title: "Lamp 3"
  },
  {
    category: "lamps",
    description: "Premium Lamp",
    discountedPrice: 28,
    homePageItem: true,
    hot: true,
    id: "rYzbdfb4wygyA",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FrYzHjcbwygyA%2FTu05zkVO62lN?alt=media&token=166e15b8-1c4c-409a-a6ac-9702903dd3cc",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FrYzHjcbwygyA%2FCJR8sZNp8dYa?alt=media&token=59c0e9de-95bf-4646-9b53-7691877fcdee"
    ],
    packof: 1,
    price: 30,
    specs: [
      {
        available: [
          {
            availability: true,
            size: "L"
          }
        ],
        color: "red"
      }
    ],
    title: "Lamp 3"
  },
],
cushions: [
  {
    category: "cushions",
    description: "Premium Sofa",
    discountedPrice: 145,
    homePageItem: true,
    hot: true,
    id: "aVhrth34tdGFE",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FV6v0uGBMXlYQ?alt=media&token=0560ec76-2737-44d5-975a-be45fd38e1c9",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FgxvMNKQRpgIA?alt=media&token=f5e77b28-30f3-4dfa-a682-ad46b3038e30"
    ],
    packof: 1,
    price: 150,
    specs: [
      {
        available: [
          {
            availability: true,
            size: "L"
          },
          {
            availability: true,
            size: "XL"
          },
          {
            availability: true,
            size: "XXL"
          },
          {
            availability: true,
            size: "XXXL"
          },
          {
            availability: true,
            size: "XXXXL"
          }
        ],
        color: "Red"
      }
    ],
    title: "Sofa 3"
  },
  {
    category: "cushions",
    description: "Premium Sofa",
    discountedPrice: 145,
    homePageItem: true,
    hot: true,
    id: "aVh23sdg35btdGFE",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FV6v0uGBMXlYQ?alt=media&token=0560ec76-2737-44d5-975a-be45fd38e1c9",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FgxvMNKQRpgIA?alt=media&token=f5e77b28-30f3-4dfa-a682-ad46b3038e30"
    ],
    packof: 1,
    price: 150,
    specs: [
      {
        available: [
          {
            availability: true,
            size: "L"
          },
          {
            availability: true,
            size: "XL"
          },
          {
            availability: true,
            size: "XXL"
          },
          {
            availability: true,
            size: "XXXL"
          },
          {
            availability: true,
            size: "XXXXL"
          }
        ],
        color: "Red"
      }
    ],
    title: "Sofa 3"
  }
],
armchairs: [
  {
    category: "armchairs",
    description: "Premium Sofa",
    discountedPrice: 145,
    homePageItem: true,
    hot: true,
    id: "aVbg8m3o32GFE",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FV6v0uGBMXlYQ?alt=media&token=0560ec76-2737-44d5-975a-be45fd38e1c9",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FgxvMNKQRpgIA?alt=media&token=f5e77b28-30f3-4dfa-a682-ad46b3038e30"
    ],
    packof: 1,
    price: 150,
    specs: [
      {
        available: [
          {
            availability: true,
            size: "L"
          },
          {
            availability: true,
            size: "XL"
          },
          {
            availability: true,
            size: "XXL"
          },
          {
            availability: true,
            size: "XXXL"
          },
          {
            availability: true,
            size: "XXXXL"
          }
        ],
        color: "Red"
      }
    ],
    title: "Sofa 3"
  },
  {
    category: "armchairs",
    description: "Premium Sofa",
    discountedPrice: 145,
    homePageItem: true,
    hot: true,
    id: "aVbg634dGFE",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FV6v0uGBMXlYQ?alt=media&token=0560ec76-2737-44d5-975a-be45fd38e1c9",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FgxvMNKQRpgIA?alt=media&token=f5e77b28-30f3-4dfa-a682-ad46b3038e30"
    ],
    packof: 1,
    price: 150,
    specs: [
      {
        available: [
          {
            availability: true,
            size: "L"
          },
          {
            availability: true,
            size: "XL"
          },
          {
            availability: true,
            size: "XXL"
          },
          {
            availability: true,
            size: "XXXL"
          },
          {
            availability: true,
            size: "XXXXL"
          }
        ],
        color: "Red"
      }
    ],
    title: "Sofa 3"
  }
],
sofas: [
  {
    category: "sofas",
    description: "Premium Sofa",
    discountedPrice: 145,
    homePageItem: true,
    hot: true,
    id: "aVbg8m3odGFE",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FV6v0uGBMXlYQ?alt=media&token=0560ec76-2737-44d5-975a-be45fd38e1c9",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FgxvMNKQRpgIA?alt=media&token=f5e77b28-30f3-4dfa-a682-ad46b3038e30"
    ],
    packof: 1,
    price: 150,
    specs: [
      {
        available: [
          {
            availability: true,
            size: "L"
          },
          {
            availability: true,
            size: "XL"
          },
          {
            availability: true,
            size: "XXL"
          },
          {
            availability: true,
            size: "XXXL"
          },
          {
            availability: true,
            size: "XXXXL"
          }
        ],
        color: "Red"
      }
    ],
    title: "Sofa 3"
  },
  {
    category: "sofas",
    description: "Premium Sofa",
    discountedPrice: 145,
    homePageItem: true,
    hot: true,
    id: "aVbg8m323GFE",
    img: [
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FV6v0uGBMXlYQ?alt=media&token=0560ec76-2737-44d5-975a-be45fd38e1c9",
      "https://firebasestorage.googleapis.com/v0/b/ecommerce-791a1.appspot.com/o/images%2FaVbg8m3odGFE%2FgxvMNKQRpgIA?alt=media&token=f5e77b28-30f3-4dfa-a682-ad46b3038e30"
    ],
    packof: 1,
    price: 150,
    specs: [
      {
        available: [
          {
            availability: true,
            size: "L"
          },
          {
            availability: true,
            size: "XL"
          },
          {
            availability: true,
            size: "XXL"
          },
          {
            availability: true,
            size: "XXXL"
          },
          {
            availability: true,
            size: "XXXXL"
          }
        ],
        color: "Red"
      }
    ],
    title: "Sofa 3"
  }
],
}

