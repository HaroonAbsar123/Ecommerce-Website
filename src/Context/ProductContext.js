import React from "react";
import { createContext } from "react";


const ProductContext = createContext({
    products: {},
    cart: [],
    coupons: [],
    couponApplied: {}, 
    isUserLoggedIn: {}, 
    userDetails: {}, 
    userType: {}, 
    loading: {}, 
    cartError: {}, 
    showErrorModal: {}, 
    setCouponApplied: () => {},
    CartAddItem: (id) => {},
    CartRemoveItem: (id) => {},
    DisplayCart: () => {},
    DisplayProducts: () => {},
    updateData: () => {},
    fetchData: () => {},
    CartUpdateItem: () => {},
    setIsUserLoggedIn: () => {},
    setUserDetails: () => {},
    setUserType: () => {},
    updateData: () => {},
    setCartError: () => {},
    setShowErrorModal: () => {},

})

export default ProductContext;


