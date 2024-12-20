import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { postApiAuth, getUsersMe } from '../../../api/api';
import Button from '../../Buttons';
import icons from '../../../resources/icon';

import styles from './index.module.css';

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Неверный формат почты")
        .required("Электронная почта обязательна"),
    password: yup
        .string()
        .required("Пароль обязателен"),
});

const AuthorizationModal = ({ isOpen, onClose, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: yupResolver(schema) });

    const [showPassword, setShowPassword] = useState(false);
    const scrollWidth = window.innerWidth - document.documentElement.clientWidth;

    const togglePasswordVisibility = () => setShowPassword(prev => !prev);

    const handleRegister = () => {
        onClose();
        navigate('/registration');
    };

    const handleGsgLogin = (e) => {
        e.preventDefault();
    };

    const handleLogin = async (data) => {
        const { email: username, password } = data;

        try {
            const status = await postApiAuth({ username, password });
            if (status !== 200) return handleErrorStatus(status);

            setIsAuthenticated(true);
            onClose();

            const userResponse = await getUsersMe();

            if (userResponse.status === 200) {
                const userData = userResponse.data;
                if (userData.is_verified === false) {
                    navigate(`/profile-${userData.role}/${userData.id}/fill`);
                } else {
                    navigate(`/profile-${userData.role}/${userData.id}`);
                }
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error during login process:', error);
        }
    };


    const handleErrorStatus = (status) => {
        switch (status) {
            case 400:
                setError("email", { type: "manual", message: "Неверная почта для входа" });
                setError("password", { type: "manual", message: "Неверный пароль для входа" });
                break;
            case 401:
            case 500:
                localStorage.removeItem('token');
                console.error(status === 401 ? 'Unauthorized access' : 'Server error');
                break;
            default:
                console.error('Unexpected error:', status);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scrollWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.marginRight = '';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.authorizationModalOverlay} onClick={onClose}>
            <div className={styles.authorizationModal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <img src={icons.closeIcon} alt="closeIcon" />
                </button>
                <h2>Для записи необходимо зарегистрироваться или войти в личный кабинет</h2>
                <form className={styles.authorizationModalForm} onSubmit={handleSubmit(handleLogin)}>
                    <div className={styles.authorizationModalFormWrapper}>
                        <div className={styles.authorizationModalFormErrorsWrapper}>
                            <input
                                type="email"
                                {...register("email")}
                                autoComplete="email"
                                placeholder="Email"
                                className={`${styles.authFormInput} ${errors.email ? styles.errorInput : ''}`}
                            />
                            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                        </div>
                        <div className={styles.authorizationModalFormErrorsWrapper}>
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    autoComplete="current-password"
                                    placeholder="Пароль"
                                    className={`${styles.authFormInput} ${errors.password ? styles.errorInput : ''}`}
                                />
                                <img
                                    src={showPassword ? icons.hidePasswordIcon : icons.showPasswordIcon}
                                    alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                    className={styles.passwordToggleIcon}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                        </div>
                        <Button variant="gradient" type="submit" fontSize="mini" boxShadow="none" padding="11px 155.5px">
                            Войти
                        </Button>
                        <Button variant="white" type="button" fontSize="mini" color="black" boxShadow="none" onClick={handleRegister} padding="11px 106.5px">
                            Зарегистрироваться
                        </Button>
                    </div>
                    <div className={styles.authorizationModalWButtonWrapper}>
                        <div className={styles.lineWrapper}>
                            <span className={styles.line}></span>
                            <span className={styles.lineText}>или</span>
                            <span className={styles.line}></span>
                        </div>
                        <button className={styles.authorizationModalWButton} onClick={handleGsgLogin} disabled>
                            <span>Войдите через</span>
                            <img src={icons.gosUslugiIcon} alt="gosUslugiIcon" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthorizationModal;
