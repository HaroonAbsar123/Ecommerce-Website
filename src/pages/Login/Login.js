import React from "react";
import styles from "./Login.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import { useContext } from "react";
import Footer from "../../components/Footer";
import {
  sendPasswordResetEmail,
} from "firebase/auth";
import LoginLogo from '../../Assets/logo - Copy.png';
import LoginImage from "../../Assets/loginScreenImage.jpg";
import GoogleImage from "../../Assets/R.png";

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const { setIsUserLoggedIn, setUserDetails, setUserType } =
    useContext(ProductContext);

  // useEffect(() => {
  //   // Fetch the 'isUserLoggedIn' value from local storage
  //   const localIsUserLoggedIn = localStorage.getItem("isLoggedIn");
  //   if (localIsUserLoggedIn === "true") {
  //     navigate("/profile", { replace: true });
  //   }
  // }, []);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

  const LoginForm = () => {
    const [loginUserName, setLoginUserName] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const LoginHandler = async (e) => {
      e.preventDefault(); // Prevent the form from submitting

      // Validation checks (you can add more as needed)
      if (!loginUserName.trim() && !loginPassword) {
        alert("Please enter email and password");
      } 
      else if (!loginUserName.trim()) {
        alert("Email is required");
      } 
      else if (!validateEmail(loginUserName)) {
        alert("Please enter a valid email");
      }
      else if (!loginPassword) {
        alert("Password is required");
      } else {
        try {
          const auth = getAuth(); // Import getAuth from firebase/auth if needed

          // Perform login using Firebase Authentication
          const userCredential = await signInWithEmailAndPassword(
            auth,
            loginUserName, // Assuming loginUserName is the user's email
            loginPassword
          );

          // Obtain the user's UID (userId)
          const userId = userCredential.user.uid;

          // Query Firestore to get the user's type and additional data based on UID
          const userListRef = collection(db, "userList");
          const q = query(userListRef, where("userId", "==", userId));
          const querySnapshot = await getDocs(q);

          if (querySnapshot.size === 1) {
            // Assuming each user has a unique document in "userList" based on UID
            querySnapshot.forEach((doc) => {
              const userType = doc.data().type;
              const userData = doc.data(); // Additional user data

                // Store data in Local Storage
                localStorage.setItem("userId", userId);
                localStorage.setItem("isLoggedIn", "true");

                // Update context state
                setIsUserLoggedIn(true);
                setUserDetails(userData); // Set user details in context
                setUserType(userType); // Set user type in context

                // Navigate to home page
                navigate("/", { replace: true });
                console.log("User logged in successfully");
            });
          } else {
            alert("User doesn't exist");
          }
        } catch (error) {
          console.error("Error logging in user: ", error);
          alert("Error logging in user", error);
        }
      }
    };

    const handleForgotPassword = async () => {
      if (loginUserName !== "") {
        try {
          const auth = getAuth(); // Import getAuth from firebase/auth if needed

          // Send password reset email
          await sendPasswordResetEmail(auth, loginUserName);

          // Inform the user that the password reset email has been sent
          alert("Password reset email sent. Please check your email inbox.");
        } catch (error) {
          console.error("Error sending password reset email: ", error);
          alert("Error sending password reset email");
        }
      } else {
        alert("Please Enter Email");
      }
    };

    return (
      <form
        onSubmit={LoginHandler}
        style={{ width: "100%", padding: "10px 20px" }}
      >
        <div className={styles.row}>
          <div
            style={{
              textAlign: "left",
              width: "100%",
              margin: "10px 10px",
              
              color: "#912d27",
              fontWeight: "bold",
              fontSize: "1.15rem",
            }}
          >
            Email
          </div>
          <input
            onChange={(e) => setLoginUserName(e.target.value)}
            value={loginUserName}
            placeholder="Enter email address"
            type="email"
          />
        </div>

        <div className={styles.row}>
          <div
            style={{
              textAlign: "left",
              width: "100%",
              margin: "10px 10px",
              
              color: "#912d27",
              fontWeight: "bold",
              fontSize: "1.15rem",
            }}
          >
            Password
          </div>
          <input
            onChange={(e) => setLoginPassword(e.target.value)}
            value={loginPassword}
            placeholder="Enter your password"
            type="password"
          />
        </div>

        <div>
          <div
            style={{
              textAlign: "right",
              width: "100%",
              margin: "10px 10px",
              color: "rgb(128,128,128)",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={() => {
              handleForgotPassword();
            }}
          >
            Forgot Password?
          </div>
        </div>

        <div style={{ marginTop: "2rem", paddingBottom: 0 }}>
          <button
            type="submit"
            className={styles.rowButton}
            style={{ textAlign: "center" }}
          >
            Log In
          </button>
        </div>

        <div style={{ marginTop: "2rem", paddingBottom: 0 }}>
          <button
            className={styles.rowButton}
            style={{
              textAlign: "center",
              color: "#1e1e1e",
              background: "#ccc",
            }}
            onClick={loginWithGoogle}
            type="button"
          >
            Login with <img style={{ height: "30px", marginLeft: '5px' }} src={GoogleImage} />
            oogle
          </button>
        </div>

        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "1.1rem",
            color: "#1e1e1e",
            fontWeight: "bold",
            marginTop: "2rem",
            marginBottom: isMobile? "1rem" : "2rem",
          }}
        >
          Don't have an account? <span onClick={() => {setIsLogin(false)}} style={{color: '#912d27', cursor: 'pointer'}}>Register Now!</span>
        </div>
      </form>
    );
  };

  const loginWithGoogle = async () => {
    try {
      const auth = getAuth(); // Import getAuth from firebase/auth if needed

      // Create a GoogleAuthProvider instance
      const provider = new GoogleAuthProvider();

      // Sign in with Google using a popup window
      const userCredential = await signInWithPopup(auth, provider);

      // Obtain the user's UID (userId) from Google Sign-In
      const userId = userCredential.user.uid;

      // Query Firestore to get the user's type and additional data based on UID
      const userListRef = collection(db, "userList");
      const q = query(userListRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        // Assuming each user has a unique document in "userList" based on UID
        querySnapshot.forEach((doc) => {
          const userType = doc.data().type;
          const userData = doc.data(); // Additional user data

            // Store data in Local Storage
            localStorage.setItem("userId", userId);
            localStorage.setItem("isLoggedIn", "true");

            // Update context state
            setIsUserLoggedIn(true);
            setUserDetails(userData); // Set user details in context
            setUserType(userType); // Set user type in context

            // Navigate to home page
            navigate("/", { replace: true });
            console.log("User logged in successfully with Google");
          
        });
      } else {
        alert("User doesn't exist.");
      }
    } catch (error) {
      console.error("Error logging in user with Google: ", error);
      alert("Error logging in user with Google");
    }
  };

  const LogInOtherMethods = (props) => (
      <div className={styles.iconGroup}>
        <Google onClick={loginWithGoogle} />
      </div>
  );

  //   ____________________________________________

  const signUpWithGoogle = async () => {
    try {
      const auth = getAuth();
  
      // Create a GoogleAuthProvider instance
      const provider = new GoogleAuthProvider();
  
      // Sign in with Google using a popup window
      const userCredential = await signInWithPopup(auth, provider);
  
      // Obtain the user's UID (userId) from Google Sign-In
      const userId = userCredential.user.uid;
  
      // Check if the user already exists in the "userList" collection
      const userListRef = collection(db, "userList");
      const querySnapshot = await getDocs(
        query(userListRef, where("userId", "==", userId))
      );
  
      // If user doesn't exist, create a new document in the "userList" collection
      if (querySnapshot.empty) {
        await addDoc(userListRef, {
          userId,
          userName: userCredential.user.displayName,
          email: userCredential.user.email,
          type: "user",
        });
  
        console.log("User signed up successfully with Google");
        setIsLogin(true);
      } else {
        console.log("User already exists in the database");
        setIsLogin(true); // You may want to handle this case differently based on your use case
      }
    } catch (error) {
      console.error("Error signing up user with Google: ", error);
      alert("Error signing up user");
    }
  };
  

  const SignUpForm = (props) => {
    const [signUpUserName, setSignUpUserName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");

    const isValidEmail = (email) => {
      // You can use a regular expression or a library like validator.js to validate the email
      // Here's a basic example of email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const SignUpHandler = async (e) => {
      e.preventDefault(); // Prevent the form from submitting

      // Validation checks
       if (!signUpUserName.trim()) {
        alert("Username is required");
      } else if (!signUpEmail) {
        alert("email address is required");
      } else if (!isValidEmail(signUpEmail)) {
        alert("Invalid email address");
      }else if (!signUpPassword) {
        alert("password is required");
      } else if (signUpPassword !== signUpConfirmPassword) {
        alert("Passwords do not match");
      } else {
        try {
          // Create a new user account in Firebase Authentication
          const auth = getAuth(); // Import getAuth from firebase/auth if needed
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            signUpEmail,
            signUpPassword
          );

          // Obtain the user's UID (userId)
          const userId = userCredential.user.uid;

          // Create a new document in the "userList" collection in Firestore
          const userListRef = collection(db, "userList");
          await addDoc(userListRef, {
            userId,
            userName: signUpUserName,
            email: signUpEmail,
            type: "user",
            status: "pending",
          });

          console.log("User signed up successfully");
          setIsLogin(true);
        } catch (error) {
          console.error("Error signing up user: ", error);
          alert("Error signing up user");
        }
      }
    };

    return (
      // <form onSubmit={SignUpHandler}>
      //   <div className={styles.row}>
      //     <label>Full Name</label>
      //     <input
      //       onChange={(e) => setSignUpUserName(e.target.value)}
      //       value={signUpUserName}
      //       placeholder="Enter Full Name"
      //       type="text"
      //     />
      //   </div>

      //   <div className={styles.row}>
      //     <label>Email</label>
      //     <input
      //       onChange={(e) => setSignUpEmail(e.target.value)}
      //       value={signUpEmail}
      //       placeholder="Enter Email Address"
      //       type="text"
      //     />
      //   </div>

      //   <div className={styles.row}>
      //     <label>Password</label>
      //     <input
      //       onChange={(e) => setSignUpPassword(e.target.value)}
      //       value={signUpPassword}
      //       placeholder="Enter your password"
      //       type="password"
      //     />
      //   </div>

      //   <div className={styles.row}>
      //     <label>Confirm Password</label>
      //     <input
      //       onChange={(e) => setSignUpConfirmPassword(e.target.value)}
      //       value={signUpConfirmPassword}
      //       placeholder="Re-Enter your password"
      //       type="password"
      //     />
      //   </div>

      //   <div style={{ padding: "2rem", paddingBottom: 0 }}>
      //     <button
      //       type="submit"
      //       className={styles.rowButton}
      //       style={{ textAlign: "center" }}
      //     >
      //       Sign Up
      //     </button>
      //   </div>

        
      //   <div
      //     style={{
      //       width: "100%",
      //       textAlign: "center",
      //       fontSize: "1.1rem",
      //       color: "#1e1e1e",
      //       fontWeight: "bold",
      //       marginTop: "2rem",
      //       marginBottom: isMobile? "1rem" : "2rem",
      //     }}
      //   >
      //     Already have an account? <span onClick={() => {setIsLogin(true)}} style={{color: '#912d27', cursor: 'pointer'}}>Log In</span>
      //   </div>
      // </form>


<form
        onSubmit={SignUpHandler}
        style={{ width: "100%", padding: "10px 20px" }}
      >
        <div className={styles.row}>
          <div
            style={{
              textAlign: "left",
              width: "100%",
              margin: "10px 10px",
              
              color: "#912d27",
              fontWeight: "bold",
              fontSize: "1.15rem",
            }}
          >
            Full Name
          </div>
          <input
            onChange={(e) => setSignUpUserName(e.target.value)}
            value={signUpUserName}
            placeholder="Enter Full Name"
            type="text"
          />
        </div>

        <div className={styles.row}>
          <div
            style={{
              textAlign: "left",
              width: "100%",
              margin: "10px 10px",
              
              color: "#912d27",
              fontWeight: "bold",
              fontSize: "1.15rem",
            }}
          >
            Email
          </div>
          <input
            onChange={(e) => setSignUpEmail(e.target.value)}
            value={signUpEmail}
            placeholder="Enter Email"
            type="email"
          />
        </div>

        <div className={styles.row}>
          <div
            style={{
              textAlign: "left",
              width: "100%",
              margin: "10px 10px",
              
              color: "#912d27",
              fontWeight: "bold",
              fontSize: "1.15rem",
            }}
          >
            Password
          </div>
          <input
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
            placeholder="Enter your password"
            type="password"
          />
        </div>

        <div className={styles.row}>
          <div
            style={{
              textAlign: "left",
              width: "100%",
              margin: "10px 10px",
              
              color: "#912d27",
              fontWeight: "bold",
              fontSize: "1.15rem",
            }}
          >
            Confirm Password
          </div>
          <input
            onChange={(e) => setSignUpConfirmPassword(e.target.value)}
            value={signUpConfirmPassword}
            placeholder="Re-enter your password"
            type="password"
          />
        </div>


        <div style={{ marginTop: "2rem", paddingBottom: 0 }}>
          <button
            type="submit"
            className={styles.rowButton}
            style={{ textAlign: "center" }}
          >
            Register
          </button>
        </div>

        <div style={{ marginTop: "2rem", paddingBottom: 0 }}>
          <button
            className={styles.rowButton}
            style={{
              textAlign: "center",
              color: "#1e1e1e",
              background: "#ccc",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={signUpWithGoogle}
            type="button"
          >
            Register with <img style={{ height: "30px", marginLeft: '5px' }} src={GoogleImage} />oogle
          </button>
        </div>

        <div
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "1.1rem",
            color: "#1e1e1e",
            fontWeight: "bold",
            marginTop: "2rem",
            marginBottom: isMobile? "1rem" : "2rem",
          }}
        >
          Already have an account? <span onClick={() => {setIsLogin(true)}} style={{color: '#912d27', cursor: 'pointer'}}>Login Now!</span>
        </div>
      </form>
    );
  };

  const SignUpOtherMethods = (props) => (
      <div className={styles.iconGroup}>
        <Google onClick={signUpWithGoogle} />
      </div>
  );

  const Google = (props) => (
    <div
      className={styles.rowButton}
      style={{
        background: "#ececec",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: '85%'
      }}
      onClick={props.onClick}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Chrome_icon_%28September_2014%29.svg"
        height={"90%"}
      />
      {/* <a style={{cursor: 'pointer'}} onClick={props.onClick} className={styles.googleIcon}></a> */}
    </div>
  );

  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 1200); // You can adjust the width threshold as needed
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
    <>
    <div className={styles.backgroundColor}>
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            margin: isMobile ? "3vh" : "5vh",
            padding: isMobile ? "2vh" : "1vh",
            boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.4)",
            marginTop: '5rem'
          }}
        >

          <div
            style={{
              display: "flex",
              flex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!isMobile && (
              <div
                style={{
                  flexDirection: "row",
                  height: "100%",
                  padding: "1rem",
                  display: "flex", // Added display: flex
                  flex: 1,
                }}
              >
                <img
                  style={{
                    width: "100%",
                    maxHeight: "100%",
                    alignSelf: "center",
                  }}
                  src={LoginImage}
                  alt="Image"
                />{" "}
                {/* Added maxHeight and alignSelf */}
              </div>
            )}

            {/* FORM */}
            <div
              style={{
                flex: 1,
                margin: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Center content horizontally
              }}
              className={styles.loginform}
            >
              <img src={LoginLogo} alt="Logo" style={{ height: "3rem" }} />{" "}
              {/* Center image using margin auto */}
              <h2
                style={{
                  color: "#912d27",
                  fontWeight: "bold",
                  paddingBottom: "10px",
                  paddingTop: "10px",
                }}
                className={styles.headerTitle}
              >
                Welcome
              </h2>
              <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
                Please enter your {isLogin ? 'Log-in' : 'Registration'} Details
              </p>
              {/* <FormHeader title={isLogin ? 'LogIn' : 'SignUp'} /> */}

              {isLogin ? <LoginForm /> : <SignUpForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Login;
