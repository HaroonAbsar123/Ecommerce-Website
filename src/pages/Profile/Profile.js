import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Assuming you have your Firebase configuration set up
import ProductContext from '../../Context/ProductContext';
import { useContext } from 'react';
import Footer from '../../components/Footer';

import AdminPageOne from '../AdminPages/AdminPageOne';
import AdminProfile from '../AdminPages/AdminProfile';
import CustomerProfile from '../CustomerPages/CustomerProfile';

export default function PersonalProfile() {
  const navigate = useNavigate();
  const { setIsUserLoggedIn, setUserDetails, setUserType, userDetails, isUserLoggedIn } = useContext(ProductContext);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({}); // State to manage form data
  const [showPage, setShowPage] = useState(false)

  useEffect(() => {
    if(Object.values(userDetails).length>1){
      setShowPage(true);
      if(!userDetails?.userId){
        navigate('/login')
      }
  }
  }, [userDetails])

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userId = localStorage.getItem('userId');
        const userListRef = collection(db, 'userList');
        const q = query(userListRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUserData();
  }, [setUserDetails]);

  const handleEdit = () => {
    setFormData(userDetails);
    setEditing(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const userListRef = collection(db, 'userList');
      const q = query(userListRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (doc) => {
        const userRef = doc.ref;
        await updateDoc(userRef, formData);
        setUserDetails(formData);
        setEditing(false);
      });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleCancel = () => {
    setFormData(userDetails);
    setEditing(false);
  };

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

  let names = userDetails?.userName?.split(" ");
  let finalName = "";

  if (names) {
    if (names.length >= 2) {
      let initials = names[0][0] + names[1][0];
      // Make the initials uppercase if needed
      initials = initials.toUpperCase();
      console.log(initials); // Output: HA
      finalName = initials;
    }
  } else {
    console.log("Invalid format for username.");
  }

  return (
    <div className={styles.mainContainer}>
      {userDetails?.type!=="admin" ?

      <>
      {showPage && 
         <CustomerProfile />
      }
      </>


    :
<>
      {showPage && 
    <div> <AdminProfile/> </div>
  }
  </>

  }
    <Footer/>
    </div>
  );
}
