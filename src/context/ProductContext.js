import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios"; // #command: Import axios for better API handling

// #command: Create context
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    // #command: Product state
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // #command: Add loading state
    const [error, setError] = useState(null); // #command: Add error state

    // #command: Use useCallback to memoize the fetchProducts function
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
        } catch (err) {
            setError("Failed to fetch products. Please try again later.");
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    // #command: Fetch products
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // #command: Provide more context values
    const contextValue = {
        products,
        loading,
        error,
        refreshProducts: fetchProducts
    };

    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
