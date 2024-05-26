// SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/userService";
import "./signIn.css";

export default function SignIn({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await authService.login(username, password);
      setMessage("Login successful!");
      onLogin();
      navigate("/home");
    } catch (error) {
      setMessage("Login failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <img
          src="https://media.dau.edu.vn/Media/1_TH1057/Images/logo-dhktdn-150.png"
          alt="Logo"
          className="logo"
        />
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
