import React, { useState } from "react";
import classes from './GridView.module.css';
import ImageCard from "../../Category/Items/ListBox/ImageCard";
import ProductCard from "../../ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function GridView({ Products, category }) {

    const filteredProducts = Products;

    
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
   
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
      };
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedSessions = filteredProducts?.slice(startIndex, endIndex);

    return (
        <div className={classes.mainContainer}>
            <div style={{textAlign: 'left', width: '100%'}}>
                <h2 className="title" style={{fontSize: '1.5rem'}}>Related Items</h2>
            </div>
            <div className={classes.listContainer}>
                {displayedSessions.map((product, index) => (
                    <div key={index}>
                        <ImageCard id={product?.id} category={category} image={product?.img[0]} price={product?.price} title={product?.title} discountedPrice={product?.discountedPrice} />
                    </div>
                ))}
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
