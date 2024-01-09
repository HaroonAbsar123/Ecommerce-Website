import React, { useState, useEffect } from "react";
import classes from "./Header.module.css";
import logo from "../Assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import ProductDropDown from "./DropDowns/ProductDropDown";
import cartImage from "../Assets/cart.svg";
import { useContext } from "react";
import ProductContext from "../Context/ProductContext";

function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHeaderTopVisible, setIsHeaderTopVisible] = useState(true);

  const { cart, isUserLoggedIn, userDetails } = useContext(ProductContext);

  const [totalItems, setTotalItems] = useState(0);
  const [animateButton, setAnimateButton] = useState(false);

  useEffect(() => {
    // Update the totalItems whenever the cart changes
    const newTotalItems = cart.reduce(
      (total, item) => total + item.selectedQuantity,
      0
    );
    setTotalItems(newTotalItems);

    // Trigger the animation
    setAnimateButton(true);
    const timeout = setTimeout(() => setAnimateButton(false), 500); // Change the time (ms) to your desired animation duration

    return () => clearTimeout(timeout);
  }, [cart]);

  function ItemClickedHandler(e) {
    if (e) {
      setActiveDropdown("");
    }
  }

  function blogSelected() {
    setActiveDropdown(false);
  }

  // _______________________________________________________________BLOG_____________________________________________________________________________
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(true);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // ________________________________________________________________________________________________________________________________________________

  // _______________________________________________________________CONTACT___________________________________________________________________________

  const [contactselectedOption, contactsetSelectedOption] = useState(null);
  const [contactisOpen, contactsetIsOpen] = useState(false);

  const contacttoggleDropdown = () => {
    contactsetIsOpen(true);
  };

  const contactselectOption = (option) => {
    contactsetSelectedOption(option);
    contactsetIsOpen(false);
  };

  // _________________________________________________________________________________________________________________________________________________

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsHeaderTopVisible(scrollTop === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div
      className={`${classes.header} ${
        !isHeaderTopVisible ? classes.scrolled : classes.close
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <div className={classes.headerTop}>
        <p className={classes.headerTopText}>
          Free delivery on orders over $1499. Don't miss discount.
        </p>
      </div>

      <div className={classes.headerBottom}>
        <div className={classes.content}>
          <div className={classes.imageContainer}>
            <NavLink to={"/"}>
              <img src={logo} alt="logo" className={classes.image} />
            </NavLink>
          </div>

          <div className={classes.navigation}>
            <NavLink
              to="/"
              className={classes.text}
              onMouseEnter={() => handleMouseEnter("home")}
            >
              <button className="navButton">Home</button>
            </NavLink>
            <NavLink
              className={classes.text}
              onMouseEnter={() => handleMouseEnter("collection")}
            >
              <button className="navButton">Collection</button>
            </NavLink>

            {/* _________________________________________________________BLOG____________________________________________________________________________ */}
            {/* <NavLink
              className={classes.text}
              onMouseEnter={() => handleMouseEnter("blog")}
            >

<div className={classes.blogdropdown}>
      <button className="navButton" onMouseEnter={toggleDropdown} onMouseLeave={() => {setIsOpen(false)}}> 
        Blog
      </button>
      {isOpen && (
        <div className={classes.dropdownContent} onMouseEnter={toggleDropdown} onMouseLeave={() => {setIsOpen(false)}}>
          <div
            className={classes.dropdownOption}
            onClick={() => {
              selectOption("Option 1");
              blogSelected(); // Add the function call here
            }}
          >
            <NavLink to={"blog-1"} className="navLinkUnderline" ><span className="para">blog 1</span></NavLink>
          </div>
          <div
            className={classes.dropdownOption}
            onClick={() => {
              selectOption("Option 2");
              blogSelected(); // Add the function call here
            }}
          >
            <NavLink to={"blog-2"} className="navLinkUnderline" ><span className="para">blog 2</span></NavLink>
          </div>
          <div
            className={classes.dropdownOption}
            onClick={() => {
              selectOption("Option 3");
              blogSelected(); // Add the function call here
            }}
          >
            <NavLink to={"blog-3"} className="navLinkUnderline" ><span className="para">blog 3</span></NavLink>
          </div>
          <div
            className={classes.dropdownOption}
            onClick={() => {
              selectOption("Option 4");
              blogSelected(); // Add the function call here
            }}
          >
            <NavLink to={"blog-4"} className="navLinkUnderline" ><span className="para">blog 4</span></NavLink>
          </div>
        </div>
      )}
    </div>



    </NavLink> */}
            {/* ________________________________________________________________________________________________________________________________________________ */}

            {/* _________________________________________________________________CONTACT___________________________________________________________________________ */}

            <NavLink
              to={"contact"}
              className={classes.text}
              onMouseEnter={() => handleMouseEnter("contact")}
            >
              <button className="navButton">Contact</button>
            </NavLink>

            {/* ________________________________________________________________________________________________________________________________________________ */}
          </div>

          {/* Dropdown content */}

          {activeDropdown === "collection" && (
            <div
              className={`${classes.dropdown} ${
                activeDropdown ? classes.open : ""
              }`}
              onMouseEnter={() => handleMouseEnter(activeDropdown)}
              onMouseLeave={handleMouseLeave}
            >
              <ProductDropDown onClick={ItemClickedHandler} />
            </div>
          )}

          <div
            className={classes.userInfo}
            style={{
              height: "3rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {isUserLoggedIn ? (
              <>
                <div
                  style={{
                    margin: "5px",
                    height: "max-content",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Link to={"/cart"} className="nolinkstyle">
                    <button
                      className={`${classes.animatedButton}${
                        animateButton ? " " + classes.pop : ""
                      }`}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "5px",
                        borderRadius: "10rem",
                        minWidth: "5rem",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                        border: "1px solid #bbb",
                        cursor: "pointer",
                      }}
                    >
                      <p style={{ margin: "0px" }}> {totalItems} </p>
                      <img
                        style={{ margin: "0px" }}
                        src={cartImage}
                        height={"30px"}
                        alt="cart"
                      />
                    </button>
                  </Link>
                </div>

                <div
                  style={{
                    margin: "5px",
                    height: "max-content",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Link to={"/profile"} className="nolinkstyle">
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
                          minWidth: "30px",
                          height: "30px",
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                          justifyContent: "center",
                          fontSize: '1rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {finalName}
                      </div>
                    </button>
                  </Link>
                </div>
              </>
            ) : (
              <div
                style={{
                  margin: "5px",
                  height: "max-content",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Link to={"/login"} className="nolinkstyle">
                  <button
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "5px",
                      borderRadius: "10rem",
                      minWidth: "5rem",
                      justifyContent: "center",
                      backgroundColor: "#1e1e1e",
                      border: "1px solid #1e1e1e",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        height: "30px",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {" "}
                      Login{" "}
                    </div>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
