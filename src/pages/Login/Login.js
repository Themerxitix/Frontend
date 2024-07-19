import {AuthContext} from "../../context/AuthContext";
import React, {useContext, useState} from "react";
import "./Login.css"
import axios from "axios";
function Login() {

    const {login} =useContext(AuthContext);

    /*const [email, setEmail] =useState("");*/
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        try
        {
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                /*email: email,*/
                username: username,
                password: password
            });
            login(res.data.accessToken, "/profile");

        }
        catch (e)
        {
            console.error("Onjuist email en wachtwoord combinatie");
            // Toon een foutmelding aan de gebruiker
            setError("Onjuiste gebruikersnaam of wachtwoord. Probeer het opnieuw.");
        }


    }

    return(
        <>
            <main>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label  htmlFor="username">Username: </label>
                        <input id="username" type="username" value={username} onChange={(e => setUsername(e.target.value))} autoComplete="off"/>
                    </div>

                    <div>
                        <label htmlFor="password">Wachtwoord: </label>
                        <input id="password" type="password" value={password} onChange={(e => setPassword(e.target.value))} autoComplete="off"/>
                    </div>
                    <button type="submit">Login</button>
                </form>
        </main>
        </>
    )

}

export default Login;
