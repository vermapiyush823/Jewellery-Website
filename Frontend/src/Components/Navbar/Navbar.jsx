import React, { useContext, useState } from "react";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import logo from "../Assets/logo.png";
import "./Navbar.css";
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} className="nav-logo-img" alt="logo" />
        <p>Shree Balaji Jwellers</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link
            to="/"
            className="nav-menu-link"
            style={{ textDecoration: "none" }}
          >
            Shop
          </Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("men")}>
          <Link
            to="/mens"
            className="nav-menu-link"
            style={{ textDecoration: "none" }}
          >
            {" "}
            Men{" "}
          </Link>
          {menu === "men" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("women")}>
          <Link
            to="/womens"
            className="nav-menu-link"
            style={{ textDecoration: "none" }}
          >
            Women
          </Link>
          {menu === "women" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link
            to="/kids"
            className="nav-menu-link"
            style={{ textDecoration: "none" }}
          >
            Kids
          </Link>
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-login-cart">
        <Link className="nav-login-btn" to="/login">
          Login
        </Link>
        <Link to="/cart">
          <div className="nav-cart-count">{getTotalCartItems()}</div>
          <BiCart className="nav-cart-icon" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
