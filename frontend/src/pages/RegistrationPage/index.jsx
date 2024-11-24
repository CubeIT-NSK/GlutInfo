import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomSelect from "../../shared/components/CustomSelect";
import styles from "./index.module.css";
import Button from "../../shared/components/Buttons";
import icons from "../../shared/resources/icon";

const schema = yup.object().shape({
    firstName: yup.string().required("Имя обязательно"),
    lastName: yup.string().required("Фамилия обязательна"),
    middleName: yup.string().required("Отчество обязательно"),
    birthDate: yup
        .date()
        .transform((value, originalValue) => (originalValue === "" ? null : value))
        .nullable()
        .required("Дата рождения обязательна")
        .max(new Date(), "Дата рождения не может быть позже текущей"),
    phoneNumber: yup
        .string()
        .required("Номер телефона обязателен")
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат телефона"),
    email: yup.string().email("Неверный формат почты").required("Электронная почта обязательна"),
    userType: yup.string().required("Выберите тип пользователя"),
    password: yup
        .string()
        .required("Пароль обязателен")
        // .min(8, "Пароль должен содержать минимум 8 символов")
        // .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
});

const userTypeOptions = [
    { value: "", label: "Выберите тип пользователя", isPlaceholder: true },
    { value: "patient", label: "Пациент" },
    { value: "consultant", label: "Консультант" },
];

export default function RegistrationPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, setValue, setError } = useForm({
        resolver: yupResolver(schema),
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            birthDate: data.birthDate.toISOString().split("T")[0],
        };
        console.log(formattedData);
        switch (formattedData.userType) {
            case "patient":
                navigate("/registration/email-confirmation");
                break;
            case "consultant":
                navigate("/profile-consultant/fill");
                break;
            default:
                break;
        }
    };

    return (
        <div className={styles.Wrapper}>
            <section className={styles.registrationSection}>
                <h2 className={styles.title}>Данные необходимые для регистрации:</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.registrationForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.authFormLabel}>
                            Имя
                            <input
                                type="text"
                                {...register("firstName")}
                                placeholder="Иван"
                                className={`${styles.authFormInput} ${errors.firstName ? styles.errorInput : ''} ${errors.firstName ? styles.errorText : ''} ${errors.firstName ? styles.redPlaceholder : ''}`}
                            />
                            {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
                        </label>
                        <label className={styles.authFormLabel}>
                            Фамилия
                            <input
                                type="text"
                                {...register("lastName")}
                                placeholder="Иванов"
                                className={`${styles.authFormInput} ${errors.lastName ? styles.errorInput : ''} ${errors.lastName ? styles.errorText : ''} ${errors.lastName ? styles.redPlaceholder : ''}`}
                            />
                            {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
                        </label>
                        <label className={styles.authFormLabel}>
                            Отчество
                            <input
                                type="text"
                                {...register("middleName")}
                                placeholder="Сергеевич"
                                className={`${styles.authFormInput} ${errors.middleName ? styles.errorInput : ''} ${errors.middleName ? styles.errorText : ''} ${errors.middleName ? styles.redPlaceholder : ''}`}
                            />
                            {errors.middleName && <p className={styles.error}>{errors.middleName.message}</p>}
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
                                {...register("email")}
                                autoComplete="email"
                                placeholder="ivanov1990@mail.ru"
                                className={`${styles.authFormInput} ${errors.email ? styles.errorInput : ''} ${errors.email ? styles.errorText : ''} ${errors.email ? styles.redPlaceholder : ''}`}
                            />
                            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                        </label>
                        <label className={styles.authFormLabel}>
                            Пароль
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    autoComplete="new-password"
                                    placeholder="Введите пароль"
                                    className={`${styles.authFormInput} ${errors.password ? styles.errorInput : ''} ${errors.password ? styles.errorText : ''} ${errors.password ? styles.redPlaceholder : ''}`}
                                />
                                <img
                                    src={showPassword ? icons.hidePasswordIcon : icons.showPasswordIcon}
                                    alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                    className={styles.passwordToggleIcon}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                        </label>
                        <label className={styles.authFormLabel}>
                            Тип пользователя
                            <CustomSelect
                                options={userTypeOptions}
                                value={watch("userType")}
                                name="userType"
                                onChange={(value) => setValue("userType", value)}
                                errors={errors}
                                setError={setError}
                            />
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <Button
                            variant="gradient"
                            type="submit"
                            padding="13px 208.44px"
                        >
                            Далее
                        </Button>
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
        </div>
    );
}
