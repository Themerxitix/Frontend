import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useState } from "react";
import "./Login.css"
import axios from "axios";

function Login() {
    // Haal login functie uit AuthContext
    const { login } = useContext(AuthContext);

    // State voor formuliervelden en foutmelding
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin', {
                username,
                password
            });
            // Roep login functie aan met access token en redirect pad
            login(res.data.accessToken, "/profile");
        } catch (e) {
            console.error("Login mislukt", e.response?.data?.message || e.message);
            setError("Onjuiste gebruikersnaam of wachtwoord. Probeer het opnieuw.");
        }
    }

    return (
        <main>
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Gebruikersnaam: </label>
                    <input 
                        id="username" 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Wachtwoord: </label>
                    <input 
                        id="password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </main>
    )
}

export default Login;
