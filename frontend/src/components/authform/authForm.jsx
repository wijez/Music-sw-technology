import React, { useState } from "react";
import axios from "axios";
import "./authForm.css"; 

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      // Handle Register
      try {
        await axios.post("http://127.0.0.1:8000/auth/users/", {
          username,
          email,
          password,
          repassword,
        });
        // Redirect or show success message
      } catch (error) {
        // Handle errors
      }
    } else {
      // Handle Login
      try {
        const response = await axios.post("http://127.0.0.1:8000/auth/users/", {
          username,
          password,
        });
        console.log(response.data.token); // Access token from response
        // Redirect or show success message
      } catch (error) {
        // Handle errors
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-buttons">
        <button onClick={() => setIsRegister(true)}>Register</button>
        <button onClick={() => setIsRegister(false)}>Login</button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {isRegister && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegister && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
          />
        )}
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
    </div>
  );
};

export default AuthForm;
