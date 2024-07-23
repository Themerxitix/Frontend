import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Categories.css"
import electronics from './../../assets/electronics.jpg'
import jewelery from './../../assets/jewelerys.jpg'
import mens from './../../assets/mens.jpg'
import women from './../../assets/women.jpg'
import Categoriedescription from "../Categoriesdescription/Categoriedescription";


const Categories = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const result = await axios.get('https://fakestoreapi.com/products/categories');
                if (result.data) {
                    setError(false);
                }

                setData(result.data);
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        }
        void fetchCategories();
        return function cleanup(){
            controller.abort();
        }
    },[] )

    return (
        <div className="container">
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">Error: could not fetch data!</p>}
            <ul className="list-categorie">
                {data.map((categories) => (
                    <li className="card-categorie card" key={categories}>
                        <Link className="link-categorie" to={`/categories/${categories}`}>
                            <div>
                                <h3 className="nav-categorie">{categories.charAt(0).toUpperCase() + categories.slice(1)}</h3>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="welcome-photo"></div>

            <div className="categorie-home">
                <Categoriedescription
                    image={electronics}
                    title={"Electronics"}
                    description="Electronics is a scientific and engineering discipline that studies and applies the principles of physics to design, create, and operate devices that manipulate electrons and other charged particles."
                />

                <Categoriedescription
                    image={jewelery}
                    title="Jewelery"
                    description="Jewellery (Commonwealth English) or jewelry (American English) consists of decorative items worn for personal adornment, such as brooches, rings, necklaces, earrings, pendants, bracelets, and cufflinks. Jewellery may be attached to the body or the clothes. "
                />

                <Categoriedescription
                    image={mens}
                    title="Men's clothing"
                    description="Men’s clothes are articles of clothing designed for and worn by men. Typical men’s clothes include trousers, shirts, jeans, suits, sweaters, gloves, jackets, and hats. However, the majority of those clothing items are also items of women’s clothing."
                />

                <Categoriedescription
                    image={women}
                    title="Women's clothing"
                    description="Women’s clothes are articles of clothing designed for and worn by women. Typical women’s clothes include skirts, dresses, shirts, sweaters, trousers, coats, chemises, and jeans. Some articles of clothing and geared specifically towards women, but most of the items are the same as items of men’s clothing."
                />



            </div>

        </div>
    );
}

export default Categories;
