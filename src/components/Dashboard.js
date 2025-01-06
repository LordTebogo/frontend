import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [residences, setResidences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, please log in.');
            setLoading(false);
            return;
        }

        // Fetch user data
        axios.get('https://turfbizappapi.onrender.com/api/user/me/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            const userData = response.data;
            setUser(userData);
            // Fetch residences associated with the user
            return axios.get(`https://turfbizappapi.onrender.com/api/residences/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            }).then(response => {
                // Filter residences by the authenticated user's ID
                const userResidences = response.data.filter(residence => residence.user === userData.id);
                setResidences(userResidences);
                setLoading(false);
            });
        })
        .catch(error => {
            console.error('There was an error fetching the data!', error);
            setLoading(false);
        });
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this residence?');
        if (!confirmDelete) return;

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found, please log in.');
            return;
        }

        axios.delete(`https://turfbizappapi.onrender.com/api/residences/${id}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(() => {
            setResidences(residences.filter(residence => residence.id !== id));
        })
        .catch(error => {
            console.error('There was an error deleting the residence!', error);
        });
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your dashboard.</div>;
    }

    return (
        <div className="dashboard">
            <h1>Welcome, {user.name}</h1>
            <h2>Your Reference Number: {user.reference_number}</h2>
            <h2>Your Residences</h2>
            {residences.length === 0 ? (
                <p>You have no residences listed.</p>
            ) : (
                <div className="residences-list">
                    {residences.map(residence => (
                        <div className="residence-card" key={residence.id}>
                            <h3>{residence.name}</h3>
                            <p><strong>Address:</strong> {residence.address}</p>
                            <p><strong>Type:</strong> {residence.residence_type}</p>
                            <p><strong>Price:</strong> R{residence.room_price}</p>
                            <p><strong>Rooms Include:</strong> {residence.rooms_include}</p>
                            <p><strong>Description:</strong> {residence.description}</p>
                            <p><strong>Available Rooms:</strong> {residence.rooms_available ? `${residence.number_of_rooms_available} available` : 'No rooms available'}</p>
                            <p><strong>Available From:</strong> {new Date(residence.room_available_date).toLocaleDateString()}</p>
                            <img src={residence.cover_image} alt={`${residence.name} cover`} className="residence-image" />
                            <div className="residence-actions">
                                <button onClick={() => handleDelete(residence.id)} className="btn btn-danger">Delete</button>
                                <Link to={`/editResidence/${residence.id}/`} className="btn btn-primary">Edit</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
