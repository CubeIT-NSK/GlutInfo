import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.css';
import icons from '../../resources/icon';

const CustomSelect = ({ options, value, name, onChange, errors, setError }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const [hasError, setHasError] = useState(Boolean(errors[name]));

    const selectedOption = options.find(option => option.value === value) || options[0];

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (errors[name]) {
            setError(name, { message: "" });
        }
    };

    const handleOptionClick = (option) => {
        if (!option.isPlaceholder) {
            onChange(option.value);
            setIsOpen(false);
            setHasError(false);
            if (errors[name]) {
                setError(name, { message: "" });
            }
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setHasError(Boolean(errors[name]));
    }, [errors, name]);

    return (
        <div
            className={`${styles.customSelect} ${!isOpen ? styles.closed : ''} ${hasError ? styles.error : ''}`}
            ref={selectRef}
        >
            <div
                onClick={toggleDropdown}
                className={`${styles.selectedOption} ${isOpen ? styles.rotateArrow : ''} ${hasError ? styles.error : ''}`}
            >
                {selectedOption.label}
                <img
                    src={icons.arrowIcon}
                    alt="arrowIcon"
                    className={styles.arrowIcon}
                />
            </div>
            <div
                className={`${styles.optionsContainer} ${isOpen ? styles.open : ''}`}
                style={{ zIndex: isOpen ? 1000 : 'auto' }}  // динамически меняем z-index
            >
                {options.filter(option => !option.isPlaceholder).map((option) => (
                    <div
                        key={option.value}
                        onClick={() => handleOptionClick(option)}
                        className={styles.option}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
            {hasError && <p className={styles.error}>{errors[name].message}</p>}
        </div>
    );
};


export default CustomSelect;
