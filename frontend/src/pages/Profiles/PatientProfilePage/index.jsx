import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";
import icons from "../../../shared/resources/icon";
import Button from "../../../shared/components/Buttons";

const BUTTONS = [
    { label: "Записаться", route: "/profile-patient/make-appointment", variant: 'gradient', padding: "15.5px 86.5px", color: "white" },
    { label: "Изменить профиль", route: "/profile-patient/edit", padding: "15.5px 55px"},
];

const SECTIONS = [
    {
        title: "",
        buttons: [
            { label: "Заполнить анкету", route: "/profile-patient/fill", padding: "15.5px 59.5px" },
            { label: "Мои консультации", route: "/profile-patient/my-consults", padding: "15.5px 56px" },
            { label: "Сообщения", route: "/profile-patient/messages", padding: "15.5px 84.5px" },
            { label: "Мои документы", route: "/profile-patient/my-documents", padding: "15.5px 67.5px" },
        ],
    },
    {
        title: "Дневники",
        buttons: [
            { label: "Пищевой", route: "/food-diary", padding: "14.5px 94.3px", isDisabled: true },
            { label: "Самочувствия", route: "/health-diary", padding: "14.5px 73.3px", isDisabled: true },
            { label: "Веса", route: "/weight-diary", padding: "14.5px 113.3px", isDisabled: true },
            { label: "Контроля приверженности", route: "/adherence-diary", padding: "14.5px 20.8px", isDisabled: true },
        ],
    },
    {
        title: "Опросники",
        buttons: [
            { label: "Качество жизни", route: "/questionnairies/quality-of-life", padding: "15.5px 68px" },
            { label: "Гастроэнтерологический опросник качества жизни", route: "/questionnairies/gastro", padding: "15.5px 67px" },
            { label: "Опросник слабости", route: "/questionnairies/weakness", padding: "15.5px 50.5px" },
            { label: "Тревога и депрессия (HADS)", route: "/questionnairies/anxiety", padding: "15.5px 13px" },
            { label: "Анкета-скрининг", route: "/questionnairies/screening", padding: "15.5px 61.5px" },
            { label: "Оценка приверженности к БГД", route: "/questionnairies/adherence-assessment", padding: "15.5px 153.5px" },
        ],
    },
    {
        title: "Калькулятор",
        buttons: [
            { label: "Индекс массы тела", route: "/bmi-calculator", padding: "14.5px 52.7px", isDisabled: true },
            { label: "Счетчик калорий", route: "/calorie-counter", padding: "14.5px 62.2px", isDisabled: true },
            { label: "Продуктовая корзина", route: "/grocery-basket", padding: "14.5px 43px", isDisabled: true },
            { label: "Библиотека пациента", route: "/library", padding: "14.5px 43.3px", isDisabled: true },
        ],
    },
];

export default function PatientProfilePage() {
    const navigate = useNavigate();
    
    const { id } = useParams();
    console.log("User ID:", id);

    const handleNavigation = (route) => {
        navigate(route);
    };

    const renderButtons = (buttons) =>
        buttons.map(({ label, route, isDisabled, padding, color = "black", variant="white" }, index) => (
            <Button
                key={index}
                onClick={() => handleNavigation(route)}
                disabled={isDisabled}
                padding={padding}
                variant={variant}
                color={color}
                fontSize="small"
            >
                {label}
            </Button>
        ));

    return (
            <>
                <div className={styles.backContent}>
                    <div className="container">
                        <section className={styles.profileSection}>
                            <h1 className={styles.profileSectionTitle}>Личный кабинет</h1>
                            <div className={styles.profileSectionFullWrapper}>
                                <div className={styles.profileDetails}>
                                    <img
                                        src={icons.profileAvIcon}
                                        alt="profileAvIcon"
                                        className={styles.profileImage}
                                    />
                                    <div className={styles.profileDetWrapper}>
                                        <h2 className={styles.profileDetWrapperTop}>Иванов Иван Иванович</h2>
                                        <p className={styles.profileDetWrapperMid}>Заполненность профиля - 50%</p>
                                    </div>
                                </div>
                                <div className={styles.profileActions}>
                                    {renderButtons(BUTTONS)}
                                </div>
                            </div>
                            {SECTIONS.map(({ title, buttons }, index) => (
                                <div key={index} className={styles.profileSectionFullWrapper}>
                                    {title && <h2 className={styles.profileSectionFullWrapperTitle}>{title}</h2>}
                                    <div className={styles.profileActions}>{renderButtons(buttons)}</div>
                                </div>
                            ))}
                            <div className={styles.profileSectionExit}>
                                <Button
                                    variant="gradient"
                                    padding="15.5px 108.5px"
                                    fontSize="small"
                                    onClick={() => handleNavigation("/logout")}
                                >
                                    Выход
                                </Button>
                            </div>
                        </section>
                    </div>
                </div>

            </>
    );
}
