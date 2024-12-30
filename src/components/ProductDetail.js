import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://bizapp-40fj.onrender.com/api/products/${id}/`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: R{product.price}</p>
      <img src={product.image} alt="product" style={{ width: '100px', height: '100px' }}></img>
    </div>
  );
};

export default ProductDetail;
