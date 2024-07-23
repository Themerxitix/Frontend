import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {checkToken} from "../content/checkToken";
import axios from "axios";
import React from 'react'

/*hier maak ik gebruik van Context, dat doe ik aan de hand van de creatContext hook, deze kan een default meegegeven, maar dat is onder aan text al doorgegeven dus zet ik deze op null*/
/*met een hoofdletter want het wordt een component die om de children heen wikkel, en het gebruik AuthContext op andere plekken ga ik exporteren*/
export const AuthContext = createContext(null)
function AuthContextProvider({children})
{

    /*stukje state om de auth bij te houden*/

    const [auth, setAuth] =useState({
        isAuth: false,
        user: null,
        status: "pending"
    })

    /*false, want bij default is de gebruiker niet ingelogd*/
    const navigate = useNavigate();

    /*kijken of een token is opgeslagen*/

    const login = useCallback(async (jwt_token, redirect) => {
        /*token opslaan in local storage*/
        localStorage.setItem('token', jwt_token);

        /*username ophalen mbv asynch functie*/
        try {
            /*hier haal ik de data in*/
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers:
                    {
                    'content-Type': 'application/json',
                    Authorization: `Bearer ${jwt_token}`
                    }
            })
            setAuth({
                ...auth,
                isAuth: true,
                user:
                    {
                        email: email,
                        id: id,
                        username: username

                    },
                status: "done"
            });

            if (redirect)
            {
                navigate(redirect);
            }

        }
        catch (e)
        {
            console.error(e);
        }
    }, [auth, navigate]);

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
    {

        /*token opslaan in local storage*/
        localStorage.setItem('token', jwt_token);

        /*username ophalen mbv asynch functie*/

        try
        {
            /*hier haal ik de data in*/
            const {data: {email, id, username}} = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers:
                    {
                    'content-Type': 'application/json',
                    Authorization: `Bearer ${jwt_token}`
                    }
            })
            setAuth({
                ...auth,
                isAuth: true,
                user:
                    {
                        email: email,
                        id: id,
                        username: username

                    },
                status: "done"
            });

            if (redirect)
            {
                navigate(redirect);
            }

        }
        catch (e)
        {
            console.error(e);
        }

        /*als je nog aanvullende data wil ontvangen, gebruikers details opvragen*/

    }
    function logout()
    {
        /*token hier verwijderen, niet meer nodig */
        localStorage.removeItem('token');

        setAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
        navigate("/products");
    }

    /*een data object toegevoegd*/
    const data = {
        /*krijgt de waarde*/

        isAuth: auth.isAuth,
        user: auth.user,

        /*de functies login, logout kan ik mee geven aan de data object*/

        login: login,
        logout: logout
    }

    return(
        <AuthContext.Provider value={data}>
            {/*{children}*/} {auth.status === "done" ? children : <p>loading...</p>}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider
