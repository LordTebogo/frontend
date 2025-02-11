import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Base.css';

const ToggleButtonIcon = () => (
    <div className="toggle-button-icon">
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
    </div>
);

const Bases = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = useCallback(async () => {
        if (!isAuthenticated) {
            return;
        }
        setLoading(true);
        setMessage('');
        try {
            await axios.post('https://turfbizappapi.onrender.com/api/logout/', {}, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error) {
            setMessage('Error logging out. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const checkAuthentication = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('https://turfbizappapi.onrender.com/api/user/me/', {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    });
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                        setProfileImage(response.data.profile_image);
                    }
                } catch (error) {
                    setIsAuthenticated(false);
                    handleLogout();
                    setMessage('Session expired. Please log in again.');
                }
            } else {
                setIsAuthenticated(false);
            }
        };

        checkAuthentication();
    }, [navigate, handleLogout]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLinkClick = () => {
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <nav
                    className={`col-md-2 d-md-block bg-light sidebar ${sidebarOpen ? 'open' : 'closed'}`}
                    style={isMobile ? { width: '70%' } : {}}
                >
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/" onClick={handleLinkClick}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about-us" onClick={handleLinkClick}>About Us</Link>
                            </li>
                            {isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard" onClick={handleLinkClick}>Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/add-residence" onClick={handleLinkClick}>Add Residence</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/subscriptions" onClick={handleLinkClick}>Subscriptions</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link" onClick={handleLogout} disabled={loading}>
                                            {loading ? 'Logging out...' : 'Logout'}
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login" onClick={handleLinkClick}>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register" onClick={handleLinkClick}>Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
                <main role="main" className={`col-md-9 ml-sm-auto col-lg-10 px-4 main-content ${sidebarOpen ? '' : 'sidebar-closed'}`}>
                    <header className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom header">
                        <div className="d-flex align-items-center">
                            <button className="btn btn-outline-secondary toggle-sidebar-btn" onClick={toggleSidebar}>
                                <ToggleButtonIcon />
                            </button>
                            <h1 className="h2 ml-3">Turf Bizness App</h1>
                        </div>
                        {isAuthenticated && profileImage && (
                            <div className="d-flex align-items-center">
                                <img src={`https://turfbizappapi.onrender.com${profileImage}`} alt="Profile" className="rounded-circle" width="40" height="40" />
                            </div>
                        )}
                    </header>
                    <div className="content">
                        {children}
                    </div>
                    {message && <p className="text-danger">{message}</p>}
                    <footer className="footer mt-auto py-3">
                        <div className="container">
                            <span className="text-muted">&copy; 2025 BizApp. All rights reserved.</span>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default Bases;
