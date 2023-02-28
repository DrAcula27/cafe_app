import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import CategoryList from "../category_list";
import Logo from "../logo";
import UserLogout from "../user_logout";
import "./index.css";

const Nav = () => {
  let [categories, setCategories] = useState([]);
  const location = useLocation().pathname;

  useEffect(() => {
    const getCategories = async () => {
      let res = await axios.get(`/get_categories`);
      let catsFromDB = [...res.data];
      catsFromDB.sort((a, b) => a.sortOrder - b.sortOrder);
      setCategories(catsFromDB);
    };
    getCategories();
  }, []);

  return (
    <nav className="nav">
      <Logo />

      {location === "/orders/new" ? (
        <>
          <CategoryList categories={categories} />
          <Link to="/orders" className="button btn-sm">
            {"Previous Orders"}
          </Link>
        </>
      ) : (
        <Link to="/orders/new" className="button btn-sm">
          {"New Order"}
        </Link>
      )}

      <UserLogout />
    </nav>
  );
};

export default Nav;
