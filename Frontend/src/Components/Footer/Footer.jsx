import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import footer_logo from "../Assets/logo_big.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Shree Balaji Jwellers</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <FaFacebookF className="footer-icon" />
        </div>
        <div className="footer-icons-container">
          <FaInstagram className="footer-icon" />
        </div>
        <div className="footer-icons-container">
          <FaTwitter className="footer-icon" />
        </div>
        <div className="footer-icons-container">
          <FaYoutube className="footer-icon" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>© 2021 Shree Balaji Jwellers. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
