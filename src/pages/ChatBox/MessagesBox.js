import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./MessagesBox.module.css";
import Logo from '../../Assets/logo - Copy - Copy.png';
import ProductContext from "../../Context/ProductContext";
import { Timestamp } from "firebase/firestore";

export default function MessagesBox({ messages, newMessageLoading }) {
  const [prevDate, setPrevDate] = useState("");

  const {userDetails} = useContext(ProductContext)

  function convertFirestoreTimestamp(timestamp) {
    // Extract seconds and nanoseconds from the Firestore timestamp
    const { seconds, nanoseconds } = timestamp;

    // Convert the Firestore timestamp to milliseconds
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;

    // Create a new Date object from the milliseconds
    return new Date(milliseconds);
}

  function extractDateAndTime(firestoreTimestamp) {
    const date = convertFirestoreTimestamp(firestoreTimestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDate = `${day}/${month}/${year}`;

    // Convert hours to 12-hour format
    let formattedHours = hours % 12 || 12;
    formattedHours = formattedHours < 10 ? `0${formattedHours}` : formattedHours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

    return { date: formattedDate, time: formattedTime };
}

  useEffect(() => {
    setPrevDate(""); // Reset the prevDate when messages change
  }, [messages]);



  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "5px",
        overflowY: "auto", // Enable vertical scrolling
        color: '#1e1e1e'
      }}
    >
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <img src={Logo} alt="" style={{width: '40px', marginTop: '10px', marginBottom: '10px'}} />
      </div>

      {
              messages.length===0 &&
              <div style={{
          fontSize: "medium",
          borderRadius: "5px",
          padding: "10px",
          boxShadow: "0px 5px 5px rgba(0,0,0,0.5)",
          width: "70%",
          textAlign: "left",
          background: "#ccc", 
          alignSelf: "flex-start",}}>
              <div style={{ whiteSpace: "pre-line" }}>Hi{userDetails?.userName && ` ${userDetails?.userName.split(" ")[0]}`}, How can I help you?</div>
              <div
                style={{
                  fontSize: "small",
                  color: "#494949",
                  marginTop: "10px",
                  fontWeight: "100",
                  display: 'flex',
                  justifyContent: 'space-between',
                  flex: 1,
                  alignItems: 'center'
                }}
              >
                <div>{extractDateAndTime(Timestamp.fromDate(new Date())).time}</div> <div>{extractDateAndTime(Timestamp.fromDate(new Date())).date}</div>
              </div>
            </div>
            }

      {messages?.sort((a, b) => a.date - b.date).map((item, index) => {
        const currentDate = extractDateAndTime(item?.date).date;
        const isFirstMessageForDate =
          index === 0 || currentDate !== extractDateAndTime(messages[index - 1]?.date).date;
        const messageStyle = {
          background: item?.type === "user" ? "#fff" : "#ccc",
          fontSize: "medium",
          borderRadius: "5px",
          padding: "10px",
          boxShadow: "0px 5px 5px rgba(0,0,0,0.5)",
          width: "70%",
          alignSelf: item?.type === "user" ? "flex-end" : "flex-start",
          textAlign: "left",
        };
        const dateStyle = {
          fontSize: "small",
          color: "#ccc",
          fontWeight: "100",
        };

        return (
          <React.Fragment key={index}>
            {isFirstMessageForDate && <div style={dateStyle}>{currentDate}</div>}

            {/* {
              isFirstMessageForDate &&
              <div style={{...messageStyle, background: "#ccc", 
              alignSelf: "flex-start",}}>
              <div style={{ whiteSpace: "pre-line" }}>Hi{userDetails?.userName && ` ${userDetails?.userName.split(" ")[0]}`}, How can I help you today?</div>
              <div
                style={{
                  fontSize: "small",
                  color: "#494949",
                  marginTop: "10px",
                  fontWeight: "100",
                  display: 'flex',
                  justifyContent: 'space-between',
                  flex: 1,
                  alignItems: 'center'
                }}
              >
                <div>{extractDateAndTime(Timestamp.fromDate(new Date())).time}</div> <div>{extractDateAndTime(Timestamp.fromDate(new Date())).date}</div>
              </div>
            </div>
            } */}

            <div style={messageStyle}>
              <div style={{ whiteSpace: "pre-line" }}>{item?.message}</div>
              <div
                style={{
                  fontSize: "small",
                  color: "#494949",
                  marginTop: "10px",
                  fontWeight: "100",
                  display: 'flex',
                  justifyContent: 'space-between',
                  flex: 1,
                  alignItems: 'center'
                }}
              >
                <div>{extractDateAndTime(item?.date).time}</div> <div>{extractDateAndTime(item?.date).date}</div>
              </div>
            </div>

          </React.Fragment>
        );
      })}

      {newMessageLoading && 
        <div className={styles.message} style={{ height: "40px" }}>
      <div className={styles.date}></div>
      <div className={styles.text}></div>
    </div>
      }
    </div>
  );
}
