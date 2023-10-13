import React, { useState, useEffect } from "react";
import basestyle from "../Base.module.css";
import loginstyle from "./Login.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    if (!values.username) {
      error.username = "Username is required";
    } 
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);

    //  navigate("/", { replace: true });

  };

  useEffect(async() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      try {

        const responseData = await axios.post("http://localhost:8080/api/auth/signin", user);
        console.log("responseData",responseData?.data?.email)
        if(responseData?.data?.email){
          localStorage.setItem('isLoggedIn', 'true');
          navigate("/profile", { replace: true });
        }
      } catch (error) {
        alert("Wrong username or password")
      } finally{
        setIsSubmit(false);

      }

    } else {
      setIsSubmit(false);

    }
  }, [formErrors]);
  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="username"
          name="username"
          id="username"
          placeholder="username"
          onChange={changeHandler}
          value={user.username}
        />
        <p className={basestyle.error}>{formErrors.username}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <button disabled={isSubmit} style={{background:isSubmit?'grey':''}} className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};
export default Login;
