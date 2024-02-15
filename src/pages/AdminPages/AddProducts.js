import React, { useEffect, useState } from "react";
import { ref, push, set, get } from "firebase/database";
import { database, storage } from "../../firebase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from "react-hot-toast";


export default function AddProducts() {

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
  
  
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // }



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
      setSubmitting(false)
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
    <form style={{display: 'flex', flexDirection: 'column', gap: '20px', padding: '1rem', paddingTop: '5rem' }} onSubmit={handleSubmit}>

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
        
<h3 style={{ textAlign: 'center' }}>Product Specifications</h3>
      {formData.specs.map((spec, index) => (
        <div>
        <div style={{display: 'flex',  justifyContent: 'flex-start', gap: '10px', flexDirection:'column'}} key={index} >
          <TextField  label={`Color ${index + 1}`} variant="outlined" type="text" id={`color-${index}`} name={`color-${index}`} value={spec.color} onChange={(e) => handleColorChange(e, index)} />

          {spec.available.map((size, sizeIndex) => (
              <TextField  key={sizeIndex} label={`Size ${sizeIndex + 1}`} type="text" id={`size-${index}-${sizeIndex}`} value={size.size} name={`size-${index}-${sizeIndex}`}  onChange={(e) => handleSizeChange(e, index, sizeIndex)} />
            
          ))}
        </div>
        <Button style={{color: '#1e1e1e', width: '100%'}} type="button" onClick={() => handleAddSize(index)}>Add Size</Button>
        </div>
      ))}

      
<Button style={{background: '#1e1e1e', color: 'white', width: '100%'}} variant="contained" type="button" onClick={handleAddSpec}>Add Color</Button>
</div>

<TextField  label="Price" variant="outlined"  type="number" id="price" name="price" value={formData.price} onChange={handleChange} />

<TextField  label="Discounted Price" variant="outlined" type="number" id="discountedPrice" name="discountedPrice" value={formData.discountedPrice} onChange={handleChange} />


<TextField  label="Pack of" variant="outlined" type="number" id="packof" name="packof" value={formData.packof} onChange={handleChange} />


<TextField  label="Description" variant="outlined" multiline id="description" name="description" value={formData.description} onChange={handleChange}/>


<FormControlLabel
  control={
    <Checkbox
      checked={formData.hot}
      onChange={(event) => setFormData({ ...formData, hot: event.target.checked })}
    />
  }
  label="Hot"
/>

<FormControlLabel
  control={
    <Checkbox
      checked={formData.homePageItem}
      onChange={(event) => setFormData({ ...formData, homePageItem: event.target.checked })}
    />
  }
  label="Home Page Item"
/>




      

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
    </form>
  );
}

//   const initialSpecs = [
//     {
//       color: "",
//       available: [
//         { size: "S", availability: true },
//         { size: "L", availability: true },
//         { size: "XL", availability: false },
//         { size: "XXL", availability: true },
//       ],
//     },
//   ];

//   const [idToPost, setIdToPost] = useState(0);

//   const [productDetails, setProductDetails] = useState({
//     id: Math.floor(10000000 + Math.random() * 90000000),
//     img: [], // Array to store user-selected images
//     title: "",
    
//     specs: initialSpecs,
//     price: 0,
//     discountedPrice: 0,
//     category: "",
//     packof: 0,
//     hot: false,
//     homePageItem: false,
//     description: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let processedValue = value;

//     // Convert only 'price' and 'discountedPrice' to float
//     if (name === 'price' || name === 'discountedPrice' || name === 'packof') {
//       processedValue = parseInt(value);
//     }

//     setProductDetails({
//       ...productDetails,
//       [name]: processedValue,
//     });
//   };

//   const handleSpecsInputChange = (e, index) => {
//     const { value } = e.target;

//     const updatedSpecs = [...productDetails.specs];
//     updatedSpecs[index] = {
//       ...updatedSpecs[index],
//       color: value,
//     };

//     setProductDetails({
//       ...productDetails,
//       specs: updatedSpecs,
//     });
//   };

//   const handleSpecsAvailableChange = (e, index) => {
//     const { value } = e.target;
//     const availableValues = value.split(",").map((item) => {
//       const [size, availability] = item.trim().split(":").map((subItem) => subItem.trim());
//       return { size, availability: availability === "true" };
//     });

//     const updatedSpecs = [...productDetails.specs];
//     updatedSpecs[index] = {
//       ...updatedSpecs[index],
//       available: availableValues,
//     };

//     setProductDetails({
//       ...productDetails,
//       specs: updatedSpecs,
//     });
//   };

//   const addNewSpec = () => {
//     const newSpec = {
//       color: "",
//       available: Array.from({ length: initialSpecs[0].available.length }, () => ({ size: "", availability: false })),
//     };

//     setProductDetails({
//       ...productDetails,
//       specs: [...productDetails.specs, newSpec],
//     });
//   };

//   const removeSpec = (indexToRemove) => {
//     const updatedSpecs = productDetails.specs.filter((_, index) => index !== indexToRemove);
//     setProductDetails({
//       ...productDetails,
//       specs: updatedSpecs,
//     });
//   };


//   const handleImageChange = (e) => {
//     const files = e.target.files;
//     const selectedImages = [];

//     for (let i = 0; i < files.length; i++) {
//       const imageURL = URL.createObjectURL(files[i]);
//       selectedImages.push(imageURL);
//     }

//     setProductDetails((prevProductDetails) => ({
//       ...prevProductDetails,
//       img: [...prevProductDetails.img, ...selectedImages],
//     }));
//   };


//   const countItems = async () => {
//     try {
//       const productsRef = ref(database, `products/${productDetails.category}`);
//       const snapshot = await get(productsRef);
//       if (snapshot.exists()) {
//         const count = Object.keys(snapshot.val()).length;
//         return count + 1; // Return the count + 1 for the new ID
//       }
//     } catch (error) {
//       console.error('Error fetching item count: ', error);
//     }
//     return 0; // Return 0 if no items found or an error occurred
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const newId = await countItems();
//     console.log("NEWWWW IDDDD", newId)

//     const productsRef = ref(database, `products/${productDetails.category}/${newId}`);

//     set(productsRef, productDetails)
//       .then(() => {   
//         console.log("Product added successfully!");
//         // Add any additional logic after successful submission
//       })
//       .catch((error) => {
//         console.error('Error adding product: ', error);
//         alert('Error adding product. Please try again.');
//       });
//   };

//   return (
//     <div style={{ paddingTop: "5rem" }}>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={productDetails.title}
//             onChange={handleInputChange}
//           />
//         </label>

//         <label>
//           Images:
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//           />
//         </label>
//         {productDetails?.img?.length > 0 && (
//           <div>
//             {productDetails?.img?.map((item, index) => {
//               return (
//                 <img
//   src={item}
//   key={index}
//   alt={`Image ${index}`}
//   height="30px"
//   onClick={() => {
//     const updatedImages = productDetails.img.filter((_, idx) => idx !== index);
//     setProductDetails({ ...productDetails, img: updatedImages });
//   }}
// />

//               );
//             })}
//           </div>
//         )}

// <label>
//           Price:
//           <input
//             type='number'
//             name="price"
//             value={productDetails.price}
//             onChange={handleInputChange}
//           />
//         </label>

//         <label>
//           Discounted Price:
//           <input
//             type='number'
//             name="discountedPrice"
//             value={productDetails.discountedPrice}
//             onChange={handleInputChange}
//           />
//         </label>

//         <label>
//           Category:
//           <input
//             type="text"
//             name="category"
//             value={productDetails.category}
//             onChange={handleInputChange}
//           />
//         </label>

//         <label>
//           Pack of:
//           <input
//             type="text"
//             name="packof"
//             value={productDetails.packof}
//             onChange={handleInputChange}
//           />
//         </label>

//         <div>
//           <label>
//             Hot:
//             <input
//               type="checkbox"
//               name="hot"
//               checked={productDetails.hot}
//               onChange={(e) => {
//                 setProductDetails({
//                   ...productDetails,
//                   hot: e.target.checked,
//                 });
//               }}
//             />
//           </label>
//         </div>

//         <div>
//           <label>
//             Description:
//             <textarea
//               name="description"
//               value={productDetails.description}
//               onChange={handleInputChange}
//             />
//           </label>
//         </div>

//         {/* Specification Colors and Available */}
//         {productDetails.specs.map((spec, index) => (
//           <div key={index}>
//             <label>
//               Specification {index + 1} Color:
//               <input
//                 type="text"
//                 value={spec.color}
//                 onChange={(e) => handleSpecsInputChange(e, index)}
//               />
//             </label>

//             <label>
//               Specification {index + 1} Available (size: availability, ...):
//               <input
//                 type="text"
//                 value={spec.available.map((item) => `${item.size}:${item.availability}`).join(", ")}
//                 onChange={(e) => handleSpecsAvailableChange(e, index)}
//               />
//             </label>

//             <button type="button" onClick={() => removeSpec(index)}>Remove Spec</button>
//           </div>
//         ))}

//         <button type="button" onClick={addNewSpec}>Add Specification</button>

//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// }

// export default AddProducts;
