import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";
import { useContext } from "react";
import CustomModal from "../../components/CustomModal";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase";
import { toast } from "react-hot-toast";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { deleteDoc, doc, Timestamp, updateDoc } from "firebase/firestore";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AdminOrderSection() {
  const navigate = useNavigate();
  const {
    setIsUserLoggedIn,
    setUserDetails,
    setUserType,
    userDetails,
    products,
    orders
  } = useContext(ProductContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allOrders, setAllOrders] = useState([])
  const [orderType, setOrderType] = useState("All");

  useEffect(() => {
    setAllOrders(orders);
  }, [orders]);

  useEffect(() => {
    if(orderType==="All"){
      setAllOrders(orders);
    } else if (orderType === "Completed") {
      const completedOrders = orders.filter((item) => item.processed && item.processed === true);
      setAllOrders(completedOrders);
    }  else if (orderType === "Pending") {
      const completedOrders = orders.filter((item) => !item.processed);
      setAllOrders(completedOrders);
    }
   }, [orderType]);

  const handleDeleteItem = async (id) => {
    setIsSubmitting(true);
    try {
      const docRef = doc(db, "orders", id);
      await deleteDoc(docRef);
      toast.success("Order deleted successfully");
    } catch (e) {
      console.error("Error deleting order:", e);
      toast.error("Unable to delete order. Please try again");
    } finally {
      setIsSubmitting(false);
      setModalOpen(false);
      setSelectedItem({});
    }
  };

  const handleProcessItem = async (id) => {
    setIsSubmitting(true);
    try {
      const docRef = doc(db, "orders", id);
      await updateDoc(docRef, { processed: true });
      toast.success("Order processed successfully");
    } catch (e) {
      console.error("Error processing order:", e);
      toast.error("Unable to process order. Please try again");
    } finally {
      setIsSubmitting(false);
      // setModalOpen(false);
      // setSelectedItem({});
    }
  };
  
  

  // PAGINATION
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedSessions = allOrders?.slice(startIndex, endIndex);



  const [isMobile, setIsMobile] = useState(false);

  const checkIsMobile = () => {
    setIsMobile(window.innerWidth <= 600); // You can adjust the width threshold as needed
  };
  
  useEffect(() => {
    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile); // Add event listener

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  function formatFirebaseTimestamp(timestamp) {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleString();
  }
  

  return (
    <
    >
      <div
        style={{
          marginTop: "0px",
          flex: 1,
          height: "max-content",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          background: 'rgba(17, 17, 17, 0.9)',
          backdropFilter: 'blur(5px)', // Adjust the blur intensity as needed
          WebkitBackdropFilter: 'blur(5px)', // For Safari support,
          padding: '10px',
          borderRadius: '10px', marginRight: '10px',
          marginBottom: '10px',
          color: '#eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
       >
          <div style={{fontSize: '1.5rem'}}>Orders</div>

        </div>

        <select  style={{
          flex: 1,
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          background: "rgba(255,255,255, 0.8)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          width: '100%',
          border: 'none',
          outline: 'none',
          marginBottom: '1rem',
          fontSize: '1.2rem'
        }}
         value={orderType} onChange={(e) => {setOrderType(e.target.value)}}>
          <option value="All">Show All Orders</option>
          <option value="Completed">Show Completed Orders</option>
          <option value="Pending">Show Pending Orders</option>
        </select>


        {displayedSessions?.map((mainItem, index) => (

          <Accordion style={{
            flex: 1,
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            background: "rgba(255,255,255, 0.8)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div style={{flex: 1, justifyContent: 'space-between', display: 'flex', fontSize: 'large', fontWeight: 'bold'}}>
              <div>
            {mainItem?.id}
            </div>
  
            <div>
            {mainItem?.submittedOn && formatFirebaseTimestamp(mainItem?.submittedOn)}
            </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
          <div
          
        >
            <div style={{display: 'flex', justifyContent: 'space-around', gap: '10p'}}>
                      <div style={{ flex: 1,  textAlign: "center" }}>
              {
                mainItem?.processed ?
                <FontAwesomeIcon 
                style={{ color: "#1e1e1e" }}
                icon={faCheck} />
                :
                <IconButton 
                onClick={()=> handleProcessItem(mainItem?.id)}
                style={{ color: "#1e1e1e" }}
                >
                   <FontAwesomeIcon 
                style={{ color: "#1e1e1e" }}
                icon={faXmark} />
                </IconButton>
              }
              </div>

              <div style={{ flex: 1, textAlign: "center" }}>
              <IconButton
                onClick={() => {
                  // handleDeleteItem(item?.id)
                  setModalOpen(true);
                  setSelectedItem(mainItem);
                }}
                style={{ color: "#1e1e1e" }}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
            </div>
            </div>

            <div style={{textAlign: 'center'}}>
              <p>{mainItem?.name}</p>
              <p>{mainItem?.email}</p>
              <p>{mainItem?.phone}</p>
              <p>Address: {mainItem?.address}</p>
              <p>City: {mainItem?.city}</p>
              <p>Country: {mainItem?.country?.label}</p>
              {mainItem?.note && <p>Note: {mainItem?.note}</p>}
            </div>

           {mainItem?.cart?.map((item, index) => (
          <div
            style={{
              display: "flex",
              padding: "5px",
              gap: "15px",
              flex: 1,
              justifyContent: "space-between",
              borderTop: index !== 0 ? "2px solid #ddd" : "none",
              paddingTop: "5px",
              alignItems: "center",
            }}
            key={index}
          >

            <div style={{ flex: 2 }}>ID: {item?.productId}</div>

            



            <div style={{ flex: 1, textAlign: "right" }}>
              <IconButton
                onClick={() => {
                  navigate(`/collection/${item?.product?.category}/${item?.product?.id}`);
                }}
                style={{ color: "#1e1e1e" }}
              >
                <FontAwesomeIcon
                  icon={faEye}
                  style={{ color: "#1e1e1e", fontSize: "1rem" }}
                />
              </IconButton>
            </div>

            
          </div>
           ))}
           </div>
          </AccordionDetails>
        </Accordion>
          
        
        
        ))}

        {allOrders?.length === 0  && 
          <div
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: "center",
            display: "flex",
            marginTop: '2rem',
            textAlign: 'center',
            color: '#ccc',
            fontWeight: 'bold'
          }}
          >
          <p>No Orders</p>
          </div>
          }

{allOrders?.length > itemsPerPage && 
<div
style={{
  flex: 1,
  alignItems: 'center',
  justifyContent: "center",
  display: "flex",
  marginTop: '2rem'
}}
>
<Stack spacing={2}>
  <Pagination
    count={Math.ceil(allOrders?.length / itemsPerPage)}
    page={currentPage}
    onChange={handleChangePage}
  />
</Stack>
</div>
}
      <CustomModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <div>
          <div>
            <h2 style={{ marginTop: "0px", marginBottom: '0px' }}>
              Are you sure you want to delete?
            </h2>
            <p className="para">
              This action cannot be undone. Once deleted, the item and its
              associated data will be permanently removed from the database.
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
                setModalOpen(false);
                setSelectedItem({});
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            {!isSubmitting ? 
      <Button onClick={() => {handleDeleteItem(selectedItem?.id)}} variant="contained" color="success" type="submit">Confirm</Button>
:
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        deleting
      </LoadingButton>
      }
          </div>
        </div>
      </CustomModal>
    </>
  );
}

export default AdminOrderSection;
