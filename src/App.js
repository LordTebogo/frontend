import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Base from './components/Base';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Homepage from './components/homepage';
import EditResidence from './components/EditResidence';
import ProductDetails from './components/details';
import AddResidence from './components/AddResidence';
import Subscriptions from './components/Subscriptions';
import AboutUs from './components/AboutUs'; // Import AboutUs component

const App = () => {
    return (
        <Router>
            <Base>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/editResidence/:id" element={<EditResidence />} />
                    <Route path="/details/:id" element={<ProductDetails />} />
                    <Route path="/add-residence" element={<AddResidence />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/about-us" element={<AboutUs />} />
                </Routes>
            </Base>
        </Router>
    );
};

export default App;
