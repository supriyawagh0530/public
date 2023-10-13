import React from "react";
import basestyle from "../Base.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import withAuth from "../../Hoc/withAuth";

const Profile = () => {
  const navigate = useNavigate();

  const onLogout = ()=>{
    localStorage.removeItem('isLoggedIn');
    navigate("/", { replace: true });

  }
  return (
    <div className="profile">
      <h1 style={{ color: "white" }}>Welcome !!</h1>
      <button
        className={basestyle.button_common}
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};
export default withAuth(Profile);
