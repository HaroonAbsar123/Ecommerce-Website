import React, {useState} from "react";
import classes from "./ItemOne.module.css";
import ImageCarousel from "./ImageCarousel";
import ItemDetails from "./ItemDetails";

function ItemOne({ Product }) {

  const [colorIndex, setColorIndex] = useState(0);


  return (
    <div>
      <div className={classes.mainContainer}>
        <div className={classes.First}>
          <ImageCarousel colorIndex={colorIndex} setColorIndex={setColorIndex} Product={Product} />
        </div>

        <div className={classes.Second}>
          <ItemDetails  colorIndex={colorIndex} setColorIndex={setColorIndex} Product={Product} />
        </div>
      </div>
    </div>
  );
}

export default ItemOne;
