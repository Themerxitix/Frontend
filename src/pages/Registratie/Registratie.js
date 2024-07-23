import React, { useState, useContext } from "react";
import axios from "axios";
import "./Registratie.css";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Registratie() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email,
                password,
                username,
            });
            
            // Na succesvolle registratie, log de gebruiker in
            await login(response.data.accessToken);
            
            // Navigeer naar de homepage of een welkomstpagina
            navigate("/");
        } catch (e) {
            console.error("Registratie mislukt", e.response?.data?.message || e.message);
            setError(e.response?.data?.message || "Registratie mislukt. Probeer het opnieuw.");
        }
    }

    return (
        <div className="registration-container">
            <h2>Registreren</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="registration-form">
                <div className="form-group">
                    <label htmlFor="username">Gebruikersnaam:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Wachtwoord:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Registreren</button>
            </form>
        </div>
    );
}

export default Registratie;
