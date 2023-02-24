import React, { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import MenuListItem from "../menu_list_item";
import "./index.css";

const MenuList = () => {
  const { activeCat, items } = useContext(AppContext);

  let itemsJSX = items.map((item) => {
    if (item.category.name === activeCat)
      return <MenuListItem itemData={item} />;
  });
  return <div>{itemsJSX}</div>;
};

export default MenuList;
