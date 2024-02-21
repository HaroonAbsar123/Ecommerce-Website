import React, { useState, useEffect } from "react";
import classes from "./Two.module.css";
import ListBox from "./ListBox/ListBox";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../../../Context/ProductContext";


import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

function Two() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const navigate=useNavigate();
  const [loadingItems, setLoadingItems] = useState(true)





  const [currentItems, setCurremtItems] = useState([]);


  const {category} = useParams();

  const {products, userDetails} = useContext(ProductContext);


  

  useEffect(() => {
    let currentArray = [];
    if(category === "hot" ||category === "wishlist" || category === "sofas" ||category === "armchairs" ||category === "lamps" ||category === "cushions"){
    if (category === 'hot') {
      currentArray = [];
      for (const cat in products) {
        if (Array.isArray(products[cat])) {
          const categoryProducts = products[cat].filter((item) => item?.hot === true);
          currentArray.push(...categoryProducts);
        }
      }
    } else if (category === 'wishlist') {
      currentArray = [];
      if (userDetails) {
        for (const categoryKey in products) {
          const categoryItems = products[categoryKey];
          for (const categoryItem of categoryItems) {
            if (userDetails.wishlist.includes(categoryItem.id)) {
              currentArray.push(categoryItem);
            }
          }
        }
      }
    } else {
      currentArray = products[category];
    }
  }
  
    // Convert object to array
    const newArray = Object.values(currentArray);
  
    // Update the min and max prices whenever the Products or category changes
    setMinPrice(0);
    setMaxPrice(10000);
  
    const timeout = setTimeout(() => {
      setCurremtItems([]);
      setLoadingItems(true)
      setTimeout(() => {
        setCurremtItems(newArray);
        setLoadingItems(false)
      }, 1000);
    }, 0);
    return () => clearTimeout(timeout);
  }, [category, products]);
  
  
  
  


  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 1000); // You can adjust the width threshold as needed
  };

  useEffect(() => {
    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile); // Add event listener

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  

  return (
    <div className={classes.mainContainer}>
      <div className={classes.First}>
        <ListBox
          // Products={currentItems.filter(
          //   (product) =>
          //     (product?.discountedPrice || product?.price) >= minPrice &&
          //     (product?.discountedPrice || product?.price) <= maxPrice
          // )}

          Products={currentItems}
          loadingItems={loadingItems}
          category={category}
        />
      </div>

      <div className={classes.Second}>
            <div className={classes.navLinks}>
{!isMobile ? 

<div style={{
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(4px)', // Adjust the blur intensity as needed
  WebkitBackdropFilter: 'blur(4px)', // For Safari support,
  borderRadius: '10px',
  padding: '10px',
  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
}}>
 <div>
 <Button disabled
                onClick={() => navigate("/collection/hot")}
                style={{  width: '100%',fontSize: '1rem', background: '#1e1e1e', marginBottom: '5px', color: 'white'   }}
              >
               Collection
              </Button>
  <Button
                onClick={() => navigate("/collection/hot")}
                sx={{ color: '#1e1e1e', width: '100%',fontSize: '1rem', background: '#fff', marginBottom: '5px'   }}
              >
               Hot Products
              </Button>
              {
                userDetails &&
                <Button
                onClick={() => navigate("/collection/wishlist")}
                sx={{ color: '#1e1e1e', width: '100%',fontSize: '1rem', background: '#fff', marginBottom: '5px'   }}
              >
               Wish List
              </Button>
              }

              <Button
                onClick={() => navigate("/collection/sofas")}
                sx={{ color: '#1e1e1e', width: '100%', fontSize: '1rem', background: '#fff', marginBottom: '5px'  }}
              >
               Sofas
              </Button>

              <Button
                onClick={() => navigate("/collection/armchairs")}
                sx={{  color: '#1e1e1e', width: '100%', fontSize: '1rem', background: '#fff', marginBottom: '5px'  }}
              >
               Armchairs
              </Button>
              <Button
                onClick={() => navigate("/collection/lamps")}
                sx={{  color: '#1e1e1e', width: '100%', fontSize: '1rem', background: '#fff', marginBottom: '5px'  }}
              >
               Lamps
              </Button>

              <Button
                onClick={() => navigate("/collection/cushions")}
                sx={{ color: '#1e1e1e', width: '100%', fontSize: '1rem', background: '#fff',  }}
              >
               Cushions
              </Button>

</div>

{/* Filter component */}
{/* <div className={classes.FilterContainer}>
          <div className={classes.filterInputContainer}>
            <label htmlFor="minPrice" className={classes.filterText}>
              Min Price:
            </label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              min={0}
              max={maxPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className={classes.filterInputContainer}>
            <label htmlFor="maxPrice" className={classes.filterText}>
              Max Price:
            </label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              min={minPrice}
              max={10000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div> */}
</div>
:
<>

  <Accordion style={{
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(4px)', 
  WebkitBackdropFilter: 'blur(4px)',
  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
}}>
<AccordionSummary
  aria-controls="panel1-content"
  id="panel1-header"
  style={{padding: '0px', margin: '0px', marginLeft: '10px', marginRight: '10px'}}
>
<Button disabled
                onClick={() => navigate("/collection/hot")}
                style={{  width: '100%',fontSize: '1rem', background: '#1e1e1e', marginBottom: '5px', color: 'white'   }}
              >
               Collection
              </Button>
</AccordionSummary>
<AccordionDetails>

 <div>

  <Button
                onClick={() => navigate("/collection/hot")}
                sx={{ color: '#1e1e1e', width: '100%',fontSize: '1rem', background: '#fff', marginBottom: '5px'   }}
              >
               Hot Products
              </Button>
              {
                userDetails &&
                <Button
                onClick={() => navigate("/collection/wishlist")}
                sx={{ color: '#1e1e1e', width: '100%',fontSize: '1rem', background: '#fff', marginBottom: '5px'   }}
              >
               Wish List
              </Button>
              }

              <Button
                onClick={() => navigate("/collection/sofas")}
                sx={{ color: '#1e1e1e', width: '100%', fontSize: '1rem', background: '#fff', marginBottom: '5px'  }}
              >
               Sofas
              </Button>

              <Button
                onClick={() => navigate("/collection/armchairs")}
                sx={{  color: '#1e1e1e', width: '100%', fontSize: '1rem', background: '#fff', marginBottom: '5px'  }}
              >
               Armchairs
              </Button>
              <Button
                onClick={() => navigate("/collection/lamps")}
                sx={{  color: '#1e1e1e', width: '100%', fontSize: '1rem', background: '#fff', marginBottom: '5px'  }}
              >
               Lamps
              </Button>

              <Button
                onClick={() => navigate("/collection/cushions")}
                sx={{ color: '#1e1e1e', width: '100%', fontSize: '1rem', background: '#fff',  }}
              >
               Cushions
              </Button>

</div>
</AccordionDetails>
  </Accordion>



</>
}
</div>
      </div>
    </div>
  );
}

export default Two;
