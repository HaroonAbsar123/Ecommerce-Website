import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTachometerAlt,
  faClock,
  faUserPlus,
  faGraduationCap,
  faChalkboardTeacher,
  faCheckSquare,
  faSignOutAlt,
  faFileInvoice,
  faShoppingCart,
  faBookOpen,
  faCheck,
  faLink,
  faBook,
  faBriefcase,
  faAddressCard,
  faChalkboardUser,
  faUser,
  faContactCard,
  faEye,
  faEdit,
  faContactBook,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import ProductContext from "../../Context/ProductContext";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { faRegistered } from "@fortawesome/free-regular-svg-icons";

const Sidebar = ({currentUrl, setCurrentUrl}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserType,
    setUserDetails,
    userType,
    cart
  } = useContext(ProductContext);


  function toggleSidebar() {
    setIsSidebarExpanded(!isSidebarExpanded);
  }

  const sidebarClass = isSidebarExpanded ? "sidebar expanded" : "sidebar";


  return (
    <div className={sidebarClass}>
      <div className="content">
        <ul>
          {windowWidth <= 768 && (
            <li>
              <Link to="#" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
              </Link>
            </li>
          )}
          {userType==='admin' &&
          <>
          
          <li>
            <Link to="#" onClick={() => {setCurrentUrl("contactInformation")}} className={currentUrl === "contactInformation" ? "selected" : ""}>
              <FontAwesomeIcon icon={faContactCard} />
              {(windowWidth > 768 || isSidebarExpanded) && <span style={{ marginLeft: "5px" }}>Contact Info</span>}
            </Link>
          </li>

          <li>
            <Link to="#" onClick={() => {setCurrentUrl("addProducts")}} className={currentUrl === "addProducts" ? "selected" : ""}>
              <FontAwesomeIcon icon={faProductHunt} />
              {(windowWidth > 768 || isSidebarExpanded) && <span style={{ marginLeft: "5px" }}>Add Products</span>}
            </Link>
          </li>

          <li>
            <Link to="#" onClick={() => {setCurrentUrl("viewInventory")}} className={currentUrl === "viewInventory" ? "selected" : ""}>
              <FontAwesomeIcon icon={faEye} />
              {(windowWidth > 768 || isSidebarExpanded) && <span style={{ marginLeft: "5px" }}>View Inventory</span>}
            </Link>
          </li>

          {/* <li>
            <Link to="#" onClick={() => {setCurrentUrl("editProducts")}} className={currentUrl === "editProducts" ? "selected" : ""}>
              <FontAwesomeIcon icon={faEdit} />
              {(windowWidth > 768 || isSidebarExpanded) && <span style={{ marginLeft: "5px" }}>Edit Products</span>}
            </Link>
          </li> */}

          <li>
            <Link to="#" onClick={() => {setCurrentUrl("orders")}} className={currentUrl === "orders" ? "selected" : ""}>
              <FontAwesomeIcon icon={faCartShopping} />
              {(windowWidth > 768 || isSidebarExpanded) && <span style={{ marginLeft: "5px" }}>Orders</span>}
            </Link>
          </li>

          <li>
            <Link to="#" onClick={() => {setCurrentUrl("addAdmin")}} className={currentUrl === "addAdmin" ? "selected" : ""}>
              <FontAwesomeIcon icon={faRegistered} />
              {(windowWidth > 768 || isSidebarExpanded) && <span style={{ marginLeft: "5px" }}>Add Admin</span>}
            </Link>
          </li>
          </>
          }
                  {userType==='user' &&
          <>
          
          <li>
            <Link to="#" onClick={() => {setCurrentUrl("contactInformation")}} className={currentUrl === "contactInformation" ? "selected" : ""}>
              <FontAwesomeIcon icon={faContactBook} />
              {(windowWidth > 768 || isSidebarExpanded) && <span style={{ marginLeft: "5px" }}>Contact Info</span>}
            </Link>
          </li>

          </>
          }
        </ul>

</div>
    </div>
  );
};

export default Sidebar;
