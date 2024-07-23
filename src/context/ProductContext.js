import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

// Creëer een context voor producten
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    // State voor producten, laadstatus en fouten
    const [products, setProducts] = useState([]); // Array om producten op te slaan
    const [loading, setLoading] = useState(true); // Boolean om laadstatus aan te geven
    const [error, setError] = useState(null); // Variabele om eventuele fouten op te slaan

    // Functie om producten op te halen, gememoizeerd met useCallback
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true); // Start het laden
            setError(null); // Reset eventuele vorige fouten
            const response = await axios.get("https://fakestoreapi.com/products"); // Haal producten op van API
            setProducts(response.data); // Sla opgehaalde producten op in state
        } catch (err) {
            setError("Failed to fetch products. Please try again later."); // Sla foutmelding op bij mislukken
            console.error("Error fetching products:", err); // Log fout naar console
        } finally {
            setLoading(false); // Stop het laden, ongeacht succes of falen
        }
    }, []); // Lege dependency array zorgt dat functie niet opnieuw wordt aangemaakt

    // Effect om producten op te halen bij het laden van de component
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); // Voer effect uit wanneer fetchProducts verandert (wat niet gebeurt vanwege lege dependency array)

    // Waarden die beschikbaar worden gesteld via de context
    const contextValue = {
        products, // Lijst van producten
        loading, // Laadstatus
        error, // Eventuele foutmelding
        refreshProducts: fetchProducts // Functie om producten opnieuw op te halen
    };

    // Render de Provider component met de context waarden
    return (
        <ProductContext.Provider value={contextValue}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
