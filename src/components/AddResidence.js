import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddResidence.css'; // Import CSS for styling

const AddResidence = () => {
    const [formData, setFormData] = useState({
        user: '',
        name: '',
        address: '',
        residence_type: 'standard', // Default value
        room_price: '',
        rooms_include: '',
        description: '',
        cover_image: null,
        rooms_available: false,
        number_of_rooms_available: '',
        room_available_date: '',
        images: [],
        videos: [],
        business_contacts: '',
        business_email: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [subscriptionStatus, setSubscriptionStatus] = useState({
        is_images_subscribed: false,
        is_videos_subscribed: false,
        is_on_premium: false
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('https://turfbizappapi.onrender.com/api/user/me/', {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        user: response.data.id
                    }));
                    setSubscriptionStatus({
                        is_images_subscribed: response.data.is_images_subscribed,
                        is_videos_subscribed: response.data.is_videos_subscribed,
                        is_on_premium: response.data.is_on_premium
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            if (name === 'cover_image') {
                setFormData({
                    ...formData,
                    [name]: files[0]
                });
            } else {
                setFormData({
                    ...formData,
                    [name]: Array.from(files)
                });
            }
        } else if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
            setMessage('You need to log in first.');
            setLoading(false);
            return;
        }

        // Subscription checks
        if (!subscriptionStatus.is_on_premium) {
            if (!subscriptionStatus.is_images_subscribed && formData.images.length > 3) {
                setMessage('Only subscribed users can upload more than 3 images.');
                setLoading(false);
                navigate('/subscriptions');
                return;
            }

            if (!subscriptionStatus.is_videos_subscribed && formData.videos.length > 0) {
                setMessage('Only subscribed users can upload videos.');
                setLoading(false);
                navigate('/subscriptions');
                return;
            }
        }

        // Business contact validation
        if (formData.business_contacts.length !== 10) {
            setMessage('Business contact must be exactly 10 digits.');
            setLoading(false);
            return;
        }

        // Prepare form data for submission
        const residenceData = new FormData();
        for (const key in formData) {
            if (key === 'images' || key === 'videos') {
                formData[key].forEach((file) => {
                    residenceData.append(key, file);
                });
            } else if (key === 'cover_image' && formData[key] instanceof File) {
                residenceData.append(key, formData[key]);
            } else {
                residenceData.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.post('https://turfbizappapi.onrender.com/api/submit-residence/', residenceData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Residence added successfully!');
            navigate('/dashboard');
        } catch (error) {
            setMessage('An error occurred while adding the residence.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-residence-container">
            <h1 className="title">Add Residence</h1>
            <form onSubmit={handleSubmit} className="add-residence-form">
                <input type="hidden" name="user" value={formData.user} />
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Residence Type:</label>
                    <select name="residence_type" value={formData.residence_type} onChange={handleChange} required className="form-control">
                        <option value="standard">Standard</option>
                        <option value="bachelor">Bachelor</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Room Price:</label>
                    <input type="number" name="room_price" value={formData.room_price} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Rooms Include:</label>
                    <textarea name="rooms_include" value={formData.rooms_include} onChange={handleChange} className="form-control"></textarea>
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="form-control"></textarea>
                </div>
                <div className="form-group">
                    <label>Cover Image:</label>
                    <input type="file" name="cover_image" accept="image/*" onChange={handleChange} className="form-control-file" />
                </div>
                <div className="form-group">
                    <label>Rooms Available:</label>
                    <input type="checkbox" name="rooms_available" checked={formData.rooms_available} onChange={handleChange} className="form-check-input" />
                </div>
                <div className="form-group">
                    <label>Number of Rooms Available:</label>
                    <input type="number" name="number_of_rooms_available" value={formData.number_of_rooms_available} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Room Available Date:</label>
                    <input type="date" name="room_available_date" value={formData.room_available_date} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Business Contacts:</label>
                    <input type="text" name="business_contacts" value={formData.business_contacts} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Business Email:</label>
                    <input type="email" name="business_email" value={formData.business_email} onChange={handleChange} required className="form-control" />
                </div>
                <div className="form-group">
                    <label>Images (Only 3 allowed unless subscribed):</label>
                    <input type="file" name="images" accept="image/*" multiple onChange={handleChange} className="form-control-file" />
                </div>
                <div className="form-group">
                    <label>Videos (Only if subscribed):</label>
                    <input type="file" name="videos" accept="video/*" multiple onChange={handleChange} className="form-control-file" />
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary">
                    {loading ? 'Submitting...' : 'Add Residence'}
                </button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default AddResidence;
