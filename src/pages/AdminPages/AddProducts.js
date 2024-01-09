import React, { useEffect, useState } from "react";
import { ref, set, get, child, onValue } from "firebase/database";
import { database } from "../../firebase";

function AddProducts() {

  const initialSpecs = [
    {
      color: "",
      available: [
        { size: "S", availability: true },
        { size: "L", availability: true },
        { size: "XL", availability: false },
        { size: "XXL", availability: true },
      ],
    },
  ];

  const [idToPost, setIdToPost] = useState(0);

  const [productDetails, setProductDetails] = useState({
    id: Math.floor(10000000 + Math.random() * 90000000),
    img: [], // Array to store user-selected images
    title: "",
    
    specs: initialSpecs,
    price: 0,
    discountedPrice: 0,
    category: "",
    packof: 0,
    hot: false,
    homePageItem: false,
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Convert only 'price' and 'discountedPrice' to float
    if (name === 'price' || name === 'discountedPrice' || name === 'packof') {
      processedValue = parseInt(value);
    }

    setProductDetails({
      ...productDetails,
      [name]: processedValue,
    });
  };

  const handleSpecsInputChange = (e, index) => {
    const { value } = e.target;

    const updatedSpecs = [...productDetails.specs];
    updatedSpecs[index] = {
      ...updatedSpecs[index],
      color: value,
    };

    setProductDetails({
      ...productDetails,
      specs: updatedSpecs,
    });
  };

  const handleSpecsAvailableChange = (e, index) => {
    const { value } = e.target;
    const availableValues = value.split(",").map((item) => {
      const [size, availability] = item.trim().split(":").map((subItem) => subItem.trim());
      return { size, availability: availability === "true" };
    });

    const updatedSpecs = [...productDetails.specs];
    updatedSpecs[index] = {
      ...updatedSpecs[index],
      available: availableValues,
    };

    setProductDetails({
      ...productDetails,
      specs: updatedSpecs,
    });
  };

  const addNewSpec = () => {
    const newSpec = {
      color: "",
      available: Array.from({ length: initialSpecs[0].available.length }, () => ({ size: "", availability: false })),
    };

    setProductDetails({
      ...productDetails,
      specs: [...productDetails.specs, newSpec],
    });
  };

  const removeSpec = (indexToRemove) => {
    const updatedSpecs = productDetails.specs.filter((_, index) => index !== indexToRemove);
    setProductDetails({
      ...productDetails,
      specs: updatedSpecs,
    });
  };


  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedImages = [];

    for (let i = 0; i < files.length; i++) {
      const imageURL = URL.createObjectURL(files[i]);
      selectedImages.push(imageURL);
    }

    setProductDetails((prevProductDetails) => ({
      ...prevProductDetails,
      img: [...prevProductDetails.img, ...selectedImages],
    }));
  };


  const countItems = async () => {
    try {
      const productsRef = ref(database, `products/${productDetails.category}`);
      const snapshot = await get(productsRef);
      if (snapshot.exists()) {
        const count = Object.keys(snapshot.val()).length;
        return count + 1; // Return the count + 1 for the new ID
      }
    } catch (error) {
      console.error('Error fetching item count: ', error);
    }
    return 0; // Return 0 if no items found or an error occurred
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newId = await countItems();
    console.log("NEWWWW IDDDD", newId)

    const productsRef = ref(database, `products/${productDetails.category}/${newId}`);

    set(productsRef, productDetails)
      .then(() => {   
        console.log("Product added successfully!");
        // Add any additional logic after successful submission
      })
      .catch((error) => {
        console.error('Error adding product: ', error);
        alert('Error adding product. Please try again.');
      });
  };

  return (
    <div style={{ paddingTop: "5rem" }}>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={productDetails.title}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Images:
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </label>
        {productDetails?.img?.length > 0 && (
          <div>
            {productDetails?.img?.map((item, index) => {
              return (
                <img
  src={item}
  key={index}
  alt={`Image ${index}`}
  height="30px"
  onClick={() => {
    const updatedImages = productDetails.img.filter((_, idx) => idx !== index);
    setProductDetails({ ...productDetails, img: updatedImages });
  }}
/>

              );
            })}
          </div>
        )}

<label>
          Price:
          <input
            type='number'
            name="price"
            value={productDetails.price}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Discounted Price:
          <input
            type='number'
            name="discountedPrice"
            value={productDetails.discountedPrice}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={productDetails.category}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Pack of:
          <input
            type="text"
            name="packof"
            value={productDetails.packof}
            onChange={handleInputChange}
          />
        </label>

        <div>
          <label>
            Hot:
            <input
              type="checkbox"
              name="hot"
              checked={productDetails.hot}
              onChange={(e) => {
                setProductDetails({
                  ...productDetails,
                  hot: e.target.checked,
                });
              }}
            />
          </label>
        </div>

        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={productDetails.description}
              onChange={handleInputChange}
            />
          </label>
        </div>

        {/* Specification Colors and Available */}
        {productDetails.specs.map((spec, index) => (
          <div key={index}>
            <label>
              Specification {index + 1} Color:
              <input
                type="text"
                value={spec.color}
                onChange={(e) => handleSpecsInputChange(e, index)}
              />
            </label>

            <label>
              Specification {index + 1} Available (size: availability, ...):
              <input
                type="text"
                value={spec.available.map((item) => `${item.size}:${item.availability}`).join(", ")}
                onChange={(e) => handleSpecsAvailableChange(e, index)}
              />
            </label>

            <button type="button" onClick={() => removeSpec(index)}>Remove Spec</button>
          </div>
        ))}

        <button type="button" onClick={addNewSpec}>Add Specification</button>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProducts;
