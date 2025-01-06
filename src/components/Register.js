import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import CSS for styling

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        profile_image: null,
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

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            profile_image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }
        try {
            const response = await axios.post('https://bizapp-40fj.onrender.com/api/register/', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            localStorage.setItem('token', response.data.token);
            setMessage('Registration successful');
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error(error);
            setMessage('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const isPasswordMatch = formData.password === confirmPassword;

    return (
        <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
                <input type="text" name="username" placeholder="Username" onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
                <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
                <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
                <input type="file" name="profile_image" onChange={handleFileChange} className="form-control-file" />
            </div>
            <div className="form-group">
                <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
                <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} className="form-control" />
            </div>
            {!isPasswordMatch && <p className="text-danger">Passwords do not match</p>}
            <button type="submit" disabled={!isPasswordMatch || loading} className="btn btn-primary">
                {loading ? 'Registering...' : 'Register'}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;
