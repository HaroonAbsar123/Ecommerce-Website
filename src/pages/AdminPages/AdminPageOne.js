import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../Context/ProductContext';
import { useContext } from 'react';


function AdminPageOne(){
    const navigate=useNavigate()
    const { setIsUserLoggedIn, setUserDetails, setUserType, userDetails } = useContext(ProductContext);

    const LogoutHandler = () => {
        try {
          localStorage.clear();
          setIsUserLoggedIn(false);
          setUserDetails('');
          setUserType('');
          navigate('/login', { replace: true });
        } catch (error) {
          console.error('Error occurred during logout:', error);
        }
      };

    return(

        <div style={{flex: 1, padding: '5rem'}}>
            <div style={{flex: 1, padding: '2rem'}}>
            <button onClick={() => {navigate('/add-products')}}>Add New Products</button></div>
            <div style={{flex: 1, padding: '2rem'}}>
            <button onClick={() => {navigate('/delete-products')}}>Delete Products</button></div>
            <div style={{flex: 1, padding: '2rem'}}>
            <button onClick={() => {navigate('/edit-products')}}>Edit Products</button></div>
            <div style={{flex: 1, padding: '2rem'}}>
            <button onClick={LogoutHandler}>LOGOUT</button></div>
        </div>

    )
};

export default AdminPageOne;