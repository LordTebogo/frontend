import React from 'react';

const Base = ({ children }) => {
    return (
        <div>
            <nav>
                <a href="/" key="home">Home</a>
                <a href="/products" key="products">Products</a>
                <a href="/about" key="about">About</a>
                <a href="/contact" key="contact">Contact</a>
            </nav>
            {/* Other common layout elements can go here */}
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Base;