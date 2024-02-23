import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo from "../Assets/logo.png";
import MobileLogo from "../Assets/logo - Copy.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProductContext from "../Context/ProductContext";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { BugReportTwoTone } from "@mui/icons-material";

import CircularProgress from "@mui/material/CircularProgress";
import { Modal } from "@mui/material";
import Cookies from "universal-cookie";
import Dialog from "@mui/material/Dialog";
import { toast } from "react-hot-toast";
import CustomModal from "./CustomModal";
import LoginLogo from "../Assets/logo - Copy.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faXmark } from "@fortawesome/free-solid-svg-icons";
import Login from "../pages/Login/Login";

const pages = ["Home", "Collection", "Contact"];
const settings = ["Profile", "wishlist", "Cart", "Logout"];

function Navbar() {
  const cookies = new Cookies();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const {
    cart,
    setIsUserLoggedIn,
    setUserDetails,
    setUserType,
    userDetails,
    isUserLoggedIn,
    loading,
    setMessages,
    setMessagesFetched
  } = useContext(ProductContext);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [logoutModal, setLogoutModal] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const [isLogin, setIsLogin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Update the totalItems whenever the cart changes
    const newTotalItems = cart.reduce(
      (total, item) => total + item.selectedQuantity,
      0
    );
    setTotalItems(newTotalItems);
  }, [cart]);

  const [showSidebar, setShowSidebar] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // Set initial value
    handleResize();

    // Add event listener to listen for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (item) => {
    if (item !== "check") {
      if (item === "Home") {
        navigate(`/`);
      } else if (item === "Collection") {
        setShowSidebar(true);
      } else if (item === "Contact") {
        navigate(`/contact`);
      }
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (item) => {
    // setAnchorElUser(null);
    setOpenProfileModal(false);

    if (item !== "check") {
      if (item === "Logout") {
        setLogoutModal(true);
      } else if (item === "wishlist") {
        navigate(`/collection/${item.toLowerCase()}`);
      } else {
        navigate(`/${item.toLowerCase()}`);
      }
    }
  };

  const LogoutHandler = () => {
    try {
      cookies.remove("userId");
      cookies.remove("isLoggedIn");

      setIsUserLoggedIn(false);
      setUserDetails("");
      setUserType("");
      setLogoutModal(false);
      setMessages([]);
      setMessagesFetched(false)
      navigate("/login", { replace: true });
      // toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        style={{
          background: "#fff",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {!isMobile && (
              <NavLink to={"/"}>
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    margin: "10px",
                    maxHeight: "30px",
                    marginRight: "20px",
                  }}
                />
              </NavLink>
            )}

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="#1e1e1e"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={() => handleCloseNavMenu("check")}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography textAlign="center" style={{ color: "#1e1e1e" }}>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {isMobile && (
              <div
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NavLink to={"/"}>
                  <img
                    src={logo}
                    alt="logo"
                    style={{ margin: "10px", maxHeight: "30px" }}
                  />
                </NavLink>
              </div>
            )}

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: "#1e1e1e", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {isUserLoggedIn ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  onClick={() => {
                    navigate("collection/wishlist");
                  }}
                  style={{
                    marginRight: isMobile ? "2px" : "10px",
                    fontSize: isMobile ? "20px" : "25px",
                  }}
                  color="#1e1e1e"
                  aria-label="Shopping Cart"
                >
                  {/* {totalItems} */}
                  <FontAwesomeIcon
                    icon={faHeart}
                    id="wishlist"
                    style={{ position: "relative" }}
                  />
                  <div
                    style={{
                      top: -5,
                      right: -5,
                      position: "absolute",
                      fontSize: isMobile ? "10px" : "12px",
                      padding: isMobile ? "2px" : "3px",
                      borderRadius: "50%",
                      background: "#fff",
                      minWidth: "12px",
                      border: "1px solid darkgrey",
                      color: "#1e1e1e",
                      aspectRatio: "1/1",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    {userDetails?.wishlist ? userDetails?.wishlist?.length : 0}
                  </div>
                </IconButton>

                <IconButton
                  onClick={() => {
                    navigate("/cart");
                  }}
                  style={{
                    marginRight: "10px",
                    fontSize: isMobile ? "20px" : "25px",
                  }}
                  color="#1e1e1e"
                  aria-label="Shopping Cart"
                >
                  {/* {totalItems} */}
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    id="cart-icon"
                    style={{ position: "relative" }}
                  />
                  <div
                    style={{
                      top: -5,
                      right: -5,
                      position: "absolute",
                      fontSize: isMobile ? "10px" : "12px",
                      padding: isMobile ? "2px" : "3px",
                      borderRadius: "50%",
                      background: "#fff",
                      minWidth: "12px",
                      border: "1px solid darkgrey",
                      color: "#1e1e1e",
                      aspectRatio: "1/1",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                    }}
                  >
                    {totalItems}
                  </div>
                </IconButton>

                <Tooltip title="Profile options">
                  <IconButton
                    onClick={() => {
                      setOpenProfileModal(true);
                    }}
                    sx={{ p: 0 }}
                  >
                    <Avatar alt="User" src={userDetails.image} />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => {
                    setIsLogin(true);
                    setShowLoginModal(true);
                  }}
                  sx={{ my: 2, color: "#1e1e1e", display: "block" }}
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    setIsLogin(false);
                    setShowLoginModal(true);
                  }}
                  style={{ backgroundColor: "#1e1e1e" }}
                  sx={{ my: 2, display: "block", color: "white" }}
                >
                  Register
                </Button>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <Login
        loginTrue={isLogin ? true : false}
        onClose={() => {
          setShowLoginModal(false);
        }}
        open={showLoginModal}
      />

      <Dialog
       style={{zIndex: 99999}}
        open={openProfileModal}
        onClose={() => {
          setOpenProfileModal(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          onClick={() => {
            setOpenProfileModal(false);
          }}
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // center the modal content vertically and horizontally
            backdropFilter: "blur(10px)", // Adjust the blur intensity as needed
            WebkitBackdropFilter: "blur(10px)", // For Safari support,
            //   background: "rgba(0,0,0, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "90vh",
              overflow: "hidden",
              width: "500px",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              background: "rgba(255,255,255, 0.9)",
              borderRadius: "10px",
              marginRight: "10px",
              marginLeft: "10px",
              maxWidth: "90vw",
              position: 'relative'
            }}
          >
            <div
              style={{
                padding: "10px",
                flex: 1,
                overflow: "auto",
              }}
            >
              <>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img src={LoginLogo} alt="Logo" style={{ height: "40px" }} />
                </div>
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                  className="para"
                >
                  Hi, {userDetails.userName}!
                </div>
                <p
                  style={{ marginBottom: "1rem", flex: 1, textAlign: "center" }}
                  className="para"
                >
                  Welcome back! We're excited to have you here.
                </p>
                {settings.map((setting, index) => (
                  <div key={index}>
                    <Button
                      style={{
                        width: "100%",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        borderTop: "1px solid #ccc",
                      }}
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography
                        textAlign="center"
                        style={{
                          color: setting === "Logout" ? "darkred" : "#1e1e1e",
                        }}
                      >
                        {setting}
                      </Typography>
                    </Button>
                  </div>
                ))}
              </>
            </div>
            
          <button
          onClick={() => {
            setOpenProfileModal(false);
          }}
          style={{
            top: 0,
            right: 0,
            position: "absolute",
            fontSize: "1rem",
            background: "#eee",
            borderRadius: '0px',
            filter: "drop-shadow(0px 5px 10px rgba(0,0,0,0.4))",
            borderBottomLeftRadius: '5px'
          }}
        >
          <FontAwesomeIcon
            icon={faXmark}
            style={{
              color: "#fff",
              color: "#1e1e1e"
            }}
          />
        </button>
        
          </div>
        </div>
      </Dialog>

      <CustomModal
        open={logoutModal}
        onClose={() => {
          setLogoutModal(false);
        }}
      >
        <div>
          <div>
            <h2
              className="para"
              style={{
                marginTop: "0px",
                marginBottom: "0px",
                fontSize: "1.5rem",
              }}
            >
              Are you sure you want to Log Out?
            </h2>
            <p className="para">
              Logging out will end your current session. You will need to log in
              again to access your account.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="outlined"
              // color="error"
              style={{ color: "#1e1e1e", borderColor: "#ccc" }}
              onClick={() => {
                setLogoutModal(false);
              }}
            >
              Cancel
            </Button>

            <Button
              onClick={() => {
                LogoutHandler();
              }}
              variant="contained"
              color="error"
              type="submit"
            >
              Log Out
            </Button>
          </div>
        </div>
      </CustomModal>

      <Modal style={{zIndex: 99999}} open={loading}>
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ flexDirection: "column" }}>
            <div class="loader"></div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default Navbar;
