import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import "./CartItems.css";
// If  any problem arise due to subtotal watch at 2:53:00

const CartItems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={product.image}
                  className="carticon-product-icon"
                  alt=""
                />
                <p>{product.name}</p>
                <p>₹{product.new_price}</p>
                <p className="cartitems-quantity">{cartItems[product.id]}</p>
                <p>₹{product.new_price * cartItems[product.id]}</p>
                <img
                  src={remove_icon}
                  alt=""
                  className="carticon-remove-icon"
                  onClick={() => {
                    removeFromCart(product.id);
                  }}
                />
              </div>
              <hr />
            </>
          );
        } else {
          return null;
        }
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>
                ₹
                {all_product.reduce(
                  (acc, item) => acc + item.new_price * cartItems[item.id],
                  0
                )}
              </p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping</p>
              <p>₹0</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Total</p>
              <p>
                ₹
                {all_product.reduce(
                  (acc, item) => acc + item.new_price * cartItems[item.id],
                  0
                )}
              </p>
            </div>
          </div>
          <button>Checkout</button>
        </div>
        <div className="cartitems-promocode">
          <p>Have a promocode?</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Enter Promocode" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
