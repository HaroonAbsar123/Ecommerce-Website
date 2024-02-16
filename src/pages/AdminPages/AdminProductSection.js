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
import { database } from "../../firebase";
import { getDatabase, ref, set, child, remove, get } from "firebase/database";
import { toast } from "react-hot-toast";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

function AdminProductSection({setAddProductModal}) {
  const navigate = useNavigate();
  const {
    setIsUserLoggedIn,
    setUserDetails,
    setUserType,
    userDetails,
    products,
  } = useContext(ProductContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let currentArray = [];
    for (const cat in products) {
      if (Array.isArray(products[cat])) {
        const categoryProducts = products[cat];
        currentArray.push(...categoryProducts);
      }
    }

    setAllProducts(currentArray);
  }, [products]);

  const productsRef = ref(database, "products");

  const handleDeleteItem = (id) => {
    setIsSubmitting(true)
    try{
    get(productsRef).then((snapshot) => {
      snapshot.forEach((categorySnapshot) => {
        categorySnapshot.forEach((itemSnapshot) => {
          const item = itemSnapshot.val();
          if (item.id === id) {
            // Remove the item with the specified ID
            remove(itemSnapshot.ref)
              .then(() => {
                toast.success(`${selectedItem?.title} deleted from inventory`)
                setModalOpen(false);
                setSelectedItem({});
                // Optionally, you can update the state or perform any other actions
              })
              .catch((error) => {
                console.error("Error deleting item:", error);
                // Handle the error as needed
              });
          }
        });
      });
    });
    

  } catch(e){
    toast.error("Unable to delete product. Pleast try again")
  } finally{
    setIsSubmitting(false)
  }
  };

  // PAGINATION
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedSessions = allProducts?.slice(startIndex, endIndex);

  return (
    <div
      style={{
        padding: "0.5rem",
        flex: 1,
        marginTop: "0rem",
        height: "max-content",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
        background: "rgba(255,255,255, 0.2)",
        backdropFilter: "blur(4px)", // Adjust the blur intensity as needed
        WebkitBackdropFilter: "blur(4px)", // For Safari support,
        padding: "10px",
        borderRadius: "10px",
      }}
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
          <div style={{fontSize: '1.5rem'}}>Add / Remove Products</div>

          <div>
            <Button onClick={() => {setAddProductModal(true)}} variant="contained" color="success">Add Product</Button>
          </div>
        </div>

      <div
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          background: "rgba(255,255,255, 0.8)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(17, 17, 17, 0.9)",
            color: "white",
            borderRadius: "7px",
            padding: "10px",
            marginBottom: '5px'
          }}
        >
          <div style={{ flex: 1 }}>Name</div>

          <div style={{ flex: 1 }}>ID</div>

          <div style={{ flex: 1 }}>Price</div>

          <div style={{ flex: 1, textAlign: "right" }}>View</div>

          <div style={{ flex: 1, textAlign: "right" }}>Delete</div>
        </div>
        {displayedSessions?.map((item, index) => (
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
            <div style={{ flex: 1 }}>{item?.title}</div>

            <div style={{ flex: 1 }}>ID: {item?.id}</div>

            <div style={{ flex: 1 }}>
              Price: ${item?.price}
              {item?.discountedPrice &&
                ` | Discounted: $${item?.discountedPrice}`}
            </div>

            <div style={{ flex: 1, textAlign: "right" }}>
              <IconButton
                onClick={() => {
                  navigate(`/collection/${item?.category}/${item?.id}`);
                }}
                style={{ color: "#1e1e1e" }}
              >
                <FontAwesomeIcon
                  icon={faEye}
                  style={{ color: "#1e1e1e", fontSize: "1rem" }}
                />
              </IconButton>
            </div>

            <div style={{ flex: 1, textAlign: "right" }}>
              <IconButton
                onClick={() => {
                  // handleDeleteItem(item?.id)
                  setModalOpen(true);
                  setSelectedItem(item);
                }}
                style={{ color: "#1e1e1e" }}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
            </div>
          </div>
        ))}

        <div
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(allProducts?.length / itemsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
            />
          </Stack>
        </div>
      </div>

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
    </div>
  );
}

export default AdminProductSection;
