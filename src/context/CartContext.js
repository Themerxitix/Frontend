import React, { useState, createContext, useEffect } from "react";
import {useNavigate} from "react-router-dom";

export const CartContext = createContext();

let cartData = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const CartProvider = ({ children }) => {



    const [cart, setCart] = useState(cartData);
    const [itemAmount, setItemAmount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);


    useEffect(() => {
        if (cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.amount;
            }, 0);
            setItemAmount(amount);
        }
    }, [cart]);



    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price * currentItem.amount;
        }, 0);
        setTotal(total);
    }, [cart]);


    const addToCart = (product, id) => {
        const newItem = { ...product, amount: 1 };

        const cartItem = cart.find((item) => {
            return item.id === id;
        });


        if (cartItem) {
            const newCart = [...cart].map((item) => {
                if (item.id === id) {
                    return { ...item, amount: cartItem.amount + 1 };
                } else {
                    return item;
                }
            });
            setCart(newCart);
        } else {
            setCart([...cart, newItem]);
        }

    };


    const removeFromCart = (id) => {
        const remainingCart = cart.filter((item) => item.id !== id);
        setCart(remainingCart);

    };

    const clearCart = () => {
        setCart([]);

    };

    const increaseAmount = (id) => {
        const cartItems = cart.find((item) => item.id === id);
        addToCart(cartItems, id);
    };

    const decreaseAmount = (id) => {
        const cartItems = cart.find((item) => item.id === id);
        if (cartItems) {
            const newCart = cart.map((item) => {
                if (item.id === id) {
                    return { ...item, amount: cartItems.amount - 1 };
                } else {
                    return item;
                }
            });
            setCart(newCart);
        }

        if (cartItems.amount <= 1) {
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
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
