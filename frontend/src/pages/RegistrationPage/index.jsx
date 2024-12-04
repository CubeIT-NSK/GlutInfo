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
import { postApiRegisterUser, postApiEmailConfirmationRequest } from "../../shared/api/api";

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
    role: yup.string().required("Выберите тип пользователя"),
    password: yup
        .string()
        .required("Пароль обязателен")
        .min(8, "Пароль должен содержать минимум 8 символов")
        .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву"),
    gender: yup.string().required("Укажите ваш пол"),
});

const roleOptions = [
    { value: "", label: "Выберите тип пользователя", isPlaceholder: true },
    { value: "patient", label: "Пациент" },
    { value: "consultant", label: "Консультант" },
];

export default function RegistrationPage() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        setError
      } = useForm({
        resolver: yupResolver(schema),
      });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const getNavigationPath = (role) => {
        const routes = {
            patient: "/registration/email-confirmation",
            consultant: "/registration/email-confirmation",
        };

        return routes[role] || null;
    };

    const handleRegistrationSuccess = (role) => {
        const path = getNavigationPath(role);
        if (path) {
            navigate(path);
        } else {
            console.log('Неизвестный тип пользователя:', role);
        }
    };

    const handleEmailConfirmation = async (email, role) => {
        try {
            const emailStatus = await postApiEmailConfirmationRequest({ email });

            if (emailStatus === 202) {
                console.log('Email confirmation request successful');
                handleRegistrationSuccess(role);
            } else {
                console.error('Email confirmation request failed', emailStatus);
            }
        } catch (error) {
            console.error('Error during email confirmation', error);
        }
    };

    const onSubmit = async (data) => {
        const registrationData = {
            born_date: data.birthDate.toISOString().split("T")[0],
            email: data.email,
            name: data.firstName,
            password: data.password,
            patronymic: data.middleName,
            phone: data.phoneNumber.replace(/[^\d+]/g, ''),
            role: data.role,
            sex: data.gender,
            surname: data.lastName,
        };

        try {
            const status = await postApiRegisterUser({ registerData: registrationData });

            switch (status) {
                case 201:
                    console.log('Registration successful');
                    await handleEmailConfirmation(data.email, registrationData.role);
                    break;
                case 400:
                    console.log('Invalid registration data');
                    setError("email", { type: "manual", message: "Электронная почта уже используется" });
                    setError("phoneNumber", { type: "manual", message: "Номер телефон уже используется" });
                    break;
                case 500:
                    console.error('Server error, please try again');
                    break;
                default:
                    console.log("Registration Data:", registrationData);
                    console.error('Unexpected error:', status);
                    break;
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className={styles.Wrapper}>
            <section className={styles.registrationSection}>
                <h2 className={styles.title}>Данные необходимые для регистрации:</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.registrationForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.registerFormLabel}>
                            <p className={styles.registerFormTitle}>Имя</p>
                            <div className={styles.inpWrap}>
                                <input
                                    type="text"
                                    {...register("firstName")}
                                    placeholder="Иван"
                                    className={`${styles.registerFormInput} ${errors.firstName ? styles.errorInput : ''} ${errors.firstName ? styles.errorText : ''} ${errors.firstName ? styles.redPlaceholder : ''}`}
                                />
                                {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
                            </div>
                        </label>
                        <label className={styles.registerFormLabel}>
                            <p className={styles.registerFormTitle}>Фамилия</p>
                            <div className={styles.inpWrap}>
                                <input
                                    type="text"
                                    {...register("lastName")}
                                    placeholder="Иванов"
                                    className={`${styles.registerFormInput} ${errors.lastName ? styles.errorInput : ''} ${errors.lastName ? styles.errorText : ''} ${errors.lastName ? styles.redPlaceholder : ''}`}
                                />
                                {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
                            </div>
                        </label>
                        <label className={styles.registerFormLabel}>
                            <p className={styles.registerFormTitle}>Отчество</p>
                            <div className={styles.inpWrap}>
                                <input
                                    type="text"
                                    {...register("middleName")}
                                    placeholder="Сергеевич"
                                    className={`${styles.registerFormInput} ${errors.middleName ? styles.errorInput : ''} ${errors.middleName ? styles.errorText : ''} ${errors.middleName ? styles.redPlaceholder : ''}`}
                                />
                                {errors.middleName && <p className={styles.error}>{errors.middleName.message}</p>}
                            </div>
                        </label>
                        <div className={styles.registerFormGender}>
                                <p className={styles.registerFormLabel}>Пол</p>
                                <div className={styles.registerFormGenderWrapper}>
                                    <label className={styles.registerFormGenderLabel}>
                                        <input
                                            type="radio"
                                            value="male"
                                            name="gender"
                                            {...register("gender")}
                                            defaultChecked
                                            className={`${styles.roundRadio} ${errors.gender ? styles.errorText : ''}`}
                                        /> Мужчина
                                    </label>
                                    <label className={styles.registerFormGenderLabel}>
                                        <input
                                            type="radio"
                                            value="female"
                                            name="gender"
                                            {...register("gender")}
                                            className={`${styles.roundRadio} ${errors.gender ? styles.errorText : ''}`}
                                        /> Женщина
                                    </label>
                                </div>
                                {errors.gender && <p className={styles.error}>{errors.gender.message}</p>}
                        </div>
                        <label className={styles.registerFormLabel}>
                            <p className={styles.registerFormTitle}>Дата рождения</p>
                            <div className={styles.inpWrap}>
                                <input
                                    type="date"
                                    {...register("birthDate")}
                                    max={new Date().toISOString().split("T")[0]}
                                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split("T")[0]}
                                    className={`${styles.registerFormInput} ${errors.birthDate ? styles.errorInput : ''} ${errors.birthDate ? styles.errorText : ''} ${errors.birthDate ? styles.redPlaceholder : ''}`}
                                />
                                {errors.birthDate && <p className={styles.error}>{errors.birthDate.message}</p>}
                            </div>
                        </label>
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.registerFormLabel}>
                            <p className={styles.registerFormTitle}>Номер телефона</p>
                            <div className={styles.inpWrap}>
                                <InputMask
                                    mask="+7 (999) 999-99-99"
                                    {...register("phoneNumber")}
                                    className={`${styles.registerFormInput} ${errors.phoneNumber ? styles.errorInput : ''} ${errors.phoneNumber ? styles.errorText : ''} ${errors.phoneNumber ? styles.redPlaceholder : ''}`}
                                    placeholder="+7 (___) ___-__-__"
                                />
                                {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber.message}</p>}
                            </div>
                        </label>
                        <label className={styles.registerFormLabel}>
                            <p className={styles.registerFormTitle}>Электронная почта</p>
                            <div className={styles.inpWrap}>
                                <input
                                    type="email"
                                    {...register("email")}
                                    autoComplete="email"
                                    placeholder="ivanov1990@mail.ru"
                                    className={`${styles.registerFormInput} ${errors.email ? styles.errorInput : ''} ${errors.email ? styles.errorText : ''} ${errors.email ? styles.redPlaceholder : ''}`}
                                />
                                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                            </div>
                        </label>
                        <label className={styles.registerFormLabel}>

                            <p className={styles.registerFormTitle}>Пароль</p>
                            <div className={styles.inpWrap}>
                                <div className={styles.passwordWrapper}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        autoComplete="new-password"
                                        placeholder="Введите пароль"
                                        className={`${styles.registerFormInput} ${errors.password ? styles.errorInput : ''} ${errors.password ? styles.errorText : ''} ${errors.password ? styles.redPlaceholder : ''}`}
                                    />
                                    <img
                                        src={showPassword ? icons.hidePasswordIcon : icons.showPasswordIcon}
                                        alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                        className={styles.passwordToggleIcon}
                                        onClick={togglePasswordVisibility}
                                    />
                                </div>
                                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                            </div>
                        </label>
                        <label className={styles.registerFormLabel}>
                            <p className={styles.registerFormTitle}>Тип пользователя</p>
                            <CustomSelect
                                options={roleOptions}
                                value={watch("role")}
                                name="role"
                                onChange={(value) => setValue("role", value)}
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
                        <div className={styles.registerFormAgreement}>
                            <label className={styles.registerFormAgreementLabel}>
                                <input
                                    type="radio"
                                    defaultChecked
                                    className={styles.roundRadio}
                                />
                                <span>Принимаю условия <a href="#">политики конфиденциальности и обработки персональных данных</a></span>
                            </label>
                            <label className={styles.registerFormAgreementLabel}>
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
