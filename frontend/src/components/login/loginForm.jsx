import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/userService';

const LoginForm = ({onClose}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            const response = await authService.login(formData.email, formData.password);
            console.log('Login successful:', response);
            // Redirect or update UI
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    if (isSubmitted) {
        return null;
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <button type="submit">Log In</button>
        </form>
    );
};

export default LoginForm;
