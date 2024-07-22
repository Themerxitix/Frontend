import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ProductPage.css"
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";

const ProductPage = () => {
    // State voor laden, fouten en productdata
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    // Haal addToCart functie uit CartContext
    const { addToCart } = useContext(CartContext);
    
    // Haal producten uit ProductContext
    const { products } = useContext(ProductContext);
    
    // Haal product-id uit URL parameters
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);

            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                setData(response.data);
            } catch (e) {
                console.error(e);
                setError("Er is een fout opgetreden bij het ophalen van de productgegevens.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return null;

    const {title, image, price, description, category} = data;

    const truncateText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return `${text.slice(0, maxLength)}...${text.slice(-5)}`;
        }
        return text;
    };

    const checkDescription = (description) => truncateText(description, 90);
    const checkTitle = (title) => truncateText(title, 20);

    return(
        <>
            <div className="sub-nav">

                <h3>
                    <Link className="back-to-categories" to={`/categories/${category}`}>
                        {category}
                    </Link>
                </h3>
            </div>

            <div className="product-page">
                <div className="product-image-container">
                    <img className="product-image" src={image} alt={title} />
                </div>
                <div className="product-details">
                    <h1 className="product-title">{checkTitle(title)}</h1>
                    <p className="product-description">{checkDescription(description)}</p>
                    <div className="product-price-container">
                        <span className="product-price">€{price.toFixed(2)}</span>
                        <button className="add-to-cart-button" onClick={() => addToCart(product, product.id)}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
            <div className="review-section">
                <h2>Write a Review</h2>
                <textarea className="review-input" placeholder="Type your review here..."></textarea>
                <button className="review-button">Send your review</button>
            </div>
        </>
    );
}

export default ProductPage;
