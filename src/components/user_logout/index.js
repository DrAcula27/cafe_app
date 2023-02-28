import React, { useContext } from "react";
import "./index.css";
import { AppContext } from "../../contexts/app_context";

const UserLogout = () => {
  const { user } = useContext(AppContext);
  const handleLogout = () => {};

  return (
    <div className="user-logout">
      <div>{user.name || "guest"}</div>
      <div className="email">{user.email || "guest@email.com"}</div>
      <button className="btn-sm" onClick={handleLogout}>
        LOG OUT
      </button>
    </div>
  );
};

export default UserLogout;
