import React, { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../content/checkToken";
import axios from "axios";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });

    const navigate = useNavigate();

    const login = useCallback(async (jwt_token, redirect) => {
        localStorage.setItem('token', jwt_token);

        try {
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt_token}`
                }
            });

            const { email, id, username } = response.data;

            setAuth({
                isAuth: true,
                user: {
                    email,
                    id,
                    username
                },
                status: "done"
            });

            if (redirect) {
                navigate(redirect);
            }
        } catch (e) {
            console.error(e);
            setAuth({
                isAuth: false,
                user: null,
                status: "done"
            });
        }
    }, [navigate]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken && checkToken(storedToken)) {
            void login(storedToken);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: "done"
            });
        }
    }, [login]);

    function logout() {
        localStorage.removeItem('token');
        setAuth({
            isAuth: false,
            user: null,
            status: "done"
        });
        navigate("/products");
    }

    const contextValue = {
        isAuth: auth.isAuth,
        user: auth.user,
        login: login,
        logout: logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
