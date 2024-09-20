import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import icons from '../../resources/icon';

const AuthorizationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    login: '',
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
    if (!(formData.login.trim() && formData.password.trim())) { newErrors.login = !formData.login.trim() ? 'Введите логин.' : newErrors.login; newErrors.password = !formData.password.trim() ? 'Введите пароль.' : newErrors.password; }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Authorization data:', formData);
    }
  };


  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
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
        <form onSubmit={handleSubmit}>
          <div className={styles.authorizationModalFormFWrapper}>
            <div className={styles.authorizationModalFormWrapper}>
            <div className={styles.authorizationModalFormErrorsWrapper}>
              <input
                type="text"
                name="text"
                placeholder="Логин"
                value={formData.login}
                onChange={handleChange}
                required
              />
              {errors.login && <span className={styles.error}>{errors.login}</span>}
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
            <button className={styles.authorizationModalYButton} type="submit">Войти</button>
            <button className={styles.authorizationModalWButton} type="submit">Зарегистрироваться</button>
            </div>
            <div className={styles.authorizationModalWButtonWrapper}>
              <div className={styles.lineWrapper}>
                <span className={styles.line}></span>
                <span className={styles.lineText}>или</span>
                <span className={styles.line}></span>
              </div>
              <button className={styles.authorizationModalWButton} type="submit">
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
