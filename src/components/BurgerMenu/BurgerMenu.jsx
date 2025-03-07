import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import Icon from "../Icon";
import s from "./BurgerMenu.module.css";

const BurgerMenu = ({ isOpen, onClose }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }
    
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={`${s.overlay} ${isOpen ? s.open : ""}`} onClick={handleBackdropClick}>
            <nav className={s.menu}>
                <button className={s.closeBtn} onClick={onClose}>
                    <Icon name='icon-close' width={28} height={28}/>
                </button>
                <ul className={s.navList}>
                    <li><NavLink to="/" className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}>Home</NavLink></li>
                    <li><NavLink to="/teachers" className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}>Teachers</NavLink></li>
                    {isLoggedIn && (
                        <NavLink to="/favorites" className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}>
                            Favorites
                        </NavLink>
                    )}
                </ul>

                {/* Auth buttons */}
                <div className={s.auth}>
                    {!isLoggedIn ? (
                        <>
                            <button className={s.loginBtn} onClick={() => setIsLoginOpen(true)}>
                                <Icon name="icon-log-in" width={20} height={20} style={ {stroke: 'var(--button-primary-color)'} } />
                                Log in
                            </button>
                            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                            <button className={s.registerBtn} onClick={() => setIsRegisterOpen(true)}>Registration</button>
                            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
                        </>
                    ) : (
                        <button className={s.logoutBtn}>Log Out</button> 
                    )}
                </div>
            </nav>
        </div>
    );
};

export default BurgerMenu;
