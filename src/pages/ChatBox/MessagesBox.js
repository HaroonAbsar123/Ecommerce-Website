import React, { useState, useEffect, useRef } from "react";
import styles from "./MessagesBox.module.css";

export default function MessagesBox({ messages, newMessageLoading }) {
  const [prevDate, setPrevDate] = useState("");

  function extractDateAndTime(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds} ${amOrPm}`;

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
      {messages.map((item, index) => {
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
            <div style={messageStyle}>
              <div style={{ whiteSpace: "pre-line" }}>{item?.message}</div>
              <div
                style={{
                  fontSize: "small",
                  color: "#494949",
                  marginTop: "10px",
                  fontWeight: "100",
                }}
              >
                {extractDateAndTime(item?.date).time}
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
