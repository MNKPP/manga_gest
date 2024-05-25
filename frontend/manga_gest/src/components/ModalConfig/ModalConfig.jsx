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
                <h2>Gestion du compte</h2>
                <form>
                    <p>MNKPP</p>
                    <p>Email</p>
                    <button type="button" onClick={onClose}>Fermer</button>
                    <button type="button" onClick={handleLogout}>Déconnexion</button>
                </form>
            </div>
        </div>
    );
}

export default ModalConfig;
