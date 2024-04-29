import React, { useContext } from "react";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { ShopContext } from "../Context/ShopContext";
import "./CSS/ShopCategory.css";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <h1>{props.category} Collections</h1>
      <div className="shopcategory-indexSort">
        <div
          className="shopcategory-sort"
          onClick={() => {
            all_product.sort((a, b) => a.new_price - b.new_price);
          }}
        >
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={item.i}
                name={item.name}
                id={item.id}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
