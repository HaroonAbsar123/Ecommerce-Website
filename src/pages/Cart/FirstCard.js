import React, { useState } from "react";
import classes from './FirstCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ProductContext from "../../Context/ProductContext";
import { Link } from "react-router-dom";


function FirstCard({Products}) {


  const {CartRemoveItem, CartUpdateItem, cart, coupons, setCouponApplied, couponApplied} = useContext(ProductContext);
  const [couponInput, setCouponInput] = useState('');



  function CouponCheckHandler(){

    if (couponInput !== ''){
      const item = coupons.find(item => item.couponCode === couponInput)

      if(item){
        setCouponApplied(item);
      }
      else {
        setCouponApplied({});
        console.log("Coupon NOT Applied");
      }
    }

    console.log(couponApplied);

  }

  function CartAddItemHandler(cartID) {
    const currentItem = cart.find(item => item.cartID === cartID);
    let updatedItem = {}; // Use "let" instead of "const"
  
    if (currentItem) {
      updatedItem = {
        ...currentItem,
        selectedQuantity: currentItem.selectedQuantity + 1
      };
  
      console.log(updatedItem);
    } else {
      console.log("Item not found in cart.");
    }
  
    CartUpdateItem(updatedItem);
  }


  function CartRemoveItemHandler(cartID) {
    const currentItem = cart.find(item => item.cartID === cartID);
    let updatedItem = {}; // Use "let" instead of "const"
  
    if (currentItem) {
      const newSelectedQuantity = Math.max(currentItem.selectedQuantity - 1, 1); // Ensure selectedQuantity doesn't go below 0
      updatedItem = {
        ...currentItem,
        selectedQuantity: newSelectedQuantity
      };
  
      console.log(updatedItem);
    } else {
      console.log("Item not found in cart.");
    }
  
    CartUpdateItem(updatedItem);
  }
  
  

    return (
      <div className={classes.mainContainer}>
        <div className={classes.secondContainer}>
          <div style={{ width: '100%', }}>
            <div style={{width: '100%', borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
            <h2 className="title">Item Cart</h2>
            </div>
            {
              Products.length > 0 ?
              <div  style={{ width: "100%", flex: 1, display: 'flex', justifyContent: 'flex-end', textAlign: 'right', paddingBottom: '1rem', borderBottom: '1px solid #ccc'  }}>
            {/* <span style={{ flex: 0.5, textAlign: 'left' }}>Action</span> */}
              <span style={{ flex: 1 }}>Product</span>
              <span style={{ flex: 1 }}>Price</span>
              <span style={{ flex: 1 }}>Quantity</span>
              <span style={{ flex: 1 }}>Total</span>
              <span style={{ flex: 1 }}>View</span>
            </div>

            :
              <div style={{ width: '100%', textAlign: 'center' }}>
            <h2 style={{marginBottom: '2rem', marginTop: '2rem'}} className="title">No Items in Cart</h2>
            <Link to={'/collection'} className="nolinkstyle">
            <button style={{backgroundColor: 'black', color: 'white'}} className="mainButton">Checkout Our Collection</button>
            </Link>

            
            </div>
            }
            
          </div>
          {Products.map((product, index) => (
            <>
            <div style={{height: '100%', flex: 1}}>
              <h2 style={{marginBottom: '0px'}} className="title">{product.product.title}</h2>
            
            </div>
            <div className={classes.cartItem} key={product.cartID} style={{ width: "100%", flex: 1, display: 'flex', justifyContent: 'flex-end', textAlign: 'right', flexDirection: 'row', alignItems: 'center' }}>
                
                <span style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}><div  style={{ flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}> 
                <button onClick={() => {CartRemoveItem(product.cartID)}} style={{margin: '0.5rem', background: 'none', border: 'none'}}>
                    <FontAwesomeIcon icon={faCircleXmark} size="1.5x" style={{fontSize: '1.2rem'}} />
                </button>
                <div  className={classes.imageContainer}><img src={product.product.img[0]} alt="Image" height='100%' width="100%" style={{objectFit: 'cover'}} /></div>
                </div>
              </span>
              <span style={{ flex: 1 }}>{product.price}</span>

              <span style={{ flex: 1 }}>
                <button style={{padding: '10px'}} onClick={() => {CartAddItemHandler(product.cartID)}}>+</button>
                <span style={{marginRight: '5px', marginLeft: '5px'}}>{product.selectedQuantity}</span>
                <button style={{padding: '10px'}} onClick={() => {CartRemoveItemHandler(product.cartID)}}>-</button>

                </span>

              <span style={{ flex: 1 }}>${product.selectedQuantity*product.price}</span>

              <span style={{ flex: 1 }}> <Link to={`/collection/${product.product.category}/${product.product.id}`}><button style={{background: 'none', border: 'none'}}>
              <FontAwesomeIcon icon={faEye} size="1.5x" style={{fontSize: '1.2rem'}} />
                </button></Link></span>
              
            </div>
            <div style={{borderBottom: '1px solid #ccc',width: "100%", flex: 1, display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
              {/* <p style={{marginTop: '0px'}} className="para">color: {product.selectedColor}</p> */}
              {/* <p style={{marginTop: '0px'}} className="para">size: {product.selectedSize}</p> */}
              <p style={{marginTop: '0px'}} className="para">id: {product.product.id}</p>
            </div>
            </>
          ))}

              {Products.length > 0 && Object.keys(couponApplied).length === 0 && 
<div className={classes.inputContainer}>
            <input onChange={(e) => {setCouponInput(e.target.value)}} className={classes.input} placeholder="Coupon Code" />
            <button onClick={CouponCheckHandler} className={classes.button}> Apply Coupon </button>
            </div>
            }

        </div>
      </div>
    );
  }



export default FirstCard;



// const Products = [
//     {
//       id: Math.floor(10000000 + Math.random() * 90000000),
//       img: [Image1, Image2, Image3, Image4, Image5],
//       title: "Furniture-1",
//       specs: [
//         { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//         { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//         { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
//       ],
//       url: "furniture-1",
//       price: 10,
//       discountedPrice: 8,
//       category: "collection-1",
//       packof: 1,
//       description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
//     }
//   ]


//     {
//         id: Math.floor(10000000 + Math.random() * 90000000),
//         img: [Image2, Image3, Image4, Image5, Image1, ],
//         title: "Furniture-2",
//         specs: [
//           { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//           { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//           { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
//         ],
//         url: "furniture-1",
//         price: 10,
//         discountedPrice: 8,
//         category: "collection-1",
//         packof: 1,
//         description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
//       },


//       {
//         id: Math.floor(10000000 + Math.random() * 90000000),
//         img: [Image3, Image4, Image5, Image1, Image2, ],
//         title: "Furniture-3",
//         specs: [
//           { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//           { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//           { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
//         ],
//         url: "furniture-1",
//         price: 10,
//         discountedPrice: 8,
//         category: "collection-2",
//         packof: 1,
//         description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
//       },


//       {
//         id: Math.floor(10000000 + Math.random() * 90000000),
//         img: [Image4, Image5, Image1, Image2, Image3, ],
//         title: "Furniture-4",
//         specs: [
//           { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//           { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//           { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
//         ],
//         url: "furniture-1",
//         price: 10,
//         discountedPrice: 8,
//         category: "collection-1",
//         packof: 1,
//         description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
//       },


//       {
//         id: Math.floor(10000000 + Math.random() * 90000000),
//         img: [Image5, Image1, Image2, Image3, Image4, ],
//         title: "Furniture-5",
//         specs: [
//           { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//           { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//           { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
//         ],
//         url: "furniture-1",
//         price: 10,
//         discountedPrice: 0,
//         category: "collection-1",
//         packof: 1,
//         description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
//       },


//       {
//         id: Math.floor(10000000 + Math.random() * 90000000),
//         img: [Image6, Image1, Image2, Image3, Image4, Image5],
//         title: "Furniture-6",
//         specs: [
//           { color: "red", available: [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//           { color: "blue", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }] },
//           { color: "green", available:  [{ size: "S", quantity: 4 }, { size: "L", quantity: 7 }, { size: "XL", quantity: 0 }, { size: "XXL", quantity: 10 }]  },
//         ],
//         url: "furniture-1",
//         price: 10,
//         discountedPrice: 3,
//         category: "collection-1",
//         packof: 1,
//         description: "Talk digital shark heads-up door win involved turn timepoint bed. Room management exploratory they forward should reinvent field. Dunder buy-in first invested gave ipsum down email monday elephant. Please pushback deliverables dive best.\n\nCommitment are by world across ui first charts. 2 unit live whatever diarize when closing all know. Now anomalies shelf-ware you win-win-win me close plane. Don't stop then tomorrow work. Creep procrastinating break support sky.",
//       },

    
//   ];