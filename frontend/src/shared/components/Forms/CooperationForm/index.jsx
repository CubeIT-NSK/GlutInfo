import React, { useMemo, useCallback } from 'react';
import styles from './index.module.css';
import Button from '../../Buttons';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { useTranslation } from '../../../../hooks/useTranslation';

const CooperationForm = () => {
    const { t, language } = useTranslation();
    
    const schema = useMemo(() => yup.object().shape({
      name: yup.string().required(t('forms.cooperation.validation.nameRequired')),
      email: yup
        .string()
        .email(t('forms.cooperation.validation.emailInvalid'))
        .required(t('forms.cooperation.validation.emailRequired')),
      phoneNumber: yup
        .string()
        .required(t('forms.cooperation.validation.phoneRequired'))
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, t('forms.cooperation.validation.phoneInvalid')),
      proposal: yup.string().required(t('forms.cooperation.validation.proposalRequired')),
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.cooperationForm}>
          <div className={styles.CooperationFormTextWrapper}>
              <h2>{t('forms.cooperation.title')}</h2>
              <p className={styles.cooperationFormSubTitle}>{t('forms.cooperation.subtitle')}</p>
          </div>

          <div className={styles.formConsentWrapper}>
              <div className={styles.formGroupWrapper}>
                  <div className={styles.formGroup} >
                      <div className={styles.cooperationFormErrorsWrapper}>
                          <input
                              type="name"
                              {...register("name")}
                              autoComplete="name"
                              placeholder={t('forms.cooperation.placeholders.name')}
                              className={`${styles.cooperationFormInput} ${errors.name ? styles.errorInput : ''} ${errors.name ? styles.errorText : ''} ${errors.name ? styles.redPlaceholder : ''}`}
                          />
                          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                      </div>
                      <div className={styles.cooperationFormErrorsWrapper}>
                          <InputMask
                              mask="+7 (999) 999-99-99"
                              {...register("phoneNumber")}
                              className={`${styles.cooperationFormInput} ${errors.phoneNumber ? styles.errorInput : ''} ${errors.phoneNumber ? styles.errorText : ''} ${errors.phoneNumber ? styles.redPlaceholder : ''}`}
                              placeholder={t('forms.cooperation.placeholders.phone')}
                          />
                          {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber.message}</p>}
                      </div>
                      <div className={styles.cooperationFormErrorsWrapper}>
                          <input
                              type="email"
                              {...register("email")}
                              autoComplete="email"
                              placeholder={t('forms.cooperation.placeholders.email')}
                              className={`${styles.cooperationFormInput} ${errors.email ? styles.errorInput : ''} ${errors.email ? styles.errorText : ''} ${errors.email ? styles.redPlaceholder : ''}`}
                          />
                          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                      </div>
                      <div className={styles.cooperationFormErrorsWrapper}>
                          <input
                              type="proposal"
                              {...register("proposal")}
                              autoComplete="proposal"
                              placeholder={t('forms.cooperation.placeholders.proposal')}
                              className={`${styles.cooperationFormInput} ${errors.proposal ? styles.errorInput : ''} ${errors.proposal ? styles.errorText : ''} ${errors.proposal ? styles.redPlaceholder : ''}`}
                          />
                          {errors.proposal && <p className={styles.error}>{errors.proposal.message}</p>}
                      </div>
                  </div>
                  <Button
                      variant="gradient"
                      type="submit"
                      padding="17.5px 71.5px"
                      style={{ width: '100%' }}
                  >
                      {t('forms.cooperation.submitButton')}
                  </Button>
              </div>
              <div className={styles.consent}>
                  <input
                    type="radio"
                    defaultChecked
                    readOnly
                    className={styles.roundRadio}
                  />
                  <label>{t('forms.cooperation.consent')}</label>
              </div>
          </div>
      </form>
    );
};

export default CooperationForm;
