
import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";

export default function ChatBoxRenderer({ setChatClosed }) {


    const dummyMessages = [];
    for (let i = 0; i < 20; i++) {
        const message = {
            id: 'lmfaklsfmaksfeifeifm',
            type: i % 2 === 0 ? 'user' : 'chatbot',
            message: 'Hello How are you',
            date: new Date
        };
        dummyMessages.push(message);
    }
    
    const [messages, setMessages] = useState(dummyMessages);
    const [newMessageLoading, setNewMessageLoading] = useState(false);

    
  return (
    <ChatBox messages={messages} setChatClosed={setChatClosed} setMessages={setMessages} newMessageLoading={newMessageLoading}/>
  );
}

