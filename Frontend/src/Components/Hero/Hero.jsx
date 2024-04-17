import { ArrowRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import heroImg from "../Assets/hero_image.png";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW DESIGN ONLY</h2>
        <div>
          <p>new</p>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <ArrowRightIcon className="arrow" />
        </div>
      </div>
      <div className="hero-right">
        <img src={heroImg} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
