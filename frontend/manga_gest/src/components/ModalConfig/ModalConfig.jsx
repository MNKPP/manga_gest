import React, { useState, useEffect } from 'react';
import s from './ModalConfig.module.scss';
import { useNavigate } from 'react-router-dom';
import { XCircle } from "lucide-react";
import {memberDetails} from "../../services/member.service.js";

const ModalConfig = ({ isOpen, onClose, setAvatar }) => {
    const [localAvatar, setLocalAvatar] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
            if (token) {
                memberDetails(token)
                    .then(response => {
                        setUserDetails(response.data)
                    });
            }
    }, []);

    if (!isOpen) return null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        onClose();
        navigate('/');
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLocalAvatar(reader.result);
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={s['modal-overlay']}>
            <div className={s['modal']}>
                <div className={s['close-button']} onClick={onClose}>
                    <XCircle />
                </div>
                <h2>Gestion du compte</h2>
                <form>
                    <div className={s['avatar-container']}>
                        {localAvatar ? (
                            <img src={localAvatar} alt="Avatar" className={s['avatar']} />
                        ) : (
                            <p>Aucun avatar</p>
                        )}
                        <input type="file" accept="image/*" onChange={handleAvatarChange} />
                    </div>
                    {userDetails ? (
                        <div className={s['user-infos']}>
                            <span>Utilisateur :</span>
                            <p>{userDetails.username}</p>
                            <span>Email :</span>
                            <p>{userDetails.email}</p>
                        </div>
                    ) : (
                        <p>Chargement des détails...</p>
                    )}
                    <button type="button" onClick={handleLogout}>Déconnexion</button>
                </form>
            </div>
        </div>
    );
};

export default ModalConfig;