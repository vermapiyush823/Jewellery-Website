import React from "react";
import "./NewsLetter.css";
const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>NEWSLETTER</h1>
      <hr />
      <p>Subscribe to our newsletter and get 20% off your first purchase</p>
      <div className="newsletter-form">
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsLetter;
