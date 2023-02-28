import axios from "axios";
import React, { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import "./index.css";

const MenuListItem = ({ itemData }) => {
  const { setCart } = useContext(AppContext);

  const handleAddToOrder = async () => {
    // make an axios call to add an item to the order
    let res = await axios({
      method: "PUT",
      url: `/add_to_cart/${itemData._id}`,
    });
    if (res.data._id) {
      setCart(res.data);
    }
  };

  return (
    <div className="MenuListItem">
      <div className="emoji flex-ctr-ctr">{itemData.emoji}</div>
      <div className="name">{itemData.name}</div>
      <div className="buy">
        <span>${itemData.price}</span>
        <button className="btn-sm" onClick={() => handleAddToOrder()}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default MenuListItem;
