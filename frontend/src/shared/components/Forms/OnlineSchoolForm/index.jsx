import React, { useMemo, useCallback } from 'react';
import styles from './index.module.css';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from '../../Buttons';
import { useTranslation } from '../../../../hooks/useTranslation';

const OnlineSchoolForm = () => {
    const { t, language } = useTranslation();
    
    const schema = useMemo(() => yup.object().shape({
        name: yup.string().required(t('forms.onlineSchool.validation.nameRequired')),
        question: yup.string().required(t('forms.onlineSchool.validation.questionRequired'))
    }), [t, language]);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    // Reset form when schema changes (language change)
    React.useEffect(() => {
        reset();
    }, [schema, reset]);

    const onSubmit = useCallback((data) => {
        console.log(data);
    }, []);

    return (
        <div className={styles.onlineSchoolFormWrapper}>
            <h2>{t('forms.onlineSchool.mainTitle')}</h2>
            <form  className={styles.onlineSchoolForm} onSubmit={handleSubmit(onSubmit)} >
                <div className={styles.onlineSchoolFormWrapper}>
                    <div className={styles.onlineSchoolFormTitle}>
                        <h2>{t('forms.onlineSchool.title')}</h2>
                        <p>{t('forms.onlineSchool.subtitle')}</p>
                    </div>
                    <div className={styles.onlineSchoolFormInpWrapper}>
                        <div className={styles.inpWrap}>
                            <input
                                type="text"
                                placeholder={t('forms.onlineSchool.placeholders.name')}
                                {...register("name")}
                                className={`${styles.authFormInput} ${errors.name ? styles.errorInput : ''} ${errors.name ? styles.errorText : ''} ${errors.name ? styles.redPlaceholder : ''}`}
                            />
                            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                        </div>
                        <div className={styles.inpWrap}>
                            <textarea
                                placeholder={t('forms.onlineSchool.placeholders.question')}
                                {...register("question")}
                                className={`${styles.onlineSchoolFormTextarea} ${errors.question ? styles.errorInput : ''} ${errors.question ? styles.errorText : ''} ${errors.question ? styles.redPlaceholder : ''}`}
                            />
                            {errors.question && <p className={styles.error}>{errors.question.message}</p>}
                        </div>
                        <Button
                            variant="gradient"
                            padding="22.5px 239.5px"
                            style={{ width: '100%' }}
                        >
                            {t('forms.onlineSchool.submitButton')}
                         </Button>
                        <div className={styles.onlineSchoolFormRadioWrapper}>
                            <input
                                type="radio"
                                defaultChecked
                                readOnly
                                className={styles.onlineSchoolFormRadio}
                            />
                            <label>{t('forms.onlineSchool.consent')}</label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OnlineSchoolForm;
