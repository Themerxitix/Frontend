import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ProductPage.css"
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";
import { AuthContext } from "../../context/AuthContext";

const ProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);

    const { addToCart } = useContext(CartContext);
    const [addedToCart, setAddedToCart] = useState(false);
    
    const { products } = useContext(ProductContext);
    
    const { isAuth, user } = useContext(AuthContext);
    
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

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (newReview.trim() !== "" && rating > 0) {
            const newReviewObject = {
                id: Date.now(),
                text: newReview,
                rating: rating,
                date: new Date(),
                user: user.username
            };
            setReviews([...reviews, newReviewObject]);
            setNewReview("");
            setRating(0);
        }
    };

    const handleDeleteReview = (reviewId) => {
        setReviews(reviews.filter(review => review.id !== reviewId));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!data) return null;

    const {title, image, price, description, category} = data;

    const truncateText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return `${text.slice(0, maxLength)}...`;
        }
        return text;
    };

    const checkDescription = (description) => truncateText(description, 150);
    const checkTitle = (title) => truncateText(title, 50);

    return(
        <div className="product-page-container">
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
                        <button 
                            className="add-to-cart-button" 
                            onClick={() => {
                                addToCart(data, data.id);
                                setAddedToCart(true);
                                setTimeout(() => setAddedToCart(false), 2000);
                            }}
                        >
                            {addedToCart ? 'Toegevoegd!' : 'Toevoegen aan winkelwagen'}
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="reviews-container">
                {isAuth && (
                    <div className="review-section">
                        <h2>Schrijf een review</h2>
                        <form onSubmit={handleReviewSubmit}>
                            <div className="rating-input">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        onClick={() => setRating(star)}
                                        style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <textarea 
                                className="review-input" 
                                placeholder="Typ hier je review..."
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                            ></textarea>
                            <button type="submit" className="review-button">Verstuur review</button>
                        </form>
                    </div>
                )}
                {reviews.length > 0 && (
                    <div className="reviews-list">
                        <h2>Reviews</h2>
                        {reviews.map((review) => (
                            <div key={review.id} className="review-item">
                                <div className="review-header">
                                    <span className="review-rating">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} style={{ color: star <= review.rating ? 'gold' : 'gray' }}>
                                                ★
                                            </span>
                                        ))}
                                    </span>
                                    <span className="review-user">{review.user}</span>
                                </div>
                                <p>{review.text}</p>
                                <small>{review.date.toLocaleString()}</small>
                                {isAuth && user.username === review.user && (
                                    <button onClick={() => handleDeleteReview(review.id)} className="delete-review-button">
                                        Verwijder
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductPage;
