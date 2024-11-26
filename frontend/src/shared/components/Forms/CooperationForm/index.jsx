import React from 'react';
import styles from './index.module.css';
import Button from '../../Buttons';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  name: yup.string().required("Введите ваше имя"),
  email: yup
    .string()
    .email("Введите корректный адрес электронной почты")
    .required("Введите электронную почту"),
  phoneNumber: yup
    .string()
    .required("Номер телефона обязателен")
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат телефона"),
  proposal: yup.string().required("Введите ваше предложение"),
});

const CooperationForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = (data, e) => {
      e.preventDefault();
      console.log("Submitted data:", data);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.cooperationForm}>
          <div className={styles.CooperationFormTextWrapper}>
              <h2>Форма о сотрудничестве</h2>
              <p className={styles.cooperationFormSubTitle}>После заполнения формы с Вами свяжется менеджер для обсуждения деталей</p>
          </div>

          <div className={styles.formConsentWrapper}>
              <div className={styles.formGroupWrapper}>
                  <div className={styles.formGroup} >
                      <div className={styles.cooperationFormErrorsWrapper}>
                          <input
                              type="name"
                              {...register("name")}
                              autoComplete="name"
                              placeholder="Ваше имя"
                              className={`${styles.cooperationFormInput} ${errors.name ? styles.errorInput : ''} ${errors.name ? styles.errorText : ''} ${errors.name ? styles.redPlaceholder : ''}`}
                          />
                          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                      </div>
                      <div className={styles.cooperationFormErrorsWrapper}>
                          <InputMask
                              mask="+7 (999) 999-99-99"
                              {...register("phoneNumber")}
                              className={`${styles.cooperationFormInput} ${errors.phoneNumber ? styles.errorInput : ''} ${errors.phoneNumber ? styles.errorText : ''} ${errors.phoneNumber ? styles.redPlaceholder : ''}`}
                              placeholder="+7 (___) ___-__-__"
                          />
                          {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber.message}</p>}
                      </div>
                      <div className={styles.cooperationFormErrorsWrapper}>
                          <input
                              type="email"
                              {...register("email")}
                              autoComplete="email"
                              placeholder="Электронная почта"
                              className={`${styles.cooperationFormInput} ${errors.email ? styles.errorInput : ''} ${errors.email ? styles.errorText : ''} ${errors.email ? styles.redPlaceholder : ''}`}
                          />
                          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                      </div>
                      <div className={styles.cooperationFormErrorsWrapper}>
                          <input
                              type="proposal"
                              {...register("proposal")}
                              autoComplete="proposal"
                              placeholder="Предложение о сотрудничестве"
                              className={`${styles.cooperationFormInput} ${errors.proposal ? styles.errorInput : ''} ${errors.proposal ? styles.errorText : ''} ${errors.proposal ? styles.redPlaceholder : ''}`}
                          />
                          {errors.proposal && <p className={styles.error}>{errors.proposal.message}</p>}
                      </div>
                  </div>
                  <Button
                      variant="gradient"
                      type="submit"
                      padding="17.5px 71.5px"
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

export default CooperationForm;
