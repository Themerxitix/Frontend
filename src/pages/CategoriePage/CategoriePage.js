import React, { useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "./CategoriePage.css"
import  "../Categories/Categories";
import categories from "../Categories/Categories";

const CategoriePage = () =>{

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);

            try {
                setError(false);

                const response = await axios.get(  " https://fakestoreapi.com/products/category/" + id, {
                    signal: controller.signal,
                } );
                setData(response.data);

            }catch (e){

                if (axios.isCancel(e)){
                    /*console.log("The axios request was cancelled")*/
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
    },  [] )

    //Data die ik ophaal uithalen voor elke product

    return(
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: could not fetch data!</p>}

            <div className="sub-nav">
            <h3>
                <h3 className="separate-categorie-name"> {id.toUpperCase().charAt(0)+ id.substring(1,id.length)} </h3>
            </h3>

            <h3>
                    <Link className="back-to-categories" to="/categories"> Categories</Link>
            </h3>
            </div>

            <ul className="list-categorie-page">
                {data.map(product => {
                    return (

                        <div className="card-categorie-page" key={product.id}>
                            <Link  className="text-categorie-page" to={`/products/${product.id}`}>
                                <div>
                                    <img className="img-categorie-page" src={product.image} alt={product.title}/>
                                    <h3 className="titel-categorie-page">{product.title.slice(0, 25)}</h3>
                                </div>
                                <span className="categorie-price">€ {product.price}</span>
                            </Link>
                        </div>
                    )
                })}

            </ul>

        </>
    );

}


export default CategoriePage;