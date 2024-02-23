import { AiChat } from "@nlux/react";
import { streamAdapter } from "./adapter.ts";
import { useAdapter } from "@nlux/openai-react";
import { useContext, useEffect, useState } from "react";
import ProductContext from "../../Context/ProductContext.js";
import dummyImage from "../../Assets/dummyUserImage.png";
import StreamAdapterComponent from "./adapter.ts";

export function AIChatBox() {
  const { userDetails, products } = useContext(ProductContext);
  const [image, setImage] = useState(dummyImage);
  const [name, setName] = useState("Customer");

  const adapterConfig = {
    apiKey: "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",
    systemMessage: `IntelliBot is the customer support AI for our website. It provides assistance to users regarding our website and products. If a user requests manual help, the AI will prompt them to submit a contact us form. When users have questions about our products, the AI will provide answers from the products array provided. The goal is to offer efficient and relevant support to our users, enhancing their experience on our website. Our collection contains armChairs, sofa, cushions and lamps`,
  };

  useEffect(() => {
    if (userDetails?.image) {
      setImage(userDetails?.image);
    } else if (userDetails?.userName) {
      setName(userDetails?.userName);
    }
  }, [userDetails]);

  const chatGptAdapter = useAdapter(adapterConfig);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <AiChat
          adapter={streamAdapter}
        //   className='width: 100%; height: 100%'
        // adapter={chatGptAdapter}
        personaOptions={{
          bot: {
            name: "IntelliBot",
            tagline: "Your Genius AI Assistant",
            picture: "https://nlux.ai/images/demos/persona-albert.jpeg",
          },
        }}
        promptBoxOptions={{
          placeholder: "How can I help you?",
        }}
        layoutOptions={{
          height: "100%",
          maxWidth: "100%",
        }}
      />
    </div>
  );
}
