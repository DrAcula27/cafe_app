import React from "react";
import "./index.css";

const MenuListItem = ({ itemData }) => {
  const handleAddToOrder = () => {};

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
