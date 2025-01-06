import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://turfbizappapi.onrender.com/api/residences/${id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
    };

    if (!product) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="residence-details">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="product-info">
                <p><strong>Address:</strong> {product.address}</p>
                <p><strong>Type:</strong> {product.residence_type}</p>
                <p><strong>Price:</strong> <span className="price">R{product.room_price}</span></p>
                <p><strong>Rooms Include:</strong> {product.rooms_include}</p>
                <p><strong>Rooms Available:</strong> {product.rooms_available ? 'Yes' : 'No'}</p>
                {product.rooms_available && (
                    <p><strong>Number of Rooms Available:</strong> {product.number_of_rooms_available}</p>
                )}
                <p><strong>Room Available Date:</strong> {new Date(product.room_available_date).toLocaleDateString()}</p>
                <p><strong>Last Updated:</strong> <span className="last-updated">{new Date(product.last_updated).toLocaleString()}</span></p>
                <p><strong>Business Contacts:</strong> {product.business_contacts}</p>
                <p><strong>Business Email:</strong> {product.business_email}</p>
            </div>

            {/* Slideshow Section */}
            <div className="slideshow">
                <button className="nav-button" onClick={prevImage}>❮</button>
                <div className="image-container">
                    {product.images.length > 0 ? (
                        <img 
                            src={product.images[currentImageIndex].image} 
                            alt={product.name} 
                            className="slideshow-image" 
                        />
                    ) : (
                        <img 
                            src={product.cover_image} 
                            alt={product.name} 
                            className="slideshow-image" 
                        />
                    )}
                </div>
                <button className="nav-button" onClick={nextImage}>❯</button>
            </div>

            {/* Videos Section */}
            {product.videos.length > 0 && (
                <div className="videos-section">
                    <h3>Videos</h3>
                    {product.videos.map((video, index) => (
                        <div className="video-container" key={index}>
                            <video 
                                style={{ width: '100%' }} 
                                controlsList="nodownload noremoteplayback" 
                                disablePictureInPicture 
                                controls
                            >
                                <source src={`https://turfbizappapi.onrender.com/api/stream_video/${video.id}/`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))}
                </div>
            )}

            {/* Additional Details Section */}
            {product.details && product.details.length > 0 && (
                <div className="additional-details">
                    <h3>Additional Details</h3>
                    <ul>
                        {product.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
