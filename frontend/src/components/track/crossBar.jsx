import React from "react";
import "./crossBar.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginForm from "../login/loginForm";
import SignIn from "../login/signIn";
import authService from "../../services/userService";

export default function Crossbar() {
  const navigate = useNavigate();

  // const handleLoginClick = () => {
  //   navigate('/signin');
  // };
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const openModal = () => {
    navigate('/login');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  return (
    <div className="crossbar">
      <div className="menu-icon">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Logo_dhktdn.png/150px-Logo_dhktdn.png"
          alt=""
        />
      </div>
      <div className="title">Music Com</div>
      <button className="login-button" onClick={openModal}>Login</button>
      
      {isModalOpen && <LoginForm onClose={closeModal} />}

      {/* {isModalOpen && <SignIn onLogin={closeModal}/>} */}
    </div>
  );
}
