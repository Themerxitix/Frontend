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

            <div  className="product-page">
                <img className="product-page-img" src={image} />

                    <h3 className="product-page-titel">
                        {
                           checktitle(title)
                        }
                    </h3>

                    <span className="product-page-description">
                    {
                        checkdescription(description)
                    }
                    </span>

                    <span className="product-page-price">
                        <h3>
                          €{price}
                        </h3>

                    </span>


                    <button className="product-page-button" type="button" onClick={() => addToCart(product, product.id)}  >
                    Add to cart
                    </button>


                {/*nog niet af*/}
                <div>
                    <h2>Type you Review</h2>
                    <input className="review" type="text"  />
                    <button className="review-button" >
                        Send your review
                    </button>
                </div>

            </div>
        </>
    );
}

export default ProductPage;