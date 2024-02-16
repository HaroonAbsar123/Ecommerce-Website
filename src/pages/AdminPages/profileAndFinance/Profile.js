import React, { useState, useEffect, useContext } from "react";

import ProductContext from "../../../Context/ProductContext";
import { ContactInformation } from "./ContactInformation";

export function Profile() {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserType,
    setUserDetails,
    userType,
    userDetails,
  } = useContext(ProductContext);


  const [curr, setCurr] = useState("Contact Information")

  return (
    <div
      style={{
          marginTop: "0px",
          flex: 1,
          height: "max-content",
          // boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          // background: 'rgba(255,255,255, 0.5)',
          // backdropFilter: 'blur(4px)', // Adjust the blur intensity as needed
          // WebkitBackdropFilter: 'blur(4px)', // For Safari support,
          padding: '10px',
          borderRadius: '10px', 
        }}
    >

      <div style={{ flex: 1, textAlign: "center" }}>
        <h1>{userDetails?.userName}</h1>
      </div>
      {/* <div
        style={{
          flex: 1,
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <button
          style={{
            padding: "3px 6px",
            backgroundColor: curr === "Contact Information" ? "#1976d2" : 'transparent',
            color: curr === "Contact Information" ? "white" : 'black',
            fontSize: "medium",
            borderRadius: "5px",
            transition: 'all 0.3s ease-in-out'
          }}
          onClick={() => {setCurr("Contact Information")}}
        >
          Contact Information
        </button>

        <button
          style={{
            padding: "3px 6px",
            backgroundColor: curr === "Education" ? "#1976d2" : 'transparent',
            color: curr === "Education" ? "white" : 'black',
            fontSize: "medium",
            borderRadius: "5px",
            transition: 'all 0.3s ease-in-out'
          }}
          onClick={() => {setCurr("Education")}}
        >
          Education
        </button>

      </div> */}

      <div style={{marginTop: '15px', padding: '10px', border: '1px solid #ccc'}}>
          {curr==="Contact Information" && <ContactInformation />}
          {/* {curr==="Education" && <Education />} */}
      </div>

    </div>
  );
}
