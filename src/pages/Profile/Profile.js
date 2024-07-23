import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();


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
