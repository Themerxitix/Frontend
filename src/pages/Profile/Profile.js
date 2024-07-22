import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Profile.css';

function Profile() {
    const { user } = useContext(AuthContext);

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Profiel</h1>
            </div>
            {user ? (
                <div className="profile-info">
                    <p><strong>Gebruikersnaam:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>Je bent niet ingelogd.</p>
            )}
        </div>
    );
}

export default Profile;
