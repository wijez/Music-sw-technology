import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/userService';
import "./register.css";

export default function Register({ onRegister }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== repassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            await authService.register(username, email, password);
            setMessage('Registration successful!');
            onRegister(); // Cập nhật trạng thái xác thực
            navigate('/home'); // Điều hướng đến trang chủ
        } catch (error) {
            setMessage('Registration failed.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <img src="https://media.dau.edu.vn/Media/1_TH1057/Images/logo-dhktdn-150.png" alt="Logo" className="logo" />
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Repassword"
                    value={repassword}
                    onChange={(e) => setRePassword(e.target.value)}
                />
                <button onClick={handleRegister}>Register</button>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}
