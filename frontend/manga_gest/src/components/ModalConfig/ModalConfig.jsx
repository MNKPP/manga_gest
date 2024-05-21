// ModalConfig.jsx
import s from './ModalConfig.module.scss';
import { useNavigate } from 'react-router-dom';

const ModalConfig = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        onClose();
        navigate('/');
    };

    return (
        <div className={s['modal-overlay']}>
            <div className={s['modal']}>
                <h2>Configuration</h2>
                <form>
                    <div className={s['form-group']}>
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input type="text" id="username" name="username"/>
                    </div>
                    <div className={s['form-group']}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email"/>
                    </div>
                    <button type="button" onClick={onClose}>Fermer</button>
                    <button type="button" onClick={handleLogout}>Déconnexion</button>
                </form>
            </div>
        </div>
    );
}

export default ModalConfig;
