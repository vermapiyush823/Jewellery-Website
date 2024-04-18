import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import star_dull_icon from "../Assets/star_dull_icon.png";
import star_icon from "../Assets/star_icon.png";
import "./ProductDisplay.css";
const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-price">
          <p className="productdisplay-right-price-old">₹{product.old_price}</p>
          <p className="productdisplay-right-price-new">₹{product.new_price}</p>
        </div>
        <div className="productdisplay-right-description">
          <p>{product.description}</p>
        </div>
        <div className="productdisplay-right-weight">
          <p>Weight: {product.weight}</p>
        </div>
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </button>
        <p className="productdisplay-right-category">
          <span>Category: </span>
          Women , Necklace
        </p>
        <p className="productdisplay-right-category">
          <span>Tags: </span>
          Modern , Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
