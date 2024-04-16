import React, { useState } from "react";
import { Link } from "react-router-dom";
import cartIcon from "../Assets/cart_icon.png";
import logo from "../Assets/logo.png";
import "./Navbar.css";
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>Shree Balaji Jwellers</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Shop
          </Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("men")}>
          <Link to="/mens" style={{ textDecoration: "none" }}>
            {" "}
            Men{" "}
          </Link>
          {menu === "men" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("women")}>
          <Link to="/womens" style={{ textDecoration: "none" }}>
            Women
          </Link>
          {menu === "women" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link to="/kids" style={{ textDecoration: "none" }}>
            Kids
          </Link>
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>

      <div className="nav-login-cart">
        <button>Login</button>
        <img src={cartIcon} alt="cart" />
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
