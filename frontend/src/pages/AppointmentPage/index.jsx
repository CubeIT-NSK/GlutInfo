import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import CustomSelect from "../../shared/components/CustomSelect";
import styles from "./index.module.css";
import Button from "../../shared/components/Buttons";
import { useTranslation } from "../../hooks/useTranslation";
import {
    getConsultantsList,
    getConsultantServicesList,
    getConsultantAvailableDates,
    getConsultantAvailableTimes,
} from "../../shared/api/api";
import { buildPatientProfileRoute } from "../../shared/utils/routes";

const formatConsultantName = (consultant) => {
    if (!consultant?.user) {
        return consultant?.speciality || "";
    }
    const { surname, name, patronymic } = consultant.user;
    return [surname, name, patronymic].filter(Boolean).join(" ") || consultant.speciality;
};

const formatServiceDuration = (duration) => {
    if (!duration) {
        return 0;
    }
    const [hours = "0", minutes = "0", seconds = "0"] = duration.split(":");
    return parseInt(hours, 10) * 60 + parseInt(minutes, 10) + Math.floor(parseInt(seconds, 10) / 60);
};

const addMinutesToTime = (timeString, minutesToAdd) => {
    if (!timeString) {
        return timeString;
    }
    const [hours = "0", minutes = "0", seconds = "0"] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10), 0);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    const endHours = date.getHours().toString().padStart(2, "0");
    const endMinutes = date.getMinutes().toString().padStart(2, "0");
    return `${endHours}:${endMinutes}`;
};

const formatDateLabel = (isoDate, locale) => {
    if (!isoDate) {
        return "";
    }
    const parsed = new Date(isoDate);
    if (Number.isNaN(parsed.getTime())) {
        return isoDate;
    }
    const formattedDate = parsed.toLocaleDateString(locale, { day: "numeric", month: "long" });
    const weekday = parsed.toLocaleDateString(locale, { weekday: "long" });
    return `${formattedDate}, ${weekday}`;
};

export default function AppointmentPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { t, language } = useTranslation();

    const validationSchema = useMemo(() => yup.object().shape({
        doctor: yup.string().nullable().required(t('appointment.validation.doctorRequired')),
        date: yup.string().nullable().required(t('appointment.validation.dateRequired')),
        serviceTime: yup.string().nullable().required(t('appointment.validation.timeRequired')),
        service: yup.string().nullable().required(t('appointment.validation.serviceRequired')),
    }), [t]);

    const resolver = useMemo(() => yupResolver(validationSchema), [validationSchema]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        clearErrors,
        setError,
    } = useForm({
        resolver,
    });

    const [step, setStep] = useState(1);
    const [animationCompleted, setAnimationCompleted] = useState({
        doctor: false,
        date: false,
        service: false,
        serviceTime: false,
        serviceCard: false,
    });

    const [consultants, setConsultants] = useState([]);
    const [services, setServices] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [isLoadingConsultants, setIsLoadingConsultants] = useState(false);
    const [isLoadingServices, setIsLoadingServices] = useState(false);
    const [isLoadingTimes, setIsLoadingTimes] = useState(false);

    const doctor = watch('doctor');
    const date = watch('date');
    const service = watch('service');
    const serviceTime = watch('serviceTime');

    const locale = language === 'ru' ? 'ru-RU' : 'en-US';

    const doctorOptions = useMemo(() => {
        const base = [{ value: '', label: t('appointment.placeholders.doctor'), isPlaceholder: true }];
        const consultantOptions = consultants.map((item) => ({
            value: String(item.id),
            label: formatConsultantName(item),
        }));
        return base.concat(consultantOptions);
    }, [consultants, t]);

    const serviceOptions = useMemo(() => {
        const base = [{ value: '', label: t('appointment.placeholders.service'), isPlaceholder: true }];
        const serviceItems = services.map((item) => ({
            value: String(item.id),
            label: item.name,
        }));
        return base.concat(serviceItems);
    }, [services, t]);

    const dateOptions = useMemo(() => {
        const base = [{ value: '', label: t('appointment.placeholders.date'), isPlaceholder: true }];
        const items = availableDates.map((isoDate) => ({
            value: isoDate,
            label: formatDateLabel(isoDate, locale),
        }));
        return base.concat(items);
    }, [availableDates, locale, t]);

    const selectedServiceData = useMemo(() => services.find((item) => String(item.id) === service), [services, service]);
    const durationMinutes = useMemo(() => formatServiceDuration(selectedServiceData?.duration), [selectedServiceData]);

    const serviceTimeOptions = useMemo(() => {
        const base = [{ value: '', label: t('appointment.placeholders.time'), isPlaceholder: true }];
        if (!availableTimes.length) {
            return base;
        }
        const items = availableTimes.map((time) => {
            const start = time.slice(0, 5);
            const end = durationMinutes ? addMinutesToTime(time, durationMinutes) : '';
            const label = end ? `${start}—${end}` : start;
            return {
                value: time,
                label,
            };
        });
        return base.concat(items);
    }, [availableTimes, durationMinutes, t]);

    const isFormValid = Boolean(doctor && date && service && serviceTime);

    const handleAnimationEnd = (field) => {
        setAnimationCompleted((prev) => ({
            ...prev,
            [field]: true,
        }));
    };

    const loadConsultantDetails = useCallback(async (consultantId) => {
        if (!consultantId) {
            setServices([]);
            setAvailableDates([]);
            setAvailableTimes([]);
            setValue('service', '', { shouldValidate: true });
            setValue('date', '', { shouldValidate: true });
            setValue('serviceTime', '', { shouldValidate: true });
            return;
        }

        setIsLoadingServices(true);
        const [servicesResponse, datesResponse] = await Promise.all([
            getConsultantServicesList(consultantId),
            getConsultantAvailableDates(consultantId),
        ]);

        if (servicesResponse.status === 200) {
            setServices(servicesResponse.data || []);
        } else {
            setServices([]);
        }

        if (datesResponse.status === 200) {
            setAvailableDates(datesResponse.data || []);
        } else {
            setAvailableDates([]);
        }

        setAvailableTimes([]);
        setValue('service', '', { shouldValidate: true });
        setValue('date', '', { shouldValidate: true });
        setValue('serviceTime', '', { shouldValidate: true });
        setIsLoadingServices(false);
    }, [setValue]);

    const loadAvailableTimeSlots = useCallback(async (consultantId, serviceId, dateValue) => {
        if (!consultantId || !serviceId || !dateValue) {
            setAvailableTimes([]);
            return;
        }
        setIsLoadingTimes(true);
        const response = await getConsultantAvailableTimes(consultantId, serviceId, dateValue);
        if (response.status === 200) {
            setAvailableTimes(response.data || []);
        } else {
            setAvailableTimes([]);
        }
        setValue('serviceTime', '', { shouldValidate: true });
        setIsLoadingTimes(false);
    }, [setValue]);

    useEffect(() => {
        register('doctor');
        register('date');
        register('service');
        register('serviceTime');
    }, [register]);

    useEffect(() => {
        const fetchConsultants = async () => {
            setIsLoadingConsultants(true);
            const response = await getConsultantsList({ size: 100 });
            if (response.status === 200) {
                const accepted = response.data.filter((item) => item.is_accepted);
                setConsultants(accepted);
            } else {
                setConsultants([]);
            }
            setIsLoadingConsultants(false);
        };

        fetchConsultants();
    }, []);

    useEffect(() => {
        const preselectedConsultant = searchParams.get('consultant_id');
        if (consultants.length && preselectedConsultant) {
            const exists = consultants.find((item) => String(item.id) === preselectedConsultant);
            if (exists) {
                setValue('doctor', String(exists.id), { shouldValidate: true });
                loadConsultantDetails(String(exists.id));
            }
        }
    }, [consultants, loadConsultantDetails, searchParams, setValue]);

    useEffect(() => {
        if (doctor && service && date) {
            loadAvailableTimeSlots(doctor, service, date);
        } else {
            setAvailableTimes([]);
            setValue('serviceTime', '', { shouldValidate: true });
        }
    }, [doctor, service, date, loadAvailableTimeSlots, setValue]);

    const onSubmit = () => {
        setStep(2);
    };

    const handlePayment = () => {
        setStep(3);
    };

    const handleBack = useCallback((event) => {
        event.preventDefault();
        navigate(-1);
    }, [navigate]);

    const selectedDoctorLabel = doctorOptions.find((option) => option.value === doctor)?.label || '';
    const selectedServiceLabel = serviceOptions.find((option) => option.value === service)?.label || '';
    const selectedServiceTimeLabel = serviceTimeOptions.find((option) => option.value === serviceTime)?.label || '';
    const selectedDateLabel = formatDateLabel(date, locale);

    const servicePrice = selectedServiceData?.price;

    return (
        <>
            <div className={styles.Wrapper}>
                <section className={styles.appointmentSection}>
                    <h2 className={styles.title}>
                        {step === 1 && t('appointment.title.selection')}
                        {step === 2 && t('appointment.title.confirmation')}
                        {step === 3 && t('appointment.title.success')}
                    </h2>

                    {step === 1 && (
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.appointmentForm}>
                            <div className={styles.formGroupWrapper}>
                                <div className={styles.formGroup}>
                                    <label
                                        className={`${styles.appointmentFormLabel} ${!animationCompleted.doctor ? styles.fadeIn : ''}`}
                                        onAnimationEnd={() => handleAnimationEnd('doctor')}
                                    >
                                        {t('appointment.fields.doctor')}
                                        <CustomSelect
                                            options={doctorOptions}
                                            value={doctor}
                                            name="doctor"
                                            onChange={(value) => {
                                                setValue('doctor', value, { shouldValidate: true });
                                                clearErrors('doctor');
                                                loadConsultantDetails(value);
                                            }}
                                            errors={errors}
                                            setError={setError}
                                        />
                                        {isLoadingConsultants && <span className={styles.helperText}>{t('appointment.notifications.loadingConsultants')}</span>}
                                    </label>

                                    {doctor && (
                                        <label
                                            className={`${styles.appointmentFormLabel} ${!animationCompleted.date ? styles.fadeIn : ''}`}
                                            onAnimationEnd={() => handleAnimationEnd('date')}
                                        >
                                            {t('appointment.fields.date')}
                                            <CustomSelect
                                                options={dateOptions}
                                                value={date}
                                                name="date"
                                                onChange={(value) => {
                                                    setValue('date', value, { shouldValidate: true });
                                                    clearErrors('date');
                                                }}
                                                errors={errors}
                                                setError={setError}
                                            />
                                            {isLoadingServices && <span className={styles.helperText}>{t('appointment.notifications.loadingDates')}</span>}
                                        </label>
                                    )}

                                    {doctor && (
                                        <label
                                            className={`${styles.appointmentFormLabel} ${!animationCompleted.service ? styles.fadeIn : ''}`}
                                            onAnimationEnd={() => handleAnimationEnd('service')}
                                        >
                                            {t('appointment.fields.service')}
                                            <CustomSelect
                                                options={serviceOptions}
                                                value={service}
                                                name="service"
                                                onChange={(value) => {
                                                    setValue('service', value, { shouldValidate: true });
                                                    clearErrors('service');
                                                }}
                                                errors={errors}
                                                setError={setError}
                                            />
                                        </label>
                                    )}

                                    {doctor && date && service && (
                                        <label
                                            className={`${styles.appointmentFormLabel} ${!animationCompleted.serviceTime ? styles.fadeIn : ''}`}
                                            onAnimationEnd={() => handleAnimationEnd('serviceTime')}
                                        >
                                            {t('appointment.fields.serviceTime')}
                                            <CustomSelect
                                                options={serviceTimeOptions}
                                                value={serviceTime}
                                                name="serviceTime"
                                                onChange={(value) => {
                                                    setValue('serviceTime', value, { shouldValidate: true });
                                                    clearErrors('serviceTime');
                                                }}
                                                errors={errors}
                                                setError={setError}
                                            />
                                            {isLoadingTimes && <span className={styles.helperText}>{t('appointment.notifications.loadingTimes')}</span>}
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className={styles.appointmentFormButtonWrapper}>
                                <Button
                                    variant="white"
                                    padding="15.5px 40px"
                                    fontSize="small"
                                    onClick={handleBack}
                                >
                                    {t('appointment.actions.backToProfile')}
                                </Button>
                                <Button
                                    variant="gradient"
                                    type="submit"
                                    padding="15.5px 40px"
                                    fontSize="small"
                                    disabled={!isFormValid}
                                >
                                    {t('appointment.actions.next')}
                                </Button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <div className={styles.appointmentConfirm}>
                            <div className={styles.confirmCard}>
                                <h3 className={styles.confirmTitle}>{t('appointment.summary.title')}</h3>
                                <ul className={styles.confirmList}>
                                    <li>
                                        <span>{t('appointment.summary.doctor')}</span>
                                        <strong>{selectedDoctorLabel}</strong>
                                    </li>
                                    <li>
                                        <span>{t('appointment.summary.service')}</span>
                                        <strong>{selectedServiceLabel}</strong>
                                    </li>
                                    <li>
                                        <span>{t('appointment.summary.date')}</span>
                                        <strong>{selectedDateLabel}</strong>
                                    </li>
                                    <li>
                                        <span>{t('appointment.summary.time')}</span>
                                        <strong>{selectedServiceTimeLabel}</strong>
                                    </li>
                                    {servicePrice && (
                                        <li>
                                            <span>{t('appointment.summary.price')}</span>
                                            <strong>{servicePrice.toLocaleString('ru-RU')} ₽</strong>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className={styles.appointmentFormButtonWrapper}>
                                <Button
                                    variant="white"
                                    padding="15.5px 40px"
                                    fontSize="small"
                                    onClick={() => setStep(1)}
                                >
                                    {t('appointment.actions.change')}
                                </Button>
                                <Button
                                    variant="gradient"
                                    padding="15.5px 40px"
                                    fontSize="small"
                                    onClick={handlePayment}
                                >
                                    {t('appointment.actions.confirm')}
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className={styles.appointmentSuccess}>
                            <h3 className={styles.successTitle}>{t('appointment.title.success')}</h3>
                            <p className={styles.successText}>{t('appointment.notifications.paymentSuccess')}</p>
                            <Button
                                variant="gradient"
                                padding="15.5px 40px"
                                fontSize="small"
                                onClick={() => navigate(buildPatientProfileRoute(undefined))}
                            >
                                {t('appointment.actions.backToProfileSimple')}
                            </Button>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}
