import ProductContext from "./ProductContext";
import React, { useState } from "react";
import { useEffect } from "react";
import { database, db } from "../firebase";
import { getDocs, collection, where, query, onSnapshot, doc, updateDoc, getDoc, setDoc, orderBy, addDoc } from "firebase/firestore";

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
import { toast } from "react-hot-toast";
import { useId } from "react";


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

  const [cartError, setCartError] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [orders, setOrders] = useState([])
  const [productsArray, setProductsArray] = useState([])


  

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState("")
  const [userType, setUserType] = useState("")
  const userId = cookies.get("userId");
  const [isCartFetched, setIsCartFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  
  const [initialCart, setInitialCart] = useState(null);

  const [messagesFetched, setMessagesFetched] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessageLoading, setNewMessageLoading] = useState(false);
  const DEBOUNCE_DELAY = 1000; // Adjust the debounce delay as needed
  
  
  

  useEffect(() => {
    async function fetchDataHandler() {
      const thisChatId = cookies.get("chatId");
  
      if (userDetails.userId || thisChatId) {
        const chatId = userDetails.userId ? userDetails.userId : thisChatId;
        console.log("THIS CHAT ID", chatId)
        try {
          const chatDocRef = doc(db, 'chat', chatId);
          const chatDocSnapshot = await getDoc(chatDocRef);

          if (chatDocSnapshot.exists()) {
            const chatData = chatDocSnapshot.data();
            setMessages(chatData.messages);
            // Access the data from chatData object
            console.log("Chat data:", chatData);
          } else {
            setMessages([]);
            console.log("Chat document does not exist");
          }

        } catch (error) {
          console.error('Error fetching chat: ', error);
          setMessages([]);
        }
        setMessagesFetched(true);
      } else {
        setMessages([]);
        setMessagesFetched(true);
      }
    }
  
    fetchDataHandler();
  }, [userDetails]);
  



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
    // console.log("Cart", cart);
  }

  function DisplayProducts() {
    // console.log("Products", products);
  }

  const fetchOrders = () => {
    try {
      // Use onSnapshot to listen for real-time updates
      const userListRef = collection(db, 'orders');
      const unsubscribe = onSnapshot(
        query(userListRef, orderBy('submittedOn', 'desc')), // Order by 'createdAt' field in descending order
        (querySnapshot) => {
          const orders = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            console.log("products" , orders)
            setOrders(orders);
        }
      );
  
      // Return the unsubscribe function to stop listening when the component unmounts
      return unsubscribe;
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    if(userType==='admin'){
      fetchOrders();
    }

  }, [userDetails])

  
  const fetchProducts = () => {
    try {
      // Use onSnapshot to listen for real-time updates
      const userListRef = collection(db, 'products');
      const unsubscribe = onSnapshot(
        query(userListRef, orderBy('createdAt', 'desc')), // Order by 'createdAt' field in descending order
        (querySnapshot) => {
          const thisProducts = querySnapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() })) // Include the document id in the data
  
          if (!Array.isArray(thisProducts)) {
            console.error('Products is not an array:', thisProducts);
            return;
          }
  
          const itemsObject = thisProducts.reduce((acc, curr) => {
            const { category, ...rest } = curr;
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push({...rest, category});
            return acc;
          }, {});
  
          setProductsArray(thisProducts)
          setProducts(itemsObject);
          console.log("products", thisProducts);
        }
      );
  
      // Return the unsubscribe function to stop listening when the component unmounts
      return unsubscribe;
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };
  
  

  const fetchData = () => {
    const productsRef = ref(database, "products");
  
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      // Assuming setProducts is a state update function
      setProducts(data);
      // console.log("Data Fetched:", data);
    }, (error) => {
      console.error("Error while fetching data:", error);
    });
  };
  
  
  useEffect(() => {
    // fetchData();
    fetchProducts();
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

      // console.log("Data Updated");
    } catch (error) {
      console.error("Error while updating data:", error);
    }
  };




  useEffect(() => {
    // Set loading to true when component mounts
    setLoading(true);

    // Set loading to false after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Clean up the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, [isUserLoggedIn]); 

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
            setDataFetched(true);
          });
        } else {
          console.log('User not found in Firestore');
          setDataFetched(true);
        }
      }, (error) => {
        console.error('Error fetching user details: ', error);
        toast.error("Error fetching data. Please try again");
        setDataFetched(true);
      });

      return () => {
        unsubscribe();
      };
    } else {
      setIsUserLoggedIn(false);
    }
  }

  

  const [shouldPostCart, setShouldPostCart] = useState(false);

  useEffect(() => {
    if (!isCartFetched) {
      // console.log("DATA NOT FETCHED");
      return;
    }

    // console.log("POSTING CART FETCHED");

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
          // console.log('Cart data posted to Firestore successfully');
          setInitialCart(cart);
        })
        .catch((error) => {
          console.error('Error posting/updating cart data to Firestore: ', error);
          // alert('Failed to update your cart. Please try again.');
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
        isUserLoggedIn,
        userDetails,
        userType,
        loading,
        cartError,
        showErrorModal,
        firstTime, 
        dataFetched,
        orders,
        productsArray,messages, setMessages, newMessageLoading, setNewMessageLoading, messagesFetched,
        setDataFetched,
        setFirstTime,
        setCouponApplied,
        CartAddItem,
        CartRemoveItem,
        DisplayCart,
        DisplayProducts,
        // updateData,
        CartUpdateItem,
        setIsUserLoggedIn,
        setUserDetails,
        setUserType,
        updateData,
        setCartError,
        setShowErrorModal,
        setCart
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
    id: "1231232t3123",
    title: "Lamp",
    colors: [
      {
        name: 'Red',
        images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Red_Color.jpg/1536px-Red_Color.jpg", "blob:http://localhost:3000/d6d01831-19aa-4ab6-876c-bfeb2dccdf01", "blob:http://localhost:3000/506f2bbf-c72d-4f35-8b26-72f233535cc5", "https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG"],
        sizes: [{ name: 'S', price: 50, discountedPrice: 40, quantity: 10 }, { name: 'L', price: 30, discountedPrice: 25, quantity: 0 }],
      },
      {
        name: 'Blue',
        images: ["https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG"],
        sizes: [{ name: 'L', price: 30, discountedPrice: 25, quantity: 5 }],
      },
      {
        name: 'Green',
        images: ["https://www.shutterstock.com/image-illustration/background-green-screen-video-editing-260nw-1563651100.jpg"],
        sizes: [{ name: 'L', price: 30, discountedPrice: 25, quantity: 2 }],
      },
    ],
    description: "Lorem ipsum dolor si te",
    category: "lamps",
    homePageItem: true,
    hot: true
  }],
cushions: [
  {
  id: "13g93g32t3123",
  title: "Cushions",
  colors: [
    {
      name: 'Red',
      images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Red_Color.jpg/1536px-Red_Color.jpg", "blob:http://localhost:3000/d6d01831-19aa-4ab6-876c-bfeb2dccdf01", "blob:http://localhost:3000/506f2bbf-c72d-4f35-8b26-72f233535cc5", "https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG"],
      sizes: [{ name: 'S', price: 50, discountedPrice: 40, quantity: 10 }, { name: 'L', price: 30, discountedPrice: 25, quantity: 0 }],
    },
    {
      name: 'Blue',
      images: ["https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG"],
      sizes: [{ name: 'L', price: 30, discountedPrice: 25, quantity: 0 }],
    },
  ],
  description: "Lorem ipsum dolor si te",
  category: "cushions",
  hot: true
}],
armchairs: [
  {
  id: "123123123",
  title: "Arm Chair",
  colors: [
    {
      name: 'Red',
      images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Red_Color.jpg/1536px-Red_Color.jpg", "blob:http://localhost:3000/d6d01831-19aa-4ab6-876c-bfeb2dccdf01", "blob:http://localhost:3000/506f2bbf-c72d-4f35-8b26-72f233535cc5", "https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG"],
      sizes: [{ name: 'S', price: 50, discountedPrice: 40, quantity: 10 }, { name: 'L', price: 30, discountedPrice: 25, quantity: 0 }],
    },
    {
      name: 'Blue',
      images: ["https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG"],
      sizes: [{ name: 'L', price: 30, discountedPrice: 25, quantity: 0 }],
    },
    {
      name: 'Green',
      images: ["https://www.shutterstock.com/image-illustration/background-green-screen-video-editing-260nw-1563651100.jpg"],
      sizes: [{ name: 'L', price: 30, discountedPrice: 25, quantity: 0 }],
    },
  ],
  description: "Lorem ipsum dolor si te",
  category: "armchairs",
  homePageItem: true,
  hot: true
}],
sofas: [
  {
  id: "123123125123",
  title: "Sofa",
  colors: [
    {
      name: 'Red',
      images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Red_Color.jpg/1536px-Red_Color.jpg", "blob:http://localhost:3000/d6d01831-19aa-4ab6-876c-bfeb2dccdf01", "blob:http://localhost:3000/506f2bbf-c72d-4f35-8b26-72f233535cc5", "https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG"],
      sizes: [{ name: 'S', price: 50, discountedPrice: 40, quantity: 10 }, { name: 'L', price: 30, discountedPrice: 25, quantity: 0 }],
    },
    {
      name: 'Blue',
      images: ["https://upload.wikimedia.org/wikipedia/commons/e/e4/Color-blue.JPG"],
      sizes: [{ name: 'L', price: 30, discountedPrice: 25, quantity: 0 }],
    },
    {
      name: 'Green',
      images: ["https://www.shutterstock.com/image-illustration/background-green-screen-video-editing-260nw-1563651100.jpg"],
      sizes: [{ name: 'L', price: 30, discountedPrice: 25, quantity: 0 }],
    },
  ],
  description: "Lorem ipsum dolor si te",
  category: "sofas",
  hot: true
}]
}

