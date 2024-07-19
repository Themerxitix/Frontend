import React, { useEffect, useState, useContext, useCallback } from "react"
import { Link } from "react-router-dom";
import "./Products.css"
import { ProductContext } from "../../context/ProductContext"; // #command: Import ProductContext

const Products = () => {
    const { products, loading, error, refreshProducts } = useContext(ProductContext); // #command: Use ProductContext
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]); // #command: State for filtered products

    // #command: Use useCallback to memoize the filterProducts function
    const filterProducts = useCallback(() => {
        return products.filter(product => 
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    // #command: Update filtered products when products or searchTerm changes
    useEffect(() => {
        setFilteredProducts(filterProducts());
    }, [filterProducts]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Zoek producten..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={refreshProducts}>Ververs producten</button> {/* #command: Add refresh button */}
            </div>

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
