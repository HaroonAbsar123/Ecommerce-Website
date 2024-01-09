import React from "react";
import { createContext } from "react";


const ProductContext = createContext({
    products: {},
    cart: [],
    coupons: [],
    couponApplied: {}, 
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
    setUserType: () => {}

})

export default ProductContext;


