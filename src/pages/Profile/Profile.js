import React, { useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Assuming you have your Firebase configuration set up
import ProductContext from '../../Context/ProductContext';
import { useContext } from 'react';
import Footer from '../../components/Footer';

import AdminPageOne from '../AdminPages/AdminPageOne';

export default function PersonalProfile() {
  const navigate = useNavigate();
  const { setIsUserLoggedIn, setUserDetails, setUserType, userDetails } = useContext(ProductContext);

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({}); // State to manage form data

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
      {userDetails?.type==="user" ?
    <section className={styles.container}>

<div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
<button
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "5px",
                        borderRadius: "10rem",
                        justifyContent: "center",
                        backgroundColor: "#1e1e1e",
                        border: "1px solid #1e1e1e",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          minWidth: "100px",
                          height: "100px",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                          justifyContent: "center",
                          fontSize: '3rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {finalName}
                      </div>
                    </button>
                    </div>
      {editing ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Input fields for user details */}
          {/* Assuming the names of fields correspond to the keys in your userDetails object */}
          <div>
          Full Name: <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
          </div>
          <div>
          Email: <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
          Phone: <input type={"tel"} name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
          Apartment: <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} />
          </div>
          <div>
          Address: <input type="address" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div>
          City: <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div>
          Zip Code: <input type={"number"} name="zip" value={formData.zip} onChange={handleChange} />
          </div>
          <div>
          Country: <input type={"text"} name="country" value={formData.country} onChange={handleChange} />
          </div>
          {/* Add more divs with input fields for other user details as required */}
          
          {/* Buttons for editing */}
          <div className={styles.buttons}>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          {/* Display user details */}
          <div className={styles.userData}>
  {/* Display user details */}
  <div style={{ fontSize: '1.2rem', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem', padding: '1rem' }}>
    <div style={{ fontWeight: 'bold' }}>Full Name:</div>
    <div>{userDetails?.userName}</div>
    <div style={{ fontWeight: 'bold' }}>Email:</div>
    <div>{userDetails?.email}</div>
    <div style={{ fontWeight: 'bold' }}>Phone:</div>
    <div>{userDetails?.phone}</div>
    <div style={{ fontWeight: 'bold' }}>Address:</div>
    <div>{userDetails?.address}</div>
    <div style={{ fontWeight: 'bold' }}>Apartment:</div>
    <div>{userDetails?.apartment}</div>
    <div style={{ fontWeight: 'bold' }}>City:</div>
    <div>{userDetails?.city}</div>
    <div style={{ fontWeight: 'bold' }}>Country:</div>
    <div>{userDetails?.country}</div>
    <div style={{ fontWeight: 'bold' }}>Zip:</div>
    <div>{userDetails?.zip}</div>
  </div>
</div>

          {/* Button to edit profile */}
          
  <button className={styles.editButton} onClick={handleEdit}>Edit</button>
        </>
      )}
      {/* Logout button */}
      <button className={styles.logoutButton} onClick={LogoutHandler}>Logout</button>
    </section>

    :

    <div> <AdminPageOne/> </div>

  }
    <Footer/>
    </div>
  );
}
