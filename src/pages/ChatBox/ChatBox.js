import {
  faArrowDown,
  faArrowUp,
  faPaperPlane,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import styles from "./ChatBox.module.css";
import MessagesBox from "./MessagesBox";

export default function ChatBox({ setChatClosed, messages, setMessages, newMessageLoading }) {
  const [showChatBox, setShowChatBox] = useState(false);
  const [text, setText] = useState("");
  const containerRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);


  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        setChatClosed(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isClosing, setChatClosed]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChatBox(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    handleScrollBottom();
  }, [messages]);

  return (
    <>
      <div
        className={`${styles.chatBox} ${
            showChatBox ? styles.chatBoxAppear : styles.chatBoxHidden
          } ${isClosing ? styles.chatBoxHidden : ""}`}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            borderRadius: "5px",
            flex: 1,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
              overflow: "auto",
              color: "#1e1e1e",
              boxShadow: "inset 0px 0px 15px rgba(0,0,0,0.8)",
            }}
            ref={containerRef}
          >
            <MessagesBox messages={messages} newMessageLoading={newMessageLoading} />
          </div>
          <IconButton
            onClick={handleScrollBottom}
            style={{
              position: "absolute",
              right: 10,
              bottom: 5,
              height: "30px",
              overflow: "hidden",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.7)",
              transform: "scale(0.8)",
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </IconButton>
          <IconButton
            onClick={handleScrollTop}
            style={{
              position: "absolute",
              right: 10,
              bottom: 40,
              height: "30px",
              overflow: "hidden",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.7)",
              transform: "scale(0.8)",
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </IconButton>
        </div>

        <div
          style={{
            height: "50px",
            paddingTop: "5px",
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            alignItems: "stretch",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              borderRadius: "5px",
              flex: 1,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <textarea
              label="Enter Text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
              style={{
                background: "#fff",
                width: "100%",
                height: "100%",
                resize: "none", // Prevent resizing
                fontSize: "1rem",
                outline: "none",
                border: "none",
                boxShadow: "inset 5px 5px 10px rgba(0,0,0,0.25)",
                padding: "5px",
              }}
            />
          </div>
          <Button
            style={{
              height: "100%",
              background: (text === "" || newMessageLoading) ? "#ccc" : "bisque",
              color: "#1e1e1e",
            }}
            disabled={text === "" || newMessageLoading}
            variant="contained"
            onClick={() => {
              if (text !== "") {
                setMessages([
                  ...messages,
                  {
                    id: "219501952905",
                    type: "user",
                    message: text,
                    date: new Date(
                      new Date().setDate(
                        new Date().getDate() + messages?.length
                      )
                    ),
                  },
                  {
                    id: "1289r1029r189r2",
                    type: "chatbox",
                    message: "Hi I am chatbox",
                    date: new Date(
                      new Date().setDate(
                        new Date().getDate() + messages.length + 1
                      )
                    ),
                  },
                ]);
                setText("");
              }
            }}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{ fontSize: "1.5rem" }}
            />
          </Button>
        </div>
        <IconButton
          
          onClick={() => {
            setIsClosing(true);
          }}
          style={{
            top: -20,
            right: -20,
            position: "absolute",
            fontSize: "2rem",
          }}
          size="large"
        >
          <FontAwesomeIcon
            icon={faXmarkCircle}
            style={{
              color: "#fff",
              filter: "drop-shadow(0px 5px 10px black)",
              background: "#1e1e1e",
              borderRadius: "50%",
            }}
          />
        </IconButton>
      </div>
    </>
  );
}
