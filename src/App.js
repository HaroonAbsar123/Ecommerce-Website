import React from "react";
import Header from "./components/Header";
import Home from "./pages/HomePageComponents/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact/Contact";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Collection from "./pages/Collection/Collection";
import Category from "./pages/Category/Category";
import ProductPage from "./pages/ProductPage/ProductPage";
import Cart from "./pages/Cart/Cart";
import ProductContextProvider from "./Context/ProductContextProvider";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import AddProducts from "./pages/AdminPages/AddProducts";
import ContactUs from "./pages/Contact/ContactUs";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import './App.css';
import NavBar from "./components/Navbar";


function App() {

  const [chatClosed, setChatClosed] = useState(true)

  return (
    <React.Fragment>
      <ProductContextProvider>
        
      <NavBar />
      <ScrollToTop />
        
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/collection" Component={Collection} />
        <Route path="/collection/:category" exact Component={Category} />
        <Route path="/profile" Component={Profile} />
        <Route path="/add-products" Component={AddProducts} />


        <Route path="/collection/:category/:id" Component={ProductPage} />

        <Route path="/login" Component={Login} />
        <Route path="/cart" Component={Cart} />

        <Route path="/contact" Component={ContactUs} />
        <Route path="/blog-1" Component={Blog} />
      </Routes>
      
    
      {chatClosed ? (
        <div
          className="chat-box chat-closed"
          onClick={() => setChatClosed(false)}
        >
          <div>
            <FontAwesomeIcon icon={faHeadset} size="1x" />
          </div>
        </div>
      ) : (
        <div
          className="chat-box chat-open"
          onClick={() => setChatClosed(true)}
        >
          <div>
             <FontAwesomeIcon icon={faHeadset} size="1x" />
          </div>
        </div>
      )}
      
      </ProductContextProvider>
      </React.Fragment>
  );
}

export default App;
