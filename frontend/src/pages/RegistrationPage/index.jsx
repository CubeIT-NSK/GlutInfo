import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomSelect from "../../shared/components/CustomSelect";
import Footer from "../../shared/components/Footer";
import Header from "../../shared/components/Header";
import styles from "./index.module.css";

const schema = yup.object().shape({
    fullName: yup.string().required("ФИО обязательно"),
    birthDate: yup.date().transform((value, originalValue) => {
        return originalValue === '' ? null : value;
    }).nullable().required("Укажите дату")
      .max(new Date(), "Дата не может быть позже текущей"),
    phoneNumber: yup.string().required("Номер телефона обязателен")
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат телефона"),
    email: yup.string().email("Неверный формат почты").required("Электронная почта обязательна"),
    userType: yup.string().required("Выберите тип пользователя"),
});

const userTypeOptions = [
    { value: '', label: 'Выберите тип пользователя', isPlaceholder: true },
    { value: 'patient', label: 'Пациент' },
    { value: 'consultant', label: 'Консультант' },
];

export default function RegistrationPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, setValue, setError } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        switch (data.userType) {
            case 'patient':
                navigate('/fill-patient');
                break;
            case 'consultant':
                navigate('/fill-consultant');
                break;
            default:
                break;
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.registrationSection}>
                    <h2 className={styles.title}>Данные необходимые, для регистрации:</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.registrationForm}>
                        <div className={styles.formGroup}>
                            <label className={styles.authFormLabel}>
                                ФИО
                                <input
                                    type="text"
                                    placeholder="Иванов Иван Сергеевич"
                                    {...register("fullName")}
                                    className={`${styles.authFormInput} ${errors.fullName ? styles.errorInput : ''} ${errors.fullName ? styles.errorText : ''} ${errors.fullName ? styles.redPlaceholder : ''}`}
                                />
                                {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
                            </label>
                            <label className={styles.authFormLabel}>
                                Дата рождения
                                <input
                                    type="date"
                                    {...register("birthDate")}
                                    max={new Date().toISOString().split("T")[0]}
                                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split("T")[0]}
                                    className={`${styles.authFormInput} ${errors.birthDate ? styles.errorInput : ''} ${errors.birthDate ? styles.errorText : ''} ${errors.birthDate ? styles.redPlaceholder : ''}`}
                                />
                                {errors.birthDate && <p className={styles.error}>{errors.birthDate.message}</p>}
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.authFormLabel}>
                                Номер телефона
                                <InputMask
                                    mask="+7 (999) 999-99-99"
                                    {...register("phoneNumber")}
                                    className={`${styles.authFormInput} ${errors.phoneNumber ? styles.errorInput : ''} ${errors.phoneNumber ? styles.errorText : ''} ${errors.phoneNumber ? styles.redPlaceholder : ''}`}
                                    placeholder="+7 (___) ___-__-__"
                                />
                                {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber.message}</p>}
                            </label>
                            <label className={styles.authFormLabel}>
                                Электронная почта
                                <input
                                    type="email"
                                    placeholder="ivanov1990@mail.ru"
                                    {...register("email")}
                                    className={`${styles.authFormInput} ${errors.email ? styles.errorInput : ''} ${errors.email ? styles.errorText : ''} ${errors.email ? styles.redPlaceholder : ''}`}
                                />
                                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                            </label>
                            <label className={styles.authFormLabel}>
                                Тип пользователя
                                <CustomSelect
                                    options={userTypeOptions}
                                    value={watch('userType')}
                                    name="userType"
                                    onChange={(value) => setValue('userType', value)}
                                    errors={errors}
                                    setError={setError}
                                />
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.authFormGender}>
                                Пол
                                <div className={styles.authFormGenderWrapper}>
                                    <label>
                                        <input
                                            type="radio"
                                            value="male"
                                            name="gender"
                                            defaultChecked
                                            className={styles.roundRadio}
                                        /> Мужчина
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="female"
                                            name="gender"
                                            className={styles.roundRadio}
                                        /> Женщина
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <button className={styles.submitButton} type="submit">Далее</button>
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.authFormAgreement}>
                                <label className={styles.authFormAgreementLabel}>
                                    <input
                                        type="radio"
                                        defaultChecked
                                        className={styles.roundRadio}
                                    />
                                    <span>Принимаю условия <a href="#">политики конфиденциальности и обработки персональных данных</a></span>
                                </label>
                                <label className={styles.authFormAgreementLabel}>
                                    <input
                                        type="radio"
                                        defaultChecked
                                        className={styles.roundRadio}
                                    />
                                    <span>Даю <a href="#">согласие на обработку персональных данных</a></span>
                                </label>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
}
