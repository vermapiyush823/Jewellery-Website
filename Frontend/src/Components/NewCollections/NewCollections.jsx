import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./NewCollections.css";

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/products/newcollections").then(
      (response) =>
        response.json().then((data) => {
          setNew_collection(data);
        })
    );
  }, []);
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item) => {
          return (
            <Item
              key={item.id}
              name={item.name}
              id={item.id}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
