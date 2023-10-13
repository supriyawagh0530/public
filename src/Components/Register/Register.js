import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Register.module.css";
import axios from "axios";

import { useNavigate, NavLink } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    "username":"abc",
  "email":"abc@abc.com",
  "password":"1234567890",
  "roles":["user"]
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
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      error.username = "UserName is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    return error;
  };
  const signupHandler = async (e) => {
    try {
      e.preventDefault();
      setFormErrors(validateForm(user));
      setIsSubmit(true);
      if(Object.keys(formErrors).length !== 0) return false;
    
      const responseData = await axios.post("http://localhost:8080/api/auth/signup", user);
      console.log("my-app: signupHandler: responseData: ",responseData);
      if(responseData?.data){
        navigate("/login", { replace: true });
      }


    } catch (error) {
      console.error("my-app: signupHandler: error: ",error);
      alert("Please change username or email");
    } finally{
      setIsSubmit(false)
    }
  };

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(user);
  //     axios.post("http://localhost:9002/signup/", user).then((res) => {
  //       alert(res.data.message);
  //       navigate("/login", { replace: true });
  //     });
  //   }
  // }, [formErrors]);
  return (
    <>
      <div className={registerstyle.register}>
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="User Name"
            onChange={changeHandler}
            value={user.username}
          />
          <p className={basestyle.error}>{formErrors.username}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <button disabled={isSubmit} style={{background:isSubmit?'grey':''}} className={basestyle.button_common} onClick={signupHandler}>
            Register
          </button>
        </form>
        <NavLink to="/login">Already registered? Login</NavLink>
      </div>
    </>
  );
};
export default Register;
