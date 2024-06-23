import { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i <= 301; i++) {
    cart[i] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => {
        setAll_product(data);
      });
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => {
          setCartItems(data);
        });
    }
  }, []);
  const addToCart = (ItemId) => {
    setCartItems((prev) => ({ ...prev, [ItemId]: prev[ItemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ id: ItemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({
          id: itemId,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };
  const getTotalCartItems = () => {
    let sum = 0;
    for (const key in cartItems) {
      if (cartItems[key] > 0) sum += cartItems[key];
    }
    return sum;
  };
  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
  };
  console.log(cartItems);
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
