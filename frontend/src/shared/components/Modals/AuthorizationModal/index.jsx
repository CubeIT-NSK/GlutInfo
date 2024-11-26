import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from './index.module.css';
import icons from '../../../resources/icon';
import Button from '../../Buttons';
import { postApiAuth } from '../../../api/api';

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Неверный формат почты")
        .required("Электронная почта обязательна"),
    password: yup
        .string()
        .required("Пароль обязателен"),
});

const AuthorizationModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
      setError
    } = useForm({
      resolver: yupResolver(schema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const scrollWidth = window.innerWidth - document.documentElement.clientWidth + 'px';

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleRegister = () => {
      onClose();
      navigate('/registration');
    };

    const handleGsgLogin = (e) => {
      e.preventDefault();
    };

    const handleLogin = async (data) => {
        console.log('Authorization data:', data);
        const { email: username, password } = data;
        const status = await postApiAuth({ username, password });
        console.log(status);

        switch (status) {
            case 200:
                console.log('Login successful');
                onClose();
                navigate('/profile-patient');
                break;
            case 400:
                console.log('Invalid credentials');
                setError("email", { type: "manual", message: "Неверная почта для входа" });
                setError("password", { type: "manual", message: "Неверный пароль для входа" });
                break;
            case 401:
                console.log('Unauthorized access, please login again');
                localStorage.removeItem('token');
                break;
            case 500:
                console.error('Server error, please try again');
                break;
            default:
                console.error('Unexpected error:', status);
                break;
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = scrollWidth;
        } else {
            document.body.style.overflow = '';
            document.body.style.marginRight = '';
        }
    }, [isOpen]);

    if (!isOpen) return null

    return (
        <div className={styles.authorizationModalOverlay} onClick={onClose}>
            <div className={styles.authorizationModal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                  <img src={icons.closeIcon} alt="closeIcon" />
                </button>
                <h2>Для записи необходимо зарегистрироваться или войти в личный кабинет</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className={styles.authorizationModalFormFWrapper}>
                        <div className={styles.authorizationModalFormWrapper}>
                            <div className={styles.authorizationModalFormErrorsWrapper}>
                                <input
                                    type="email"
                                    {...register("email")}
                                    autoComplete="email"
                                    placeholder="Email"
                                    className={`${styles.authFormInput} ${errors.email ? styles.errorInput : ''} ${errors.email ? styles.errorText : ''} ${errors.email ? styles.redPlaceholder : ''}`}
                                />
                                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                            </div>
                            <div className={styles.authorizationModalFormErrorsWrapper}>
                                <div className={styles.passwordWrapper}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        autoComplete="complete-password"
                                        placeholder="Пароль"
                                        className={`${styles.authFormInput} ${errors.password ? styles.errorInput : ''} ${errors.password ? styles.errorText : ''} ${errors.password ? styles.redPlaceholder : ''}`}
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
                            <Button
                                variant="gradient"
                                type="submit"
                                fontSize='mini'
                                boxShadow='none'
                                padding="11px 155.5px"
                            >
                                Войти
                            </Button>
                            <Button
                                variant="white"
                                type="button"
                                fontSize='mini'
                                color='black'
                                boxShadow='none'
                                onClick={handleRegister}
                                padding="11px 106.5px"
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                        <div className={styles.authorizationModalWButtonWrapper}>
                            <div className={styles.lineWrapper}>
                              <span className={styles.line}></span>
                              <span className={styles.lineText}>или</span>
                              <span className={styles.line}></span>
                            </div>
                            <button className={styles.authorizationModalWButton} onClick={handleGsgLogin}>
                                <span>Войдите через</span>
                                <img src={icons.gosUslugiIcon} alt="gosUslugiIcon" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AuthorizationModal;
