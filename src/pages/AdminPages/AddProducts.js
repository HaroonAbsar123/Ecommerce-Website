import { faTrashCan, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from "react-hot-toast";

import { ref, push, set, get } from "firebase/database";
import { database, storage, db } from "../../firebase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import ProductContext from "../../Context/ProductContext";


import { collection, addDoc, doc, updateDoc, query, where, onSnapshot, getDocs } from "firebase/firestore";
import CustomModal from "../../components/CustomModal";

const AddProducts = () => {
  
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const {products} = useContext(ProductContext);
  const [hotItemsFinished, setHotItemsFinished] = useState(false)
  // const [productData, setProductData] = useState({
  //   id: "",
  //   title: "",
  //   colors: [
  //     {
  //       name: "",
  //       images: [],
  //       sizes: [{ name: "", price: 0, discountedPrice: 0, quantity: 0 }],
  //     },
  //   ],
  //   description: "",
  //   category: "",
  //   tableData: [{ heading: "", content: "" }],
  //   hot: false,
  //   homePageItem: false
  // });

  const [productData, setProductData] = useState({
    id: "",
    title: "",
    colors: [],
    description: "",
    category: "",
    tableData: [],
    hot: false,
    homePageItem: false
  });

  useEffect(() => {
    var currentArray=[];
    for (const cat in products) {
      if (Array.isArray(products[cat])) {
        // Find the products with hot === true in the current category
        const categoryProducts = products[cat].filter((item) => item?.homePageItem === true);
        // Add the hot products of the current category to the array
        currentArray.push(...categoryProducts);
      }
    }
    console.log("FINISHED", currentArray?.length>=2)
    console.log("ITEMS", currentArray)
    if(currentArray?.length>=2){
      setHotItemsFinished(true);
      setProductData({...productData, homePageItem: false })
    }
  }, [products])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, colors, description, category, tableData } = productData;
    if (
    !title ||
    colors.some(color => color.name === "" || color.images.length === 0 || color.sizes.some(size => size.name === "" || size.price === 0|| size.quantity === 0)) ||
    !description ||
    !category
    ) {
      toast('Please fill all fields');
    } else {
      try{
        setSubmitting(true)
    const newId = generateRandomId(12);

    const productDetails = { ...productData, createdAt: new Date, id: newId };

    const userListRef = collection(db, "products");
    const docRef = await addDoc(userListRef, productDetails);

    const docId = docRef.id;

    await updateDoc(docRef, { id: docId });
    toast.success(`${productData.title} is added to inventory`)

    } catch(error){
      toast.error("Error Ocurred")
      console.log("Error Ocurred", error)
    } finally{
      setSubmitting(false);
    }
    }
};

  function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }



  const fileInput = React.useRef();

  const addColor = () => {
    setProductData({
      ...productData,
      colors: [...productData.colors, { name: "", images: [], sizes: [] }],
    });
  };

  const addSize = (colorIndex) => {
    const newColors = [...productData.colors];
    newColors[colorIndex].sizes.push({
      name: "",
      price: 0,
      discountedPrice: 0,
      quantity: 0,
    });
    setProductData({ ...productData, colors: newColors });
  };

  const handleColorNameChange = (colorIndex, name) => {
    const newColors = [...productData.colors];
    newColors[colorIndex].name = name;
    setProductData({ ...productData, colors: newColors });
  };

  const handleSizeChange = (colorIndex, sizeIndex, field, value) => {
    const newColors = [...productData.colors];
    newColors[colorIndex].sizes[sizeIndex][field] = value;
    setProductData({ ...productData, colors: newColors });
  };

  // const handleImageChange = (colorIndex, e) => {
  //   const newColors = [...productData.colors];
  //   const files = e.target.files;
  //   const images = newColors[colorIndex].images.slice(); // Copy the existing images array
  //   for (let i = 0; i < files.length; i++) {
  //     images.push(URL.createObjectURL(files[i]));
  //   }
  //   newColors[colorIndex].images = images;
  //   setProductData({ ...productData, colors: newColors });
  // };

  const removeImage = (colorIndex, imageIndex) => {
    const updatedColors = [...productData.colors];
    const updatedImages = [...updatedColors[colorIndex].images];
    updatedImages.splice(imageIndex, 1);
    updatedColors[colorIndex].images = updatedImages;
    setProductData({ ...productData, colors: updatedColors });
  };

  const removeColor = (colorIndex) => {
    const updatedColors = [...productData.colors];
    updatedColors.splice(colorIndex, 1);
    setProductData({ ...productData, colors: updatedColors });
  };

  const removeSize = (colorIndex, sizeIndex) => {
    const updatedColors = [...productData.colors];
    const updatedSizes = [...updatedColors[colorIndex].sizes];
    updatedSizes.splice(sizeIndex, 1);
    updatedColors[colorIndex].sizes = updatedSizes;
    setProductData({ ...productData, colors: updatedColors });
  };

  const addTableData = () => {
    setProductData({
      ...productData,
      tableData: [...productData.tableData, { heading: "", content: "" }],
    });
  };

  const removeTableData = (index) => {
    const updatedTableData = [...productData.tableData];
    updatedTableData.splice(index, 1);
    setProductData({ ...productData, tableData: updatedTableData });
  };

  const handleImageChange = async (colorIndex, e) => {
    const files = Array.from(e.target.files);
  
    const updatedColors = [...productData.colors];
    const updatedImages = [...updatedColors[colorIndex].images];
  
    const promises = files.map(async (img) => {
      const randomName = generateRandomId(12);
      const imageRef = storageRef(storage, `images/${randomName}`);
      await uploadBytes(imageRef, img);
      const imageUrl = await getDownloadURL(imageRef);
      updatedImages.push(imageUrl);
    });
  
    await Promise.all(promises);
  
    updatedColors[colorIndex].images = updatedImages;
    setProductData({ ...productData, colors: updatedColors });
  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(productData);
  // };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = ["armchairs", "sofas", "lamps", "cushions"];

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", padding: '10px' }}
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
          alignItems: 'center',
          marginBottom: '1rem'
        }}
       >
          <div style={{fontSize: '1.5rem'}}>Add Product</div>

        </div>


      <TextField
        label="Title"
        variant="outlined"
        type="text"
        value={productData.title}
        onChange={(e) =>
          setProductData({ ...productData, title: e.target.value })
        }
      />

      <TextField
        label="Description"
        variant="outlined"
        multiline
        id="description"
        name="description"
        type="text"
        value={productData.description}
        onChange={(e) =>
          setProductData({ ...productData, description: e.target.value })
        }
        style={{ marginTop: "1rem" }}
      />

      <TextField
        value={productData.category}
        style={{ marginTop: "1rem", paddingBottom: "1.5rem" }}
        onChange={(e) => {
          setProductData((prevData) => ({
            ...prevData,
            category: e.target.value,
          }));
        }}
        select // tell TextField to render select
        label="Category"
      >
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </TextField>

      <>
      <div style={{flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '0.5rem'}}>
      <div className="title">Product Specs</div>
      <Button
          variant="contained"
          type="button"
          onClick={addColor}
          color="success"
        >
          Add Color
        </Button>
        </div>
        
        <div
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          {productData.colors.map((color, colorIndex) => (
            <div
              key={colorIndex}
              style={{
                flex: 1,
                background: "#fff",
                marginTop: colorIndex !== 0 ? "10px" : "0px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "7px",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "stretch",
                  gap: "10px",
                  width: "100%",
                  display: "flex",
                }}
              >
                <TextField
                  label="Color Name"
                  variant="outlined"
                  type="text"
                  value={color.name}
                  onChange={(e) =>
                    handleColorNameChange(colorIndex, e.target.value)
                  }
                  style={{ flex: 1 }}
                />

                <Button
                  variant="contained"
                  color="error"
                  type="button"
                  onClick={() => removeColor(colorIndex)}
                >
                  Remove Color
                </Button>
              </div>

              <div>
                <div style={{ marginTop: "1rem" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fileInput.current.click()}
                  >
                    upload images
                  </Button>

                  <input
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageChange(colorIndex, e)}
                    style={{ display: "none" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {color.images.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      style={{
                        display: "inline-block",
                        position: "relative",
                        border: "1px solid #ccc",
                      }}
                    >
                      <img
                        src={image}
                        alt={`Color ${color.name}`}
                        style={{
                          height: "50px",
                          width: "40px",
                          cursor: "pointer",
                          objectFit: "contain",
                        }}
                        onClick={() => removeImage(colorIndex, imageIndex)}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: 2,
                          right: 2,
                          cursor: "pointer",
                          color: "red",
                        }}
                        onClick={() => removeImage(colorIndex, imageIndex)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {color.sizes.map((size, sizeIndex) => (
                <div key={sizeIndex}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label="Size Name"
                      variant="outlined"
                      type="text"
                      value={size.name}
                      onChange={(e) =>
                        handleSizeChange(
                          colorIndex,
                          sizeIndex,
                          "name",
                          e.target.value
                        )
                      }
                    />
                    <TextField
                      label="Price"
                      variant="outlined"
                      type="number"
                      value={size.price}
                      onChange={(e) =>
                        handleSizeChange(
                          colorIndex,
                          sizeIndex,
                          "price",
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <TextField
                      label="Discounted Price"
                      variant="outlined"
                      type="number"
                      value={size.discountedPrice}
                      onChange={(e) =>
                        handleSizeChange(
                          colorIndex,
                          sizeIndex,
                          "discountedPrice",
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <TextField
                      label="Quantity"
                      variant="outlined"
                      type="number"
                      value={size.quantity}
                      onChange={(e) =>
                        handleSizeChange(
                          colorIndex,
                          sizeIndex,
                          "quantity",
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <IconButton
                      // style={{ color: "red" }}
                      onClick={() => removeSize(colorIndex, sizeIndex)}
                      aria-label="delete"
                      size="small"
                      color="error"
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                  </div>
                </div>
              ))}
              <Button
                variant="outlined"
                style={{ width: "100%", marginTop: "1rem" }}
                type="button"
                onClick={() => addSize(colorIndex)}
              >
                Add Size
              </Button>
            </div>
          ))}
        </div>

      </>

      <>
        <div style={{flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '0.5rem', marginTop: '1.5rem'}}>
      <div className="title">Table Information</div>

        <Button
            variant="contained"
            type="button"
            onClick={addTableData}
            color="success"
          >
            Add Table Data
          </Button>
        </div>
        <div style={{marginBottom: '1rem', padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "10px",}}>
          {productData.tableData.map((data, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flex: 1,
                gap: "10px",
                justifyContent: "space-between",
                alignItems: "center",
              background: "#fff",
              marginTop: index !== 0 ? "10px" : "0px",
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '7px',
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <TextField
                label="Heading"
                variant="outlined"
                type="text"
                style={{ flex: 1 }}
                value={data.heading}
                onChange={(e) => {
                  const updatedTableData = [...productData.tableData];
                  updatedTableData[index].heading = e.target.value;
                  setProductData({
                    ...productData,
                    tableData: updatedTableData,
                  });
                }}
              />
              <TextField
                label="Content"
                variant="outlined"
                type="text"
                style={{ flex: 1 }}
                value={data.content}
                onChange={(e) => {
                  const updatedTableData = [...productData.tableData];
                  updatedTableData[index].content = e.target.value;
                  setProductData({
                    ...productData,
                    tableData: updatedTableData,
                  });
                }}
              />
              <IconButton
                // style={{ color: "red" }}
                onClick={() => removeTableData(index)}
                aria-label="delete"
                size="small"
                color="error"
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </div>
          ))}

        </div>
      </>

      <FormControlLabel
  control={
    <Checkbox
      checked={productData.hot}
      onChange={(event) => setProductData({ ...productData, hot: event.target.checked })}
    />
  }
  label="Mark as Hot Product"
/>

<FormControlLabel
  control={
    <Checkbox
      disabled={hotItemsFinished}
      checked={productData.homePageItem}
      onChange={(event) => setProductData({ ...productData, homePageItem: event.target.checked })}
    />
  }
  label="Show on Home Page (Max 2)"
/>

      <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginTop: '1rem'}}>


      <Button disabled={submitting} onClick={() => {setModalOpen(true)}} variant="outlined" color="error" type="button">Reset details</Button>
      {!submitting ? 
      <Button variant="contained" color="success" type="submit">ADD PRODUCT</Button>
:
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        ADDING PRODUCT
      </LoadingButton>
      }
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
              Are you sure you want to reset?
            </h2>
            <p className="para">
              This action cannot be undone. Once reset, you will have to re-enter all the details
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
              }}
            >
              Cancel
            </Button>

      <Button onClick={() => {
        setProductData({
    id: "",
    title: "",
    colors: [],
    description: "",
    category: "",
    tableData: [],
    hot: false,
    homePageItem: false
  });
  setModalOpen(false);
  toast.success("Form reset successfully");

}
  }  variant="contained" color="success" type="submit">Confirm</Button>

          </div>
        </div>
      </CustomModal>
    </form>
  );
};

export default AddProducts;
