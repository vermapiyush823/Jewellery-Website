import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./Popular.css";
const Popular = () => {
  const [data_product, setData_product] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/popular").then((response) =>
      response.json().then((data) => {
        setData_product(data);
      })
    );
  }, []);
  return (
    <div className="popular">
      <h1>Popular in women</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, index) => {
          return (
            <Item
              key={index}
              id={item.id}
              image={item.image}
              name={item.name}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
