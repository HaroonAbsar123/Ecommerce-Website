import React, { useState } from "react";
import classes from './GridView.module.css';
import ImageCard from "../../Category/Items/ListBox/ImageCard";
import ProductCard from "../../ProductCard/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

function GridView({ Products, category }) {

    const filteredProducts = Products;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;


    const currentItems = filteredProducts.slice(startIndex, endIndex);

    

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div className={classes.mainContainer}>
            <div style={{textAlign: 'left', width: '100%'}}>
                <h2 className="title" style={{fontSize: '1.5rem'}}>Related Items</h2>
            </div>
            <div className={classes.listContainer}>
                {currentItems.map((product, index) => (
                    <div key={index}>
                        <ImageCard id={product?.id} category={category} image={product?.img[0]} price={product?.price} title={product?.title} discountedPrice={product?.discountedPrice} />
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
        </div>
    );
}

export default GridView;
