import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/authSelectors';
import { logoutUser } from "../../redux/auth/authSlice";
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import Icon from '../Icon';
import s from './Header.module.css';

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`${s.header} ${isScrolled ? s.scrolled : ""}`}>
            <div className={s.container}>
                <div className={s.logoSet}>
                    <button className={s.burgerBtn} onClick={toggleMenu}>
                        <Icon name="icon-menu" width={30} height={30} className={s.burgerIcon} />
                    </button>
    
                    {/* Logo */}
                    <NavLink to="/" className={s.logo}>
                        <Icon name="icon-logo" width={28} height={28} />
                        LearnLingo
                    </NavLink>
                </div>

                {/* Navigation */}
                <nav className={s.nav}>
                    <NavLink to="/" className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}>Home</NavLink>
                    <NavLink to="/teachers" className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}>Teachers</NavLink>
                    {isLoggedIn && (
                        <NavLink to="/favorites" className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}>
                            Favorites
                        </NavLink>
                    )}
                </nav>

                {/* Auth buttons */}
                <div className={s.auth}>
                    <ThemeSwitcher />
                    {!isLoggedIn ? (
                        <>
                            <button type='button' className={s.loginBtn} onClick={() => setIsLoginOpen(true)}>
                                <Icon name="icon-log-in" width={20} height={20} style={ {stroke: 'var(--button-primary-color)'} } />
                                Log in
                            </button>
                            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                            <button type='button' className={s.registerBtn} onClick={() => setIsRegisterOpen(true)}>Registration</button>
                            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
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

                <BurgerMenu
                    isOpen={isMenuOpen}
                    onClose={toggleMenu}
                    onOpenLogin={() => setIsLoginOpen(true)} 
                    onOpenRegister={() => setIsRegisterOpen(true)}
                />
            </div>
        </header>
    );
};

export default Header;