import React from 'react';
import styles from './index.module.css';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from '../../Buttons';

const schema = yup.object().shape({
    name: yup.string().required("Имя обязательно"),
    question: yup.string().required("Вопрос обязателен")
});

const OnlineSchoolForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className={styles.onlineSchoolFormWrapper}>
            <h2>Свои вопросы о глютене, глютен-ассоциированных заболеваниях, безглютеновой диете можете оставлять здесь</h2>
            <form  className={styles.onlineSchoolForm} onSubmit={handleSubmit(onSubmit)} >
                <div className={styles.onlineSchoolFormWrapper}>
                    <div className={styles.onlineSchoolFormTitle}>
                        <h2>Заполните форму</h2>
                        <p>И мы ответим на Ваш вопрос</p>
                    </div>
                    <div className={styles.onlineSchoolFormInpWrapper}>
                        <div className={styles.inpWrap}>
                            <input
                                type="text"
                                placeholder="Иванов Иван Сергеевич"
                                {...register("name")}
                                className={`${styles.authFormInput} ${errors.name ? styles.errorInput : ''} ${errors.name ? styles.errorText : ''} ${errors.name ? styles.redPlaceholder : ''}`}
                            />
                            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
                        </div>
                        <div className={styles.inpWrap}>
                            <textarea
                                placeholder="Введите Ваш вопрос"
                                {...register("question")}
                                className={`${styles.onlineSchoolFormTextarea} ${errors.question ? styles.errorInput : ''} ${errors.question ? styles.errorText : ''} ${errors.question ? styles.redPlaceholder : ''}`}
                            />
                            {errors.question && <p className={styles.error}>{errors.question.message}</p>}
                        </div>
                        <Button
                            variant="gradient"
                            padding="22.5px 239.5px"
                        >
                            Отправить вопрос
                         </Button>
                        <div className={styles.onlineSchoolFormRadioWrapper}>
                            <input
                                type="radio"
                                defaultChecked
                                readOnly
                                className={styles.onlineSchoolFormRadio}
                            />
                            <label>Даю согласие на обработку персональных данных</label>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default OnlineSchoolForm;
