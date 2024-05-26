import React, {useState}from "react";
import "./crossBar.css";
import { useNavigate } from "react-router-dom";
import authService from "../../services/userService";
import { FaCartArrowDown } from "react-icons/fa";
import Cart from "../cart/cart";
import Sum from "../requirements/sum";
import User from "../requirements/user";

export default function Crossbar({ user, onLogout , tracks }) {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    authService.logout();
    onLogout(); 
    localStorage.removeItem("user");
    navigate("/");
  };
  
  const handleCartClick = () => {
    navigate("/cart");
  };
 
  return (
    <div className="crossbar">
      <div className="menu-icon">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Logo_dhktdn.png/150px-Logo_dhktdn.png"
          alt=""
          onClick={handleHomeClick}
        />
      </div>
      
      <div className="btn">
        <div> 
          <User className="info-button" user={user}/>
        </div>
          
        
        <div>
        <Sum className="sum-button" tracks={tracks}/>
        </div>
        <div>
        
        <FaCartArrowDown className="cart-button" onClick={handleCartClick} />
        </div>
        {user ? (
          <>
            <span className="user-name">{user.username}</span>
            <button className="logout-button" onClick={handleLogoutClick}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="login-button" onClick={handleLoginClick}>
              Login
            </button>
            <button className="register-button" onClick={handleRegisterClick}>
              Register
            </button>
          </>
        )}
      </div>
     
    </div>
  );
}
