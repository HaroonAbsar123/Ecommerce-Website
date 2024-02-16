import React, { useEffect, useState, useContext } from "react";
import { ref, push, set, get } from "firebase/database";
import { database, storage } from "../../firebase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, TextField, Checkbox, FormControlLabel, IconButton } from "@mui/material";

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';
import ProductContext from "../../Context/ProductContext";

export default function AddProducts({setAddProductModal}) {
  const {products} = useContext(ProductContext);

  const [hotItemsFinished, setHotItemsFinished] = useState(false)

  useEffect(() => {
    var currentArray=[];
    for (const cat in products) {
      if (Array.isArray(products[cat])) {
        // Find the products with hot === true in the current category
        const categoryProducts = products[cat].filter((item) => item?.hot === true);
        // Add the hot products of the current category to the array
        currentArray.push(...categoryProducts);
      }
    }
    console.log("FINISHED", currentArray?.length>=2)
    console.log("ITEMS", currentArray)
    setHotItemsFinished(currentArray?.length>=2);
  }, [products])

  const [formData, setFormData] = useState({
    id: "",
    img: [],
    title: "",
    specs: [
      { color: "", available: [] }
    ],
    price: 0,
    discountedPrice: 0,
    category: "",
    packof: 0,
    hot: false,
    homePageItem: false,
    description: ""
  });

  useEffect(() => {
    console.log("FORM DATA", formData)
  }, [formData])
  
  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'file') {
      setFormData(prevData => ({
        ...prevData,
        img: prevData.img ? [...prevData.img, ...(files.length > 0 ? Array.from(files) : [])] : [...(files.length > 0 ? Array.from(files) : [])]
      }));      
    } else if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked
      }));
    }  else if (type === 'number') {
      setFormData(prevData => ({
        ...prevData,
        [name]: parseFloat(value)
      }));
    }  else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  }
  
  const handleColorChange = (e, index) => {
    const { value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      specs: prevData.specs.map((spec, i) => {
        if (i === index) {
          return { ...spec, color: value, available: spec.available }
        } else {
          return spec;
        }
      })
    }));
  }
  
  const handleAddSpec = () => {
    setFormData(prevData => ({
      ...prevData,
      specs: [...prevData.specs, { color: "", available: [] }]
    }));
  }

  const handleAddSize = (specIndex) => {
    setFormData(prevData => ({
      ...prevData,
      specs: prevData.specs.map((spec, i) => {
        if (i === specIndex) {
          return {
            ...spec,
            available: [...spec.available, { size: "", availability: true }]
          }
        } else {
          return spec;
        }
      })
    }));
  }
  
  const handleSizeChange = (e, specIndex, sizeIndex) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      specs: prevData.specs.map((spec, i) => {
        if (i === specIndex) {
          return {
            ...spec,
            available: spec.available.map((size, j) => {
              if (j === sizeIndex) {
                return { ...size, size: value }
              } else {
                return size;
              }
            })
          };
        } else {
          return spec;
        }
      })
    }));
  };
  
  const handleSizeDelete = (specIndex, sizeIndex) => {
    setFormData(prevData => ({
      ...prevData,
      specs: prevData.specs.map((spec, i) => {
        if (i === specIndex) {
          return {
            ...spec,
            available: spec.available.filter((size, j) => j !== sizeIndex)
          };
        } else {
          return spec;
        }
      })
    }));
  };
  
  function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.img.length ||
      !formData.title ||
      !formData.specs.length ||
      !formData.price ||
      !formData.discountedPrice ||
      !formData.category ||
      !formData.packof ||
      !formData.description
    ) {
      toast('Please fill all fields');
    } else {
      try{
        setSubmitting(true)
    
    const newId = generateRandomId(12);
    console.log("FORMDATA", formData);

    // Upload images to Firebase Storage
    const imageUrls = [];
    for (const img of formData.img) {
      // Generate a random name for the image
      const randomName = generateRandomId(12);
      const imageRef = storageRef(storage, `images/${newId}/${randomName}`);
      await uploadBytes(imageRef, img);
      const imageUrl = await getDownloadURL(imageRef);
      imageUrls.push(imageUrl);
    }

    // Create productDetails object with imageUrls
    const productDetails = { ...formData, createdAt: new Date, id: newId, img: imageUrls };

    const productsRef = ref(database, `products/${formData.category}`);
    
    // Get the current products in the category
    const snapshot = await get(productsRef);
    const currentProducts = snapshot.val();

    // Get the index of the new product
    const index = Object.keys(currentProducts || {}).length;

    // Update the product with the new ID, image URLs, and index
    set(ref(database, `products/${productDetails.category}/${index}`), productDetails)
      .then(() => {   
        console.log("Product added successfully with ID:", index);
        // Add any additional logic after successful submission
      })
      .catch((error) => {
        console.error('Error adding product: ', error);
        alert('Error adding product. Please try again.');
      });
    } catch(error){
      toast.error("Error Ocurred")
    } finally{
      setSubmitting(false);
      setAddProductModal(false);
      toast.success(`${formData.title} is added to inventory`)
    }
    }
};

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

const names = [
  'armchairs',
  'sofas',
  'lamps',
  'cushions',
];

const theme = useTheme();

  return (
    <form style={{display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px' }} onSubmit={handleSubmit}>
      <div style={{textAlign: 'center'}}><h2>Add Product</h2></div>
{/* <label htmlFor="title" style={{ fontWeight: 'bold', marginRight: '5px' }}>Title:</label> */}
<TextField  label="Title" variant="outlined"
  type="text"
  id="title"
  name="title"
  value={formData.title}
  onChange={handleChange}
/>

<>
<InputLabel id="demo-multiple-name-label">Images</InputLabel>
<TextField  label=""
  type="file"
  id="img"
  name="img"
  multiple
  onChange={handleChange}
/>
<div style={{ display: 'flex', flexWrap: 'wrap' }}>
  {formData.img &&
    Array.from(formData.img).map((image, index) => (
      <div
        key={index}
        style={{
          position: 'relative',
          marginRight: '10px',
          marginBottom: '10px',
        }}
        onClick={() => {
          const images = Array.from(formData.img);
          images.splice(index, 1);
          setFormData({
            ...formData,
            img: images.length > 0 ? images : null,
          })}}
      >
        <img
          src={URL.createObjectURL(image)}
          alt={`Image ${index + 1}`}
          style={{
            maxWidth: '100px',
            maxHeight: '100px',
            cursor: 'pointer',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            padding: '2px 5px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
        >
          X
        </span>
      </div>
    ))}
</div>
</>


<InputLabel id="demo-multiple-name-label">Category</InputLabel>
<Select
  labelId="demo-multiple-name-label"
  id="demo-multiple-name"
  value={formData.category}
  onChange={(e) => {
    setFormData((prevData) => ({
      ...prevData,
      category: e.target.value,
    }));
  }}
  input={<OutlinedInput label="Name" />}
  MenuProps={MenuProps}
>
  {names.map((name) => (
    <MenuItem key={name} value={name}>
      {name}
    </MenuItem>
  ))}
</Select>
      
{/* <label htmlFor="img">Images:</label>
<input type="file" id="img" name="img" multiple onChange={handleChange} /> */}
      <div style={{marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '10px', padding: '10px'}}>
        
<h3 style={{ textAlign: 'center' }}>Product Size Specs</h3>
      {/* {formData.specs.map((spec, index) => (
        <div>
        <div style={{display: 'flex',  justifyContent: 'flex-start', gap: '10px', flexDirection:'column'}} key={index} >
          <TextField  label={`Size Range Name`} variant="outlined" type="text" id={`color-${index}`} name={`color-${index}`} value={spec.color} onChange={(e) => handleColorChange(e, index)} />

        <div style={{margin: '10px'}}>
          {spec.available.map((size, sizeIndex) => (
            <div style={{display: 'flex', flexDirection: 'row', flex: 1, gap: '10px', marginTop: '10px'}}>
              <TextField style={{flex: 1}} key={sizeIndex} label={`Size ${sizeIndex + 1}`} type="text" id={`size-${index}-${sizeIndex}`} value={size.size} name={`size-${index}-${sizeIndex}`}  onChange={(e) => handleSizeChange(e, index, sizeIndex)} />
              <Button
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
            <IconButton style={{color: '#1e1e1e'}} 
              onClick={() => handleSizeDelete(index, sizeIndex)} aria-label="delete" size="small">
  <DeleteIcon fontSize="large" />
</IconButton> 
            </div>
          ))}
          </div>
        </div>
        <Button variant="contained" style={{background: '#1e1e1e', color: 'white', width: '100%', marginTop: '20px'}} type="button" onClick={() => handleAddSize(index)}>Add Size</Button>
        </div>
      ))} */}

{formData.specs.map((spec, index) => (
        <div>
        <div style={{display: 'flex',  justifyContent: 'flex-start', gap: '10px', flexDirection:'column'}} key={index} >
          <TextField disabled  label={`Size Range Name`} variant="outlined" type="text" id={`color-${index}`} name={`color-${index}`} value={"Size Range"} onChange={(e) => handleColorChange(e, index)} />

          {spec.available.map((size, sizeIndex) => (
            <div style={{display: 'flex', flexDirection: 'row', flex: 1, gap: '10px', marginTop: '10px', marginRight: '10px', marginLeft: '10px'}}>
              <TextField style={{flex: 1}} key={sizeIndex} label={`Size ${sizeIndex + 1}`} type="text" id={`size-${index}-${sizeIndex}`} value={size.size} name={`size-${index}-${sizeIndex}`}  onChange={(e) => handleSizeChange(e, index, sizeIndex)} />
              {/* <Button
              variant="contained"
              color="secondary"
            >
              Delete
            </Button> */}
            <IconButton style={{color: '#1e1e1e'}} 
              onClick={() => handleSizeDelete(index, sizeIndex)} aria-label="delete" size="small">
  <DeleteIcon fontSize="large" />
</IconButton> 
            </div>
          ))}
        </div>
        <Button variant="contained" style={{background: '#1e1e1e', color: 'white', width: '100%', marginTop: '20px'}} type="button" onClick={() => handleAddSize(index)}>Add Size</Button>
        </div>
      ))}

      
{/* <Button style={{background: '#1e1e1e', color: 'white', width: '100%'}} variant="contained" type="button" onClick={handleAddSpec}>Add Color</Button> */}
</div>

<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', flex: 1, gap: '10px', flexDirection: 'row'}}>
<TextField style={{flex: 1}} label="Price" variant="outlined"  type="number" id="price" name="price" value={formData.price} onChange={handleChange} />

<TextField style={{flex: 1}}  label="Discounted Price" variant="outlined" type="number" id="discountedPrice" name="discountedPrice" value={formData.discountedPrice} onChange={handleChange} />

<TextField style={{flex: 1}}  label="Pack of" variant="outlined" type="number" id="packof" name="packof" value={formData.packof} onChange={handleChange} />

</div>



<TextField  label="Description" variant="outlined" multiline id="description" name="description" value={formData.description} onChange={handleChange}/>


<FormControlLabel
  control={
    <Checkbox
      checked={formData.hot}
      onChange={(event) => setFormData({ ...formData, hot: event.target.checked })}
    />
  }
  label="Mark as Hot Product"
/>

<FormControlLabel
  control={
    <Checkbox
      disabled={hotItemsFinished}
      checked={formData.homePageItem}
      onChange={(event) => setFormData({ ...formData, homePageItem: event.target.checked })}
    />
  }
  label="Show on Home Page (Max 2)"
/>




      
<div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px'}}>


      <Button disabled={submitting} onClick={() => {setAddProductModal(false)}} variant="contained" color="error" type="button">Cancel</Button>
      {!submitting ? 
      <Button variant="contained" color="success" type="submit">Submit</Button>
:
      <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        SUBMITTING
      </LoadingButton>
      }
      </div>
      
      </form>
  );
}
