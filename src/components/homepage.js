import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Homepage.css';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');

    const validatePriceRange = (range) => {
        const rangeParts = range.split('-').map(Number);
        if (rangeParts.length === 2 && !isNaN(rangeParts[0]) && !isNaN(rangeParts[1]) && rangeParts[0] <= rangeParts[1]) {
            return true;
        }
        return false;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'priceRange') {
            setPriceRange(value);
            if (value && !validatePriceRange(value)) {
                setError('Please enter a valid price range in the format min-max (e.g., 1000.00-3000.00).');
                return;
            } else {
                setError('');
            }
        }

        if (name === 'searchTerm') setSearchTerm(value);
        if (name === 'location') setLocation(value);

        onSearch({ searchTerm, priceRange, location });
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                name="searchTerm"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="priceRange"
                placeholder="price range (e.g. 100.00-350.00)"
                value={priceRange}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="location"
                placeholder="Search by location (address)"
                value={location}
                onChange={handleInputChange}
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

const Homepage = () => {
    const [residences, setResidences] = useState([]);
    const [filteredResidences, setFilteredResidences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchResidences = async () => {
            try {
                const response = await axios.get('https://turfbizappapi.onrender.com/api/residences/');
                setResidences(response.data);
                setFilteredResidences(response.data);
            } catch (error) {
                console.error('Error fetching residences:', error);
            } finally {
                setLoading(false);
            }
        };

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
                    }
                } catch (error) {
                    console.error('Error checking authentication:', error);
                }
            }
        };

        fetchResidences();
        checkAuthentication();
    }, []);

    const truncateText = (text, limit) => (text.length > limit ? text.substring(0, limit) + '...' : text);

    const handleSearch = ({ searchTerm, priceRange, location }) => {
        let filtered = residences;

        // Filter by name (case-insensitive)
        if (searchTerm) {
            filtered = filtered.filter((residence) =>
                residence.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by price range
        if (priceRange) {
            const rangeParts = priceRange.split('-').map(Number);
            const [minPrice, maxPrice] = rangeParts;
            filtered = filtered.filter((residence) =>
                residence.room_price >= minPrice && residence.room_price <= maxPrice
            );
        }

        // Filter by location (case-insensitive address)
        if (location) {
            filtered = filtered.filter((residence) =>
                residence.address.toLowerCase().includes(location.toLowerCase())
            );
        }

        setFilteredResidences(filtered);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="homepage">
            <header className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to BizApp!</h1>
                    <p>Your premier destination for exceptional property solutions.</p>
                    {!isAuthenticated && (
                        <Link className="cta-button" to="/register">Get Started Today</Link>
                    )}
                </div>
            </header>

            <SearchBar onSearch={handleSearch} />

            <section className="products-section">
                <h2 className="section-title">Explore Our Residences</h2>
                <div className="products-grid">
                    {filteredResidences.map((residence) => (
                        <div className="product-card" key={residence.id}>
                            <div className="product-image">
                                <img src={residence.cover_image} alt={residence.name} style={{ width: '100px' }} />
                            </div>
                            <div className="product-details">
                                <h3>{truncateText(residence.name, 25)}</h3>
                                <p>{truncateText(residence.description, 20)}</p>
                                <div className="product-meta">
                                    <p><strong>Price:</strong> R{residence.room_price} per room</p>
                                    <p><strong>Rooms:</strong> {residence.number_of_rooms_available}</p>
                                </div>
                                <a href={`/details/${residence.id}`} className="details-link">View Details</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Homepage;
