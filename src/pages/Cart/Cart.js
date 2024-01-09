import React, { useState, useEffect } from "react";
import classes from "./Cart.module.css";
import FirstCard from "./FirstCard";
import SecondCard from "./SecondCard";
import Footer from "../../components/Footer";
import { useContext } from "react";
import ProductContext from "../../Context/ProductContext";

import Image1 from "../../Assets/Products/1.png";
import Image2 from "../../Assets/Products/2.png";
import Image3 from "../../Assets/Products/3.png";
import Image4 from "../../Assets/Products/4.png";
import Image5 from "../../Assets/Products/5.png";
import Image6 from "../../Assets/Products/6.png";
import Image7 from "../../Assets/Products/7.png";
import Image8 from "../../Assets/Products/8.png";
import Image9 from "../../Assets/Products/Product1.png";
import Image10 from "../../Assets/Products/Product2.png";
import Image11 from "../../Assets/Home5.png";
import Image12 from "../../Assets/Home6.png";
import { useNavigate } from "react-router-dom";

function Cart() {
const navigate=useNavigate();

  const {cart} = useContext(ProductContext);

    useEffect(() => {
    // Fetch the 'isUserLoggedIn' value from local storage
    const localIsUserLoggedIn = localStorage.getItem("isLoggedIn");
    if (!localIsUserLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <React.Fragment>
      <div className={classes.mainContainer}>
        <div className={classes.secondContainer}>
            
          <FirstCard Products={cart} />

          <SecondCard Products={cart} />
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}

export default Cart;

const Products = [
  {
    id: Math.floor(10000000 + Math.random() * 90000000),
    img: [Image1, Image2, Image3, Image4, Image5],
    title: "Furniture-1",
    specs: [
      {
        color: "red",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "blue",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "green",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
    ],
    url: "furniture-1",
    price: 10,
    discountedPrice: 8,
    category: "collection-1",
    packof: 1,
    description:
      "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
  },

  {
    id: Math.floor(10000000 + Math.random() * 90000000),
    img: [Image2, Image3, Image4, Image5, Image1],
    title: "Furniture-2",
    specs: [
      {
        color: "red",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "blue",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "green",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
    ],
    url: "furniture-1",
    price: 10,
    discountedPrice: 8,
    category: "collection-1",
    packof: 1,
    description:
      "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
  },

  {
    id: Math.floor(10000000 + Math.random() * 90000000),
    img: [Image3, Image4, Image5, Image1, Image2],
    title: "Furniture-3",
    specs: [
      {
        color: "red",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "blue",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "green",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
    ],
    url: "furniture-1",
    price: 10,
    discountedPrice: 8,
    category: "collection-2",
    packof: 1,
    description:
      "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
  },

  {
    id: Math.floor(10000000 + Math.random() * 90000000),
    img: [Image4, Image5, Image1, Image2, Image3],
    title: "Furniture-4",
    specs: [
      {
        color: "red",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "blue",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "green",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
    ],
    url: "furniture-1",
    price: 10,
    discountedPrice: 8,
    category: "collection-1",
    packof: 1,
    description:
      "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
  },

  {
    id: Math.floor(10000000 + Math.random() * 90000000),
    img: [Image5, Image1, Image2, Image3, Image4],
    title: "Furniture-5",
    specs: [
      {
        color: "red",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "blue",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "green",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
    ],
    url: "furniture-1",
    price: 10,
    discountedPrice: 0,
    category: "collection-1",
    packof: 1,
    description:
      "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
  },

  {
    id: Math.floor(10000000 + Math.random() * 90000000),
    img: [Image6, Image1, Image2, Image3, Image4, Image5],
    title: "Furniture-6",
    specs: [
      {
        color: "red",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "blue",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
      {
        color: "green",
        available: [
          { size: "S", quantity: 4 },
          { size: "L", quantity: 7 },
          { size: "XL", quantity: 0 },
          { size: "XXL", quantity: 10 },
        ],
      },
    ],
    url: "furniture-1",
    price: 10,
    discountedPrice: 3,
    category: "collection-1",
    packof: 1,
    description:
      "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
  },
];
