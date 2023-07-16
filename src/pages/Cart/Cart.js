import React, {useContext, useEffect, useState} from "react";
import {CartContext} from "../../context/CartContext";
import AddToCart from "./../AddToCart/AddToCart"

const Cart = ( ) =>
{
    const { cart, clearCart, total, itemAmount } = useContext(CartContext);

/*    console.log(cart);*/

    return(
        <>
        <div >
            {cart.map((item) => {
                return <AddToCart item={item} key={item.id}/>;
            })}

        </div>


        </>
    )
}

export default Cart;
