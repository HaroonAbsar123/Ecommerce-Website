import React, { useEffect, useState } from "react";
import classes from "./ProductPage.module.css";
import ItemOne from "./Items/ItemOne";
import ItemTwo from "./Items/ItemTwo";

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
import GridView from "./Items/GridView";
import { useParams } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import { useContext } from "react";
import Footer from "../../components/Footer";

function ProductPage() {
  const [currentItem, setCurrentItem] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const { id, category } = useParams();
  const { products } = useContext(ProductContext);
  
  useEffect(() => {
    try {
      if (!products || !category || !id) return;
  
      if (category === "hot") {
        // Find all products with hot === true from all categories
        const hotProducts = Object.values(products).flatMap((categoryProducts) =>
          Array.isArray(categoryProducts)
            ? categoryProducts.filter((item) => item?.hot === true)
            : Object.values(categoryProducts || {}).filter((item) => item?.hot === true)
        );
  
        setCurrentItem(hotProducts.find((item) => item?.id === id)); // Compare ID as string
        setRelatedProducts(hotProducts.filter((item) => item?.id !== id));
      } else {
        const categoryProducts = Array.isArray(products[category])
          ? products[category]
          : Object.values(products[category] || {});
  
        setCurrentItem(categoryProducts.find((item) => item?.id === id)); // Compare ID as string
        setRelatedProducts(categoryProducts.filter((item) => item?.id !== id));
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
      // Handle error if needed
    }
  }, [products, category, id]);
  
  

  if (!currentItem) {
    return <div>Product not found.</div>;
  }

  // console.log(category, products);

  return (
    <div>
      <ItemOne Products={currentItem} />

      <ItemTwo Products={currentItem} />

      <GridView Products={relatedProducts} category={category} />

      <Footer />
    </div>
  );
}

export default ProductPage;
