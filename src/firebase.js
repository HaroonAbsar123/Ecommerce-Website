// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase,  } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyApiWmQSBZ5I5J1T2pMDCB4eCA1_rjcWN0",
  authDomain: "ecommerce-791a1.firebaseapp.com",
  databaseURL: "https://ecommerce-791a1-default-rtdb.firebaseio.com",
  projectId: "ecommerce-791a1",
  storageBucket: "ecommerce-791a1.appspot.com",
  messagingSenderId: "711303342159",
  appId: "1:711303342159:web:aaf7e13a10a0a84fdda23a",
  measurementId: "G-JWVQQTHHYZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const storage = getStorage(app);
export const db = getFirestore(app)



  
