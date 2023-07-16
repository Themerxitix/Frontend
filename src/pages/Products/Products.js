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

            <div className="list-product">

                {data.map(product => {
                    return (
                        <div className="card-product" key={product.id}>
                          <Link className="text-product" to={`/products/${product.id}`}>
                                <div>
                                    <img className="img-product" src={product.image} alt={product.title}/>
                                    <h3 className="titel-product">{product.title.slice(0, 20)}</h3>
                                </div>
                                <span className="product-price">€ {product.price}</span>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Products;