import React, { useCallback, useMemo, useState } from 'react';
import styles from './index.module.css';

const CooperationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    proposal: '',
  });

  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Введите ваше имя.';
    if (!formData.phone.trim()) newErrors.phone = 'Введите номер телефона.';
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
      { name: 'phone', type: 'text', placeholder: 'Номер телефона', label: 'Телефон' },
      { name: 'email', type: 'email', placeholder: 'Электронная почта', label: 'Электронная почта' },
      { name: 'proposal', type: 'text', placeholder: 'Предложение о сотрудничестве', label: 'Предложение' },
    ],
    []
  );

  return (
    <form onSubmit={handleSubmit} className={styles.cooperationForm}>
      <div className={styles.CooperationFormTextWrapper}>
        <h2>Форма о сотрудничестве</h2>
        <p>После заполнения формы с Вами свяжется менеджер для обсуждения деталей</p>
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

          <button type="submit">Отправить предложение</button>
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

export default CooperationForm;
