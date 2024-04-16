import React from "react";
import exclusive_image from "../Assets/exclusive_image.png";
import "./Offers.css";
const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for You</h1>
        <p>Get the best deals on your favorite products</p>
        <button>Shop Now</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="offers" />
      </div>
    </div>
  );
};

export default Offers;
