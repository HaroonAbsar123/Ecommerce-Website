import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../Context/ProductContext';
import { useContext } from 'react';
import CustomModal from '../../components/CustomModal';

function ShowProducts(){
    const navigate=useNavigate()

    const { setIsUserLoggedIn, setUserDetails, setUserType, userDetails, products } = useContext(ProductContext);

    return(
      <>
    </>
    )
};

export default ShowProducts;