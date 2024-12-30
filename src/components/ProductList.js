import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './ProductList.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    axios.get("https://bizapp-40fj.onrender.com/api/products/")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div id="productlist_id">
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <img src={product.image} alt="product" style={{ width: '100px', height: '100px' }}></img>
          <p>R{product.price}</p>
          <Link to={`/product/${product.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;