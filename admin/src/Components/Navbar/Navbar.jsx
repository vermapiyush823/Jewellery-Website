import React from "react";
import navlogo from "../../assets/logo.png";
import navProfile from "../../assets/nav-profile.svg";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-name">
        <img src={navlogo} alt="logo" className="nav-logo" />
        <div>
          <h1 className="nav-brand">Shree Balaji Jwellers</h1>
          <p className="nav-panel">Admin Panel</p>
        </div>
      </div>
      <img src={navProfile} alt="profile" className="nav-profile" />
    </div>
  );
};

export default Navbar;
