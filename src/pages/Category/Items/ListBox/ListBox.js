import React, { useEffect, useState } from "react";
import classes from './ListBox.module.css';
import ImageCard from "./ImageCard";
import ProductCard from "../../../ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import HomeProductCard from "./HomeProductCard";


function ListBox({ Products, category }) {

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  
    if (!Products || Products.length === 0) {
      return (
        <div className={classes.mainContainer}>
          <div className={classes.heading}>
            No Products Available
          </div>
        </div>
      );
    }
  
    const handleChangePage = (event, newPage) => {
      setCurrentPage(newPage);
    };
  
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedSessions = Products?.slice(startIndex, endIndex);
  
    return (
      <div className={classes.mainContainer}>
      <div 
      style={{display: 'flex', flex: 1,  justifyContent: 'center'}}>
          <div className={classes.listContainer}>
            {displayedSessions.map((item, index) => (
                  <HomeProductCard
                  key={index} 
              category={item.category}
              id={item.id}
              item={item}
              title={item.title}
              price={item.colors[0]?.sizes[0]?.price}
              discountedPrice={item.colors[0]?.sizes[0]?.discountedPrice} />
            ))}
          </div>
                </div>
<div style={{flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '1rem'}}>
<Stack spacing={2}>
      <Pagination  count={Math.ceil(Products?.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage} />
    </Stack>
    </div>
      </div>
    );
  };
  
  export default ListBox;
  