import React, { useContext } from "react";
import { AppContext } from "../../contexts/app_context";
import "./index.css";

const CategoryList = ({ categories }) => {
  const { activeCat, setActiveCat } = useContext(AppContext);

  const handleCatClick = (cat) => {
    setActiveCat(cat.name);
  };

  let categoriesJSX = categories.map((cat) => {
    return (
      <li
        key={cat._id}
        className={cat.name === activeCat ? "active" : ""}
        onClick={() => handleCatClick(cat)}
      >
        {cat.name}
      </li>
    );
  });

  return <ul className="CategoryList">{categoriesJSX}</ul>;
};

export default CategoryList;
