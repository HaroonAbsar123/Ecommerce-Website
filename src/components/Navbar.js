import React, {useState, useEffect, useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from "../Assets/logo.png";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProductContext from '../Context/ProductContext';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { BugReportTwoTone } from '@mui/icons-material';

import CircularProgress from '@mui/material/CircularProgress';
import { Modal } from '@mui/material';
import Cookies from 'universal-cookie';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-hot-toast';
import CustomModal from './CustomModal';

const pages = ['Home', 'Collection', 'Contact'];
const settings = ['Profile', 'Cart', 'Logout'];

function Navbar() {
  
  const cookies = new Cookies();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate=useNavigate();
  const {cart, setIsUserLoggedIn, setUserDetails, setUserType, userDetails, isUserLoggedIn, loading} = useContext(ProductContext);
  const [openProfileModal, setOpenProfileModal] = useState(false)

  const [logoutModal, setLogoutModal] = useState(false)
  const [totalItems, setTotalItems] = useState(0);

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
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
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
    if(item==="Home"){
      
    navigate(`/`)
    }
     else if(item==="Collection"){
      
      setShowSidebar(true)
      }
      else if(item==="Contact"){
    navigate(`/contact`)
  }
}
    setAnchorElNav(null);

  };

  const handleCloseUserMenu = (item) => {
    // setAnchorElUser(null);
    setOpenProfileModal(false)
  
    if (item !== "check") {
      if (item === "Logout") {
        setLogoutModal(true)
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
      setUserDetails('');
      setUserType('');
      setLogoutModal(false)
      navigate('/login', { replace: true });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  return (
    <>
    <AppBar position="fixed" style={{background: "#fff", userSelect: 'none', WebkitUserSelect: 'none'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {!isMobile && 
        <NavLink to={"/"}>
              <img src={logo} alt="logo" style={{margin: '10px', maxHeight: '30px', marginRight: '20px'}}/>
            </NavLink>
            }

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu("check")}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography textAlign="center" style={{color: '#1e1e1e'}}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {isMobile && 
          <div style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <NavLink to={"/"}>
              <img src={logo} alt="logo" style={{margin: '10px', maxHeight: '30px', marginRight: '20px'}}/>
            </NavLink>
            </div>
            }

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: '#1e1e1e', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

              {isUserLoggedIn ?
              
              <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={() => {navigate("/cart")}} style={{marginRight: '5px', fontSize: '15px'}} color="#1e1e1e" aria-label="add to shopping cart">
                {totalItems}
                <AddShoppingCartIcon />
              </IconButton>
            
              <Tooltip title="Profile options">
                <IconButton onClick={() => {setOpenProfileModal(true)}} sx={{ p: 0 }}>
                  <Avatar alt="User" src={userDetails.image} />
                </IconButton>
              </Tooltip>
              {/* <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu("check")}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu> */}
            </Box>
            

          :
<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
<Button
               onClick={() => {navigate("/login")}}
                sx={{ my: 2, color: '#1e1e1e', display: 'block' }}
              >
                Login
              </Button>
              <Button
               onClick={() => {navigate("/register")}}  style={{backgroundColor: '#1e1e1e', }}
                sx={{ my: 2, display: 'block', color: 'white' }}
              >
                Register
              </Button>
            </div>
        }
        </Toolbar>
      </Container>
    </AppBar>
    <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>

    <Dialog
      open={openProfileModal}
      onClose={() => {setOpenProfileModal(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

    >
      <div
      onClick={() => {setOpenProfileModal(false)}}
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
            minWidth: '500px',
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            background: "rgba(255,255,255, 0.9)",
            borderRadius: "10px",
            marginRight:'10px',
            marginLeft: '10px'
          }}
        >
        <div style={{ 
          padding: "10px", 
          flex: 1, 
          overflow: 'auto',
          }}>
           {settings.map((setting, index) => (
            <div key={index}>
                  <Button style={{width: '100%',paddingTop: '1rem', paddingBottom: '1rem', borderTop: index !== 0 ? '1px solid #ccc' : "none"}} key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center" style={{color: '#1e1e1e'}}>{setting}</Typography>
                  </Button>
                  </div>
                ))}
          </div>
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
  <h2 style={{ marginTop: "0px", marginBottom: '0px' }}>
    Are you sure you want to Log Out?
  </h2>
  <p className="para">
    Logging out will end your current session. You will need to log in again to access your account.
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
              variant="contained"
              color="error"
              onClick={() => {
                setLogoutModal(false);
              }}
            >
              Cancel
            </Button>

      <Button onClick={() => {LogoutHandler()}} variant="contained" color="success" type="submit">Log Out</Button>

          </div>
        </div>
      </CustomModal>



    <Modal
      open={loading}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // center the modal content vertically and horizontally
            
        backdropFilter: 'blur(10px)', // Adjust the blur intensity as needed
        WebkitBackdropFilter: 'blur(10px)', // For Safari support,
          }}
        >
        <div style={{flexDirection: 'column'}}
          >
         
             <img src={logo} alt="logo" style={{margin: '10px', maxHeight: '60px'}}/>
  
             <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
     <CircularProgress sx={{
    color: 'white',
  }}
/>
     </div>
        </div>
        </div>
    </Modal>
    </>
  );
}
export default Navbar;