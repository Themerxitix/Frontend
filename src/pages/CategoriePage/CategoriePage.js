import React, { useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "./CategoriePage.css"
import  "../Categories/Categories";
import categories from "../Categories/Categories";

const CategoriePage = () =>{
    // State voor laden, fouten en productdata
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    // Haal categorie-id uit URL parameters
    const {id} = useParams();

    useEffect(() => {
        // Maak een AbortController aan voor het annuleren van de request indien nodig
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);

            try {
                setError(false);

                // Haal producten op voor de specifieke categorie
                const response = await axios.get(`https://fakestoreapi.com/products/category/${id}`, {
                    signal: controller.signal,
                });
                setData(response.data);

            } catch (e) {
                if (axios.isCancel(e)) {
                    // Request is geannuleerd, geen actie nodig
                } else {
                    console.error(e)
                    setError(true)
                }
            } finally {
                setLoading(false);
            }
        }
        
        void fetchData();
        
        // Cleanup functie om request te annuleren bij unmount
        return function cleanup() {
            controller.abort();
        }
    }, [id])

    return(
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: could not fetch data!</p>}

            <div className="sub-nav">
                <h3 className="separate-categorie-name">
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                </h3>
                <h3>
                    <Link className="back-to-categories" to="/categories">Categories</Link>
                </h3>
            </div>

            <ul className="list-categorie-page">
                {data.map(product => (
                    <div className="card-categorie-page" key={product.id}>
                        <Link className="text-categorie-page" to={`/products/${product.id}`}>
                            <div>
                                <img className="img-categorie-page" src={product.image} alt={product.title}/>
                                <h3 className="titel-categorie-page">{product.title.slice(0, 25)}</h3>
                            </div>
                            <span className="categorie-price">€ {product.price}</span>
                        </Link>
                    </div>
                ))}
            </ul>
        </>
    );
}

export default CategoriePage;
