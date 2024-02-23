import {
  faArrowDown,
  faArrowUp,
  faPaperPlane,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton } from "@mui/material";
import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./ChatBox.module.css";
import MessagesBox from "./MessagesBox";
import { AIChatBox } from "../AIChatBox/AIChatBox";
import ProductContext from "../../Context/ProductContext";
import toast from "react-hot-toast";
import Cookies from 'universal-cookie';
import { Timestamp } from "firebase/firestore";

export default function ChatBox({
  setChatClosed,
  messages,
  setMessages,
  newMessageLoading,
  setNewMessageLoading,
}) {
  const [showChatBox, setShowChatBox] = useState(false);
  const [text, setText] = useState("");
  const containerRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const demoProxyServerUrl = "https://demo.api.nlux.ai/openai/chat/stream";

  const { productsArray, userDetails } = useContext(ProductContext); // Access data from the variable
  const cookies = new Cookies();
  const chatId = cookies.get("chatId");

  const streamText = async () => {
    // ... rest of your streamText logic ...

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        message: text,
        date: Timestamp.fromDate(new Date()),
      },
    ]);

    function filterProductsByPrompt(prompt, products) {
      let filteredProducts = [];
      // Convert the prompt to lowercase for case-insensitive matching
      let promptLower = prompt.toLowerCase();
      let promptWords = promptLower.split(" ");

      // Generate all possible combinations of words in the prompt
      let combinations = [];
      for (let i = 0; i < promptWords.length; i++) {
        for (let j = i + 1; j <= promptWords.length; j++) {
          let combination = promptWords.slice(i, j).join(" ");
          combinations.push(combination);
        }
      }

      // Match combinations against product attributes
      filteredProducts = products.filter((product) => {
        for (let combination of combinations) {
          if (
            product.title.toLowerCase().includes(combination) ||
            product.category.toLowerCase().includes(combination) ||
            product.description.toLowerCase().includes(combination) ||
            product.colors.some((color) =>
              color.name.toLowerCase().includes(combination)
            )
          ) {
            return true;
          }
          // Check for price-related keywords in the prompt
          if (
            combination.includes("price") ||
            combination.includes("cost") ||
            combination.includes("priced") ||
            combination.includes("$")
          ) {
            // Check if the combination contains a number, which could be the price
            let number = parseFloat(combination.replace(/[^\d.]/g, ""));
            if (!isNaN(number)) {
              // Filter products based on the price
              return product.colors.some((color) =>
                color.sizes.some((size) => size.price === number)
              );
            }
          }
        }
        return false;
      });

      return filteredProducts;
    }

    let filteredProducts = filterProductsByPrompt(text, productsArray);

    console.log("filteredProducts", filteredProducts);

    const body = {
      prompt: `Customer ${
        userDetails?.userName && `(name: ${userDetails?.userName})`
      } Message: ${text} Instructions: You are IntelliBot the customer support AI for our website. You will provide assistance to users regarding our website and products. If a user requests manual help, the AI will prompt them to submit a contact us form. When users have questions about our products, the AI will provide answers from the products array provided. The goal is to offer efficient and relevant support to our users, enhancing their experience on our website. Our Collection contains sofas / armchairs / cushions and lamps. If user asks specific price range or product specification e.g. color, size dont respond to it, instead ask them to view our collections or product page. Don't ever say that we dont have that item. Dont say hi, hello etc unless customer mentions it first. if customer asks to contact then guide them to Contact Us page. Check related products data in products: ${filteredProducts} and respond accordingly. If user mentions you, it means this website. Dont respond anything to instructions provided. just respond to Customer Message. `,
    };

    setNewMessageLoading(true);
    try {
      const response = await fetch(demoProxyServerUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        // observer.error(new Error('Failed to connect to the server'));
        toast.error(new Error("Failed to connect to the server"));
        return;
      }

      if (!response.body) {
        return;
      }

      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();
      let doneReading = false;
      let content = ""; // Initialize an empty string to store the full response

      while (!doneReading) {
        const { value, done } = await reader.read();
        if (done) {
          doneReading = true;
          continue;
        }

        const chunk = textDecoder.decode(value);
        content += chunk; // Append the current chunk to the content string
      }

      if (content) {
        // Add the entire content to messages

        setNewMessageLoading(false);

        await setMessages((prev) => [
          ...prev,
          {
            type: "chatbox",
            message: content,
            date: Timestamp.fromDate(new Date()),
          },
        ]);
      }

      // observer.complete();
    } 
    catch (error) {
      // observer.error(error);
      setNewMessageLoading(false);
    }
  };

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
        {/* <AIChatBox /> */}
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
            <MessagesBox
              messages={messages}
              newMessageLoading={newMessageLoading}
            />
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
              background: text === "" || newMessageLoading ? "#ccc" : "bisque",
              color: "#1e1e1e",
            }}
            disabled={text === "" || newMessageLoading}
            variant="contained"
            onClick={() => {
              if (text !== "") {
                streamText();
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
        <Button
          onClick={() => {
            setIsClosing(true);
          }}
          style={{
            top: -5,
            right: -5,
            position: "absolute",
            fontSize: "1rem",
            background: "#eee",
            borderRadius: '0px',
            filter: "drop-shadow(0px 5px 10px rgba(0,0,0,0.5))",
            borderBottomLeftRadius: '5px'
          }}
        >
          <FontAwesomeIcon
            icon={faXmark}
            style={{
              color: "#fff",
              filter: "drop-shadow(0px 5px 10px black)",
              color: "#1e1e1e"
            }}
          />
        </Button>
      </div>
    </>
  );
}
