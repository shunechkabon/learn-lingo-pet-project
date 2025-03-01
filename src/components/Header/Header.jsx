import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Icon from '../Icon';
import s from './Header.module.css';

const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className={s.header}>
            <div className={s.container}>
                <div className={s.logoSet}>
                    <button className={s.burgerBtn} onClick={toggleMenu}>
                        {/* <Icon name="icon-menu" width={30} height={28} className={s.burgerIcon} /> */}
                        <img src="/src/assets/images/burger-menu.png" alt="Menu" width={30} height={30} className={s.burgerIcon} />
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

                <BurgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
            </div>
        </header>
    );
};

export default Header;