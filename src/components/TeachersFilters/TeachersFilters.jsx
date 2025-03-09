import { useState, useRef, useEffect } from "react";
import Icon from "../Icon";
import s from "./TeachersFilters.module.css";

const languages = ["Any", "English", "French", "German", "Ukrainian", "Polish", "Spanish", "Mandarin Chinese", "Italian", "Korean"];
const levels = [
    "Any",
    "A1 Beginner",
    "A2 Elementary",
    "B1 Intermediate",
    "B2 Upper-Intermediate",
    "C1 Advanced",
    "C2 Proficient",
];
const prices = ["Any", 10, 20, 30, 40];

export default function TeachersFilters({ onFilterChange }) {
    const [selectedLanguage, setSelectedLanguage] = useState("Any");
    const [selectedLevel, setSelectedLevel] = useState("Any");
    const [selectedPrice, setSelectedPrice] = useState("Any");

    const handleChange = (type, value) => {
        if (type === "language") setSelectedLanguage(value);
        if (type === "level") setSelectedLevel(value);
        if (type === "price") setSelectedPrice(value);

        onFilterChange({
            language: type === "language" ? value : selectedLanguage,
            level: type === "level" ? value : selectedLevel,
            price: type === "price" ? (value === "Any" ? "Any" : Number(value.replace(" $", ""))) : selectedPrice,
        });
    };

    return (
        <div className={s.filtersContainer}>
            <Dropdown
                label="Languages"
                options={languages}
                selected={selectedLanguage}
                onSelect={(value) => handleChange("language", value)}
            />
            <Dropdown
                label="Level of knowledge"
                options={levels}
                selected={selectedLevel}
                onSelect={(value) => handleChange("level", value)}
            />
            <Dropdown
                label="Price"
                options={prices.map((p) => (p === "Any" ? p : `${p} $`))}
                selected={selectedPrice === "Any" ? "Any" : `${selectedPrice}`}
                onSelect={(value) => handleChange("price", value)}
            />
        </div>
    );
}

function Dropdown({ label, options, selected, onSelect }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onSelect(option);
        setTimeout(() => setIsOpen(false), 10);
    };

    return (
        <div className={s.dropdown} ref={dropdownRef}>
            <span className={s.label}>{label}</span>
            <button className={s.button} onClick={() => setIsOpen((prev) => !prev)}>
                {selected}
                <Icon className={`${s.arrow} ${isOpen ? s.arrowUp : ""}`} name="icon-arrow-down"/>
            </button>
            <ul className={`${s.menu} ${isOpen ? s.open : ""}`}>
                {options.map((option) => (
                    <li
                        key={option}
                        className={`${s.menuItem} ${option === selected ? s.selected : ""}`}
                        onClick={() => handleSelect(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}