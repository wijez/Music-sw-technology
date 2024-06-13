import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/userService";
import "./signup.css";
export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(
        formData.username,
        formData.email,
        formData.password
      );
      
        navigate("/");
    
     
      
      console.log("Register:", response);
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        setErrorMessage("Registration failed. Please try again later.");
      }
    }
  };

  if (isSubmitted) {
    return null;
  }
  return (
    <>
      <div className="container-signup">
        <form className="form" onSubmit={handleSubmit}>
          <img
            src="https://media.dau.edu.vn/Media/1_TH1057/Images/logo-dhktdn-150.png"
            alt="Logo"
            className="logo"
          />

          <div className="input-container ic1">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input"
              placeholder=" "
            />
            <div className="cut"></div>
            <label className="placeholder">Username</label>
          </div>

          <div className="input-container ic2">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder=" "
            />
            <div className="cut cut-short"></div>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="btn-signup">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
