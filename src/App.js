import React, { useContext, useEffect } from "react";
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
import Register from "./pages/Register/Register";
import toast, { Toaster } from 'react-hot-toast';
import ProductContext from "./Context/ProductContext";
import ChatBox from "./pages/ChatBox/ChatBox";
import ChatBoxRenderer from "./pages/ChatBox/ChatBoxRenderer";
import Logo from './Assets/logo - Copy - Copy.png';
// import { AIChatBox } from "./pages/AIChatBox/AIChatBox";


function App() {
  const {isUserLoggedIn} = useContext(ProductContext)
  const [chatClosed, setChatClosed] = useState(true)
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if(!chatClosed){
      setOpacity(1);
    }

  }, [chatClosed])

  const handleClose = () => {
    setOpacity(0);
    setTimeout(() => {
      setChatClosed(true);
    }, 400); // 0.4s
  };

  return (
    <React.Fragment>
      {/* <ProductContextProvider> */}
      <Toaster />
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/collection" Component={Collection} />
        <Route path="/collection/:category" exact Component={Category} />
        {isUserLoggedIn && 
        <Route path="/profile" Component={Profile} />
      }

        <Route path="/collection/:category/:id" Component={ProductPage} />

        {/* <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} /> */}
        <Route path="/cart" Component={Cart} />

        <Route path="/contact" Component={ContactUs} />
        <Route path="/blog-1" Component={Blog} />
        
        <Route path="*" Component={Home} />
      </Routes>
    
      {chatClosed ? (
        <div
          className="chat-box chat-closed"
          onClick={() => setChatClosed(false)}
        >
          <div>
            {/* <FontAwesomeIcon icon={faHeadset} size="1x" /> */}
            <img src={Logo} alt="" style={{width: '40px'}} />
          </div>
        </div>
      ) : (
        <div
          className="chat-box chat-open"
          style={{padding: '5px'}}
        >
          {/* <AIChatBox setChatClosed={setChatClosed} /> */}
          <ChatBoxRenderer setChatClosed={setChatClosed} />
        </div>
      )}
      
      {/* </ProductContextProvider> */}
      </React.Fragment>
  );
}

export default App;
