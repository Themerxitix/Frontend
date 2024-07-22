import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import AddToCart from "./../AddToCart/AddToCart"
import './Cart.css';

const Cart = () => {
    const { cart, clearCart, total, itemAmount, removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simuleer een laadtijd
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    if (isLoading) {
        return <div className="loading">Laden...</div>;
    }

    if (cart.length === 0) {
        return <h2 className="cart-empty">Je winkelwagen is leeg.</h2>;
    }

    return (
        <div className="cart-container">
            {cart.map((item) => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-details">
                        <h3 className="cart-item-title">{item.title}</h3>
                        <p className="cart-item-price">Prijs: €{item.price.toFixed(2)}</p>
                        <div className="cart-item-quantity">
                            <button className="quantity-btn" onClick={() => decreaseAmount(item.id)}>-</button>
                            <span>{item.amount}</span>
                            <button className="quantity-btn" onClick={() => increaseAmount(item.id)}>+</button>
                            <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>Verwijderen</button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="cart-summary">
                <p>Totaal aantal items: {itemAmount}</p>
                <h3 className="cart-total">Totaalprijs: €{total.toFixed(2)}</h3>
                <button className="checkout-btn" onClick={clearCart}>Afrekenen</button>
            </div>
        </div>
    )
}

export default Cart;
