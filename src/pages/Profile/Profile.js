import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {

    const {user: {username }  } = useContext(AuthContext);


    return(
        <>
            <div className="welcome-photo">

                <div >
                    <p className="welcome-background">Welkom: <span className= "welcome-user" > { username.toUpperCase()}</span></p>
                </div>

            </div>

        </>
    )
}

export default Profile;
