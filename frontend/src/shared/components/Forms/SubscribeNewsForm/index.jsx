import React, { useCallback, useMemo, useState } from 'react';
import styles from './index.module.css';
import Button from '../../Buttons';

const SubscribeNewsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Введите ваше имя.';
    if (!formData.email.trim()) {
      newErrors.email = 'Введите электронную почту.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный адрес электронной почты.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback(
    ({ target: { name, value } }) => {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validate()) {
        console.log('Form submitted:', formData);
      }
    },
    [formData, validate]
  );

  const inputFields = useMemo(
    () => [
      { name: 'name', type: 'text', placeholder: 'Ваше имя', label: 'Имя' },
      { name: 'email', type: 'email', placeholder: 'Электронная почта', label: 'Электронная почта' },
    ],
    []
  );

  return (
    <form onSubmit={handleSubmit} className={styles.subscribeNewsForm}>
      <div className={styles.subscribeNewsFormTextWrapper}>
        <h2>Заполните форму</h2>
        <p>И будьте в курсе всех событий и обновлений</p>
      </div>

      <div className={styles.formConsentWrapper}>
        <div className={styles.formGroupWrapper}>
        {inputFields.map(({ name, type, placeholder }) => (
          <div className={styles.formGroup} key={name}>
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
              required
            />
            {errors[name] && <span className={styles.error}>{errors[name]}</span>}
          </div>
        ))}
          <Button
              variant="gradient"
              type="submit"
              padding="17.5px 77.5px"
          >
              Отправить предложение
          </Button>
        </div>
        <div className={styles.consent}>
          <input
            type="radio"
            defaultChecked
            readOnly
            className={styles.roundRadio}
          />
          <label>Даю согласие на обработку персональных данных</label>
        </div>
      </div>
    </form>
  );
};

export default SubscribeNewsForm;
