import React from "react";
import "./crossBar.css";
import { useNavigate } from 'react-router-dom';

export default function Crossbar() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  }
  const handleRegisterClick = () => {
    navigate('/register');
  }
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="crossbar">
      <div className="menu-icon">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Logo_dhktdn.png/150px-Logo_dhktdn.png"
          alt="" onClick={handleHomeClick}
        />
      </div>
  
      <div className="btn">
      <button className="login-button" onClick={handleLoginClick}>Login</button>
      <button className="register-button" onClick={handleRegisterClick}>Register</button>
      </div>
      

    </div>
  );
}
