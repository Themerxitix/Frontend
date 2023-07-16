import {Link, NavLink, useNavigate} from "react-router-dom";
import './Nav.css';
import {AuthContext} from "../../context/AuthContext";
import React, {useContext} from "react";



const Nav = () => {

    const {isAuth, logout} =useContext(AuthContext);

    const navigate = useNavigate();


    return(

        <nav className="navbar">

            <ul className="nav-ul">

                <li className="nav-li">
                    <NavLink to="/"  className={({ isActive}) =>  isActive === true ? 'active-menu-link' : 'default-menu-link'}>
                        Home
                    </NavLink>
                </li>

                <li className="nav-li">
                    <NavLink to="/products" className={({ isActive}) => isActive === true ? 'active-menu-link' : 'default-menu-link'}>
                        Products
                    </NavLink>
                </li>

                <li className="nav-li" >

                    <NavLink to="/categories" className={({ isActive}) => isActive === true ? 'active-menu-link' : 'default-menu-link'} >
                        Categories
                    </NavLink>
                </li>

                <li className="nav-about">
                    <NavLink to="/cart" className={({ isActive}) => isActive === true ? 'active-menu-link' : 'default-menu-link'}>
                        Cart
                    </NavLink>
                </li>

                {!isAuth &&

                <li className="nav-about" >

                    <NavLink to="/registratie" className={({ isActive}) => isActive === true ? 'active-menu-link' : 'default-menu-link'} >
                        Registration
                    </NavLink>
                </li>

                }

                <li className="nav-about">
                    {isAuth && <NavLink to="/profile" className={({ isActive}) => isActive === true ? 'active-menu-link' : 'default-menu-link'}>
                        Profile
                    </NavLink>
                    }
                </li>


                    {isAuth &&
                        <li >
                            <button className="logout" type="button" onClick={logout}>Logout</button>
                        </li>
                    }
                    {
                        !isAuth &&
                        <li className="nav-about">
                            <NavLink to="/login" className={({ isActive}) => isActive === true ? 'active-menu-link' : 'default-menu-link'}>
                                Login
                            </NavLink>
                        </li>
                    }

            </ul>
        </nav>
    )
}

export default Nav;