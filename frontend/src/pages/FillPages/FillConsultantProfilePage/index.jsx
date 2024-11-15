import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomSelect from "../../../shared/components/CustomSelect";
import styles from "./index.module.css";
import Button from "../../../shared/components/Buttons";

const schema = yup.object().shape({
    education: yup.string().required("Специальность обязательна"),
    experience: yup.string().required("Стаж работы обязателен"),
    degree: yup.string().required("Степень обязательна"),
    workPlace: yup.string().required("Место работы обязательно"),
    institution: yup.string().required("Учебное заведение обязательно"),
});

const educationOptions = [
    { value: '', label: 'Выберите специальность', isPlaceholder: true },
    { value: 'gastroenterologist', label: 'Гастроэнтеролог' },
    { value: 'nutritionist', label: 'Диетолог' },
    { value: 'therapist', label: 'Терапевт' },
    { value: 'vop', label: 'ВОП' },
    { value: 'endocrinologist', label: 'Эндокринолог' },
    { value: 'rheumatologist', label: 'Ревматолог' },
    { value: 'reproductologist', label: 'Репродуктолог' },
    { value: 'hematologist', label: 'Гематолог' },
    { value: 'dermatologist', label: 'Дерматолог' },
    { value: 'allergist', label: 'Аллерголог' },
    { value: 'pediatrician', label: 'Педиатр' },
    { value: 'another', label: 'Другое' },
];

export default function FillConsultantProfilePage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, setValue, setError } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log("Submitted data:", data);
        navigate('/success');
    };

    const onError = (errors) => {
        console.log("Form errors:", errors);
    };

    return (
            <>
                <div className={styles.Wrapper}>
                    <section className={styles.registrationSection}>
                        <div className={styles.registrationTitleWrapper}>
                            <h2 className={styles.title}>Заполните форму для отправки заявки</h2>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.registrationForm}>
                            <div className={styles.formGroup}>
                                <label className={styles.authFormLabel}>
                                    <p className={styles.authFormTitle}>
                                        Консультантом какой специальности Вы являетесь?
                                    </p>
                                    <CustomSelect
                                        options={educationOptions}
                                        value={watch('education')}
                                        name="education"
                                        onChange={(value) => setValue('education', value)}
                                        errors={errors}
                                        setError={setError}
                                    />
                                </label>
                                <label className={styles.authFormLabel}>
                                    <p className={styles.authFormTitle}>
                                        Укажите стаж работы по данной специальности
                                    </p>
                                    <div className={styles.inpWrap}>
                                        <input
                                            type="text"
                                            placeholder="Введите ответ"
                                            {...register("experience")}
                                            className={`${styles.authFormInput} ${errors.experience ? styles.errorInput : ''} ${errors.experience ? styles.errorText : ''} ${errors.experience ? styles.redPlaceholder : ''}`}
                                        />
                                        {errors.experience && <p className={styles.error}>{errors.experience.message}</p>}
                                    </div>
                                </label>
                                <label className={styles.authFormLabel}>
                                    <p className={styles.authFormTitle}>
                                        Укажите степень
                                    </p>
                                    <div className={styles.inpWrap}>
                                        <input
                                            type="text"
                                            placeholder="Введите ответ"
                                            {...register("degree")}
                                            className={`${styles.authFormInput} ${errors.degree ? styles.errorInput : ''} ${errors.degree ? styles.errorText : ''} ${errors.degree ? styles.redPlaceholder : ''}`}
                                        />
                                        {errors.degree && <p className={styles.error}>{errors.degree.message}</p>}
                                    </div>
                                </label>
                                <label className={styles.authFormLabel}>
                                    <p className={styles.authFormTitle}>
                                        Укажите учебное заведение
                                    </p>
                                    <div className={styles.inpWrap}>
                                        <input
                                            type="text"
                                            placeholder="Введите ответ"
                                            {...register("institution")}
                                            className={`${styles.authFormInput} ${errors.institution ? styles.errorInput : ''} ${errors.institution ? styles.errorText : ''} ${errors.institution ? styles.redPlaceholder : ''}`}
                                        />
                                        {errors.institution && <p className={styles.error}>{errors.institution.message}</p>}
                                    </div>
                                </label>
                                <label className={styles.authFormLabel}>
                                    <p className={styles.authFormTitle}>
                                        Основное место работы
                                    </p>
                                    <div className={styles.inpWrap}>
                                        <input
                                            type="text"
                                            placeholder="Введите ответ"
                                            {...register("workPlace")}
                                            className={`${styles.authFormInput} ${errors.workPlace ? styles.errorInput : ''} ${errors.workPlace ? styles.errorText : ''} ${errors.workPlace ? styles.redPlaceholder : ''}`}
                                        />
                                        {errors.workPlace && <p className={styles.error}>{errors.workPlace.message}</p>}
                                    </div>
                                </label>
                            </div>
                            <div className={styles.formGroup}>
                                <Button
                                    variant="gradient"
                                    padding="15px 193.5px"
                                    type="submit"
                                >
                                    Отправить анкету
                                </Button>
                            </div>
                            <div className={styles.formGroup}>
                                <div className={styles.authFormAgreement}>
                                    <label className={styles.authFormAgreementLabel}>
                                        <input
                                            type="radio"
                                            defaultChecked
                                            readOnly
                                            className={styles.roundRadio}
                                        />
                                        <span>Принимаю условия <a href="#">политики конфиденциальности и обработки персональных данных</a></span>
                                    </label>
                                    <label className={styles.authFormAgreementLabel}>
                                        <input
                                            type="radio"
                                            defaultChecked
                                            readOnly
                                            className={styles.roundRadio}
                                        />
                                        <span>Даю <a href="#">согласие на обработку персональных данных</a></span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </>
    );
}
