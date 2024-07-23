import {CartContext} from "../../context/CartContext";
import {useContext} from "react";
import React from 'react'

function AddToCart({item}) {
    const {id, title, image, price, amount} = item;

    const {removeFromCart, increaseAmount, decreaseAmount} =
        useContext(CartContext);

    return (
        <>

            <div className="add-to-cart-all">

                <div className="add-to-cart-semi " to={`/product/${id}`}>

                      <img className="cart-img" src={image} alt={title}/>{" "}


                           <div className="cart-title" to={`/product/${id}`}>
                                {title}
                            </div>

                <div>
                    Amount: {amount}
                </div>

                    <button
                        className="button-delete"
                        type="button"
                        onClick={() => removeFromCart(id)}
                    >
                        Delete
                    </button>

                    <button
                        className="button-min"
                        type="button"
                        onClick={() => decreaseAmount(id)}
                    >
                        -
                    </button>


                    <button
                        className="button-plus"
                        type="button"
                        onClick={() => increaseAmount(id)}
                    >
                        +
                    </button>

                    <div className="cart-price">
                        $ {price}
                    </div>

                    <div className="cart-total">Total: {`$ ${parseFloat(
                        price * amount
                    ).toFixed(2)}`}</div>

                         </div>
            </div>
        </>
    )
}

export default AddToCart;