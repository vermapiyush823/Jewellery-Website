import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";
import "./AddProduct.css";
const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    weight: "",
    old_price: "",
    new_price: "",
    category: "women",
  });
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = async (e) => {
    setImage(e.target.files[0]);
  };

  const Add_Product = async () => {
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      product.image = responseData.path;
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Product Added Successfully");
            setProductDetails({
              name: "",
              image: "",
              weight: "",
              old_price: "",
              new_price: "",
            });
          } else alert("Product not added");
        });
    }
  };
  return (
    <div className="add-product">
      <div className="add-product-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Enter product title"
        />
      </div>
      <div className="add-product-price">
        <div className="add-product-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            placeholder="Enter product price"
          />
        </div>
        <div className="add-product-itemfield">
          <p>Offer Price</p>
          <input
            type="text"
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="Enter product price"
          />
        </div>
      </div>
      <div className="add-product-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="add-product-selector"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="add-product-price">
        <div className="add-product-itemfield">
          <label htmlFor="file-input">
            <p>Product Image</p>
            <img
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="product"
              className="add-product-thumbnail-img"
            />
          </label>
          <input
            id="file-input"
            name="image"
            type="file"
            value={productDetails.image}
            hidden
            onChange={imageHandler}
          />
        </div>
        <div className="add-product-itemfield">
          <p>Product Weight</p>
          <input
            type="text"
            name="weight"
            placeholder="Enter product weight"
            value={productDetails.weight}
            onChange={changeHandler}
          />
        </div>
      </div>
      <button className="add-product-btn" onClick={() => Add_Product()}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
