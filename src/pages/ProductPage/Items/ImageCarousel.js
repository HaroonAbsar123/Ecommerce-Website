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


import dummyImage from '../../../Assets/displayImage.png';

function ImageCarousel({ Product, colorIndex, setColorIndex  }) {


  const [selectedImage, setSelectedImage] = useState(Product.colors[colorIndex].images[0]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    setSelectedImage(Product.colors[colorIndex].images[0])
  }, [colorIndex])

  
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const { id, category } = useParams();
  const { products } = useContext(ProductContext);

  useEffect(() => {
    
  console.log("COLORS", Product.colors)
      setSelectedImage(Product.colors[colorIndex].images[0]);
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

  const displayedImages = Product.colors[colorIndex].images.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const showButtons = Product.colors[colorIndex].images.length > itemsPerPage;


  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 900); // You can adjust the width threshold as needed
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

{isMobile && 
          <h2 className={classes.title}>{Product.title}</h2>
}

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
                    borderRadius: "0px",
                    maxHeight: '30px'
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
                  borderRadius: '0px',
                  maxHeight: '30px'
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
                    borderRadius: "0px",
                    maxHeight: '30px'
                  }}
                  onClick={() => resetTransform()}
                >
                  <FontAwesomeIcon icon={faX} size="1x" />
                </Button>
              </div>
              <TransformComponent >
              {!imageLoaded && <img src={dummyImage} alt={"Product Image"} className={classes.zoomImage} />}
          <img
            src={selectedImage}
            alt={"Product Image"} 
            className={`${classes.zoomImage} ${imageLoaded ? classes.showImage : classes.hideImage}`}
            onLoad={handleImageLoaded}
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
      {!imageLoaded && <img src={dummyImage} alt={`Product ${index + 1}`} />}
      <img
        src={image}
        alt={`Product ${index + 1}`}
        className={`${imageLoaded ? classes.showImage : classes.hideImage}`}
        onLoad={handleImageLoaded}
        style={{
          width: '100%',
          aspectRatio: '2/3'
        }}
      />
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
          {Product.colors[colorIndex].images.length > itemsPerPage && (
            <Button
              onClick={handleNextClick}
              style={{
                color: "white",
                background:
                  startIndex + itemsPerPage >= Product.colors[colorIndex].images.length
                    ? "#ccc"
                    : "#1e1e1e",
              }}
              disabled={startIndex + itemsPerPage >= Product.colors[colorIndex].images.length}
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
