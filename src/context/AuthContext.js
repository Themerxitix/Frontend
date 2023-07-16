import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode"
import {checkToken} from "../content/checkToken";
import axios from "axios";

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

    useEffect(()=>
    {
        /*kijk of een token in de local storage is, daarvoor spreek ik de local storage aan*/
        /*variable storedToken, gebruiken om te kijken of iets daar word opgeslagen*/
       const storedToken = localStorage.getItem('token');

       if (storedToken && checkToken(storedToken))
       {
          void login(storedToken);
       }
       else
       {
           /*roken niet meer geldig, uitloggen*/
           setAuth(
               {
                   ...auth,
                   isAuth: false,
                   user: null,
                   status: "done"
               }
           )
       }

    }, []);

    /*isAuth aanpassen met login knop naar ture, en logout naar false*/
  async  function login(jtw_token, redirect)
    {

        const decodeToken = jwt_decode(jtw_token);

        /*token opslaan in local storage*/
        localStorage.setItem('token', jtw_token);

        /*username ophalen mbv asynch functie*/

        try
        {
            /*hier haal ik de data in*/
            const {data: {email, id, username}} = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers:
                    {
                    'content-Type': 'application/json',
                    Authorization: `Bearer ${ jtw_token }`
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