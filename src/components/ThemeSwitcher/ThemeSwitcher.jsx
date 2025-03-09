import { useEffect, useState, useRef } from "react";
import { saveThemeToDatabase, getThemeFromDatabase } from "../../services/themeService";
import { auth } from "../../firebase";
import Icon from "../Icon";
import s from "./ThemeSwitcher.module.css";

const themes = [
    { id: "theme-yellow", className: s.yellow },
    { id: "theme-green", className: s.green },
    { id: "theme-blue", className: s.blue },
    { id: "theme-pink", className: s.pink },
    { id: "theme-orange", className: s.orange },
];

const ThemeSwitcher = () => {
    const [currentTheme, setCurrentTheme] = useState("theme-yellow");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchTheme = async () => {
            if (auth.currentUser) {
                const savedTheme = await getThemeFromDatabase();
                if (savedTheme) {
                    setCurrentTheme(savedTheme);
                    document.documentElement.className = savedTheme;
                }
            }
        };

        fetchTheme();
    }, [auth.currentUser]);

    const handleThemeChange = async (themeId) => {
        setCurrentTheme(themeId);
        document.documentElement.className = themeId;
        setIsOpen(false);

        if (auth.currentUser) {
            await saveThemeToDatabase(themeId);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={s.dropdown} ref={dropdownRef}>
            <button className={s.button} onClick={() => setIsOpen((prev) => !prev)}>
                <Icon className={`${s.arrow} ${isOpen ? s.arrowUp : ""}`} name="icon-arrow-down" />
            </button>
            <ul className={`${s.menu} ${isOpen ? s.open : ""}`}>
                {themes.map((theme) => (
                    <li
                        key={theme.id}
                        className={`${s.menuItem} ${theme.id === currentTheme ? s.selected : ""}`}
                        onClick={() => handleThemeChange(theme.id)}
                    >
                        <div className={`${s.colorBox} ${theme.className}`}></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ThemeSwitcher;
