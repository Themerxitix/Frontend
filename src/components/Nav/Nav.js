import {NavLink, useNavigate} from "react-router-dom";
import './Nav.css';
import {AuthContext} from "../../context/AuthContext";
import React, {useContext, useState} from "react";

const Nav = () => {
    const {isAuth, logout} = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return(
        <nav className="navbar" aria-label="Hoofdnavigatie">
            <div className="nav-container">
                <NavLink to="/" className="nav-logo" aria-label="Home">
                    De Webshop
                </NavLink>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Thuis
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Producten
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Categorieën
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Winkelwagen
                        </NavLink>
                    </li>
                    {!isAuth && (
                        <li className="nav-item">
                            <NavLink to="/registratie" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                Registratie
                            </NavLink>
                        </li>
                    )}
                    {isAuth && (
                        <li className="nav-item">
                            <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                Profiel
                            </NavLink>
                        </li>
                    )}
                    {isAuth ? (
                        <li className="nav-item">
                            <button className="nav-button" onClick={logout}>Uitloggen</button>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                Inloggen
                            </NavLink>
                        </li>
                    )}
                </ul>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Zoek producten..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Zoeken</button>
                </form>
            </div>
        </nav>
    )
}

export default Nav;
