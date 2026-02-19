import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import Button from "../../shared/components/Buttons";
import { getPatientRecords } from "../../shared/api/api";
import { buildPatientProfileRoute } from "../../shared/utils/routes";

const formatDate = (dateString, locale) => {
    if (!dateString) {
        return "";
    }
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) {
        return dateString;
    }
    return parsed.toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

const formatTime = (timeString) => {
    if (!timeString) {
        return "";
    }
    return timeString.slice(0, 5);
};

const formatConsultantName = (consultant) => {
    if (!consultant?.user) {
        return "";
    }
    const { surname, name, patronymic } = consultant.user;
    return [surname, name, patronymic].filter(Boolean).join(" ");
};

export default function MyConsultsPage() {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        const fetchRecords = async () => {
            setIsLoading(true);
            const response = await getPatientRecords();
            if (!ignore) {
                if (response.status === 200) {
                    setRecords(response.data || []);
                } else if (response.status === 401) {
                    setError("Для просмотра записей необходимо авторизоваться.");
                } else {
                    setError("Не удалось загрузить список консультаций. Попробуйте позже.");
                }
                setIsLoading(false);
            }
        };

        fetchRecords();

        return () => {
            ignore = true;
        };
    }, []);

    const formattedRecords = useMemo(() => {
        const sorted = [...records].sort((a, b) => {
            const dateA = new Date(`${a.rec_date}T${a.rec_time}`);
            const dateB = new Date(`${b.rec_date}T${b.rec_time}`);
            return dateA - dateB;
        });

        return sorted.map((record) => ({
            id: record.id,
            date: formatDate(record.rec_date, "ru-RU"),
            time: formatTime(record.rec_time),
            finished: record.finished,
            serviceName: record.service?.name || "",
            serviceDescription: record.service?.description || "",
            consultantName: formatConsultantName(record.consultant),
            price: record.service?.price,
        }));
    }, [records]);

    return (
        <>
            <section className={styles.myConsultsSection}>
                <div className="container">
                    <div className={styles.myConsultsWrapper}>
                        <h2 className={styles.myConsultsTitle}>Мои консультации</h2>

                        {isLoading && <p>Загружаем информацию о консультациях...</p>}
                        {!isLoading && error && <p className={styles.error}>{error}</p>}

                        {!isLoading && !error && formattedRecords.length === 0 && (
                            <p>У вас пока нет записей на консультации.</p>
                        )}

                        {!isLoading && !error && formattedRecords.length > 0 && (
                            <div className={styles.myConsults}>
                                {formattedRecords.map((record) => (
                                    <div key={record.id} className={styles.myConsultsBlock}>
                                        <div className={styles.myConsultsContain}>
                                            <h3 className={styles.myConsultsHeader}>
                                                {record.serviceName || "Консультация"}
                                            </h3>
                                            <div className={styles.myConsultsItem}>
                                                <div className={styles.myConsultsText}>
                                                    <p className={styles.myConsultsTextTop}>Дата</p>
                                                    <p className={styles.myConsultsTextBot}>{record.date}</p>
                                                </div>
                                                <div className={styles.myConsultsText}>
                                                    <p className={styles.myConsultsTextTop}>Время</p>
                                                    <p className={styles.myConsultsTextBot}>{record.time}</p>
                                                </div>
                                                <div className={styles.myConsultsText}>
                                                    <p className={styles.myConsultsTextTop}>Консультант</p>
                                                    <p className={styles.myConsultsTextBot}>{record.consultantName}</p>
                                                </div>
                                                {record.price && (
                                                    <div className={styles.myConsultsText}>
                                                        <p className={styles.myConsultsTextTop}>Стоимость</p>
                                                        <p className={styles.myConsultsTextBot}>
                                                            {record.price.toLocaleString("ru-RU")} ₽
                                                        </p>
                                                    </div>
                                                )}
                                                <div className={styles.myConsultsText}>
                                                    <p className={styles.myConsultsTextTop}>Статус</p>
                                                    <p className={styles.myConsultsTextBot}>
                                                        {record.finished ? "Завершена" : "Запланирована"}
                                                    </p>
                                                </div>
                                            </div>
                                            {record.serviceDescription && (
                                                <p className={styles.myConsultsDescription}>
                                                    {record.serviceDescription}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className={styles.myConsultsControls}>
                            <Button
                                variant="white"
                                padding="15.5px 33.5px"
                                fontSize="small"
                                className={styles.myConsultsBtn}
                                onClick={() => navigate(-1)}
                            >
                                Назад
                            </Button>
                            <Button
                                variant="gradient"
                                padding="15.5px 33.5px"
                                fontSize="small"
                                className={styles.myConsultsBtn}
                                onClick={() => navigate(buildPatientProfileRoute(undefined))}
                            >
                                В личный кабинет
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
