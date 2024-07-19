import React, {useContext, useEffect, useState} from "react";
import {CartContext} from "../../context/CartContext";
import AddToCart from "./../AddToCart/AddToCart"

const Cart = () => {
    const { cart, clearCart, total, itemAmount } = useContext(CartContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simuleer een laadtijd
        setTimeout(() => setIsLoading(false), 1000);
    }, []);

    if (isLoading) {
        return <div className="loading">Laden...</div>;
    }

    return(
        <>
        <div>
            {cart.length === 0 ? (
                <p>Je winkelwagen is leeg.</p>
            ) : (
                cart.map((item) => <AddToCart item={item} key={item.id} />)
            )}
        </div>
        <div className="cart-summary">
            <p>Totaal aantal items: {itemAmount}</p>
            <p>Totaalprijs: €{total.toFixed(2)}</p>
            <button onClick={clearCart}>Leeg winkelwagen</button>
        </div>


        </>
    )
}

export default Cart;
