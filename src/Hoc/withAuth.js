import React from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
      return <Component {...props} />;
    } else {
      // If the user is not authenticated, navigate to the login route
      navigate("/login"); // Use { replace: true } to replace the current history entry
      return null;

    }
  };
};

export default withAuth;
