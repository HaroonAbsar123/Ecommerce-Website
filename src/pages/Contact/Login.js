import React from "react";
import styles from "./Login.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc, getDocs, where, query, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import { useContext } from "react";
import Footer from "../../components/Footer";
import { sendPasswordResetEmail } from "firebase/auth";
import LoginLogo from "../../Assets/logo - Copy.png";
import LoginImage from "../../Assets/Home2.png";
import GoogleImage from "../../Assets/R.png";
import { TextField, Button } from "@mui/material";

import AboveLogo from "../../Assets/logo.png";
import Cookies from 'universal-cookie';

function Login() {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [howCanWeSupport, setHowCanWeSupport] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  const [flexSet, setFlexSet] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 900); // You can adjust the width threshold as needed
    setFlexSet(window.innerWidth <= 650); // You can adjust the width threshold as needed
  };

  useEffect(() => {
    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile); // Add event listener

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  async function formSubmit(e) {
    e.preventDefault();

    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      type: type,
      howCanWeSupport: howCanWeSupport,
    };
    console.log(body);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flex: 1,
          height: "100%",
          justifyContent: "center",
          alignItems: "stretch", // Ensure children stretch to full height
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        
        {!isMobile && 
         <div
         style={{
           flex: 1,
           display: 'flex',
           flexDirection: "column",
           paddingTop: "6rem",
           background: "linear-gradient(to left, rgb(255, 244, 236), bisque)",
           justifyContent: "center",
           paddingBottom: "1rem"
         }}
       >
           <div>
             <img
               style={{
                 display: imageLoaded ? "inherit" : 'none',
                 width: '100%'
               }}
               className={styles.mainProductImage}
               src={LoginImage}
               alt=""
               onLoad={() => setImageLoaded(true)}
             />
           </div>
       </div>
      }
        <div
          style={{
            flex: 1,
            marginTop: '4rem',
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // Center content horizontally
            padding: isMobile ? "20px" : "2rem",
            background: "white",
  background: 'linear-gradient(to left, rgb(231, 244, 255), white)'
          }}
        >
          <div style={{flex: 1, width: '100%'}}>
            <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <img src={LoginLogo} alt="Logo" style={{ height: "2rem" }} />
          </div>
          {/* Center image using margin auto */}
          <h2
            style={{
              color: "#912d27",
              fontWeight: "bold",
              paddingBottom: "10px",
              paddingTop: "10px",
            }}
            className={styles.headerTitle}
          >
            Contact Us
          </h2>

          <p
            style={{
              textAlign: 'center',
              marginBottom: '5px',
              marginTop: '2px'
            }}
            className="para"
          >
            Email: intellicart@outlook.com
          </p>
          <p
            style={{
              textAlign: 'center',
              marginTop: '2px',
              marginBottom: '20px',
            }}
            className="para"
          >
            Phone: +92 333 5469811
          </p>

          <div
            style={{
              padding: "0.5rem",
              marginTop: "0px",
              flex: 1,
              height: "max-content",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
              background: "rgba(255,255,255, 0.7)",
              backdropFilter: "blur(10px)", // Adjust the blur intensity as needed
              WebkitBackdropFilter: "blur(10px)", // For Safari support,
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <form onSubmit={formSubmit}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                  height: 'max-content'
                }}
              >
                <TextField
                  style={{ flex: 1 }}
                  label="Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                />

                <TextField
                  style={{ flex: 1 }}
                  label="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>

              <div style={{ flex: 1, width: "100%", marginBottom: "20px" }}>
                <TextField
                  style={{ flex: 1, width: "100%" }}
                  label="Message"
                  multiline
                  value={howCanWeSupport}
                  onChange={(e) => {
                    setHowCanWeSupport(e.target.value);
                  }}
                  id="support"
                  name="support"
                  rows="4"
                  required
                />
              </div>
              <Button
                variant="contained"
                style={{ background: "#1e1e1e", color: "#fff" }}
                type="submit"
              >
                Send
              </Button>
            </form>

          </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
