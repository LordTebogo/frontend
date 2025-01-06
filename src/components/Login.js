import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const getUserDetails = async (token) => {
        try {
            const response = await axios.get('https://bizapp-40fj.onrender.com/api/user/me/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            console.log('User details:', response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setMessage('Error fetching user details. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await axios.post('https://bizapp-40fj.onrender.com/api/login/', formData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log('Login successful:', response.data);
            setMessage('Login successful');
            // Fetch user details with the token
            await getUserDetails(token);
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;
