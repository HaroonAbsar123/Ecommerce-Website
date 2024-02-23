
import React, { useState, useEffect, useContext, useId } from "react";
import ProductContext from "../../Context/ProductContext";
import ChatBox from "./ChatBox";
import { db } from "../../firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import Cookies from 'universal-cookie';

export default function ChatBoxRenderer({ setChatClosed }) {

  const cookies = new Cookies();
    const {messages, setMessages, newMessageLoading, setNewMessageLoading, messagesFetched, userDetails} = useContext(ProductContext)
    const [thisChatId, setThisChatId] = useState(userDetails?.userId? userDetails?.userId : "");
    
    useEffect(() => {
      async function storeMessages() {
        const thisChatId = cookies.get("chatId");
    
        if (thisChatId || userDetails?.userId) {
          const chatId = userDetails?.userId || thisChatId;
          const chatDocRef = doc(db, 'chat', chatId);
        
          try {
            await setDoc(chatDocRef, {
              userId: chatId,
              messages: messages
            });
            console.log("Messages stored in Firebase");
          } catch (error) {
            console.error('Error storing messages: ', error);
          }
        } else {
          console.log("No chatId or userDetails.userId provided.");
        }
        
        if (!thisChatId) {
          try {
            const chatCollectionRef = collection(db, 'chat');
            const chatDocRef = await addDoc(chatCollectionRef);
          
            // cookies.set("chatId", chatDocRef.id, { secure: true, sameSite: 'strict' });
          
            const messagesCollectionRef = chatDocRef.collection('messages');
          
            try {
              await addDoc(messagesCollectionRef, {
                userId: chatDocRef.id,
                messages: messages
              });
              console.log("Messages stored in Firebase");
            } catch (error) {
              console.error('Error storing messages: ', error);
            }
          } catch (error) {
            console.error('Error creating new chat document: ', error);
          }
        }
      }
    
      if (messagesFetched) {
        storeMessages();
      }
    }, [messages]); 
    
  

    
  return (
    <ChatBox messages={messages} setChatClosed={setChatClosed} setMessages={setMessages} setNewMessageLoading={setNewMessageLoading} newMessageLoading={newMessageLoading}/>
  );
}

