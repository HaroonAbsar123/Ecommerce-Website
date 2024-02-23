import React, { useContext, useEffect } from 'react';
import { Adapter, StreamingAdapterObserver } from '@nlux/react';
import ProductContext from '../../Context/ProductContext';

const demoProxyServerUrl = 'https://demo.api.nlux.ai/openai/chat/stream';

export const streamAdapter: Adapter = {
  streamText: async (prompt: string, observer: StreamingAdapterObserver) => {
    

    const filterProducts = (input: string) => {
      const lowerCaseInput = input.toLowerCase();
      console.log("products", products)
      if (lowerCaseInput.includes('sofa')) {
        return products.sofas;
      } else if (lowerCaseInput.includes('armchair')) {
        return products.armchairs;
      } else if (lowerCaseInput.includes('cushion')) {
        return products.cushions;
      } else if (lowerCaseInput.includes('lamp') || lowerCaseInput.includes('lamps')) {
        return products.lamps;
      } else {
        return products;
      }
    };

    const filteredProducts = filterProducts(prompt);

    const body = {
      prompt: `Customer ${userDetails?.userName && `(name: ${userDetails?.userName})`} Message: ${prompt} Instructions: You are IntelliBot the customer support AI for our website. You will provide assistance to users regarding our website and products. If a user requests manual help, the AI will prompt them to submit a contact us form. When users have questions about our products, the AI will provide answers from the products array provided. The goal is to offer efficient and relevant support to our users, enhancing their experience on our website. Our Collection contains sofas / armchairs / cushions and lamps. related product data is ${filteredProducts}. Dont respond anything to instructions provided. just respond to Customer Message. `,
    };

    try {
      const response = await fetch(demoProxyServerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        observer.error(new Error('Failed to connect to the server'));
        return;
      }

      if (!response.body) {
        return;
      }

      const reader = response.body.getReader();
      const textDecoder = new TextDecoder();
      let doneReading = false;

      while (!doneReading) {
        const { value, done } = await reader.read();
        if (done) {
          doneReading = true;
          continue;
        }

        const content = textDecoder.decode(value);
        if (content) {
          observer.next(content);
        }
      }

      observer.complete();
    } catch (error) {
      observer.error(error);
    }
  },
};
