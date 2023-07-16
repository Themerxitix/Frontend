import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import ProductProvider from "./context/ProductContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>


        <Router>
            <ProductProvider>
                <CartProvider>
                    <AuthContextProvider>

                        <App/>

                    </AuthContextProvider>
                </CartProvider>
            </ProductProvider>
        </Router>

    </React.StrictMode>
);

