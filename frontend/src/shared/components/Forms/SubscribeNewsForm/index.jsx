import React from 'react';
import styles from './index.module.css';
import Button from '../../Buttons';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  name: yup.string().required("Введите ваше имя"),
  email: yup
    .string()
    .email("Введите корректный адрес электронной почты")
    .required("Введите электронную почту"),
});

const SubscribeNewsForm = () => {
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.subscribeNewsForm}>
          <div className={styles.subscribeNewsFormTextWrapper}>
              <h2>Заполните форму</h2>
              <p className={styles.subscribeNewsSubTitle}>И будьте в курсе всех событий и обновлений</p>
          </div>

          <div className={styles.formConsentWrapper}>
              <div className={styles.formGroupWrapper}>
                  <div className={styles.formGroup} >
                      <div className={styles.subscribeNewsErrorsWrapper}>
                          <input
                              type="name"
                              {...register("name")}
                              autoComplete="name"
                              placeholder="Ваше имя"
                              className={`${styles.subscribeNewsInput} ${errors.name ? styles.errorInput : ''} ${errors.name ? styles.errorText : ''} ${errors.name ? styles.redPlaceholder : ''}`}
                          />
                          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                      </div>
                      <div className={styles.subscribeNewsErrorsWrapper}>
                          <input
                              type="email"
                              {...register("email")}
                              autoComplete="email"
                              placeholder="Электронная почта"
                              className={`${styles.subscribeNewsInput} ${errors.email ? styles.errorInput : ''} ${errors.email ? styles.errorText : ''} ${errors.email ? styles.redPlaceholder : ''}`}
                          />
                          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                      </div>
                  </div>
                  <Button
                      variant="gradient"
                      type="submit"
                      padding="17.5px 78.64px"
                  >
                      Подписаться на новости
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
