/*value={password} onchange={(e) => setPassword(e.target.value)} autoComplete="off"*/

import React, {useState} from "react";
import axios from "axios";

function Registratie()
{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit= async (e) => {

        e.preventDefault();

        try
        {
            const res = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', {
                email,
                password,
                username,
            });

            console.log("registratie gelukt")
        }
        catch (e)
        {
            console.error("Registratie mislukt")
        }


    }

    return (


        <main>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">
                    Username:
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                />
            </div>

            <div>
                <label htmlFor="email">
                    Email:
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                />
            </div>

            <div>
                <label htmlFor="password">
                    Password:
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                />
            </div>
                <button type="submit">Sign in</button>
        </form>
        </main>
    );
}

export default Registratie;