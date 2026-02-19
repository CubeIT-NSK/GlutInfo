import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";
import icons from "../../../shared/resources/icon";
import Button from "../../../shared/components/Buttons";
import { getUsersMe } from "../../../shared/api/api";
import { buildPatientProfileRoute } from "../../../shared/utils/routes";

export default function PatientProfilePage() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const shouldFetch = !user || (userId && user && String(user.id) !== userId);
        if (!shouldFetch) {
            setIsLoading(false);
            return;
        }

        let ignore = false;
        const loadUser = async () => {
            try {
                const { status, data } = await getUsersMe();
                if (!ignore && status === 200 && data) {
                    setUser(data);
                    if (data.id && userId && String(data.id) !== userId) {
                        navigate(buildPatientProfileRoute(data.id), { replace: true });
                    }
                    if (data.id && !userId) {
                        navigate(buildPatientProfileRoute(data.id), { replace: true });
                    }
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        };
        loadUser();
        return () => {
            ignore = true;
        };
    }, [navigate, user, userId]);

    const profileButtons = useMemo(() => ([
        {
            label: "Записаться",
            route: buildPatientProfileRoute(user?.id, "/make-appointment"),
            variant: "gradient",
            padding: "15.5px 86.5px",
            color: "white",
        },
        {
            label: "Изменить профиль",
            route: buildPatientProfileRoute(user?.id, "/edit"),
            padding: "15.5px 55px",
        },
    ]), [user]);

    const sections = useMemo(() => [
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
    ], []);

    const handleNavigation = (route) => {
        const target = resolveRoute(route);
        if (target) {
            navigate(target);
        }
    };

    const resolveRoute = useCallback((route) => {
        if (!route || !user?.id) {
            return route;
        }

        const basePath = '/profile-patient';
        const idPath = `${basePath}/${user.id}`;

        if (route === basePath || route === `${basePath}/`) {
            return idPath;
        }

        if (route.startsWith(idPath)) {
            return route;
        }

        if (route.startsWith(basePath)) {
            const suffix = route.slice(basePath.length);
            return `${idPath}${suffix}`;
        }

        return route;
    }, [user]);

    const renderButtons = (buttons) =>
        buttons.map(({ label, route, isDisabled, padding, color = "black", variant = "white" }, index) => (
            <Button
                key={index}
                onClick={() => handleNavigation(resolveRoute(route))}
                disabled={isDisabled}
                padding={padding}
                variant={variant}
                color={color}
                fontSize="small"
            >
                {label}
            </Button>
        ));

    const fullName = useMemo(() => {
        if (!user) {
            return "";
        }
        return [user.surname, user.name, user.patronymic].filter(Boolean).join(" ");
    }, [user]);

    if (isLoading) {
        return (
            <div className={styles.backContent}>
                <div className="container">
                    <section className={styles.profileSection}>
                        <h1 className={styles.profileSectionTitle}>Личный кабинет</h1>
                        <p>Загрузка профиля...</p>
                    </section>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.backContent}>
                <div className="container">
                    <section className={styles.profileSection}>
                        <h1 className={styles.profileSectionTitle}>Личный кабинет</h1>
                        <p>Не удалось загрузить данные профиля. Попробуйте обновить страницу.</p>
                    </section>
                </div>
            </div>
        );
    }

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
                                        <h2 className={styles.profileDetWrapperTop}>
                                            {fullName || user?.email || "Пользователь"}
                                        </h2>
                                        <p className={styles.profileDetWrapperMid}>
                                            Электронная почта: {user?.email || "—"}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.profileActions}>
                                    {renderButtons(profileButtons)}
                                </div>
                            </div>
                            {sections.map(({ title, buttons }, index) => (
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
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        setUser(null);
                                        window.location.replace('/');
                                    }}
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
