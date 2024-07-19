import React, {useContext, useEffect} from "react";
import axios, {get} from "axios";
import  {useState} from "react"
import {Link, useParams} from "react-router-dom";
import "./ProductPage.css"
import {CartContext} from "../../context/CartContext";
import {ProductContext} from "../../context/ProductContext";


const ProductPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    const {addToCart} = useContext(CartContext);
    const { products } = useContext(ProductContext);
    const {id} = useParams();

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);

            try {
                setError(false);

                const response = await axios.get(  " https://fakestoreapi.com/products/" + id, {
                    signal: controller.signal,
            } );
                setData(response.data);

            }catch (e){

                if (axios.isCancel(e)){

                }else {
                    console.error(e)
                    setError(true)
                }
            }
            setLoading(false);
        }
        void fetchData();
        return function cleanup(){
            controller.abort();
        }
    },  [] );


    //Data die ik ophaal uithalen voor elke product

    const {title, image, price, description, category } = data;

    const checkdescription = (description) => {
        if(description){
            return `${description.slice(0, 90)} ... ${description.slice(description.length - 5)}`
        }
        return description;
    }

    const checktitle = (title) => {
        if(title){
            return `${title.slice(0, 20)} ... ${title.slice(title.length - 5)}`
        }
        return title;
    }

    const product = products.find((item) => {
        return item.id === parseInt(id);
    });



    return(
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: could not fetch data!</p>}

            <div className="sub-nav">

                <h3>
                    <Link className="back-to-categories" to={`/categories/${category}`}>
                        {category}
                    </Link>
                </h3>
            </div>

            <div className="product-page">
                <div className="product-image-container">
                    <img className="product-image" src={image} alt={title} />
                </div>
                <div className="product-details">
                    <h1 className="product-title">{checktitle(title)}</h1>
                    <p className="product-description">{checkdescription(description)}</p>
                    <div className="product-price-container">
                        <span className="product-price">€{price.toFixed(2)}</span>
                        <button className="add-to-cart-button" onClick={() => addToCart(product, product.id)}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
            <div className="review-section">
                <h2>Write a Review</h2>
                <textarea className="review-input" placeholder="Type your review here..."></textarea>
                <button className="review-button">Send your review</button>
            </div>
        </>
    );
}

export default ProductPage;
