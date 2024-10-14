import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import styles from "./index.module.css";
import icons from "../../../shared/resources/icon";

const BUTTONS = [
    { label: "Записаться", route: "/appointment", isPrimary: true },
    // { label: "Изменить профиль", route: "/edit-profile" },
];

const ADDITIONAL_ACTIONS = [
    { label: "Заполнить анкету", route: "/fill-patient" },
    { label: "Мои консультации", route: "/my-consultations" },
    { label: "Сообщения", route: "/messages" },
    { label: "Мои документы", route: "/my-documents" },
];

const DIARIES = [
    { label: "Пищевой", route: "/food-diary" },
    { label: "Самочувствия", route: "/health-diary" },
    { label: "Веса", route: "/weight-diary" },
    { label: "Контроля приверженности", route: "/adherence-diary" },
];

const QUESTIONNAIRES = [
    { label: "Качество жизни", route: "/quality-of-life-questionnaire" },
    { label: "Гастроэнтерологический опросник качества жизни", route: "/gastro-questionnaire", isBig: true },
    { label: "Опросник слабости", route: "/weakness-questionnaire" },
    { label: "Тревога и депрессия (HADS)", route: "/anxiety-questionnaire" },
    { label: "Анкета-скрининг", route: "/screening-questionnaire" },
    { label: "Оценка приверженности к БГД", route: "/adherence-assessment", isBig: true },
];

const CALCULATORS = [
    { label: "Индекс массы тела", route: "/bmi-calculator" },
    { label: "Счетчик колорий", route: "/calorie-counter" },
    { label: "Продуктовая корзина", route: "/grocery-basket" },
    { label: "Библиотека пациента", route: "/library", isDisabled: true },
];

export default function PatientProfilePage() {
    const navigate = useNavigate();

    const handleNavigation = (route) => {
        navigate(route);
    };

    const renderButtons = (buttons) => (
        <div className={styles.profileActions}>
            {buttons.map(({ label, route, isPrimary, isBig, isDisabled }, index) => (
                <button
                    key={index}
                    className={`${styles.secondaryButton} ${isPrimary ? styles.primaryButton : ''} ${isBig ? styles.secondaryButtonBig : ''} ${isDisabled ? styles.secondaryButtonDisable : ''}`}
                    onClick={() => handleNavigation(route)}
                    disabled={isDisabled}
                >
                    {label}
                </button>
            ))}
        </div>
    );

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.mainContent}>
                <div className="container">
                    <section className={styles.profileSection}>
                        <h1 className={styles.profileSectionTitle}>Личный кабинет</h1>
                        <div className={styles.profileSectionFullWrapper}>
                            <div className={styles.profileDetails}>
                                <img
                                    src={icons.profileAv}
                                    alt="profileAv"
                                    className={styles.profileImage}
                                />
                                <div className={styles.profileDetWrapper}>
                                    <h2 className={styles.profileDetWrapperTop}>Иванов Иван Иванович</h2>
                                    <p className={styles.profileDetWrapperMid}>Заполненность профиля - 50%</p>
                                </div>
                            </div>
                            <div className={styles.profileActions}>
                                <button className={styles.primaryButton} onClick={() => handleNavigation("/appointment")}>Записаться</button>
                                {/* <button className={styles.secondaryButton} onClick={() => handleNavigation("/edit-profile")}>Изменить профиль</button> */}
                            </div>
                        </div>

                        <div className={styles.profileSectionFullWrapper}>
                            {renderButtons(ADDITIONAL_ACTIONS)}
                        </div>

                        <div className={styles.profileSectionFullWrapper}>
                            <h2 className={styles.profileSectionFullWrapperTitle}>Дневники</h2>
                            {renderButtons(DIARIES)}
                        </div>

                        <div className={styles.profileSectionFullWrapper}>
                            <h2 className={styles.profileSectionFullWrapperTitle}>Опросники</h2>
                            {renderButtons(QUESTIONNAIRES)}
                        </div>

                        <div className={styles.profileSectionFullWrapper}>
                            <h2 className={styles.profileSectionFullWrapperTitle}>Калькулятор</h2>
                            {renderButtons(CALCULATORS)}
                        </div>

                        <div className={styles.profileSectionExit}>
                            <button className={styles.primaryButton} onClick={() => handleNavigation("/logout")}>Выход</button>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
