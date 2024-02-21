import React, { useEffect, useState } from "react";
import classes from './GridView.module.css';
import ImageCard from "../../Category/Items/ListBox/ImageCard";
import ProductCard from "../../ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import HomeProductCard from "./HomeProductCard";

function GridView({ Products, category }) {

    const filteredProducts = Products;
    const [itemsPerPage, setItemsPerPage] = useState(5)

    
  const [currentPage, setCurrentPage] = useState(1);
   
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
      };
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedSessions = filteredProducts?.slice(startIndex, endIndex);

    const [isMobile, setIsMobile] = useState(false);

    const checkIsMobile = () => {
        if(window.innerWidth <= 1200){
            setItemsPerPage(4)
        }
        else {
            setItemsPerPage(5)
        }
    //   setIsMobile(window.innerWidth <= 900);
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
            <div style={{textAlign: 'left', width: '100%'}}>
                <h2 className="title" style={{fontSize: '1.5rem'}}>Related Items</h2>
            </div>
            
      <div 
      style={{display: 'flex', flex: 1,  justifyContent: 'center'}}>
            <div className={classes.listContainer}>
                {displayedSessions.map((item, index) => (
                    <div key={index}>
                        <HomeProductCard 
              category={item.category}
              id={item.id}
            //   image={item.colors[0]?.images[0]}
              title={item.title}
              item={item}
              price={item.colors[0]?.sizes[0]?.price}
              discountedPrice={item.colors[0]?.sizes[0]?.discountedPrice}/>
                    </div>
                ))}
            </div>
            </div>
            <div style={{flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '2rem'}}>
<Stack spacing={2}>
      <Pagination  count={Math.ceil(filteredProducts?.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage} />
    </Stack>
    </div>
            {/* <div className={classes.pagination}>
            
                <button
                    className={classes.prevButton}
                    disabled={currentPage === 1}
                    onClick={goToPreviousPage}
                    style={{color: currentPage === 1 ? "#ccc" : "#1e1e1e"}}
                >
                    <FontAwesomeIcon icon={faArrowCircleLeft}/>
                </button>
                <span className={classes.pageInfo}>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className={classes.nextButton}
                    disabled={currentPage === totalPages}
                    style={{color: currentPage === totalPages ? "#ccc" : "#1e1e1e"}}
                    onClick={goToNextPage}
                >
                    <FontAwesomeIcon icon={faArrowCircleRight} />
                </button>
            </div> */}
        </div>
    );
}

export default GridView;
