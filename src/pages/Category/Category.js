import React, { useEffect, useState } from "react";
import classes from './Category.module.css';
import Image1 from '../../Assets/Products/1.png';
import Image2 from '../../Assets/Products/2.png';
import Image3 from '../../Assets/Products/3.png';
import Image4 from '../../Assets/Products/4.png';
import Image5 from '../../Assets/Products/5.png';
import Image6 from '../../Assets/Products/6.png';
import Image7 from '../../Assets/Products/7.png';
import Image8 from '../../Assets/Products/8.png';
import Image9 from '../../Assets/Products/Product1.png';
import Image10 from '../../Assets/Products/Product2.png';
import Image11 from '../../Assets/Home5.png';
import Image12 from '../../Assets/Home6.png';

import One from "./Items/One";
import Two from "./Items/Two";
import Three from "./Items/Three";

import Footer from "../../components/Footer";
import { useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../../Context/ProductContext";

function Category(){

  
  const {category} = useParams();


    return(

        <div className={classes.mainContainer}>
                Category
                <One category={category} />
                <Two  />

                <Three />


                <Footer />
        </div>
    );
};

export default Category;




const Products = [
    {
      img: Image1,
      title: 'Furniture-1',
      url: 'furniture-1',
      price: 10,
      discountedPrice: 8,
    },
    {
      img: Image2,
      title: 'Furniture-2',
      url: 'furniture-2',
      price: 20,
      discountedPrice: 8,
    },
    {
      img: Image3,
      title: 'Furniture-3',
      url: 'furniture-3',
      price: 30,
      discountedPrice: 8,
    },
    {
      img: Image4,
      title: 'Furniture-4',
      url: 'furniture-4',
      price: 40,
      discountedPrice: 8,
    },
    {
      img: Image5,
      title: 'Furniture-5',
      url: 'furniture-5',
      price: 50,
    },
    {
      img: Image6,
      title: 'Furniture-6',
      url: 'furniture-6',
      price: 60,
      discountedPrice: 8,
    },
    {
      img: Image7,
      title: 'Furniture-7',
      url: 'furniture-7',
      price: 70,
    },
    {
      img: Image8,
      title: 'Furniture-8',
      url: 'furniture-8',
      price: 80,
      discountedPrice: 8,
    },
    {
      img: Image9,
      title: 'Furniture-9',
      url: 'furniture-9',
      price: 90,
      discountedPrice: 8,
    },
    {
      img: Image10,
      title: 'Furniture-10',
      url: 'furniture-10',
      price: 100,
      discountedPrice: 8,
    },
    {
      img: Image11,
      title: 'Furniture-11',
      url: 'furniture-11',
      price: 110,
    },
    {
      img: Image12,
      title: 'Furniture-12',
      url: 'furniture-12',
      price: 120,
      discountedPrice: 8,
    },








    {
        img: Image1,
        title: 'Furniture-1',
        url: 'furniture-1',
        price: 10,
        discountedPrice: 8,
      },
      {
        img: Image2,
        title: 'Furniture-2',
        url: 'furniture-2',
        price: 10,
        discountedPrice: 8,
      },
      {
        img: Image3,
        title: 'Furniture-3',
        url: 'furniture-3',
        price: 10,
        discountedPrice: 8,
      },
      {
        img: Image4,
        title: 'Furniture-4',
        url: 'furniture-4',
        price: 10,
        discountedPrice: 8,
      },
      {
        img: Image5,
        title: 'Furniture-5',
        url: 'furniture-5',
        price: 10,
      },
      {
        img: Image6,
        title: 'Furniture-6',
        url: 'furniture-6',
        price: 10,
        discountedPrice: 8,
      },
      {
        img: Image7,
        title: 'Furniture-7',
        url: 'furniture-7',
        price: 10,
      },
      {
        img: Image8,
        title: 'Furniture-8',
        url: 'furniture-8',
        price: 10,
        discountedPrice: 8,
      },
      {
        img: Image9,
        title: 'Furniture-9',
        url: 'furniture-9',
        price: 10,
        discountedPrice: 8,
      },
      {
        img: Image10,
        title: 'Furniture-10',
        url: 'furniture-10',
        price: 10,
        discountedPrice: 8,
      },
      {
        img: Image11,
        title: 'Furniture-11',
        url: 'furniture-11',
        price: 10,
      },
      {
        img: Image12,
        title: 'Furniture-12',
        url: 'furniture-12',
        price: 10,
        discountedPrice: 8,
      },
  ];