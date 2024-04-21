import React from "react";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/addproduct" className="sidebar-link">
        <div className="sidebar-item">
          <img
            src={add_product_icon}
            alt="add product"
            className="sidebar-icon"
          />
          <p className="sidebar-text">Add Product</p>
        </div>
      </Link>
      <Link to="/listproduct" className="sidebar-link">
        <div className="sidebar-item">
          <img
            src={list_product_icon}
            alt="list product"
            className="sidebar-icon"
          />
          <p className="sidebar-text">Product List</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
