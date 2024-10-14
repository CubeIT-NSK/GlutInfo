import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomSelect from "../../../shared/components/CustomSelect";
import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import styles from "./index.module.css";
import FileInput from "../../../shared/components/FileInputs";

const schema = yup.object().shape({
    fullName: yup.string().required("ФИО обязательно"),
    birthDate: yup.date().transform((value, originalValue) => {
        return originalValue === '' ? null : value;
    }).nullable().required("Укажите дату"),
    phoneNumber: yup.string().required("Номер телефона обязателен")
        .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, "Неверный формат телефона"),
    email: yup.string().email("Неверный формат почты").required("Электронная почта обязательна"),
    gender: yup.string().required("Укажите ваш пол"),
    address: yup.string().nullable(),
    education: yup.string().nullable(),
    workingStatus: yup.string().nullable(),
    photo: yup.mixed().nullable(),
});

const educationOptions = [
    { value: '', label: 'Выберите уровень образования', isPlaceholder: true },
    { value: 'basic', label: 'Основное общее образование' },
    { value: 'secondary_general', label: 'Среднее общее образование' },
    { value: 'secondary_vocational', label: 'Среднее профессиональное образование' },
    { value: 'incomplete_higher', label: 'Неоконченное высшее образование' },
    { value: 'higher_bachelor', label: 'Бакалавриат' },
    { value: 'higher_specialist', label: 'Специалитет' },
    { value: 'higher_master', label: 'Магистратура' },
    { value: 'postgraduate', label: 'Аспирантура' },
];


export default function FillProfilePage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, setValue, setError, clearErrors } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
        navigate('/profile-patient');
    };

    const workingStatus = watch("workingStatus");

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>
                <section className={styles.registrationSection}>
                    <div className={styles.registrationTitleWrapper}>
                        <h2 className={styles.title}>Спасибо за регистрацию на нашем сервисе!</h2>
                        <h3 className={styles.subTitle}>Просим заполнить Ваш профиль</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.registrationForm}>
                        <div className={styles.formGroup}>
                            <label className={styles.authFormLabel}>
                                <p className={styles.authFormTitle}>ФИО<span className={styles.authFormHelp}>*</span></p>
                                <div className={styles.inpWrap}>
                                    <input
                                        type="text"
                                        placeholder="Иванов Иван Сергеевич"
                                        {...register("fullName")}
                                        className={`${styles.authFormInput} ${errors.fullName ? styles.errorInput : ''} ${errors.fullName ? styles.errorText : ''} ${errors.fullName ? styles.redPlaceholder : ''}`}
                                    />
                                    {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
                                </div>
                            </label>
                            <label className={styles.authFormLabel}>
                                <p className={styles.authFormTitle}>
                                    Дата рождения
                                    <span className={styles.authFormHelp}>*</span>
                                </p>
                                <div className={styles.inpWrap}>
                                    <input
                                        type="date"
                                        {...register("birthDate")}
                                        max={new Date().toISOString().split("T")[0]}
                                        min={new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split("T")[0]}
                                        className={`${styles.authFormInput} ${errors.birthDate ? styles.errorInput : ''} ${errors.birthDate ? styles.errorText : ''} ${errors.birthDate ? styles.redPlaceholder : ''}`}
                                    />
                                    {errors.birthDate && <p className={styles.error}>{errors.birthDate.message}</p>}
                                </div>
                            </label>
                            <div className={styles.authFormGender}>
                                <p className={styles.authFormTitle}>Пол<span className={styles.authFormHelp}>*</span></p>
                                <div className={styles.authFormGenderWrapper}>
                                    <label>
                                        <input
                                            type="radio"
                                            value="male"
                                            name="gender"
                                            {...register("gender")}
                                            defaultChecked
                                            className={`${styles.roundRadio} ${errors.gender ? styles.errorText : ''}`}
                                        /> Мужчина
                                    </label>
                                    <label>
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
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.authFormLabel}>
                                <p className={styles.authFormTitle}>Номер телефона<span className={styles.authFormHelp}>*</span></p>
                                <div className={styles.inpWrap}>
                                    <InputMask
                                        mask="+7 (999) 999-99-99"
                                        {...register("phoneNumber")}
                                        className={`${styles.authFormInput} ${errors.phoneNumber ? styles.errorInput : ''} ${errors.phoneNumber ? styles.errorText : ''} ${errors.phoneNumber ? styles.redPlaceholder : ''}`}
                                        placeholder="+7 (___) ___-__-__"
                                    />
                                    {errors.phoneNumber && <p className={styles.error}>{errors.phoneNumber.message}</p>}
                                </div>
                            </label>
                            <label className={styles.authFormLabel}>
                                <p className={styles.authFormTitle}>Электронная почта<span className={styles.authFormHelp}>*</span></p>
                                <div className={styles.inpWrap}>
                                    <input
                                        type="email"
                                        placeholder="ivanov1990@mail.ru"
                                        {...register("email")}
                                        className={`${styles.authFormInput} ${errors.email ? styles.errorInput : ''} ${errors.email ? styles.errorText : ''} ${errors.email ? styles.redPlaceholder : ''}`}
                                    />
                                    {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                                </div>
                            </label>
                            <label className={styles.authFormLabel}>
                                <p className={styles.authFormTitle}>Адрес места жительства</p>
                                <div className={styles.inpWrap}>
                                    <input
                                        type="text"
                                        placeholder="Введите адрес"
                                        {...register("address")}
                                        className={`${styles.authFormInput} ${errors.address ? styles.errorInput : ''} ${errors.address ? styles.errorText : ''} ${errors.address ? styles.redPlaceholder : ''}`}
                                    />
                                    {errors.address && <p className={styles.error}>{errors.address.message}</p>}
                                </div>
                            </label>
                            <label className={styles.authFormLabel}>
                                <p className={styles.authFormTitle}>Образование</p>
                                <CustomSelect
                                    options={educationOptions}
                                    value={watch('education')}
                                    name="education"
                                    onChange={(value) => setValue('education', value)}
                                    errors={errors}
                                    setError={setError}
                                />
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.authFormGender}>
                                <p className={styles.authFormTitle}>Работаю</p>
                                <div className={styles.authFormGenderWrapper}>
                                    <label>
                                        <input
                                            type="radio"
                                            value="yes"
                                            name="join"
                                            {...register("workingStatus", {
                                                onChange: () => {
                                                    clearErrors("workingStatus");
                                                }
                                            })}
                                            className={styles.roundRadio}
                                        /> Да
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="no"
                                            name="join"
                                            {...register("workingStatus", {
                                                onChange: () => {
                                                    clearErrors("workingStatus");
                                                }
                                            })}
                                            className={styles.roundRadio}
                                        /> Нет
                                    </label>
                                </div>
                                {errors.workingStatus && <p className={styles.error}>{errors.workingStatus.message}</p>}
                            </div>
                            {workingStatus === "yes" && (
                                <label className={styles.authFormLabel}>
                                    <p className={styles.authFormTitle}>Если работаете, укажите кем</p>
                                    <div className={styles.inpWrap}>
                                        <input
                                            type="text"
                                            placeholder="Введите должность"
                                            {...register("jobTitle")}
                                            className={`${styles.authFormInput} ${errors.jobTitle ? styles.errorInput : ''} ${errors.jobTitle ? styles.errorText : ''} ${errors.jobTitle ? styles.redPlaceholder : ''}`}
                                        />
                                        {errors.jobTitle && <p className={styles.error}>{errors.jobTitle.message}</p>}
                                    </div>
                                </label>
                            )}
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.authFormLabel}>
                              <p className={styles.authFormTitle}>Фотография профиля</p>
                              <div className={styles.inpWrap}>
                                <FileInput
                                    title="Загрузите фотографию профиля"
                                    maxFiles={1}
                                    acceptedFormats={['image/jpeg', 'image/jpg', 'image/png']}
                                    onFileChange={(newFiles) => {
                                    setValue('certificates', newFiles);
                                    }}
                                />
                                {errors.photo && <p className={styles.error}>{errors.photo.message}</p>}
                              </div>
                            </label>
                        </div>
                        <div className={styles.formGroup}>
                            <button className={styles.submitButton} type="submit">Готово</button>
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.authFormAgreement}>
                                <span className={styles.authFormHelp}>*</span>
                                <p> - обязательное для заполнения</p>
                            </div>
                        </div>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );

}
