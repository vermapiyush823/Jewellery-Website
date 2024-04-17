import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Necklace is a type of jewelry that is worn around the neck. Necklaces
          may have been one of the earliest types of adornment worn by humans.
          They often serve ceremonial, religious, magical, or funerary purposes
          and are also used as symbols of wealth and status, given that they are
          commonly made of precious metals and stones.
        </p>
        <p>
          A necklace is a type of jewelry that is worn around the neck.
          Necklaces may have been one of the earliest types of adornment worn by
          humans. They often serve ceremonial, religious, magical, or funerary
          purposes and are also used as symbols of wealth and status, given that
          they are commonly made of precious metals and stones.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
