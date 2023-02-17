import React from "react";
import { Link } from "react-router-dom";
import CategoryList from "../category_list";
import Logo from "../logo";
import UserLogout from "../user_logout";
import "./index.css";

const Nav = () => {
  return (
    <nav className="nav">
      <Logo />

      <CategoryList />

      {/* <Link to="/orders">Order History</Link>
      <Link to="/orders/new">New Order</Link> */}
      <Link to="/orders" className="button btn-sm">
        Previous Orders
      </Link>

      <UserLogout />
    </nav>
  );
};

export default Nav;
