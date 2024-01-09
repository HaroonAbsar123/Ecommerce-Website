import React, { useEffect, useState } from "react";
import classes from './ListBox.module.css';
import ImageCard from "./ImageCard";
import ProductCard from "../../../ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";


function ListBox({ Products, category }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
  
    // Move the pagination calculations inside the useEffect to avoid accessing Products before it's available
    useEffect(() => {
      setCurrentPage(1);
    }, [Products]);
  
    const goToNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
      
    };
  
    const goToPreviousPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  
    if (!Products || Products.length === 0) {
      return (
        <div className={classes.mainContainer}>
          <div className={classes.heading}>
            No Products Available
          </div>
        </div>
      );
    }
  
    const totalPages = Math.ceil(Products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = Products.slice(startIndex, endIndex);
  
    return (
      <div className={classes.mainContainer}>
        <>
          <div className={classes.listContainer}>
            {currentItems.map((product, index) => (
              <div key={index}>
                
                  <ImageCard id={product.id} category={category} image={product.img[0]} price={product.price} title={product.title} discountedPrice={product.discountedPrice} />
                
              </div>
            ))}
          </div>
          <div className={classes.pagination}>
            <button
              className={classes.prevButton}
              disabled={currentPage === 1}
              onClick={goToPreviousPage}
            >
              <FontAwesomeIcon icon={faArrowCircleLeft} size="3x" />
            </button>
            <span className={classes.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={classes.nextButton}
              disabled={currentPage === totalPages}
              onClick={goToNextPage}
            >
              <FontAwesomeIcon icon={faArrowCircleRight} size="3x" />
            </button>
          </div>
        </>
      </div>
    );
  };
  
  export default ListBox;
  