import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/authSelectors';
import { logoutUser } from "../../redux/auth/authSlice";
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import Icon from "../Icon";
import s from "./BurgerMenu.module.css";

const BurgerMenu = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);

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

    const handleLogout = () => {
        dispatch(logoutUser());
        window.location.reload(); 
    };

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleNavClick = () => {
        onClose();
    };

    return (
        <div className={`${s.overlay} ${isOpen ? s.open : ""}`} onClick={handleBackdropClick}>
            <nav className={s.menu}>
                <button className={s.closeBtn} onClick={onClose}>
                    <Icon name='icon-close' width={28} height={28}/>
                </button>

                {/* Navigation */}
                <ul className={s.navList}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}
                            onClick={handleNavClick}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/teachers"
                            className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}
                            onClick={handleNavClick}
                        >
                            Teachers
                        </NavLink>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <NavLink
                                to="/favorites"
                                className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}
                                onClick={handleNavClick}
                            >
                                Favorites
                            </NavLink>
                        </li>
                    )}
                </ul>

                {/* Auth buttons */}
                <div className={s.auth}>
                    <ThemeSwitcher />
                    {!isLoggedIn ? (
                        <>
                            <button className={s.loginBtn} onClick={() => setIsLoginOpen(true)}>
                                <Icon name="icon-log-in" width={20} height={20} style={ {stroke: 'var(--button-primary-color)'} } />
                                Log in
                            </button>
                            <LoginModal
                                isOpen={isLoginOpen}
                                onClose={() => setIsLoginOpen(false)}
                                onSuccess={() => window.location.reload()}
                            />
                            <button className={s.registerBtn} onClick={() => setIsRegisterOpen(true)}>Registration</button>
                            <RegisterModal
                                isOpen={isRegisterOpen}
                                onClose={() => setIsRegisterOpen(false)}
                                onSuccess={() => window.location.reload()} 
                            />
                        </>
                    ) : (
                        <div className={s.auth}>
                            <div className={s.userInfo}>
                                <div className={s.userIcon}>
                                    <Icon name="icon-user"/>
                                </div>
                                <span className={s.userName}>{user?.displayName || "User"}</span>
                            </div>
                            <button className={s.logoutBtn} onClick={handleLogout}>Log Out</button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default BurgerMenu;
