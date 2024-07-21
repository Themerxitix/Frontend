import {Link, NavLink, useNavigate} from "react-router-dom";
import './Nav.css';
import {AuthContext} from "../../context/AuthContext";
import React, {useContext} from "react";



const Nav = () => {

    const {isAuth, logout} =useContext(AuthContext);

    const navigate = useNavigate();


    return(

        <nav className="navbar" aria-label="Hoofdnavigatie">
            <div className="nav-container">
                <NavLink to="/" className="nav-logo" aria-label="Home">
                    All-In-One Store
                </NavLink>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Products
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/categories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Categories
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            Cart
                        </NavLink>
                    </li>
                    {!isAuth && (
                        <li className="nav-item">
                            <NavLink to="/registratie" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                Registration
                            </NavLink>
                        </li>
                    )}
                    {isAuth && (
                        <li className="nav-item">
                            <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                Profile
                            </NavLink>
                        </li>
                    )}
                    {isAuth ? (
                        <li className="nav-item">
                            <button className="nav-button" onClick={logout}>Logout</button>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Nav;
