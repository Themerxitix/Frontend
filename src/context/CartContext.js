import React, { useState, createContext, useEffect } from "react";

export const CartContext = createContext();

// Haal cart data uit localStorage of gebruik een lege array
let cartData = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(cartData);
    const [itemAmount, setItemAmount] = useState(0);
    const [total, setTotal] = useState(0);

    // Update localStorage wanneer cart verandert
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Update itemAmount wanneer cart verandert
    useEffect(() => {
        if (cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.amount;
            }, 0);
            setItemAmount(amount);
        }
    }, [cart]);

    // Update total wanneer cart verandert
    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.amount;
        }, 0);
        setTotal(total);
    }, [cart]);

    // Functie om item aan cart toe te voegen
    const addToCart = (product, id) => {
        const newItem = { ...product, amount: 1 };
        const cartItem = cart.find((item) => item.id === id);

        if (cartItem) {
            const newCart = cart.map((item) => 
                item.id === id ? { ...item, amount: cartItem.amount + 1 } : item
            );
            setCart(newCart);
        } else {
            setCart([...cart, newItem]);
        }
    };

    // Functie om item uit cart te verwijderen
    const removeFromCart = (id) => {
        const newCart = cart.filter((item) => item.id !== id);
        setCart(newCart);
    };

    // Functie om cart leeg te maken
    const clearCart = () => {
        setCart([]);
    };

    // Functie om hoeveelheid van item te verhogen
    const increaseAmount = (id) => {
        const cartItem = cart.find((item) => item.id === id);
        addToCart(cartItem, id);
    };

    // Functie om hoeveelheid van item te verlagen
    const decreaseAmount = (id) => {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem) {
            const newCart = cart.map((item) => 
                item.id === id ? { ...item, amount: cartItem.amount - 1 } : item
            );
            setCart(newCart);
        }

        if (cartItem.amount <= 1) {
            removeFromCart(id);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseAmount,
                decreaseAmount,
                itemAmount,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
