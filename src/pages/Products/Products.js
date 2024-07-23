import React, { useEffect, useState, useContext, useCallback } from "react"
import { Link, useLocation } from "react-router-dom";
import "./Products.css"
import { ProductContext } from "../../context/ProductContext";

const Products = () => {
    // Haal producten en gerelateerde data/functies op uit de ProductContext
    const { products, loading, error, refreshProducts } = useContext(ProductContext);
    
    // Gebruik useLocation om de zoekquery uit de URL te halen
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialSearchTerm = searchParams.get('search') || '';

    // State voor de zoekterm
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    
    // State voor gefilterde producten
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Functie om producten te filteren op basis van de zoekterm
    const filterProducts = useCallback(() => {
        return products.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    // Effect om gefilterde producten bij te werken wanneer producten of zoekterm veranderen
    useEffect(() => {
        setFilteredProducts(filterProducts());
    }, [filterProducts]);

    // Effect om de zoekterm bij te werken wanneer de URL verandert
    useEffect(() => {
        const searchQuery = searchParams.get('search');
        if (searchQuery) {
            setSearchTerm(searchQuery);
        }
    }, [location.search, searchParams]);

    return (
        <>
            {/* Toon laad- of foutbericht indien nodig */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {/* Zoekbalk en ververs-knop */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Zoek producten..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={refreshProducts}>Zoeken</button>
            </div>

            {/* Productengrid */}
            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div className="product-card" key={product.id}>
                        <Link className="product-link" to={`/products/${product.id}`}>
                            <div className="product-image-container">
                                <img className="product-image" src={product.image} alt={product.title}/>
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{product.title.slice(0, 20)}</h3>
                                <span className="product-price">€ {product.price.toFixed(2)}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Products;
