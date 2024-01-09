import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image1 from '../../../Assets/Products/1.png';
import Image2 from '../../../Assets/Products/2.png';
import Image3 from '../../../Assets/Products/3.png';
import Image4 from '../../../Assets/Products/4.png';
import Image5 from '../../../Assets/Products/5.png';
import Image6 from '../../../Assets/Products/6.png';
import Image7 from '../../../Assets/Products/7.png';
import Image8 from '../../../Assets/Products/8.png';
import Image9 from '../../../Assets/Products/Product1.png';
import Image10 from '../../../Assets/Products/Product2.png';
import Image11 from '../../../Assets/Home5.png';
import Image12 from '../../../Assets/Home6.png';


function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Third() {
  return (
    <div style={{padding: '5rem'}}>
    <ImageList
      sx={{ width: "100%", height: "50rem" }}
      variant="quilted"
      cols={4}
      rowHeight={400}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}

const itemData = [
  {
    img: Image1,
    title: 'Furniture',
    rows: 2,
    cols: 2,
  },
  {
    img: Image2,
    title: 'Furniture',
  },
  {
    img: Image3,
    title: 'Furniture',
  },
  {
    img: Image4,
    title: 'Furniture',
    cols: 2,
  },
  {
    img: Image5,
    title: 'Furniture',
    cols: 2,
  },
  {
    img: Image6,
    title: 'Furniture',
    rows: 2,
    cols: 2,
  },
  {
    img: Image7,
    title: 'Furniture',
  },
  {
    img: Image8,
    title: 'Furniture',
  },
  {
    img: Image9,
    title: 'Furniture',
    rows: 2,
    cols: 2,
  },
  {
    img: Image10,
    title: 'Furniture',
  },
  {
    img: Image11,
    title: 'Furniture',
  },
  {
    img: Image12,
    title: 'Furniture',
    cols: 2,
  },
];