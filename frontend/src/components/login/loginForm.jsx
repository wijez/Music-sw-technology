import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/userService";
import "./loginForm.css";
import {UserContext} from "../authform/userContext";

const LoginForm = ({ onLoginSuccess  }) => {
  //const { login } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await authService.login(
        formData.email,
        formData.password
      );
      console.log("Login successful:", userData.user);
      //login(userData.user); // Lưu trữ thông tin người dùng trong ngữ cảnh
      onLoginSuccess(userData.user)
      if (userData.user.is_superuser) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
    }
  };

  if (isSubmitted) {
    return null;
  }

  return (
    <>
      <div className="container-login">
        <form className="form" onSubmit={handleSubmit}>
          <img
            src="https://media.dau.edu.vn/Media/1_TH1057/Images/logo-dhktdn-150.png"
            alt="Logo"
            className="logo"
          />
          <div className="input-container ic1">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder=" "
            />
            <div className="cut"></div>
            <label className="placeholder">Email</label>
          </div>

          <div className="input-container ic2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder=" "
            />
            <div className="cut cut-short"></div>
            <label className="placeholder">Password</label>
          </div>

          <button type="submit" className="btn-login">
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
