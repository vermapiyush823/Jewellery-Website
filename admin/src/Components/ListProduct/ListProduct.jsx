import React, { useEffect, useState } from "react";
import cross_icon from "../../assets/cross_icon.png";
import "./ListProduct.css";
const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);
  const remove_product = async (id) => {
    await fetch(`http://localhost:4000/removeproduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };
  return (
    <div className="list-product">
      <h1>List of Products</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Weight</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <hr />
      <div className="listproduct-allproducts">
        {allProducts.map((product) => {
          return (
            <>
              <div className="listproduct-format-main listproduct-format">
                <img
                  src={product.image}
                  alt="product"
                  className="listproduct-product-image"
                />
                <p>{product.name}</p>
                <p>₹ {product.old_price}</p>
                <p>₹ {product.new_price}</p>
                <p>{product.weight}</p>
                <p>{product.category}</p>
                <img
                  src={cross_icon}
                  alt="cross"
                  className="listproduct-cross-icon"
                  onClick={() => remove_product(product.id)}
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};
export default ListProduct;
