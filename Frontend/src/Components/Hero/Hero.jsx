import React from "react";
import arrowIcon from "../Assets/arrow.png";
import handIcon from "../Assets/hand_icon.png";
import heroImg from "../Assets/hero_image.png";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW DESIGN ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={handIcon} alt="hand" />
          </div>
          <p>Collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrowIcon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={heroImg} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
