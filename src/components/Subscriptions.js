import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Subscriptions.css';

const Subscriptions = () => {
    const [referenceNumber, setReferenceNumber] = useState('');

    useEffect(() => {
        const fetchReferenceNumber = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('https://bizapp-40fj.onrender.com/api/user/me/', {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                    setReferenceNumber(response.data.reference_number);
                } catch (error) {
                    console.error('Error fetching reference number:', error);
                }
            }
        };

        fetchReferenceNumber();
    }, []);

    return (
        <div className="subscriptions">
            <h1>Unlock More with TurfBizApp Subscriptions!</h1>
            <p>
                Join hundreds of satisfied landlords who have already subscribed and are enjoying the 
                benefits of faster, more effective connections with tenants. With a TurfBizApp subscription, 
                you don’t just list your residence—you gain a competitive edge!
            </p>

            <div className="subscription-cards">
                <div className="subscription-card">
                    <h2>🌟 Basic Subscription</h2>
                    <p><strong>R150 per month</strong></p>
                    <p>✔️ Upload more than 3 images.</p>
                    <p>✔️ Enhance your property listing with more visuals.</p>
                </div>
                <div className="subscription-card">
                    <h2>🚀 Standard Subscription</h2>
                    <p><strong>R300 per month</strong></p>
                    <p>✔️ Upload videos to showcase your residence.</p>
                    <p>✔️ Attract more interest with multimedia listings.</p>
                </div>
                <div className="subscription-card premium">
                    <h2>👑 Premium Subscription</h2>
                    <p><strong>R500 per month</strong></p>
                    <p>✔️ Upload unlimited images and videos.</p>
                    <p>✔️ Your residence gets priority placement on the homepage.</p>
                    <p>✔️ Get instant notifications sent to users when you update your listing.</p>
                    <p>✔️ Be among the first to receive app updates and new features.</p>
                    <p><strong>Maximize visibility. Maximize bookings.</strong></p>
                </div>
            </div>

            <h2>How to Subscribe</h2>
            <p>Simply make a payment using the banking details below and include your unique reference number.</p>

            <div className="banking-details">
                <h3>Banking Details</h3>
                <p><strong>Bank:</strong> Standard Bank</p>
                <p><strong>Branch Code:</strong> 2548</p>
                <p><strong>Account Type:</strong> Current</p>
                <p><strong>Account Number:</strong> 10 11 363 3317</p>
            </div>

            <h3>Your Unique Reference Number</h3>
            <p className="reference-number">{referenceNumber ? referenceNumber : 'Loading your reference number...'}</p>

            <h2>Need Help? Contact Us!</h2>
            <p><strong>Phone:</strong> 061 704 8855</p>
            <p><strong>Email:</strong> turfbizapp@gmail.com</p>

            <div className="cta">
                <h3>Why Wait? Subscribe Today!</h3>
                <p>
                    Don’t miss out on the chance to enhance your property listings, attract more tenants, 
                    and boost your visibility. Choose a plan that works best for you, and let’s grow together!
                </p>
            </div>
        </div>
    );
};

export default Subscriptions;
