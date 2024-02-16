import React, { useState, useEffect } from "react";
import classes from "./ContactUs.module.css";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import MainProduct from "../../Assets/contactUsPhone.png";
import Footer from "../../components/Footer";
import { TextField, Button } from "@mui/material";
import Contact from "./Contact";

export default function ContactUs() {
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

  const navigate = useNavigate();
  return (
    <>
      <div className={classes.mainImage}>
        {/* <div style={{ textAlign: "left", flex: 1, marginBottom: "0px" }}>
          <h2 className={classes.mainHeading}>Contact Us</h2>
        </div> */}

        <Contact />

        <div
          style={{
            marginTop: "0px",
            marginBottom: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: flexSet ? "column" : "row",
            flex: 1,
            gap: "20px",
            paddingLeft: isMobile ? "1rem" : "3rem",
            paddingRight: isMobile ? "1rem" : "3rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: isMobile ? "1.5rem" : "3rem",
                marginBottom: "1rem",
              }}
            >
              <b>Get in Touch</b>
            </div>

            <div style={{ fontSize: isMobile ? "1.2rem" : "1.3rem" }}>
              <b>Email: intellicart@outlook.com</b>
            </div>

            <div style={{ fontSize: isMobile ? "1.2rem" : "1.3rem" }}>
              <b>Phone: +92 333 5469811</b>
            </div>

            <p style={{ fontSize: isMobile ? "1rem" : "1.3rem" }}>
              If you have any questions, suggestions, or feedback, please feel
              free to reach out to us. Our team is dedicated to providing you
              with the best shopping experience possible. Whether it's a product
              inquiry or assistance with your order, we're here to help.
            </p>
          </div>

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

      <Footer />
    </>
  );
}
