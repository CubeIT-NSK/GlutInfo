import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomSelect from "../../shared/components/CustomSelect";
import styles from "./index.module.css";
import Button from "../../shared/components/Buttons";

// TODO: добавить карточку с окончательной ценой
const schema = yup.object().shape({
    doctor: yup.string().nullable().required("Выберите врача"),
    date: yup.date().nullable().required("Укажите дату"),
    serviceTime: yup.string().nullable().required("Выберите время"),
    service: yup.string().nullable().required("Выберите услугу"),
});

const doctorOptions = [
    { value: '', label: 'Выберите врача', isPlaceholder: true },
    { value: 'ivanov', label: 'Иванов ИВ' },
    { value: 'petrov', label: 'Петров ИВ' },
];

const serviceTimeOptions = [
    { value: '', label: 'Выберите время', isPlaceholder: true },
];

for (let hour = 9; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
        const startHour = hour.toString().padStart(2, '0');
        const startMinute = minute.toString().padStart(2, '0');
        const endMinute = minute + 30 >= 60 ? 0 : minute + 30;
        const endHour = minute + 30 >= 60 ? hour + 1 : hour;

        const endHourFormatted = endHour.toString().padStart(2, '0');
        const endMinuteFormatted = endMinute.toString().padStart(2, '0');

        const timeValue = `${startHour}:${startMinute}-${endHourFormatted}:${endMinuteFormatted}`;
        serviceTimeOptions.push({ value: timeValue, label: timeValue });
    }
}

const serviceOptions = [
    { value: '', label: 'Выберите услугу', isPlaceholder: true },
    { value: 'consultation', label: 'Консультация' },
    { value: 'diagnosis', label: 'Диагностика' },
    { value: 'diagnosis2', label: 'Диагностика2' },
    { value: 'diagnosis3', label: 'Диагностика3' },
    { value: 'diagnosis4', label: 'Диагностика4' },
    { value: 'diagnosis5', label: 'Диагностика5' },
    { value: 'diagnosis6', label: 'Диагностика6' },
    { value: 'diagnosis7', label: 'Диагностика7' },
];

export default function AppointmentPage() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const { register, handleSubmit, formState: { errors }, watch, setValue, clearErrors } = useForm({
        resolver: yupResolver(schema)
    });

    const doctor = watch('doctor');
    const date = watch('date');
    const service = watch('service');
    const serviceTime = watch('serviceTime');

    const isFormValid = doctor && date && service && serviceTime;

    const onSubmit = (data) => {
        console.log(data);
        setStep(2);
    };

    const handlePayment = (data) => {
        console.log("Оплата успешно прошла!");
        setStep(3);
    };

    const handleBack = (event) => {
        event.preventDefault();
        navigate('/profile-patient');
    };

    const handleAnimationEnd = (field) => {
        setAnimationCompleted((prev) => ({
            ...prev,
            [field]: true,
        }));
    };

    const [animationCompleted, setAnimationCompleted] = useState({
        doctor: false,
        date: false,
        service: false,
        serviceTime: false,
        serviceCard: false,
    });

    const selectedDoctor = doctorOptions.find(option => option.value === doctor)?.label || '';
    const selectedService = serviceOptions.find(option => option.value === service)?.label || '';
    const selectedServiceTime = serviceTime;
    const selectedDate = date ? `${new Date(date).toLocaleDateString("ru-RU", { day: 'numeric', month: 'long' })}, ${new Date(date).toLocaleDateString("ru-RU", { weekday: 'long' })}` : '';

    return (
            <>
                <div className={styles.Wrapper}>
                    <section className={styles.appointmentSection}>
                        <h2 className={styles.title}>
                            {step === 1 && "Записаться"}
                            {step === 2 && "Подтвердите запись"}
                            {step === 3 && "Запись успешно подтверждена!"}
                        </h2>

                        {step === 1 && (
                            <form onSubmit={handleSubmit(onSubmit)} className={styles.appointmentForm}>
                                <div className={styles.formGroupWrapper}>
                                    <div className={styles.formGroup}>
                                        <label
                                            className={`${styles.appointmentFormLabel}  ${!animationCompleted.doctor ? styles.fadeIn : ''}`}
                                            onAnimationEnd={() => handleAnimationEnd('doctor')}
                                        >
                                            Выберите врача
                                            <CustomSelect
                                                options={doctorOptions}
                                                value={doctor}
                                                name="doctor"
                                                onChange={(value) => setValue('doctor', value)}
                                                errors={errors}
                                            />
                                        </label>

                                        {doctor && (
                                            <label
                                                className={`${styles.appointmentFormLabel}  ${!animationCompleted.date ? styles.fadeIn : ''}`}
                                                onAnimationEnd={() => handleAnimationEnd('date')}
                                            >
                                                Выберите дату
                                                <div className={styles.inpWrap}>
                                                    <input
                                                        type="date"
                                                        {...register("date")}
                                                        max={new Date().toISOString().split("T")[0]}
                                                        min={new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split("T")[0]}
                                                        className={`${styles.appointmentFormInput} ${errors.date ? styles.errorInput : ''}`}
                                                    />
                                                </div>
                                            </label>
                                        )}

                                        {doctor && date && (
                                            <label
                                                className={`${styles.appointmentFormLabel}  ${!animationCompleted.service ? styles.fadeIn : ''}`}
                                                onAnimationEnd={() => handleAnimationEnd('service')}
                                            >
                                                Выберите услугу
                                                <CustomSelect
                                                    options={serviceOptions}
                                                    value={service}
                                                    name="service"
                                                    onChange={(value) => {
                                                        setValue('service', value);
                                                        clearErrors('serviceTime');
                                                        setValue('serviceTime', '');
                                                    }}
                                                    errors={errors}
                                                />
                                            </label>
                                        )}

                                        {doctor && date && service && (
                                            <label
                                                className={`${styles.appointmentFormLabel}  ${!animationCompleted.serviceTime ? styles.fadeIn : ''}`}
                                                onAnimationEnd={() => handleAnimationEnd('serviceTime')}
                                            >
                                                Выберите время
                                                <CustomSelect
                                                    options={serviceTimeOptions}
                                                    value={serviceTime}
                                                    name="serviceTime"
                                                    onChange={(value) => setValue('serviceTime', value)}
                                                    errors={errors}
                                                />
                                            </label>
                                        )}

                                        <div className={styles.formGroup}>
                                            <Button
                                                variant="gradient"
                                                type="submit"
                                                padding="15px 173px"
                                                disabled={!isFormValid}
                                            >
                                                Записаться
                                            </Button>
                                        </div>
                                    </div>
                                    {isFormValid && (
                                        <div
                                            className={`${styles.appointmentServiceCard} ${!animationCompleted.serviceCard ? styles.fadeIn : ''}`}
                                            onAnimationEnd={() => handleAnimationEnd('serviceCard')}
                                        >
                                            <div className={styles.appointmentServiceCardTop}>
                                                <h3 className={styles.appointmentServiceCardTopText}>Итоговая стоимость</h3>
                                            </div>
                                            <div className={styles.appointmentServiceCardBot}>
                                                <p className={styles.appointmentServiceCardBotLeftText}>{selectedService}</p>
                                                <p className={styles.appointmentServiceCardBotRightText}>6 690 р.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSubmit(handlePayment)} className={styles.confirmationSection}>
                                <div className={styles.infoBoxWrapper}>
                                    <h2 className={styles.infoBoxHeader}>Инфорация о записи</h2>
                                    <div className={styles.infoBoxBlock}>
                                        <div className={styles.infoBoxWrapText}>
                                            <p className={styles.infoBoxWrapTextTop}>Дата и время</p>
                                            <p className={styles.infoBoxWrapTextBot}>{selectedDate}, {selectedServiceTime}</p>
                                        </div>
                                        <div className={styles.infoBoxWrapText}>
                                            <p className={styles.infoBoxWrapTextTop}>Стоимость</p>
                                            <p className={styles.infoBoxWrapTextBot}>6 690 р.</p>
                                        </div>
                                        <div className={styles.infoBoxWrapText}>
                                            <p className={styles.infoBoxWrapTextTop}>Услуга</p>
                                            <p className={styles.infoBoxWrapTextBot}>{selectedService}</p>
                                        </div>
                                        <div className={styles.infoBoxWrapText}>
                                            <p className={styles.infoBoxWrapTextTop}>Консультант</p>
                                            <p className={styles.infoBoxWrapTextBot}>{selectedDoctor}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.formBtnsWrapper}>
                                    <Button
                                        variant="gradient"
                                        type="submit"
                                        padding="22.5px 114px"
                                    >
                                        Оплатить и записаться
                                    </Button>
                                    <label className={styles.appointmentFormAgreementLabel}>
                                        <input
                                            type="radio"
                                            defaultChecked
                                            readOnly
                                            className={styles.roundRadio}
                                        />
                                        <span>Нажимая на кнопку, вы соглашаетесь с условиями  <a href="#">договора оферты на проведение информационно-консультативной услуги</a></span>
                                    </label>
                                </div>
                            </form>
                        )}

                        {step === 3 && (
                            <div className={styles.infosPayBlockSection}>
                                <div className={styles.infoBoxWrapper}>
                                    <h2 className={styles.infoBoxHeader}>Ваша оплата получена</h2>
                                    <div className={styles.infoBoxBlock}>
                                        <div className={styles.infoBoxWrapText}>
                                            <p className={styles.infoBoxWrapTextTop}>Дата и время</p>
                                            <p className={styles.infoBoxWrapTextBot}>{selectedDate}, {selectedServiceTime}</p>
                                        </div>
                                        <div className={styles.infoBoxWrapText}>
                                            <p className={styles.infoBoxWrapTextTop}>Вид Консультации</p>
                                            <p className={styles.infoBoxWrapTextBot}>{selectedService}</p>
                                        </div>
                                        <div className={styles.infoBoxWrapText}>
                                            <p className={styles.infoBoxWrapTextTop}>Консультант</p>
                                            <p className={styles.infoBoxWrapTextBot}>{selectedDoctor}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.formBtnsWrapper}>
                                    <p className={styles.formBtnsWrapperText}>За сутки до консультации Вы получите уведомление о напоминании в личном кабинете в разделе <span className={styles.formBtnsWrapperHText}>«Сообщения»</span></p>
                                    <Button
                                        variant="gradient"
                                        type="submit"
                                        padding="22.5px 140px"
                                        onClick={handleBack}
                                    >
                                        В личный кабинет
                                    </Button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>

            </>
    );
}
