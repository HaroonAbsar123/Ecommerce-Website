import React, { useEffect, useState } from "react";
import classes from './ProductPage.module.css';
import ItemOne from "./Items/ItemOne";
import ItemTwo from "./Items/ItemTwo";


import Image1 from '../../Assets/Products/1.png';
import Image2 from '../../Assets/Products/2.png';
import Image3 from '../../Assets/Products/3.png';
import Image4 from '../../Assets/Products/4.png';
import Image5 from '../../Assets/Products/5.png';
import Image6 from '../../Assets/Products/6.png';
import Image7 from '../../Assets/Products/7.png';
import Image8 from '../../Assets/Products/8.png';
import Image9 from '../../Assets/Products/Product1.png';
import Image10 from '../../Assets/Products/Product2.png';
import Image11 from '../../Assets/Home5.png';
import Image12 from '../../Assets/Home6.png';
import GridView from "./Items/GridView";
import { useParams } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import { useContext } from "react";
import Footer from "../../components/Footer";


function ProductPage(){

  const [currentItem, setCurrentItem] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  
  const { id, category } = useParams();
  const { products } = useContext(ProductContext);
  
  useEffect(() => {
    // Find the product with the specified id in the current category
    // let product = ;
  
    if (category === 'hot') {
      // Find all products with hot === true from all categories
      let hotProducts = [];
      for (const category in products) {
        hotProducts.push(...products[category]?.filter(item => item?.hot === true));
      }
      setCurrentItem(hotProducts?.find(item => item?.id === Number(id))); // No individual product is selected in the "hot" category
      setRelatedProducts(hotProducts?.filter(item => item?.id !== Number(id)));
    } else {
      // Normal category (not "hot")
      setCurrentItem(products[category]?.find(item => item?.id === Number(id)));
      setRelatedProducts(products[category]?.filter(item => item?.id !== Number(id)));
    }
  
  }, [products, category, id]);
  

  if (!currentItem) {
    return <div>Product not found.</div>;
  }



  // console.log(category, products);


    return(
        <div >
            <ItemOne Products={currentItem} />

            <ItemTwo Products={currentItem}/>

            <GridView  Products={relatedProducts} category={category} />

            <Footer />
        </div>
    );
};

export default ProductPage;


const Products = [
    {
      id: Math.floor(10000000 + Math.random() * 90000000),
      img: [Image1, Image2, Image3, Image4, Image5],
      title: "Furniture-1",
      specs: [
        { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
        { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
        { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
      ],
      url: "furniture-1",
      price: 10,
      discountedPrice: 8,
      category: "collection-1",
      packof: 1,
      description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
    },


    {
        id: Math.floor(10000000 + Math.random() * 90000000),
        img: [Image2, Image3, Image4, Image5, Image1, ],
        title: "Furniture-2",
        specs: [
          { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
          { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
          { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
        ],
        url: "furniture-1",
        price: 10,
        discountedPrice: 8,
        category: "collection-1",
        packof: 1,
        description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
      },


      {
        id: Math.floor(10000000 + Math.random() * 90000000),
        img: [Image3, Image4, Image5, Image1, Image2, ],
        title: "Furniture-3",
        specs: [
          { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
          { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
          { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
        ],
        url: "furniture-1",
        price: 10,
        discountedPrice: 8,
        category: "collection-2",
        packof: 1,
        description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
      },


      {
        id: Math.floor(10000000 + Math.random() * 90000000),
        img: [Image4, Image5, Image1, Image2, Image3, ],
        title: "Furniture-4",
        specs: [
          { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
          { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
          { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
        ],
        url: "furniture-1",
        price: 10,
        discountedPrice: 8,
        category: "collection-1",
        packof: 1,
        description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
      },


      {
        id: Math.floor(10000000 + Math.random() * 90000000),
        img: [Image5, Image1, Image2, Image3, Image4, ],
        title: "Furniture-5",
        specs: [
          { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
          { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
          { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
        ],
        url: "furniture-1",
        price: 10,
        discountedPrice: 0,
        category: "collection-1",
        packof: 1,
        description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
      },


      {
        id: Math.floor(10000000 + Math.random() * 90000000),
        img: [Image6, Image1, Image2, Image3, Image4, Image5],
        title: "Furniture-6",
        specs: [
          { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
          { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
          { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
        ],
        url: "furniture-1",
        price: 10,
        discountedPrice: 3,
        category: "collection-1",
        packof: 1,
        description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
      },

    
  ];