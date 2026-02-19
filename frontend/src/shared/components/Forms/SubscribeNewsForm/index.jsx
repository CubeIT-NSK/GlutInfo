import React, { useMemo, useCallback } from 'react';
import styles from './index.module.css';
import Button from '../../Buttons';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from '../../../../hooks/useTranslation';

const SubscribeNewsForm = () => {
    const { t, language } = useTranslation();
    
    const schema = useMemo(() => yup.object().shape({
      name: yup.string().required(t('forms.subscribeNews.validation.nameRequired')),
      email: yup
        .string()
        .email(t('forms.subscribeNews.validation.emailInvalid'))
        .required(t('forms.subscribeNews.validation.emailRequired')),
    }), [t, language]);

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
    });

    // Reset form when schema changes (language change)
    React.useEffect(() => {
      reset();
    }, [schema, reset]);

    const onSubmit = useCallback((data, e) => {
      e.preventDefault();
      console.log("Submitted data:", data);
    }, []);

    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.subscribeNewsForm}>
          <div className={styles.subscribeNewsFormTextWrapper}>
              <h2>{t('forms.subscribeNews.title')}</h2>
              <p className={styles.subscribeNewsSubTitle}>{t('forms.subscribeNews.subtitle')}</p>
          </div>

          <div className={styles.formConsentWrapper}>
              <div className={styles.formGroupWrapper}>
                  <div className={styles.formGroup} >
                      <div className={styles.subscribeNewsErrorsWrapper}>
                          <input
                              type="name"
                              {...register("name")}
                              autoComplete="name"
                              placeholder={t('forms.subscribeNews.placeholders.name')}
                              className={`${styles.subscribeNewsInput} ${errors.name ? styles.errorInput : ''} ${errors.name ? styles.errorText : ''} ${errors.name ? styles.redPlaceholder : ''}`}
                          />
                          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                      </div>
                      <div className={styles.subscribeNewsErrorsWrapper}>
                          <input
                              type="email"
                              {...register("email")}
                              autoComplete="email"
                              placeholder={t('forms.subscribeNews.placeholders.email')}
                              className={`${styles.subscribeNewsInput} ${errors.email ? styles.errorInput : ''} ${errors.email ? styles.errorText : ''} ${errors.email ? styles.redPlaceholder : ''}`}
                          />
                          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                      </div>
                  </div>
                  <Button
                      variant="gradient"
                      type="submit"
                      padding="17.5px 78.64px"
                      style={{ width: '100%' }}
                  >
                      {t('forms.subscribeNews.submitButton')}
                  </Button>
              </div>
              <div className={styles.consent}>
                  <input
                    type="radio"
                    defaultChecked
                    readOnly
                    className={styles.roundRadio}
                  />
                  <label>{t('forms.subscribeNews.consent')}</label>
              </div>
          </div>
      </form>
    );
};

export default SubscribeNewsForm;
