import React, { useEffect, useState } from "react";
import classes from "./ImageCarousel.module.css";
import { useParams } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import ProductContext from "../../../Context/ProductContext";
import { Button } from "@mui/material";

function ImageCarousel({ Products }) {
  const [selectedImage, setSelectedImage] = useState(Products.img[0]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const { id, category } = useParams();
  const { products } = useContext(ProductContext);

  useEffect(() => {
    const currentArray = [];
    if (category === "hot") {
      for (const category in products) {
        const categoryProducts = products[category].filter(
          (item) => item.hot === true
        );
        currentArray.push(...categoryProducts);
      }

      const currentItem = currentArray.find((item) => item.id === Number(id));
      setSelectedImage(currentItem.img[0]);
    } else {
      setSelectedImage(Products.img[0]);
    }
  }, [id]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleNextClick = () => {
    const newStartIndex = startIndex + 1;
    setStartIndex(newStartIndex);
  };

  const handlePreviousClick = () => {
    const newStartIndex = startIndex - 1;
    setStartIndex(newStartIndex);
  };

  const displayedImages = Products.img.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const showButtons = Products.img.length > itemsPerPage;

  return (
    <div className={classes.mainContainer}>
      <div className={classes.mainImage}>
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className={classes.buttonContainer}>
                <Button
                  style={{
                    flex: 1,
                    backgroundColor: "#1e1e1e",
                    color: "white",
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                    borderTopRightRadius: "0px",
                  }}
                  onClick={() => zoomIn()}
                >
                  <FontAwesomeIcon icon={faPlus} size="1x" />
                </Button>
                <Button
                style={{
                  flex: 1,
                  backgroundColor: "#1e1e1e",
                  color: "white",
                  borderRadius: '0px'
                }}
                
                  onClick={() => zoomOut()}
                >
                  <FontAwesomeIcon icon={faMinus} size="1x" />
                </Button>
                <Button
                style={{
                    flex: 1,
                    backgroundColor: "#1e1e1e",
                    color: "white",
                    borderTopLeftRadius: "0px",
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  onClick={() => resetTransform()}
                >
                  <FontAwesomeIcon icon={faX} size="1x" />
                </Button>
              </div>
              <TransformComponent >
                <img
                  src={selectedImage}
                  className={classes.zoomImage}
                  alt="image"
                />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
      <div className={classes.thumbnailContainer}>
        {displayedImages.map((image, index) => (
          <div
            key={index}
            className={`${classes.thumbnail} ${
              selectedImage === image ? classes.active : ""
            }`}
            onClick={() => handleImageClick(image)}
          >
            <img src={image} alt={`Product ${index + 1}`} />
          </div>
        ))}
      </div>

      {showButtons && (
        <div className={classes.buttonRow}>
          <Button
            disabled={startIndex === 0}
            style={{
              color: "white",
              background: startIndex === 0 ? "#ccc" : "#1e1e1e",
            }}
            onClick={handlePreviousClick}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="1x" />
          </Button>
          {Products.img.length > itemsPerPage && (
            <Button
              onClick={handleNextClick}
              style={{
                color: "white",
                background:
                  startIndex + itemsPerPage >= Products.img.length
                    ? "#ccc"
                    : "#1e1e1e",
              }}
              disabled={startIndex + itemsPerPage >= Products.img.length}
            >
              <FontAwesomeIcon icon={faArrowRight} size="1x" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
