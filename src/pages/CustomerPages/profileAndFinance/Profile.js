import React, { useState, useEffect, useContext } from "react";
import ProductContext from "../../../Context/ProductContext";
import { ContactInformation } from "./ContactInformation";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, storage, db } from "../../../firebase";
import { collection, addDoc, doc, updateDoc, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { toast } from "react-hot-toast";
import dummyImage from '../../../Assets/dummyUserImage.png';

export function Profile() {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserType,
    setUserDetails,
    userType,
    userDetails,
  } = useContext(ProductContext);

  const [image, setImage] = useState(userDetails?.image ? userDetails?.image : dummyImage);
  const [isHovered, setIsHovered] = useState(false);

  async function updateImage(newImage) {
    try {
      // Check if the image size is less than 5MB
      if (newImage.size > 5 * 1024 * 1024) {
        toast.error("Image size exceeds 5MB. Please choose a smaller image.");
        return;
      }
  
      // Get the file extension
      const extension = newImage.name.split('.').pop();
  
      // Generate a random image number
      const randomImageNumber = Math.floor(Math.random() * 1000000);
  
      // Upload the new image to Firebase Storage with the original file name
      const imageRef = storageRef(storage, `images/${userDetails.userId}/${randomImageNumber}-${newImage.name}`);
      await uploadBytes(imageRef, newImage);
      const imageUrl = await getDownloadURL(imageRef);
  
      // Update the user's image in Firestore
      const details = {
        image: imageUrl
      };
  
      const userListRef = collection(db, "userList");
      const q = query(userListRef, where("userId", "==", userDetails.userId));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
  
        // Update only the specified fields in the document
        await updateDoc(docRef, details);
        console.log("imageUrl", imageUrl);
        toast.success("Image Updated");
        setImage(imageUrl); // Update the image state
      }
  
    } catch (e) {
      toast.error("Error saving changes. Please try again");
      console.error(e);
    }
  }
  

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      updateImage(file);
    }
  }
  

  return (
    <div style={{ marginTop: "0px", flex: 1, height: "max-content", padding: '10px', borderRadius: '10px' }}>
      <div>
  <div
    style={{
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1rem',
      position: 'relative',
    }}
  >
    <img
      src={image}
      style={{
        height: '100px',
        width: '100px',
        borderRadius: '50%',
        filter: isHovered ? 'brightness(70%)' : 'brightness(100%)',
        transition: 'filter 0.3s',
        position: 'relative',
        border: '1px solid #ddd',
        cursor: 'pointer'
      }}
      alt="User"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => e.target.nextSibling.click()}
    />
    <label
      htmlFor="fileInput"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#fff',
        display: isHovered ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
        pointerEvents: 'none', // Allow clicks to pass through
      }}
    >
      Edit
    </label>
    <input id="fileInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
  </div>
</div>


      <div style={{ flex: 1, textAlign: "center" }}>
        <h1 style={{marginBottom: "5px"}}>{userDetails?.userName}</h1>
        {userType=="admin" && <div style={{fontSize: '1.2rem'}}>Admin</div>}
      </div>
      <div style={{marginTop: '15px', padding: '10px', border: '1px solid #ccc'}}>
          <ContactInformation />
      </div>
          
    </div>
  );
}
