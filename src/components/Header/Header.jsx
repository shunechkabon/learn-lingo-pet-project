import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
// import useAuth from '../../hooks/useAuth'; 
import s from './Header.module.css';

const Header = () => {
    // const isAuthenticated = useAuth();

    return (
        <header className={s.header}>
            <div className={s.container}>
                {/* Logo */}
                <NavLink to="/" className={s.logo}>
                    <Icon name="icon-logo" width={28} height={28} />
                    LearnLingo
                </NavLink>

                {/* Navigation */}
                <nav className={s.nav}>
                    <NavLink to="/" className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}>Home</NavLink>
                    <NavLink to="/teachers" className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}>Teachers</NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}>Favorites</NavLink>
                    {/* {isAuthenticated && (
                        <NavLink to="/favorites" className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ""}`}>
                            Favorites
                        </NavLink>
                    )} */}
                </nav>

                {/* Auth buttons */}
                <div className={s.auth}>
                    <button className={s.loginBtn}>
                        <Icon name="icon-log-in" width={20} height={20} style={ {stroke: 'var(--button-primary-color)'} } />
                        Log in
                    </button>
                    <button className={s.registerBtn}>Registration</button>
                </div>
            </div>
        </header>
    );
};

export default Header;