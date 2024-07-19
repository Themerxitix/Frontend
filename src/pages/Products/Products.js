import {useEffect, useState} from "react"
import axios from "axios";
import React from "react";
import {Routes,Route, Link } from "react-router-dom";
import "./Products.css"

const Products = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(()=> {
        const controller = new AbortController();
    const fetchData = async () => {

        setLoading(true);// hier zet ik loading op true

        //try and catch om erro te onderscheppen
        try {

            const response = await axios.get("https://fakestoreapi.com/products"); //ophalen van de API

            // als we data ontvangen, zet ik de error op fales
            if (response.data){

                setError(false);
            }

            setData(response.data); // zet de data in de data state


        } catch (e) {
            console.error(e);
        }
        setLoading(false)// wanneer boven staand goed gaat zet ik de setloading op false
    }
        void fetchData();
        return function cleanup(){
            controller.abort();
        }
    },[] )


    return (

        <>
            {loading && <p>Loading...</p>}  {/*als loading is true, wordt dit getoond*/}
            {error && <p>Error: could not fetch data!</p>}  {/*als error is true, wordt dit getoond*/}

            {/*<Link type="link" onClick={fetchData}>Show Products</Link>*/}

            <div className="product-grid">
                {data.map(product => {
                    return (
                        <div className="product-card" key={product.id}>
                            <Link className="product-link" to={`/products/${product.id}`}>
                                <div className="product-image-container">
                                    <img className="product-image" src={product.image} alt={product.title}/>
                                </div>
                                <div className="product-info">
                                    <h3 className="product-title">{product.title.slice(0, 20)}</h3>
                                    <span className="product-price">€ {product.price.toFixed(2)}</span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Products;
