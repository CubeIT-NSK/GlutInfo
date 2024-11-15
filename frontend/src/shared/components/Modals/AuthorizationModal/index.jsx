import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import icons from '../../../resources/icon';
import { useNavigate } from "react-router-dom";
import Button from '../../Buttons';

const AuthorizationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Введите электронную почту.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный адрес электронной почты.';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Введите пароль.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Authorization data:', formData);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    onClose();
    navigate('/registration');
  };

  const handleGsgLogin = (e) => {
    e.preventDefault();
  };

  const scrollWidth = window.innerWidth - document.documentElement.clientWidth + 'px'
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.marginRight = scrollWidth;
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
        <form onSubmit={handleLogin}>
          <div className={styles.authorizationModalFormFWrapper}>
            <div className={styles.authorizationModalFormWrapper}>
              <div className={styles.authorizationModalFormErrorsWrapper}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
              <div className={styles.authorizationModalFormErrorsWrapper}>
                <input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <span className={styles.error}>{errors.password}</span>}
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
                  type="submit"
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
};

export default AuthorizationModal;
